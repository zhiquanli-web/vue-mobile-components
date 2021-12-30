module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    open: true,
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/mixin.scss";`,
      },
    },
  },
};
