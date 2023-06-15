import { Title } from '../Title/Title';
import '../AuthResult/authResult.css';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react"
import { getActivated } from '../Store/auth';

export const Activate = () => {
	const dispatch = useAppDispatch()
	const theme = useAppSelector((state) => state.theme.themeColor)
	const { uid, token } = useParams();
	useEffect(() => {
		uid && token && dispatch(getActivated({ uid, token }))
	}, [uid, token])
	const isActivated = useAppSelector((state) => state.auth.isActivated)
	return (<>
		<>
			<Title>{isActivated ? 'Success' : 'Error'}</Title>
			<div className='notification'>
				<p style={theme === 'light' ? { color: 'black' } : { color: 'white' }}>{isActivated ? "Your account was succesfully activated!" : "Oops,something's gone wrong!Your account's probably already activated"}</p>
				<Link to={'/'}><button className='notification__button'>Go to Home Page</button></Link>
			</div>
		</>
	</>)
}