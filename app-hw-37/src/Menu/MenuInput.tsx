import { useState } from 'react';
import { useAppDispatch } from '../Store/store';
import { setSearchValue } from '../Store/search';
import { ReactComponent as MagnGlass } from "./MagnGlass.svg"

export const MenuInput = () => {
	const dispatch = useAppDispatch()
	const [searchInputValue, setSearchInputValue] = useState('')

	return (<>
		<input type="search" className='menu__search-input' placeholder='Search...' value={searchInputValue} onChange={(event) => {
			setSearchInputValue(event.target.value)
			dispatch(setSearchValue(event.target.value))
		}} />
		<button className='menu__btn' type="submit" onClick={() => dispatch(setSearchValue(searchInputValue))}>
			<MagnGlass />
		</button>
	</>)
}