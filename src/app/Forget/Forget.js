/** @format */

import React, { useState } from 'react';
import './style.css';
import { TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Forget(props) {
	var [error, setError] = useState(null);
	var [erreur, setErreur] = useState(null);
	var [forgetValue, setforgetValue] = useState({
		email: '',
		error_list: [],
	});
	const handleInput = (e) => {
		e.preventDefault();
		setforgetValue({ ...forgetValue, [e.target.name]: e.target.value });
	};

	const ForgetSubmit = (e, props) => {
		e.preventDefault();

		const data = {
			email: forgetValue.email,
		};
		console.log(data);
		axios.post('api/forget', data).then((Response) => {
			if (Response.status == 200) {
				setError(Response.data.message);
				setErreur(Response.data.erreur)

				console.log(Response);
			} else if (Response.status == 500) {
				console.log('eeee');
			}
		});
	};

	return (
		<div>
			<div class='card w-50 mt-5 mx-auto box '>
				<h5 class='card-header p-4'>
					{' '}
					<b>Retrouvez votre compte</b>
				</h5>
				<div class='card-body p-4'>
				<h5 className='p-2 text-danger'>{erreur}</h5>
					<h4 className='p-2 text-success'>{error}</h4>
					<form onSubmit={ForgetSubmit} methode='POST'>
						<h5
							className={
								error == null ? ' card-title  ' : 'card-title p-2 d-none'
							}>
							Veuillez entrer votre adresse e-mail pour rechercher votre compte
							.
						</h5>

						<div
							className={
								error == null
									? ' form-group mb-3 p-2 '
									: 'form-group mb-3 p-2 d-none'
							}>
							<input
								id='email'
								name='email'
								value={forgetValue.email}
								onChange={handleInput}
								margin='normal'
								placeholder='Adresse e-mail '
								type='email'
								className='form-control'
								required
							/>
							<span className='text-danger'></span>
						</div>
						<div className={error == null ? ' m-3' : 'm-3 d-none'}>
							<button to='#' className='btn btn-primary' type='submit'>
								Rechercher
							</button>
							<Link to='/login' className='btn btn-danger ms-2'>
								Anuuler{' '}
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default withRouter(Forget);
