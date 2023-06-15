import { Link } from 'react-router-dom';
import { Title } from '../Title/Title';
import './authResult.css'
import { useAppSelector } from '../Store/store';

export const AuthResult = () => {
	const theme = useAppSelector((state) => state.theme.themeColor)
	const isAuthorised = useAppSelector((state) => state.auth.isAuthorised)
	return (
		<>
			<Title>{isAuthorised ? 'Congratulations' : 'Failure'}</Title>
			<div className='notification'>
				<p style={theme === 'light' ? { color: 'black' } : { color: 'white' }}>{isAuthorised ? 'You successfully entered your account!' : "Login or Password isn't correct. Try again!"}</p>
				<Link to={isAuthorised ? '/posts' : '/'}><button className='notification__button'>{isAuthorised ? 'Go to my posts' : 'Back'}</button></Link>
			</div>
		</>
	)
}