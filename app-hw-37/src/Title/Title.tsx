import React, { ReactNode } from 'react';
import './Title.css';
import { useAppSelector } from '../Store/store';

export const Title = (text: { children: string }) => {
	const theme = useAppSelector((state) => state.theme.themeColor)
	return (<h1 className='title' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>{text.children}</h1>)
}

