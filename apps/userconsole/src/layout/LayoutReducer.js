import layoutDefaultState from './LayoutDefaultState';

const SET_THEME = 'set-theme';

const SET_DARK_THEME = 'set-dark-theme';
const SET_LIGHT_THEME = 'set-light-theme';
const TOGGLE_THEME = 'toggle-theme';

const EXPAND_SIDEBAR = 'expand-sidebar';
const SHRINK_SIDEBAR = 'shrink-sidebar';

function themeNameFilter(state = layoutDefaultState.themeName, action) {
  if (action.type === SET_THEME) {
    return action.themeName;
  }
  return state;
}

function themeModeFilter(state = layoutDefaultState.themeMode, action) {
  if (action.type === SET_DARK_THEME) {
    return 'dark';
  }
  if (action.type === SET_LIGHT_THEME) {
    return 'light';
  }
  if (action.type === TOGGLE_THEME) {
    return (state === 'light') ? 'dark' : 'light';
  }
  return state;
}

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
  return {
    expandedSidebar: drawerFilter(state.expandedSidebar, action),
    themeMode: themeModeFilter(state.themeMode, action),
    themeName: themeNameFilter(state.themeName, action),
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
export function setDarkMode() {
  return {
    type: SET_DARK_THEME,
  };
}
export function setLightMode() {
  return {
    type: SET_LIGHT_THEME,
  };
}
export function toggleThemeMode() {
  return {
    type: TOGGLE_THEME,
  };
}
export function setTheme(themeName) {
  return {
    type: SET_THEME,
    themeName,
  };
}
