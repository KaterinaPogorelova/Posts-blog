import './index.css';
import { Container } from './Container/Container';
import { Menu } from './Menu/Menu';
import { Navigation } from './Navigation/Navigation';
import { useAppSelector } from './Store/store';
import { Footer } from './Footer/Footer';

export const App = () => {
	const theme = useAppSelector((state) => state.theme.themeColor)
	return (
		<>
			<Menu defaultState></Menu>
			<div className='context__wrapper' style={theme === 'light' ? { background: 'rgb(238, 236, 236)' } : { background: 'rgb(36, 35, 35)' }}>
				<Container>
					<Navigation />
				</Container>
				<Footer></Footer>
			</div>
		</>
	)
}