module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData : `
          @import "@/assets/style/variables.scss";
          @import "@/assets/style/classes.scss";
          @import "@/assets/style/global.scss";`
      }
    }
  }
};