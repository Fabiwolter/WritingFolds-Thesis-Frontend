import Layout from '../../components/Layout'
import Private from '../../components/auth/Private'
import {getCookie, isAuthenticated} from '../../actions/authAction'
import {useEffect, useState} from 'react'
import { listStoriesForUserFeed } from '../../actions/storyAction'
import Card from '../../components/story/Card'

const UserFeed = ({ router }) => {

    const token = getCookie('token')
    const username = isAuthenticated() && isAuthenticated().username
    const [limit, setLimit] = useState(9)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [totalStories, setTotalStories] = useState()
    const [stories, setStories] = useState([])
    const [loadedStories, setLoadedStories] = useState([])


    useEffect(() => {
        loadStories()
    }, [])

    const loadStories = () => {
        let pagingSkip = skip
        let pagingLimit = limit
        const token = getCookie('token')
        const username = isAuthenticated() && isAuthenticated().username

        listStoriesForUserFeed(username, pagingSkip, pagingLimit, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setStories([...stories, ...data.stories])
                setTotalStories(data.size)
                setSize(data.size)
            }
        })
    }

    const loadMore = () => {
        let toSkip = skip + limit
        listStoriesForUserFeed(username, toSkip, limit, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setLoadedStories([...loadedStories, ...data.stories])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn-block">
                    Load more
                </button>
            )
        )
    }

    const showAllStories = () => {
        return stories.map((story, i) => {
            return <article key={i} className="lg-4 md-6 sm-6 col">
                <Card story={story} />
                <br/>
            </article>
        })
    }

    const showLoadedStories = () => {
        return loadedStories.map((story, i) => {
            return <article key={i} className="lg-4 md-6 sm-6 col">
                <Card story={story} />
                <br />
            </article>
        })
    }

    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col md-8">
                            <h2>{isAuthenticated() && isAuthenticated().name}`s personalized Feed</h2>
                        </div>
                        <div className="col md-4 align-middle disabled">
                            <p>Your feed is built from the Stories you have created, contributed on, or subscribed to.</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row flex-spaces">
                        {showAllStories()}
                        {showLoadedStories()}
                    </div>
                </div>
                <div className="text-center padding-bottom">
                    {loadMoreButton()}
                </div>
            </Private>
        </Layout>
    )
}


export default UserFeed