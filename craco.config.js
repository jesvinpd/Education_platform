const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.publicPath = 'auto';
      return webpackConfig;
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: 'notesApp',
          filename: 'remoteEntry.js',
          exposes: {
            './NotesApp': './src/App',
            './NotesList': './src/components/NotesList',
            './SemesterList': './src/components/SemesterList',
            './SubjectList': './src/components/SubjectList',
            './UploadNotes': './src/components/UploadNotes',
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
            "react-router-dom": {
              singleton: true,
              requiredVersion: "6.4.0",
              eager: true
            },
            axios: { singleton: true },
          },
        }),
      ],
    },
  },
};
