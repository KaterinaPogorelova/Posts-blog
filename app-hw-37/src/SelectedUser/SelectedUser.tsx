import './selectedUser.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { checkMeThunk } from '../Store/auth';

export const SelectedUser = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(checkMeThunk())
	}, [])
	const login = useAppSelector((state) => state.auth.userLogin)
	return (
		<div className='header__selected-user'>
			<div className='selected-user__icon'>{login && login[0]}</div>
			<p className='selected-user__name'>{login && login}</p>
		</div>
	)
}