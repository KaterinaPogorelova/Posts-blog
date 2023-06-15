import { useState } from 'react';
import './menu.css';
import { Burger } from '../Burger/Burger';
import { MenuInput } from './MenuInput';
import { SelectedUser } from '../SelectedUser/SelectedUser';
import { Header } from '../Header/Header';
import { useAppSelector } from '../Store/store';

type Props = {
	defaultState?: boolean
}

export const Menu = ({ defaultState }: Props) => {
	const [btnState, setBtnState] = useState(!!defaultState)
	const isAuthorised = useAppSelector(((state) => state.auth.isAuthorised))

	return (
		<div className='menu__wrapper'>
			<div className='menu'>
				<Burger btnState={btnState} click={() => setBtnState(!btnState)} >
				</Burger>
				<MenuInput></MenuInput>
				<div className='menu__user-info'>
					{isAuthorised && <SelectedUser />}
				</div>
			</div>
			<Header menuState={btnState}></Header>
		</div>
	)
}