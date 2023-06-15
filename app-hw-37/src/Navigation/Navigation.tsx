import { Routes, Route } from 'react-router-dom';
import { Auth } from '../Auth/Auth';
import { AuthResult } from '../AuthResult/AuthResult';
import { Main } from '../Main/Main';
import { Registration } from '../Registration/Registration';
import { RegRedirect } from '../RegRedirect/RegRedirect';
import { Activate } from '../Activate/Activate';
import { Onload } from '../Onload/Onload';

export const Navigation = () => {
	return <>
		<Routes>
			<Route index element={<Auth></Auth>}></Route>
			<Route path='//activate/:uid/:token' element={<Activate></Activate>}></Route>
			<Route path='redirect' element={<RegRedirect></RegRedirect>}></Route>
			<Route path='success' element={<AuthResult />}></Route>
			<Route path='fail' element={<AuthResult />}></Route>
			<Route path='registration' element={<Registration></Registration>}></Route>
			<Route path='posts/*' element={<Main />}></Route>
			<Route path='onload' element={<Onload></Onload>}></Route>
		</Routes>
	</>
}