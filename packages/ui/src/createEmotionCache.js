import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl';



export default function createEmotionCache(dir="ltr") {
  const plugins = [];
  if(dir === 'rtl') {
    plugins.push(rtlPlugin);
  }
  return createCache({
    key: 'css',
    stylisPlugins: plugins,
  });
}
