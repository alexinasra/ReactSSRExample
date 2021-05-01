import layoutDefaultState from './LayoutDefaultState';

const EXPAND_SIDEBAR = 'expand-sidebar';
const SHRINK_SIDEBAR = 'shrink-sidebar';


function drawerFilter(state = layoutDefaultState.expandedSidebar, action) {
  if (action.type === EXPAND_SIDEBAR) {
    return true;
  }
  if (action.type === SHRINK_SIDEBAR) {
    return false;
  }
  return state;
}
export default function layoutReducer(
  state = {
    ...layoutDefaultState,
  },
  action,
) {
  if (action.type === INIT_LAYOUT) {
    return { ...action.initState };
  }
  return {
    expandedSidebar: drawerFilter(state.expandedSidebar, action),
  };
}

export function expandSidebarAction() {
  return {
    type: EXPAND_SIDEBAR,
  };
}
export function shrinkSidebarAction() {
  return {
    type: SHRINK_SIDEBAR,
  };
}
