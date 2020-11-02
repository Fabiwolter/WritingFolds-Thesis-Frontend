import fetch from 'isomorphic-fetch'
import { API } from '../config'
import queryString from 'query-string'
import { isAuthenticated, handleResponse } from './authAction'


export const createStory = (story, token) => {
	let createStoryEndpoint
	if (isAuthenticated() && isAuthenticated().role === 1) {
		createStoryEndpoint = `${API}/admin/story`
	} else if(isAuthenticated() && isAuthenticated().role === 0) {
		createStoryEndpoint = `${API}/story`
	}

	return fetch(`${createStoryEndpoint}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: story
	})
	.then(response => {
		handleResponse(response)
		return response.json()
	})
	.catch(err => console.log(err))
}

export const listAllStoriesWithTags = (skip, limit) => {
	let listEndpoint = `${API}/stories-with-tags`
	const data = {
		limit, skip
	}

	return fetch(`${listEndpoint}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(response => {
		return response.json()
	})
	.catch(err => console.log(err))
}

export const singleStory = slug => {
	return fetch(`${API}/story/${slug}`, {
		method: 'GET'
	})
	.then(response => {
		return response.json()
	})
	.catch(err => console.log(err))
}

export const fetchsingleStoryWithSWR = (slug) => (
	fetch(`${API}/story/${slug}`)
	.then(res => res.json())
	.catch(error => console.log(error))
)

export const listRelated = (story, limit) => {
	let listRelatedEndpoint = `${API}/stories/related`
	const data = {
		limit,
		story
	}

	return fetch(`${listRelatedEndpoint}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(response => {
		return response.json()
	})
	.catch(err => console.log(err))
}

export const list = (username, token) => {
	let listStoriesEndpoint
	if (username) {
		listStoriesEndpoint = `${API}/${username}/stories`
	} else {
		listStoriesEndpoint = `${API}/stories`
	}

	return fetch(listStoriesEndpoint, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
	.then(response => {
		return response.json()
	})
	.catch(err => console.log(err))
}

export const removeStory = (slug, token) => {
	let removeStoryEndpoint
	if (isAuthenticated() && isAuthenticated().role === 1) {
		removeStoryEndpoint = `${API}/admin/story/${slug}`
	} else if(isAuthenticated() && isAuthenticated().role === 0) {
		removeStoryEndpoint = `${API}/user/story/${slug}`
	}

	return fetch(`${removeStoryEndpoint}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	})
	.then(response => {
		handleResponse(response)
		return response.json()
	})
	.catch(err => console.log(err))
}

export const updateStory = (slug, story, token) => {
	let updateStoryEndpoint
	if (isAuthenticated() && isAuthenticated().role === 1) {
		updateStoryEndpoint = `${API}/admin/story/${slug}`
	} else if(isAuthenticated() && isAuthenticated().role === 0) {
		updateStoryEndpoint = `${API}/user/story/${slug}`
	}

	return fetch(`${updateStoryEndpoint}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: story
	})
	.then(response => {
		handleResponse(response)
		return response.json()
	})
	.catch(err => console.log(err))
}

export const updateStoryParts = (slug, part, token) => {
	let endpoint = `${API}/story-part/${slug}`

	return fetch(`${endpoint}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(part)
	})
	.then(response => {
		return response.json()
	})
	.catch(err => console.log(err))
}

export const listSearch = (params) => {
	let query = queryString.stringify(params)
	return fetch(`${API}/stories/search?${query}`, {
		method: 'GET'
	})
	.then(response => {
		return response.json()
	})
	.catch(err => console.log(err))
}

export const listStoriesForUserFeed = (username, skip, limit, token) => {
	let listEndpoint = `${API}/stories-for-feed/${username}`
	const data = {
		limit, skip
	}

	return fetch(`${listEndpoint}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then(response => {
			return response.json()
		})
		.catch(err => console.log(err))
}



