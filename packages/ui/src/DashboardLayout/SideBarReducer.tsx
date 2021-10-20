

enum SidebarActions {
  EXPAND = "expand",
  SHRINK = "shrink",
  TOGGLE = "toggle",
  MOUSE_OVER = "mouseover",
  MOUSE_OUT = "mouseout",
}

export type SidebarState = {
  expanded: boolean,
  mouseOver: boolean
}

export default function SideBarReducer(state: SidebarState = {
  expanded: true,
  mouseOver: false
}, type: SidebarActions): SidebarState {
  switch(type) {
    case SidebarActions.EXPAND: {
      return {
        expanded: true,
        mouseOver: state.mouseOver
      };
    }
    case SidebarActions.SHRINK: {
      return {
        expanded: false,
        mouseOver: state.mouseOver
      };
    }
    case SidebarActions.TOGGLE: {
      return {
        expanded: !state.expanded,
        mouseOver: state.mouseOver
      };
    }
    case SidebarActions.MOUSE_OVER: {
      return {
        expanded: state.expanded,
        mouseOver: true
      };
    }
    case SidebarActions.MOUSE_OUT: {
      return {
        expanded: state.expanded,
        mouseOver: false
      };
    }
    default:
      return state;
  }
}

export function expandSidebarAction() {
  return SidebarActions.EXPAND;
}
export function shrinkSidebarAction() {
  return SidebarActions.SHRINK
}
export function toggleSidebarAction() {
  return SidebarActions.TOGGLE
}
export function mouseOverSidebarAction() {
  return SidebarActions.MOUSE_OVER
}

export function mouseOutSidebarAction() {
  return SidebarActions.MOUSE_OUT
}
