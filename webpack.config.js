const webpack = require("webpack");

const jQueryPath = "jquery/dist/jquery.js";

module.exports = {
  resolve: {
    alias: {
      jquery$: jQueryPath
    }
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: "file-loader?name=[name].[ext]?[hash]"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Vue: ["vue/dist/vue.esm.js", "default"],
      jQuery: jQueryPath,
      $: jQueryPath,
      "window.jQuery": jQueryPath
    })
  ]
};
