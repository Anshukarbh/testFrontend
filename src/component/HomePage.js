/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Header from './Header';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14
	}
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover
	},
	'&:last-child td, &:last-child th': {
		border: 0
	}
}));

function HomePage() {
	const [ data, setData ] = useState([]);
	const [ search, setSearch ] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		GetData();
		if (localStorage.getItem('isLoggedIn') === 'false') {
			navigate('/');
		}
	}, []);

	const GetData = () => {
		try {
			axios
				.get('http://mmb.karbh.com/api/v1/categories')
				.then((res) => {
					setData(res.data);
					setSearch(res.data);
					// console.log(res.data)
				})
				.catch((err) => {
					console.error('Get User data', err);
				});
		} catch (err) {
			console.log('GetUserData', err);
		}
	};

	const SearchHandle = (e) => {
		let key = e.target.value;
		console.log(key);
		console.log(search);
		const filteredRows = search.filter((item) => {
			var filterByName = item.name.toLowerCase().includes(key.toLowerCase());
			return filterByName;
		});
		if (key.length < 1) {
			GetData();
			setData(data);
		} else {
			setData(filteredRows);
		}
	};

	return (
		<div>
			<Header />
			<div className="searchdiv">
				<InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={SearchHandle} />
			</div>
			<TableContainer component={Paper}>
				<Table aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell align="cener">Sr no</StyledTableCell>
							<StyledTableCell align="cener">ID</StyledTableCell>
							<StyledTableCell align="cener">Name</StyledTableCell>
							<StyledTableCell align="cener">Image</StyledTableCell>
							<StyledTableCell align="cener">Created</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell component="th" scope="row">
									{index + 1}
								</StyledTableCell>
								<StyledTableCell align="left">{row.id}</StyledTableCell>
								<StyledTableCell align="left">{row.name}</StyledTableCell>
								<StyledTableCell align="left">
									<img src={row.image} alt="no img" width="50" height="50" />
								</StyledTableCell>
								<StyledTableCell align="left">{row.created_at.slice(0, 10)}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default HomePage;
