const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const url = require("url");

const INSPECTORS = [
  {
    chunkName: "opus",
    entry: "./src/inspectors/opus.tsx",
    title: "Opus Packet Inspector",
    subtitle: `Based off <a href='https://tools.ietf.org/html/rfc6716'>RFC 6716</a>`,
    description: "A tool for dissecting Opus codec packets."
  },
  {
    chunkName: "stun",
    entry: "./src/inspectors/stun.tsx",
    title: "STUN Packet Inspector",
    subtitle: `Based off <a href="https://tools.ietf.org/html/rfc5389">RFC 5389</a>`,
    description: "A tool for dissecting STUN packets."
  },
  {
    chunkName: "rtp",
    entry: "./src/inspectors/rtp.tsx",
    title: "RTP Packet Inspector",
    subtitle: `Based off <a href="https://tools.ietf.org/html/rfc3550">RFC 3550</a>.`,
    description: "A tool for dissecting RTP packets."
  },
  {
    chunkName: "rtcp",
    entry: "./src/inspectors/rtcp.tsx",
    title: "RTCP Packet Inspector",
    description: "A tool for dissecting RTCP compound packets.",
    subtitle: ""
  },
  {
    chunkName: "png",
    entry: "./src/inspectors/png.tsx",
    title: "PNG Format Inspector",
    description: "A tool for inspecting PNG chunks.",
    subtitle: ""
  }
];

const ENTRIES = {};
const PLUGINS = [];

const GITHUB_ROOT =
  "https://github.com/rameshvarun/binary-inspector/blob/master/";

for (let inspector of INSPECTORS) {
  ENTRIES[inspector.chunkName] = inspector.entry;
  PLUGINS.push(
    new HtmlWebpackPlugin({
      template: "./src/inspector.html",
      filename: inspector.chunkName + "/index.html",
      chunks: [inspector.chunkName],
      templateParameters: {
        title: inspector.title,
        subtitle: inspector.subtitle,
        description: inspector.description,
        githubURL: url.resolve(GITHUB_ROOT, inspector.entry)
      }
    })
  );
}

PLUGINS.push(new CopyPlugin([{ from: "src/index.html", to: "index.html" }]));

const common = {
  entry: ENTRIES,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif|mp3)$/,
        use: ["file-loader"]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: PLUGINS,
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};

const development = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    https: true
  }
};

const production = {
  mode: "production"
};

module.exports = env => {
  if (env === "development") return merge(common, development);
  else if (env === "production") return merge(common, production);
  else {
    throw new Error(`Unknown environment ${env}.`);
  }
};
