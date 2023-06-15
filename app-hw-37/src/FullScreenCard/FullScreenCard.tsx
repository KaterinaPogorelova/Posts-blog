import './fullScreenCard.css';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { Likes } from '../Likes/Likes';
import { Mark } from '../CardsList/Card';
import { removeFromFavourites, setFavourites } from '../Store/favorites';
import { setPostsIds } from '../Store/post';

export const FullScreenCard = () => {
	const params = useParams()
	const dispatch = useAppDispatch()

	const post = useAppSelector((state) => state.posts.posts.find((post) => String(post.id) === params.postId))
	const theme = useAppSelector((state) => state.theme.themeColor)
	const favourite = useAppSelector((state) => state.favsPosts.favPosts.find((postCard) => {
		if (post) {
			return postCard.id === post.id
		}
	}))
	dispatch(setPostsIds(post ? post.id : 0))
	const nextId = useAppSelector((state) => state.posts.nextId)
	const prevId = useAppSelector((state) => state.posts.prevId)
	if (!post) {
		return <h2>Post not found</h2>
	}
	return (<>
		<Link to={'/posts'}><button className='back-btn'>← Back to posts</button></Link>
		<div className='card' id={String(post.id)}>
			<h2 className='card__title' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>{post.title}</h2>
			<p className='card__date'>{post.date}</p>
			<div className='card__img-wrapper'>
				<img src={post.image} alt={post.text} />
			</div>
			<div className='card__text'>
				<p className='card__desc'>{post.description}</p>
				<p className='card__author' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Author: {post.author} {post.text}</p>
			</div>
			<div className='fullScreen__marks'>
				<Likes postId={post.id}></Likes>
				<button className='fullScreen__favmark-wrapper' onClick={() => {
					favourite ? dispatch(removeFromFavourites(post)) : dispatch(setFavourites(post))
				}}><Mark style={favourite ? { fill: 'green' } : { fill: 'black' }} /><p style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Add to favourites</p></button>
			</div>
		</div>
		<div className={!prevId ? 'fullScreen__nav--next-only' : 'fullScreen__nav'}>
			{prevId && <Link to={'/posts/' + String(prevId)} className='nav__link'>
				<span className='nav__arrow' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>←</span>
				<div className='nav__text'>
					<p className='nav__name' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Prev</p>
					<p className='nav__post'>{'Post #' + String(prevId)}</p>
				</div>
			</Link>}
			{nextId && <Link to={'/posts/' + String(nextId)} className='nav__link'>
				<span className='nav__arrow' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>→</span>
				<div className='nav__text'>
					<p className='nav__name' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Next</p>
					<p className='nav__post'>{'Post #' + String(nextId)}</p>
				</div>
			</Link>}
		</div>
	</>)
}