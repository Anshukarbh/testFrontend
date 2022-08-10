import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header() {
	const [ name, setName ] = useState('');
	const [ anchorEl, setAnchorEl ] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
        setName(localStorage.getItem('user'))
    }, []);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const SignOut = () => {
		localStorage.clear();
		navigate('/');
	};

	return (
		<div className="headerDiv">
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							className="menuIconBtn"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon className="menuIconBtn" />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Karbh it Soluation
						</Typography>

						<Button color="inherit" className="userIconBtn" onClick={handleClick}>
							<AccountCircleIcon className="userIcon" />
							{name}
						</Button>
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={SignOut}>Logout</MenuItem>
						</Menu>
					</Toolbar>
				</AppBar>
			</Box>
		</div>
	);
}

export default Header;
