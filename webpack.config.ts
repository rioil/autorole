import webpack from "webpack";
import path from "path";

const config: webpack.Configuration = {
  entry: {
    background: "./src/background.ts",
    content: "./src/content.ts",
    options: "./src/options.ts",
    popup: "./src/popup.ts",
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: "ts-loader" }],
  },
  optimization: {
    minimize: false,
  },
  output: {
    path: path.resolve(__dirname, "dist", "src"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

export default config;
