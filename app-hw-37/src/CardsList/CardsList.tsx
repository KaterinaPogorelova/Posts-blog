import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Title } from '../Title/Title';
import { Card } from './Card';
import './card.css';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { getMyPostsThunk, getNextPageThunk, getPostsThunk, setLimit, setOrdering } from '../Store/post';
import { Tabs } from '../Tabs/Tabs';
import { Post } from '../getPosts';
import { Pagination } from '../Pagination/Pagination';
import { Link } from 'react-router-dom';

type Props = {
	showFullScreenCard: (id: number) => void,
	isFavourites?: boolean,
	isPopular?: boolean
}

export const CardsList = ({ showFullScreenCard, isFavourites, isPopular }: Props) => {
	const dispatch = useAppDispatch()
	const searchInputValue = useAppSelector((state) => state.search.searchValue)
	const limit = useAppSelector((state) => state.posts.limit)
	const ordering = useAppSelector((state) => state.posts.ordering)
	useEffect(() => { dispatch(getPostsThunk({ limit: limit, searchValue: searchInputValue })) }, [searchInputValue, limit, ordering])

	const postsList = useAppSelector((state) => state.posts.posts)
	const favourites = useAppSelector((state) => state.favsPosts.favPosts)
	const theme = useAppSelector((state) => state.theme.themeColor)
	const popularPosts = useAppSelector((state) => state.posts.popularPosts)
	const isLoading = useAppSelector((state) => state.posts.isLoading)

	if (isFavourites) {
		return (<>
			<Title>Favourites</Title>
			<Tabs tabs={[{ tabName: 'All', tabLink: '/posts' }, { tabName: 'My favourites', tabLink: '/favourites' }, { tabName: 'Popular', tabLink: '/popular' }]}></Tabs>
			<div className='cards-list' >
				{favourites.length === 0 ? <h3 className="post__title" style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Nothing is here</h3> : favourites.map((post: Post) => <Card key={post.id} cardinfo={post} showFullScreen={showFullScreenCard}></Card>)}
			</div>
		</>)
	}
	if (isPopular) {
		return (<>
			<Title>Popular</Title>
			<Tabs tabs={[{ tabName: 'All', tabLink: '/posts' }, { tabName: 'My favourites', tabLink: '/favourites' }, { tabName: 'Popular', tabLink: '/popular' }]}></Tabs>
			<div className='cards-list' >
				{popularPosts.length === 0 ? <h3 className="post__title" style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Nothing is here</h3> : popularPosts.map((post: Post) => <Card key={post.id} cardinfo={post} showFullScreen={showFullScreenCard}></Card>)}
			</div>
		</>)
	}

	return (<>
		<Title>{searchInputValue === '' ? 'Blog' : 'Search results "' + searchInputValue + '"'}</Title>
		<Tabs tabs={[{ tabName: 'All', tabLink: '/posts' }, { tabName: 'My favourites', tabLink: '/favourites' }, { tabName: 'Popular', tabLink: '/popular' }]}></Tabs>
		{isLoading && <h3 style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Loading...</h3>}
		<Link to='/onload' className='post__addPost'>Add Post +</Link>
		<div className='posts__sorting-wrapper'>
			<label className='posts__sorting-label' htmlFor="limit-select" style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Choose posts limit:</label>
			<select name="limit" id="limit-select" className='posts__sorting-select' style={theme === 'light' ? { background: 'white', color: 'rgb(75, 73, 73)' } : { background: '#423e3e', color: 'white' }} onChange={(e) => dispatch(setLimit(Number(e.target.value)))}>
				<option value="6" selected>6</option>
				<option value="12">12</option>
				<option value="18">18</option>
			</select>

			<label className='posts__sorting-label' htmlFor="order-select" style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Posts ordering by:</label>
			<select name="order" id="order-select" className='posts__sorting-select' style={theme === 'light' ? { background: 'white', color: 'rgb(75, 73, 73)' } : { background: '#423e3e', color: 'white' }} onChange={(e) => dispatch(setOrdering(e.target.value))}>
				<option value="">--Default--</option>
				<option value="date">Date</option>
				<option value="title">Title</option>
				<option value="text">Text</option>
				<option value="lesson_num">Lesson num</option>
			</select>
		</div >
		<div className='cards-list' >
			{postsList && !isLoading && postsList.length === 0 ? <h3 className="post__title" style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Nothing is here</h3> : postsList.map((post: Post) => <Card key={post.id} cardinfo={post} showFullScreen={showFullScreenCard}></Card>)}
		</div>
		{
			postsList && postsList.length >= limit && <Button variant='outlined' onClick={() => {
				dispatch(getPostsThunk({ limit: 6 + postsList.length, searchValue: searchInputValue }))
			}}>Show more</Button>
		}
		<Pagination></Pagination>
	</>)
}