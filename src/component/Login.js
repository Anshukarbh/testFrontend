/* eslint-disable */

import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Typography from '@mui/material/Typography';

function Login() {
	const [ name, setName ] = useState('');
	const [ mobile, setMobile ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loginAndSignup, setLoginAndSignup ] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('isLoggedIn') === 'true') {
			navigate(localStorage.getItem('userUrl'));
		}
	}, []);

	const handleSignup = async () => {
		if (name === '') {
			alert('Please enter Name');
		} else if (mobile === '') {
			alert('Please enter mobile Number');
		} else if (password === '') {
			alert('Please enter Password');
		} else if (password.length < 8) {
			alert('password at least 8 character');
		} else if (!password.match(/^[0-9a-zA-Z]+$/)) {
			alert('Please enter only number and character');
		} else {
			try {
				let newuser = {
					name: name,
					mobile: mobile.slice(-10),
					password: password
				};

				axios
					.post(`http://localhost:8001/register`, newuser)
					.then((res) => {
						console.log('new user registered successfuly');
						console.log(res);
						localStorage.setItem('user', res.data.result.name);
						localStorage.setItem('token', res.data.auth);
						localStorage.setItem('isLoggedIn', true);
						localStorage.setItem('userUrl', 'homepage');
						setName('');
						setMobile('');
						setPassword('');
						navigate('/homepage');
					})
					.catch((err) => {
						console.log('errer in signUp new user', err);
					});
			} catch (err) {
				console.log('errer in signUp new user', err);
			}
		}
	};

	const handleLogin = async () => {
		if (mobile === '') {
			alert('Please enter mobile Number');
		} else if (password === '') {
			alert('Please enter Password');
		} else if (password.length < 8) {
			alert('password at least 8 character');
		} else if (!password.match(/^[0-9a-zA-Z]+$/)) {
			alert('Please enter only number and character');
		} else {
			try {
				let loginuser = {
					mobile: mobile.slice(-10),
					password: password
				};

				axios
					.post(`http://localhost:8001/login`, loginuser)
					.then((res) => {
						if (res.data.user.name) {
							console.log('login successfuly');
							localStorage.setItem('user', res.data.user.name);
							localStorage.setItem('token', res.data.auth);
							localStorage.setItem('isLoggedIn', true);
							localStorage.setItem('userUrl', 'homepage');
							setMobile('');
							setPassword('');
							navigate('/homepage');
						} else {
							alert(res.data.result);
							setMobile('');
							setPassword('');
						}
					})
					.catch((err) => {
						alert('no user Found please enter correct details', err);
					});
			} catch (err) {
				console.log('errer in login', err);
			}
		}
	};

	return (
		<div className="background_img">
			{/* Login */}
			{loginAndSignup ? (
				<div className="form-div">
					<div className="form-page">
						<Paper elevation={3} className="form-paper">
							<Grid container spacing={3} direction={'column'} alignItems={'center'}>
								<Typography>
									<h2>New Login</h2>
								</Typography>
								<Grid item xs={12}>
									<PhoneInput
										enableTerritories
										enableAreaCodes
										enableSearch
										country={'in'}
										inputClass="input_phoneInput"
										containerClass="Container_phoneInput"
										value={mobile}
										onChange={(e) => setMobile(e)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label="Passwords"
										// variant="outlined"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button variant="contained" endIcon={<LoginIcon />} onClick={() => handleLogin()}>
										Login
									</Button>
								</Grid>
								<Grid item xs={12}>
									<Typography>
										Don't have account?
										<Button
											variant="text"
											onClick={() => {
												setLoginAndSignup(!loginAndSignup);
												console.log(loginAndSignup);
											}}
										>
											SignUp
										</Button>
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</div>
				</div>
			) : (
				<div className="form-div">
					<div className="form-page">
						<Paper elevation={3} className="form-paper">
							<Grid container spacing={3} direction={'column'} alignItems={'center'}>
								<Typography>
									<h2>New SignUp</h2>
								</Typography>
								<Grid item xs={12}>
									<TextField
										label="Name"
										variant="outlined"
										type="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<PhoneInput
										enableTerritories
										enableAreaCodes
										enableSearch
										country={'in'}
										inputClass="input_phoneInput"
										containerClass="Container_phoneInput"
										value={mobile}
										onChange={(e) => setMobile(e)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label="password"
										variant="outlined"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant="contained"
										color="primary"
										onClick={() => handleSignup()}
										endIcon={<PersonAddAltIcon />}
									>
										SignUp
									</Button>
								</Grid>
								<Grid item xs={12}>
									<Typography>
										Already have Account
										<Button
											variant="text"
											onClick={() => {
												setLoginAndSignup(!loginAndSignup);
											}}
										>
											Login
										</Button>
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</div>
				</div>
			)}
		</div>
	);
}

export default Login;
