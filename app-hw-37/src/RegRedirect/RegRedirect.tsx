import { Title } from '../Title/Title';
import '../AuthResult/authResult.css';
import { useAppSelector } from '../Store/store';

export const RegRedirect = () => {
	const theme = useAppSelector((state) => state.theme.themeColor)
	return (
		<>
			<Title>Success!</Title>
			<div className='notification'>
				<p style={theme === 'light' ? { color: 'black' } : { color: 'white' }}>The activation link was sent to your email. Check it to continue.</p>
			</div>
		</>
	)
}