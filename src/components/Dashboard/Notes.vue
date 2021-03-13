<template>
  <div class="w-full h-screen relative flex flex-row overflow-hidden">
    <div class="h-full flex-none w-56 bg-blue-500">
      <div class="flex flex-col text-white">
        <div class="text-2xl p-4">
          <span class="text-3xl  align-bottom material-icons">
            account_circle
          </span>
          Hello User
        </div>
        <div class="mt-8 text-xl text-gray-100 ">
          <div class="hover:bg-blue-900 py-2">
            <div v-on:click="newnote()" class="pl-2">
              <span class="material-icons align-bottom">
                add
              </span>
              Add New Note
            </div>
          </div>
          <div class="hover:bg-blue-900 py-2">
            <div class="pl-2">
              <span class="material-icons align-bottom">
                dashboard
              </span>
              Dashboard
            </div>
          </div>
          <div class="hover:bg-blue-900 py-2">
            <div class="pl-2">
              <span class="material-icons align-bottom">
                description
              </span>
              Notes
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="h-full flex-none w-72 bg-gray-100 text-gray-800 border-r border-gray-300"
    >
      <div class="border-b h-24 border-gray-300">
        <div class="p-4 break-all">
          <h2 class="text-2xl pb-3">
            <span class="material-icons"> description </span>Notes
          </h2>
          <p>No: of notes</p>
        </div>
      </div>
      <div
        class="border-b border-gray-300"
        v-for="note in notes"
        :key="note.noteName"
        v-on:click="openNote(note.noteID, note.noteName, note.noteContent)"
      >
        <div class="p-4 break-all">
          <p class="text-md font-semibold pb-3">{{ note.noteName }}</p>
          <div class="h-24 overflow-hidden" v-html="note.noteContent"></div>
          <p class="text-sm">Last Updated {{ note.lastUpdated }}</p>
        </div>
      </div>
    </div>
    <div class="w-full   bg-gray-100 h-full">
      <div class="shadow-md">
        <div class="p-4 break-all">
          <h2 class="text-2xl pb-3">
            <span class="material-icons align-top text-3xl hover:bg-gray-300">
              fullscreen
            </span>
            |
            <input
              type="text"
              v-model="noteName"
              class="text-xl border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
            />
          </h2>
        </div>
      </div>
      <div class="w-full h-full ">
        <ckeditor v-model="noteContent" class="h-full"> </ckeditor>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noteID: "",
      noteContent: "",
      noteName: "",
      editorOpen: false
    };
  },
  computed: {
    notes() {
      return this.$store.getters.getnotes;
    }
  },
  methods: {
    updateStuff() {
      this.$store.dispatch("populateData");
    },
    openNote(id, name, content) {
      this.editorOpen = true;
      this.noteID = id;
      this.noteName = name;
      this.noteContent = content;
      this.$store.dispatch("loadNote", id);
      this.autoSave();
    },
    autoSave() {
      setInterval(this.timerTick, 5000);
    },
    timerTick() {
      if (this.noteID === null || this.noteID === "") {
        clearInterval(this.timerTick);
      } else {
        var notedata = {
          id: this.noteID,
          notename: this.noteName,
          notecontent: this.noteContent
        };
        this.$store.dispatch("saveNote", notedata);
      }
    },
    newnote() {
      this.timerTick();
      this.$store.dispatch("createNote");
    }
  },
  mounted() {
    this.updateStuff();
  }
};
</script>
