import { Platform } from 'react-native';
import { WebView as RNWebView } from 'react-native-webview';

export default function WebView() {
  const isAndroid = Platform.OS === 'android';
  const sourceUri = (isAndroid ? 'file:///android_asset/' : '') + 'Web.bundle/index.html';

  return <RNWebView source={{ uri: sourceUri }} />;
}
