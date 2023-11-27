// Header.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" elevation={0} className="w-full">
      <Toolbar className="justify-between">
        <Link to="/" className="text-gray-900 font-bold uppercase tracking-tight">
          XY college
        </Link>
        
        <div className="flex">
          <Button color="inherit" component={Link} to="/courses">
            Courses
          </Button>
          <Button color="inherit" component={Link} to="/students">
            Students
          </Button>
          <Button color="inherit" component={Link} to="/grades">
            Grades
          </Button>
          <Button color="inherit" component={Link} to="/analytics">
            Analytics
          </Button>
        </div>

        <div>
          <Button aria-controls="language-menu" aria-haspopup="true" onClick={handleMenu}>
            EN
          </Button>
          <Menu id="language-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>EN</MenuItem>
            <MenuItem onClick={handleClose}>FR</MenuItem>
          </Menu>
        </div>

        {/* <IconButton edge="end" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
