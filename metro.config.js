const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: {
      'stream-browserify': require.resolve('stream-browserify'),
      stream: require.resolve('react-native-stream'),
      http: require.resolve('react-native-http'),
      https: require.resolve('react-native-http'),
      crypto: require.resolve('react-native-crypto'),
      events: require.resolve('events'),
      url: require.resolve('react-native-url-polyfill'),
      net: require.resolve('react-native-tcp'),
      tls: require.resolve('react-native-tcp'),
      zlib: require.resolve('browserify-zlib'),
      assert: require.resolve('assert'),
      util: require.resolve('util'),
      buffer: require.resolve('buffer'),
      process: require.resolve('process/browser'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
