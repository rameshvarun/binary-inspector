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
    description: "A web-based tool for dissecting Opus codec packets."
  },
  {
    chunkName: "stun",
    entry: "./src/inspectors/stun.tsx",
    title: "STUN Packet Inspector",
    subtitle: `Based off <a href="https://tools.ietf.org/html/rfc5389">RFC 5389</a>`,
    description: "A web-based tool for dissecting STUN packets."
  },
  {
    chunkName: "rtp",
    entry: "./src/inspectors/rtp.tsx",
    title: "RTP Packet Inspector",
    subtitle: `Based off <a href="https://tools.ietf.org/html/rfc3550">RFC 3550</a>.`,
    description: "A web-based tool for dissecting RTP packets."
  },
  {
    chunkName: "rtcp",
    entry: "./src/inspectors/rtcp.tsx",
    title: "RTCP Packet Inspector",
    description: "A web-based tool for dissecting RTCP compound packets.",
    subtitle: ""
  },
  {
    chunkName: "png",
    entry: "./src/inspectors/png.tsx",
    title: "PNG Format Inspector",
    description: "A web-based tool for inspecting PNG chunks.",
    subtitle: ""
  },
  {
    chunkName: "ogg",
    entry: "./src/inspectors/ogg.tsx",
    title: "Ogg Format Inspector",
    description: "A web-based tool for inspecting Ogg files.",
    subtitle: `Based off <a href="https://tools.ietf.org/html/rfc3533">RFC 3533</a>`
  },
  {
    chunkName: "bmff",
    entry: "./src/inspectors/bmff.tsx",
    title: "ISO BMFF Format Inspector",
    description: "A web-based tool for inspecting ISO BMFF files.",
    subtitle: `Based off of ISO standard.`
  },
  {
    chunkName: "ulpfec",
    entry: "./src/inspectors/ulpfec.tsx",
    title: "ULPFEC Inspector",
    description: "A web-based tool for inspecting ulpfec payloads.",
    subtitle: `Based off of RFC 5109.`
  },
  {
    chunkName: "riff",
    entry: "./src/inspectors/riff.tsx",
    title: "RIFF Container Inspector",
    description: "A web-based tool for inspecting RIFF container files.",
    subtitle: `Based off of Multimedia Programming Interface and Data Specifications 1.0.`
  },
  {
    chunkName: "q3bsp",
    entry: "./src/inspectors/q3bsp.tsx",
    title: "Quake 3 BSP Inspector",
    description: "A web-based tool for inspecting Quake 3 BSP files.",
    subtitle: ``
  },
  {
    chunkName: "pak",
    entry: "./src/inspectors/pak.tsx",
    title: "Quake PAK Inspector",
    description: "A web-based tool for inspecting Quake PAK files.",
    subtitle: ``
  },
  {
    chunkName: "msgpack",
    entry: "./src/inspectors/msgpack.tsx",
    title: "Msgpack Inspector",
    description: "A web based tool for inspecting msgpack payloads.",
    subtitle: `Based off of the <a href='https://github.com/msgpack/msgpack/blob/master/spec.md'>Msgpack Spec</a>`
  },
  {
    chunkName: "custom",
    entry: "./src/inspectors/custom.tsx",
    title: "Custom Data Inspector",
    description: "",
    subtitle: ``
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
