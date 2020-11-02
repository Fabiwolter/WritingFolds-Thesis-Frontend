import useSWR from 'swr'
import { fetchProfileWithSWR } from '../actions/userAction'


export function useProfile(token) {
	const {data, error} = useSWR(`${token}`, fetchProfileWithSWR)

	return {
		profile: data,
		isLoading: !error && !data,
		isError: error
	}
}