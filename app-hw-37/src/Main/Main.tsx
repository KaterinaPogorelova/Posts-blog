import { useState } from 'react';
import { CardsList } from '../CardsList/CardsList';
import { MyPosts } from '../My_Posts/MyPosts';
import { FullScreenCard } from '../FullScreenCard/FullScreenCard';
import { FullScreenImg } from '../FullScreenImg/FullScreanImg';
import { Routes, Route } from 'react-router-dom';

type Post = {
	id: number,
	image?: string,
	text: string,
	date: string,
	lesson_num: number,
	title: string,
	description: string,
	author: number
}

export const Main = () => {
	const [fullScreenPostId, setFullScreenPostId] = useState(0)

	return (<>
		<Routes>
			<Route path='/'>
				<Route index element={<CardsList showFullScreenCard={(postId: number) => setFullScreenPostId(postId)}></CardsList>}></Route>
				<Route path='favourites' element={<CardsList isFavourites showFullScreenCard={(postId: number) => setFullScreenPostId(postId)}></CardsList>}></Route>
				<Route path='popular' element={<CardsList isPopular showFullScreenCard={(postId: number) => setFullScreenPostId(postId)}></CardsList>}></Route>
				<Route path=':postId' element={<FullScreenCard />}></Route>
				<Route path='img' element={<FullScreenImg id={fullScreenPostId} />}></Route>
				<Route path='my_posts' element={<MyPosts showFullScreenCard={(postId: number) => setFullScreenPostId(postId)}></MyPosts>}></Route>
			</Route>
		</Routes>
	</>)
}