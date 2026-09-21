import path from "node:path";

export default (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    mode: isProduction ? "production" : "development",
    target: "node",
    devtool: isProduction ? false : "source-map",
    
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(import.meta.dirname, "dist"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
  };
};
