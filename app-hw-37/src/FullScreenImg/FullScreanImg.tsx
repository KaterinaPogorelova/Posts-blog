import { useAppSelector, useAppDispatch } from '../Store/store';
import { Link } from 'react-router-dom';
import './fullScreenImg.css';
import { listImages } from '../Store/post';

type Props = {
	id: number
}
export const FullScreenImg = ({ id }: Props) => {
	const dispatch = useAppDispatch()
	const post = useAppSelector((state) => state.posts.posts.find((post) => post.id === id))
	const img = useAppSelector((state) => state.posts.currentImg)

	if (!post) {
		return (<>
			<div className='dark-back'></div>
			<div className="fullScreen-wrapper">
				<Link to='/posts'><div className='close'></div></Link>
				<p>Post isn't found</p>
			</div>
		</>)
	}
	return (<>
		<div className='dark-back'></div>
		<div className="fullScreen-wrapper">
			<Link to='/posts'><div className='close'></div></Link>
			<div className='fullScreen__img-wrapper'>
				{post.image ? <img src={img} alt='post image' /> : <p>Image isn't found</p>}
			</div>
			<div className='fullScreen__btn fullScreen__next-btn' onClick={() => dispatch(listImages('next'))}></div>
			<div className='fullScreen__btn fullScreen__prev-btn' onClick={() => dispatch(listImages('prev'))}></div>
		</div>
	</>)
}