import useSWR from 'swr'
import { fetchsingleStoryWithSWR } from '../actions/storyAction'


export function useStory(slug, shouldFetch=true) {
	const {data, error} = useSWR(shouldFetch ? `${slug}` : null, fetchsingleStoryWithSWR)

	return {
		story: data && data.story,
		friends: data && data.friends,
		isLoading: !error && !data,
		isError: error
	}
}