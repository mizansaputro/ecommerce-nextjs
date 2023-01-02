const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
