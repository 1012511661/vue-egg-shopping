module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true
      },
      "vant"
    ]
    // ,
    // [
    //   "autoprefixer",
    //   {
    //     browsers: ["Android >= 4.0", "iOS >= 7"]
    //   }
    // ]
    //,
    // [
    //   "postcss-pxtorem",
    //   {
    //     rootValue: 16,
    //     unitPrecision: 5,
    //     propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
    //     selectorBlackList: [],
    //     replace: true,
    //     mediaQuery: false,
    //     minPixelValue: 10
    //   }
    // ]
  ]
};
