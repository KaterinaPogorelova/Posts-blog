import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useState, useContext } from 'react';
import { ThemeContext, ChangeThemeContext } from './ThemeContext';
import { Container } from './Container/Container';
import { TaskNum } from './TaskNum/TaskNum';
import { Title } from './Title/Title';
import { Menu } from './Menu/Menu';
import { Tabs } from './Tabs/Tabs';
import { FullScreenCard } from './FullScreenCard/FullScreenCard';
import { CardsList } from './CardsList/CardsList';
import { Navigation } from './Navigation/Navigation';
import { Auth } from './Auth/Auth';
import { AuthResult } from './AuthResult/AuthResult';
import { Main } from './Main/Main';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './Store/store';
import { FullScreenImg } from './FullScreenImg/FullScreanImg';
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