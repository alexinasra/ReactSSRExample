import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLayoutContext } from '../LayoutContext';

type layoutSideBarLinkProps = {
    icon: React.ReactNode
    label: string | React.ReactNode
    to?: string
    href?: string
}

export default function LayoutSideBarLink({
    icon,
    label,
    to,
    href
}: layoutSideBarLinkProps) {
    const { expanded, mouseOver } = useLayoutContext()

    return (      
    <ListItem  
        button component={Link} to={to} href={href}>
        <ListItemIcon>
            {icon}
        </ListItemIcon>
        {(expanded || mouseOver) && <ListItemText primary={label} />}
    </ListItem>
    )
}