import fetch from 'isomorphic-fetch'
import {API} from '../config'


export const getSingleGameMode = (slug) => {
	return fetch(`${API}/gamemode/${slug}`, {
		method: 'GET',
	})
	.then(response => {
		return response.json()
	})
	.catch(err => console.log(err))
}
