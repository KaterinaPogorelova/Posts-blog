import React, { ReactNode } from 'react';
import { refreshJWT } from './handleAuth';
const POSTSURL = "https://studapi.teachmeskills.by/blog/posts/"
const MYPOSTSURL = "https://studapi.teachmeskills.by/blog/posts/my_posts/"

export type Post = {
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

type PostsResponse = {
	count: number;
	next?: string;
	previous?: string;
	results: Post[];
}

export type PostParams = {
	limit?: number | undefined,
	searchValue?: string,
	offset?: number,
	ordering?: string
}

export type myPostParams = {
	limit?: number | undefined,
	searchValue?: string,
	offset?: number,
	ordering?: 'id' | 'title' | 'text' | 'lesson_num' | 'date'
}

export type PostNext = Required<
	Pick<Post, "description" | "image" | "lesson_num" | "text" | "title">
>;

export const getPosts = async ({ limit, searchValue, offset, ordering }: PostParams) => {
	const postsUrl = new URL(POSTSURL);
	if (searchValue) postsUrl.searchParams.set("search", searchValue);
	if (limit) postsUrl.searchParams.set("limit", String(limit));
	if (offset) postsUrl.searchParams.set("offset", String(offset));
	if (ordering) postsUrl.searchParams.set("ordering", String(ordering));
	const response = await fetch(postsUrl);
	const posts: PostsResponse = await response.json();
	return posts.results;
};

export const getPost = async (id: string) => {
	const postUrl = new URL(POSTSURL + '/' + id);
	const response = await fetch(postUrl);
	const post = await response.json();
	return post
}

export const getMyPosts = async ({ limit, searchValue, ordering, offset }: myPostParams) => {
	const token = localStorage.getItem('accessToken')
	const myPostsUrl = new URL(MYPOSTSURL)
	if (limit) myPostsUrl.searchParams.set("limit", String(limit));
	if (offset) myPostsUrl.searchParams.set("offset", String(offset));
	const response = await fetch(myPostsUrl, {
		method: 'GET', headers: { "Authorization": `Bearer ${token}` }
	});
	const myposts: PostsResponse = await response.json();
	if (ordering) {
		myposts.results.sort((post1, post2) => {
			if (post1[ordering] > post2[ordering]) {
				return 1
			}
			if (post1[ordering] < post2[ordering]) {
				return -1
			}
			return 0
		})
	}
	if (searchValue) {
		const upperSearchResult = searchValue.toUpperCase()
		const searchResult = myposts.results.filter((post) => post.title.toUpperCase().includes(upperSearchResult))
		return searchResult
	}
	return myposts.results;
}

export const sendPost = async (post: FormData) => {
	const postsUrl = new URL(POSTSURL);
	const token = localStorage.getItem('accessToken')
	const response = await fetch(postsUrl, {
		method: 'POST', headers: { "Authorization": `Bearer ${token}` }, body: post
	})

	if (response.status === 401) {
		const refresh = localStorage.getItem('refreshToken')
		if (!refresh) return
		const tokens = await refreshJWT();
		localStorage.setItem("accessToken", tokens.access);
		await fetch(postsUrl, {
			method: 'POST', headers: { "Authorization": `Bearer ${tokens.access}` }, body: post
		})
	}

	const result = await response.json()
	return result
}