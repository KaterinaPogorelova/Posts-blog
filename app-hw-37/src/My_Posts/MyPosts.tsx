import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Title } from '../Title/Title';
import { Card } from '../CardsList/Card';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { getMyPostsThunk, getNextPageThunk, getPostsThunk, setLimit, setOrdering, setMyOrdering } from '../Store/post';
import { Tabs } from '../Tabs/Tabs';
import { Post } from '../getPosts';
import { Pagination } from '../Pagination/Pagination';
import { Link } from 'react-router-dom';

type Props = {
	showFullScreenCard: (id: number) => void,
}

export const MyPosts = ({ showFullScreenCard }: Props) => {
	const dispatch = useAppDispatch()
	const searchInputValue = useAppSelector((state) => state.search.searchValue)
	const myOrdering = useAppSelector((state) => state.posts.myOrdering)
	useEffect(() => { dispatch(getMyPostsThunk({ limit: 6 })) }, [searchInputValue, myOrdering])

	const postsList = useAppSelector((state) => state.posts.posts)
	const theme = useAppSelector((state) => state.theme.themeColor)
	const isLoading = useAppSelector((state) => state.posts.isLoading)

	return (<>
		<Title>{searchInputValue === '' ? 'My Posts' : 'Search results "' + searchInputValue + '"'}</Title>
		{isLoading && <h3 style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Loading...</h3>}
		<Link to='/onload' className='post__addPost'>Add Post +</Link>
		<div className='posts__sorting-wrapper'>

			<label className='posts__sorting-label' htmlFor="order-select" style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Posts ordering by:</label>
			<select name="order" id="order-select" className='posts__sorting-select' style={theme === 'light' ? { background: 'white', color: 'rgb(75, 73, 73)' } : { background: '#423e3e', color: 'white' }} onChange={(e) => dispatch(setMyOrdering(e.target.value))}>
				<option value="id" selected>--Default--</option>
				<option value="date">Date</option>
				<option value="title">Title</option>
				<option value="text">Text</option>
				<option value="lesson_num">Lesson num</option>
			</select>
		</div >
		<div className='cards-list' >
			{postsList && !isLoading && postsList.length === 0 ? <h3 className="post__title" style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Nothing is here</h3> : postsList.map((post: Post) => <Card key={post.id} cardinfo={post} showFullScreen={showFullScreenCard}></Card>)}
		</div>
		<Pagination></Pagination>
	</>)
}