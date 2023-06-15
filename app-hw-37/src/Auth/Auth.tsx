import { useState } from 'react';
import { Title } from '../Title/Title';
import './auth.css'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { handleAuthThunk } from '../Store/auth';
import Button from '@mui/material/Button';
import useUpdateEffect from '../customHooks';

export const Auth = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const theme = useAppSelector((state) => state.theme.themeColor)
	const isAuthorised = useAppSelector((state) => state.auth.isAuthorised)
	useUpdateEffect(() => { isAuthorised ? navigate('/success') : navigate('/fail') }, [isAuthorised])
	return (
		<>
			<Title>Sign In</Title>
			<form className='auth'>
				<label className="auth__label" htmlFor='email' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Email</label>
				<input className="auth__input" type="email" id="email" placeholder='Your Email' value={email} onChange={(event) => setEmail(event.target.value)} />
				<label className="auth__label" htmlFor='password' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Password</label>
				<input className="auth__input" type="password" id="password" placeholder='Your Password' value={password} onChange={(event) => setPassword(event.target.value)} />
				<button className="auth__button" type="submit" value="Submit" onClick={(e) => {
					e.preventDefault()
					dispatch(handleAuthThunk({ email, password }))
				}}>Submit</button>
			</form>
			<div className='reg__link'>
				<p style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Don't have an account?</p>
				<Button variant='outlined' href='/registration'>Sign Up</Button>
			</div>
		</>)
}