import fetch from 'isomorphic-fetch'
import {API} from '../config'
import { handleResponse } from './authAction'


export const getUserPublicProfile = (username) => {
	let createStoryEndpoint = `${API}/user/${username}`

	return fetch(`${createStoryEndpoint}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		}
	})
	.then(response => {
		return response.json()
	})
	.catch(err => console.log(err))
}

export const getProfile = (token) => {
	let createStoryEndpoint = `${API}/user/profile`

	return fetch(`${createStoryEndpoint}`, {
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

export const updateProfile = (token, user) => {
	let createStoryEndpoint = `${API}/user/update`

	return fetch(`${createStoryEndpoint}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: user
	})
	.then(response => {
		handleResponse(response)
		return response.json()
	})
	.catch(err => console.log(err))
}

export const fetchProfileWithSWR = (token) => (
	fetch(`${API}/user/profile`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
	.then(res => res.json())
	.catch(error => console.log(error))
)

export const addUserFriend = (token, friendUsername) => {
	let addFriendEndpoint = `${API}/user/friend`

	return fetch(`${addFriendEndpoint}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(friendUsername)
	})
		.then(response => {
			handleResponse(response)
			return response.json()
		})
		.catch(err => console.log(err))
}

export const removeUserFriend = (token, friendUsername) => {
	let addFriendEndpoint = `${API}/user/friend`

	return fetch(`${addFriendEndpoint}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(friendUsername)
	})
		.then(response => {
			handleResponse(response)
			return response.json()
		})
		.catch(err => console.log(err))
}


