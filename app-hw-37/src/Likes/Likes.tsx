import { useAppDispatch, useAppSelector } from '../Store/store';
import { increaseDislikes, increaseLikes } from '../Store/post';
import { ReactComponent as Like } from "./like.svg"
import { ReactComponent as Dislike } from "./dislike.svg"
import './like.css'

type Props = {
	postId: number
}
export const Likes = ({ postId }: Props) => {
	const post = useAppSelector((state) => state.posts.posts.find((post) => post.id === postId))
	const theme = useAppSelector((state) => state.theme.themeColor)
	const dispatch = useAppDispatch()
	return (
		<div className='likes'>
			<p style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>{post?.likes ? post?.likes : 0}</p>
			<button onClick={() => dispatch(increaseLikes(postId))} className='btn-like'><Like /></button>
			<p style={theme === 'light' ? { color: 'rgb(75, 73, 73)' } : { color: 'white' }}>{post?.dislikes ? post?.dislikes : 0}</p>
			<button onClick={() => dispatch(increaseDislikes(postId))} className='btn-like'><Dislike /></button>
		</div>
	)
}

export { Like, Dislike }