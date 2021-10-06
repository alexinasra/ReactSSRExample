import React from 'react';
import { makeVar, useV } from '@apollo/client';

import layoutDefaultState from './LayoutDefaultState';

const expandedVar = makeVar(true);

const LayoutContext = React.createContext({
  state: {expandedSidebar: expandedVar()},
  expandSidebar: () => expandedVar(true),
  shrinkSidebar: () => expandedVar(false),
  toggleSidebar: () => expandedVar(!expandedVar()),
});
export default LayoutContext;

export function useLayoutContext() {
  return React.useContext(LayoutContext);
}
