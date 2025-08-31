import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Tooltip,
} from '@mui/material';
import {
    DirectionsCar as ParkingIcon,
    People as UsersIcon,
    Place as StopsIcon,
    Assessment as ReportsIcon,
    Logout as LogoutIcon,
    Dashboard as DashboardIcon,
    ChatBubbleOutline as MessagesIcon,
    Star as StarIcon,
    MarkEmailUnread as MarkEmailUnreadIcon,
    Commute as CommuteIcon,
    Announcement as AnnouncementIcon
} from '@mui/icons-material';

import "./AdminSidebar.css"
import axios from "axios";


const AdminSidebarContainer = styled('div')(({ theme, expanded }) => ({
    width: expanded ? '250px' : '64px',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
}));

const AdminSidebar = ({setUser,setIsAdmin,setToken,expanded,setExpanded}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { text: 'View Parkings', icon: <ParkingIcon />, path: '/admin/parkings' },
        { text: 'View Parking Users', icon: <UsersIcon />, path: '/admin/parkingusers' },
        { text: 'View BRTS Stops', icon: <StopsIcon />, path: '/admin/stops' },
        { text: 'View Reports', icon: <ReportsIcon />, path: '/admin/reports' },
        // { text: 'View Messages', icon: <MessagesIcon  />, path: '/admin/messages' },
        { text: 'View Ratings', icon: <StarIcon />, path: '/admin/ratings' },
        { text: 'View Requests', icon: <MarkEmailUnreadIcon />, path: '/admin/requests' },
        { text: 'View Rides', icon: <CommuteIcon  />, path: '/admin/rides' },
        { text: 'View Announcements', icon: <AnnouncementIcon  />, path: '/admin/announcements' },
    ];

    const handleLogout = async () => {
        try {
            await axios.post('/api/users/logout', { withCredentials: true });
        } catch (error) {
            console.error('Logout API call failed:', error);
            // Optionally, show a message or handle failure
        }
        localStorage.removeItem("token");
        setUser(null);
        setIsAdmin(false);
        setToken(null);
        // useAuth.logout();
        navigate("/");
    };
    return (

        <AdminSidebarContainer
            className="adminSidebar-container"
            expanded={expanded}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            <List className="adminSidebar-list">
                {navItems.map((item) => (
                    <ListItem
                        key={item.text}
                        disablePadding
                        className={`adminSidebar-item ${location.pathname === item.path ? 'adminSidebar-active' : ''}`}
                    >
                        <Tooltip title={!expanded ? item.text : ''} placement="right">
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                className="adminSidebar-button"
                                sx={{
                                    minHeight: '48px',
                                    justifyContent: expanded ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: expanded ? 2 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        opacity: expanded ? 1 : 0,
                                        transition: 'opacity 0.3s ease',
                                        whiteSpace: 'nowrap'
                                    }}
                                />
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
            <Divider className="adminSidebar-divider" />
            <List className="adminSidebar-list">
                <ListItem disablePadding className="adminSidebar-item">
                    <Tooltip title={!expanded ? 'Logout' : ''} placement="right">
                        <ListItemButton className="adminSidebar-button" onClick={handleLogout}>
                            <ListItemIcon className="adminSidebar-icon">
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Logout"
                                className="adminSidebar-text"
                                sx={{ opacity: expanded ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </Tooltip>
                </ListItem>
            </List>
        </AdminSidebarContainer>
    );
};

export default AdminSidebar;