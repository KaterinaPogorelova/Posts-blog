import { useState } from "react"
import './onload.css'
import { sendPost } from "../getPosts"
import { useFileSelect } from "../customHooks"
import { useAppDispatch, useAppSelector } from '../Store/store';
import { useNavigate } from 'react-router-dom';
import { Title } from "../Title/Title";

export const Onload = () => {
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [text, setText] = useState('')
	const [num, setNum] = useState(0)
	const { onFileSelect, preview, selectedFile } = useFileSelect()
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData();
		formData.append('title', title)
		selectedFile && formData.append('image', selectedFile)
		formData.append('text', text)
		formData.append('description', desc)
		formData.append('lesson_num', String(num))
		sendPost(formData)
	}

	const navigate = useNavigate()
	const theme = useAppSelector((state) => state.theme.themeColor)

	return (<>
	<Title>New post</Title>
	<form className="post-form" onSubmit={handleSubmit}>
		<div className="post-form__block">
			<label htmlFor="title" className="post-form__label">Title<span style={{color:'red'}}>*</span></label>
			<input id='title' className="post-form__input" name='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
		</div>
		<div className="post-form__block">
			<label htmlFor="image" className="post-form__label">Image</label>
			<input id='image' name='image' type="file" onChange={onFileSelect} />
			<img src={preview} alt="img_preview" className="post-form__preview"/>
		</div>
		<div className="post-form__block">
			<label htmlFor="desc" className="post-form__label">Description<span style={{color:'red'}}>*</span></label>
			<input id='desc' className="post-form__input" name='desc' type="text" value={desc} onChange={(e) => setDesc(e.target.value)} required/>
		</div>
		<div className="post-form__block">
			<label htmlFor="text" className="post-form__label">Text<span style={{color:'red'}}>*</span></label>
			<input id='text' className="post-form__input" name='text' type="text" value={text} onChange={(e) => setText(e.target.value)} required/>
		</div>
		<div className="post-form__block">
			<label htmlFor="lesson_num" className="post-form__label">Lesson number<span style={{color:'red'}}>*</span></label>
			<input id='lesson_num' className="post-form__input" name='lesson_num' type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} required/>
		</div>
		<button type="submit" className="post-form__button">Submit</button>
	</form></>)
}