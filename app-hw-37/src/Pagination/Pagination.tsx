import './pagination.css'
import { useAppDispatch, useAppSelector } from '../Store/store';
import { getNextPageThunk, getPrevPageThunk } from '../Store/post';

export const Pagination = () => {
	const theme = useAppSelector((state) => state.theme.themeColor)
	const dispatch = useAppDispatch()
	const offset = useAppSelector((state) => state.posts.offset)
	const limit = useAppSelector((state) => state.posts.limit)
	const postsList = useAppSelector((state) => state.posts.posts)
	const isMine = useAppSelector((state) => state.posts.isMine)
	const myOffset = useAppSelector((state) => state.posts.myOffset)
	return (<>
		<div className='pagination'>
			{(isMine ? myOffset !== 0 : offset !== 0) && <button className='pagination__btn' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }} onClick={() => {
				dispatch(getPrevPageThunk())
			}}>←Prev</button>}
			{postsList.length >= limit && <button className='pagination__btn' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }} onClick={() => {
				dispatch(getNextPageThunk())
			}}>Next→</button>}
		</div></>)
}