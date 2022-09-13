const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: [],
        include: path.resolve(__dirname, "../"),
      },
    ],
  },
};
