/** @format */

import React, { useState } from 'react';
import './style.css';
import { TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import swal from "sweetalert";
import axios from 'axios';

function Reset(props) {
  const history = useHistory();
  var [error, setError] = useState(null);
	const ResetSubmit =async  (e) => {
		e.preventDefault();
	
	await fetch('http://localhost:8000/api/reset',{
	method:'POST',
  headers:{'Content-Type':'application/json'},
  body: JSON.stringify(
    {
      token:props.match.params.token,
    }
  )
  

		});
	setError('Vérifiez votre email, vous obtiendrez le nouveau mot de passe');
	}

	return (
		<div>
			<div className='card w-50 mt-5 mx-auto box '>
				<h5 className='card-header p-4'>
					{' '}
					<b>Retrouvez votre compte</b>
				</h5>
				<div className='card-body p-4'>
        <h4 className='p-2 text-success'>{error}</h4>
					<h5 
					className={error == null
					
						? ' card-title p-2 '
						: 'card-title p-2 d-none'
				}>
						cliquez sur le bouton Modifier pour recevoir un e-mail avec un nouveau mot de passe.
					</h5>
					<div 
						className={error == null
					
							? ' m-3 '
							: 'm-3 d-none'
					}>
						<button
							onClick={ResetSubmit}
							type='submit'
							className='btn btn-primary'>
							Modifier
						</button>
						<Link to='/login' className='btn btn-danger ms-2'>
							Anuuler{' '}
						</Link>
					</div>
					<div 
						className={error == null
					
							? ' m-3 d-none '
							: 'm-3'
					}>
					<Link to='/login' className='btn btn-primary '>
					aller à la page de connexion{' '}
						</Link>
						</div>
				</div>
			</div>
		</div>
	);
}

export default withRouter(Reset);
