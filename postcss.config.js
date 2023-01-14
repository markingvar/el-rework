module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-nested"),
    process.env.NODE_ENV === "production" ? require("cssnano") : false,
    process.env.NODE_ENV === "production"
      ? require("node-css-mqpacker")
      : false,
  ].filter(Boolean),
};
