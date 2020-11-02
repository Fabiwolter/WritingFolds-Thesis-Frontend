import fetch from 'isomorphic-fetch'
import {API} from '../config'
import { handleResponse } from './authAction'

export const createPart = (part, token) => {
	let endpoint = `${API}/part`

	return fetch(`${endpoint}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: part
	})
	.then(response => {
		handleResponse(response)
		return response.json()
	})
	.catch(err => console.log(err))
}

export const removePart = (slug, token) => {
	return fetch(`${API}/part/${slug}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(response => {
			handleResponse(response)
			return response.json()
		})
		.catch(err => console.log(err))
}