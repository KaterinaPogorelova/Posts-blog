import { useState } from "react"
import './onload.css'
import { sendPost } from "../getPosts"
import { useFileSelect } from "../customHooks"

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

	return (<form className="post-form" onSubmit={handleSubmit}>
		<div className="post-form__title">
			<label htmlFor="title">Title</label>
			<input id='title' name='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
		</div>
		<div className="post-form__image">
			<label htmlFor="image">Image</label>
			<input id='image' name='image' type="file" onChange={onFileSelect} />
			<img src={preview} alt="img_preview" />
		</div>
		<div className="post-form__description">
			<label htmlFor="desc">Description</label>
			<input id='desc' name='desc' type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
		</div>
		<div className="post-form__text">
			<label htmlFor="text">Text</label>
			<input id='text' name='text' type="text" value={text} onChange={(e) => setText(e.target.value)} />
		</div>
		<div className="post-form__lesson">
			<label htmlFor="lesson_num">Lesson number</label>
			<input id='"lesson_num' name='"lesson_num' type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} />
		</div>
		<button type="submit">Submit</button>
	</form >)
}