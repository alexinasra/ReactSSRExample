import React from 'react';
import layoutDefaultState from './LayoutDefaultState';

const LayoutContext = React.createContext({
  state: { ...layoutDefaultState },
  expandSidebar: () => {},
  shrinkSidebar: () => {},
});
export default LayoutContext;

export function useLayoutContext() {
  return React.useContext(LayoutContext);
}
