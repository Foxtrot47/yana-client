import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/index";
Vue.use(Vuex);

const authStore = {
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    clearAuth(state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    signup({ commit }, authData) {
      axios
        .post("http://localhost:8080/users/signup", {
          email: authData.email,
          fullname: authData.fullname,
          username: authData.username,
          password: authData.password,
          confirmPassword: authData.password2
        })
        .then(res => {
          if (res.status === "200") {
            commit("clearAuth");
            router.push("/login");
          }
        });
    },
    login({ commit }, authData) {
      axios
        .post("http://localhost:8080/users/login", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          commit("authUser", {
            token: res.data.accessToken,
            userId: res.data.userId
          });
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("userId", res.data.userId);
          router.push("/notes");
        });
    },
    AutoLogin({ commit }) {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return;
      }
      const userId = localStorage.getItem("userId");
      commit("authUser", { token, userId });
    },
    logout({ commit }) {
      commit("clearAuth");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.replace("/");
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    }
  }
};

const noteStore = {
  state: {
    notes: [],
    noteID: "",
    noteContent: "",
    noteName: "",
    editorOpen: false
  },
  mutations: {
    addNote(state, noteData) {
      state.notes = noteData;
    },
    updateNote(state, noteData) {
      state.editorOpen = true;
      state.noteID = noteData.id;
      state.noteContent = noteData.content;
      state.noteName = noteData.name;
    },
    createNote(state, noteData) {
      state.notes.push(noteData);
      state.editorOpen = true;
      state.noteID = noteData.id;
      state.noteContent = noteData.content;
      state.noteName = noteData.name;
    }
  },
  actions: {
    async populateData(context) {
      const basereq = axios.create({
        baseURL: "http://localhost:8080/",
        timeout: 10000,
        headers: { Authorization: `Bearer ${authStore.state.idToken}` }
      });
      await basereq
        .get("/notes/getAllOwnedNotes")
        .then(response => {
          console.log(response.data);
          context.commit("addNote", response.data.notes);
        })
        .catch(function(error) {
          var _403 = /403/;
          if (_403.test(error)) {
            context.state.clearAuth;
            router.push("/login");
          }
        });
    },
    loadNote(context, noteID) {
      const id = context.state.notes.find(id => id.noteID === noteID);
      const data = {
        id: id.noteID,
        name: id.noteName,
        content: id.noteContent
      };
      context.commit("updateNote", data);
    },
    async saveNote(context, data) {
      if (
        (data.notecontent !== context.state.noteContent ||
          data.notename !== context.state.noteName) &&
        data.id !== null
      ) {
        const basereq = axios.create({
          baseURL: "http://localhost:8080/",
          timeout: 10000,
          headers: { Authorization: `Bearer ${authStore.state.idToken}` }
        });
        await basereq
          .post("/notes/uploadNote", {
            noteID: data.id,
            noteName: data.notename,
            noteContent: data.notecontent
          })
          .then(res => {
            if (res.status === "200") {
              var noteData = {
                id: data.id,
                name: data.notename,
                content: data.notecontent
              };
              context.commit("updateNote", noteData);
              // update note content and name in notes array so that when user re open the note its always updated
              const id = context.state.notes.findIndex(
                id => id.noteID === context.state.noteID
              );
              context.state.notes[id].noteContent = data.notecontent;
              context.state.notes[id].noteName = data.notename;
            }
          });
      }
    },
    async createNote(context) {
      //  to make a new new note we send a note with send an api request to make new note with name Untitled
      // then we take the noteid from that and add it to our local notes array
      const basereq = axios.create({
        baseURL: "http://localhost:8080/",
        timeout: 10000,
        headers: { Authorization: `Bearer ${authStore.state.idToken}` }
      });
      await basereq
        .post("/notes/uploadNote", {
          noteName: "Untitled"
        })
        .then(res => {
          if (res.status === 200) {
            console.log("hello");
            var newnote = {
              noteID: res.data.noteid,
              noteName: "Untitled",
              noteContent: "",
              lastUpdated: res.data.lastUpdated,
              _id: res.data.id
            };
            context.commit("createNote", newnote);
            const id = context.state.notes.find(
              id => id.noteID === res.data.noteid
            );
            const data = {
              id: id.noteID,
              name: id.noteName,
              content: id.noteContent
            };
            context.commit("updateNote", data);
          }
        });
    }
  },
  getters: {
    getnotes(state) {
      return state.notes;
    },
    noteLoaded(state) {
      return state.editorOpen;
    },
    getNoteContent(state) {
      return state.noteContent;
    },
    getNoteName(state) {
      return state.noteName;
    }
  }
};
export default new Vuex.Store({
  modules: {
    authStore: authStore,
    noteStore: noteStore
  }
});
