import React from 'react';
import List from '@mui/material/List';

type layoutSideBarNav = {
    children: React.ReactNode
}

export default function LayoutSideBarNav({
    children
}: layoutSideBarNav) {
    return (
        <List>
            {children}
        </List>
    )
}