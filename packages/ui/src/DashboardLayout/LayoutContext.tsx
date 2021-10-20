import React from 'react';

export interface SidebarToggleService {
  expanded: boolean
  mouseOver: boolean
  expandSidebar(): void
  shrinkSidebar(): void
  toggleSidebar(): void
  mouseOverSidebar(): void
  mouseOutSidebar(): void
}

const LayoutContext = React.createContext<SidebarToggleService>({
  expanded: true,
  mouseOver: false,
  expandSidebar: () => {},
  shrinkSidebar: () => {},
  toggleSidebar: () => {},
  mouseOverSidebar: () => {},
  mouseOutSidebar: () => {},
});
export default LayoutContext;

export function useLayoutContext(): SidebarToggleService {
  return React.useContext(LayoutContext);
}
