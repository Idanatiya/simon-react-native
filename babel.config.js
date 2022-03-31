module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['tsx', 'ts'],
        alias: {
          app: './src/app',
          components: './src/components',
          types: './src/types',
          constants: './src/constants',
          screens: './src/screens',
          styles: './src/styles',
          utils: './src/utils',
          router: './src/router',
          hooks: './src/hooks',
          assets: './src/assets',
        },
      },
    ],
  ],
};
