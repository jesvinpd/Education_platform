const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.publicPath = "auto";
       webpackConfig.module.rules.push({
         test: /\.txt$/,
         use: "raw-loader",
       });
      return webpackConfig;
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "host",
          remotes: {
            notesApp: "notesApp@http://localhost:2000/remoteEntry.js",
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: "^18.2.0",
            },
            "react-dom": {
              singleton: true,
              requiredVersion: "^18.2.0",
            },
            axios: { singleton: true },
          },
        }),
      ],
    },
  },
};
