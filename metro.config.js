const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const customConfig = {
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    ...defaultConfig.resolver,
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    extraNodeModules: {
      ...defaultConfig.resolver.extraNodeModules,
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

const config = mergeConfig(defaultConfig, customConfig);

module.exports = withNativeWind(config, {
  input: './global.css',
});
