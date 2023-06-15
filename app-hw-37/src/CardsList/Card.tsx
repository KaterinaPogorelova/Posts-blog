import './card.css';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { Link } from 'react-router-dom';
import { setCurrentImg } from '../Store/post';
import { Likes } from '../Likes/Likes';
import { ReactComponent as Mark } from "./bookmark.svg"
import { removeFromFavourites, setFavourites } from '../Store/favorites';

type PostCard = {
	id: number,
	image?: string,
	text: string,
	date: string,
	lesson_num: number,
	title: string,
	description: string,
	author: number,
	likes?: number,
	dislikes?: number
}

type Cardprops = {
	cardinfo: PostCard,
	showFullScreen: (id: number) => void
}

export const Card = ({ cardinfo, showFullScreen }: Cardprops) => {
	const favourites = useAppSelector((state) => state.favsPosts.favPosts)
	const favourite = favourites.find((post) => post.id === cardinfo.id)
	const dispatch = useAppDispatch()
	const theme = useAppSelector((state) => state.theme.themeColor)

	return (
		<div className='post' onClick={() => showFullScreen(cardinfo.id)} style={theme === 'light' ? { background: 'white' } : { background: '#423e3e' }}>
			<Link to={'/posts/' + cardinfo.id} className='card-item'>
				{cardinfo.image && <div className="post__img-wrapper">
					{/* @ts-ignore */}
					<Link to='/posts/img'><img src={cardinfo.image} alt={cardinfo.text} onClick={() => dispatch(setCurrentImg(cardinfo.image))} /></Link>
				</div>}
				<div className="post__text">
					<p className="post__date">{cardinfo.date}</p>
					<h3 className="post__title" style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>{cardinfo.title}</h3>
					<p className='post__desc'>{cardinfo.description}</p>
					<p className='post__author' style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>Author: {cardinfo.author} {cardinfo.text}</p>
				</div>
			</Link>
			<div className='post__marks'>
				<Likes postId={cardinfo.id}></Likes>
				<div className='post__favmark-wrapper'><Mark style={favourite ? { fill: 'green' } : { fill: 'black' }} onClick={() => {
					favourite ? dispatch(removeFromFavourites(cardinfo)) : dispatch(setFavourites(cardinfo))
				}} /></div>
			</div>
		</div>
	)
}

export { Mark }