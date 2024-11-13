import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function NavBar() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}><NavLink to="/forecast">forecast</NavLink></MenuItem>
                        <MenuItem onClick={handleClose}><NavLink to="/graph">Graph</NavLink></MenuItem>
                        <MenuItem onClick={handleClose}><NavLink to="/table">Table</NavLink></MenuItem>
                        <MenuItem onClick={handleClose}><NavLink to="/matrix">Matrix</NavLink></MenuItem>
                    </Menu>
                    <Typography variant="h6" color="inherit" component="div">
                    💲  Dollar Exchange Rate
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

