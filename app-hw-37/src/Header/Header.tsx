import './header.css';
import { SelectedUser } from '../SelectedUser/SelectedUser';
import { Link } from 'react-router-dom';
import { ReactComponent as Light } from "./light-btn.svg";
import { ReactComponent as Dark } from "./dark-btn.svg";
import { useAppDispatch, useAppSelector } from '../Store/store';
import { changeTheme } from '../Store/theme';
import { checkMeThunk, handleLogOut } from '../Store/auth';

type Props = {
	menuState: boolean
}

export const Header = ({ menuState }: Props) => {
	const dispatch = useAppDispatch()
	const theme = useAppSelector((state) => state.theme.themeColor)
	dispatch(checkMeThunk())
	const isAuthorised = useAppSelector(((state) => state.auth.isAuthorised))

	return (
		<div style={theme === 'light' ? { background: 'white' } : { background: 'rgb(36, 35, 35)' }} className={'header' + (!menuState ? ' header--active' : '')}>
			{isAuthorised && <SelectedUser></SelectedUser>}
			<ul className='header__nav'>
				<Link to='/' className='nav__nav-link'><li className='nav__nav-item' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Home</li></Link>
				{isAuthorised && <Link to='posts' className='nav__nav-link'><li className='nav__nav-item' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Posts</li></Link>}
				{isAuthorised && <Link to='posts/my_posts' className='nav__nav-link'><li className='nav__nav-item' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>My Posts</li></Link>}
			</ul>
			<div className='other-compon-wrapper'>
				<div className='themes-btn-wrapper'>
					<button className='themes-btn' style={theme === 'light' ? { background: 'white' } : { background: 'rgb(36, 35, 35)' }} onClick={() => dispatch(changeTheme('light'))}><Light style={theme === 'light' ? { fill: 'gray' } : { fill: 'white' }} /></button>
					<button className='themes-btn' style={theme === 'light' ? { background: 'white' } : { background: 'rgb(36, 35, 35)' }} onClick={() => dispatch(changeTheme('dark'))}><Dark style={theme === 'dark' ? { fill: 'gray' } : { fill: 'black' }} /></button>
				</div>
				<Link to='/' className='auth-btn' onClick={() => isAuthorised && dispatch(handleLogOut())}>{isAuthorised ? 'Log Out' : 'Log In'}</Link>
			</div>
		</div>)
} 