import { useState } from 'react'
import { listSearch } from '../../actions/storyAction'
import SmallCard from './SmallCard'

const Search = () => {
	const [values, setValues] = useState({
		search: undefined,
		results: [],
		searched: false,
		message: ''
	})

	const {search, results, searched, message} = values


	const searchSubmit = e => {
		e.preventDefault()
		listSearch({search}).then(data => {
			setValues({...values, results: data, searched: true, message: `${data.length} blogs found!`})
		})
	}

	const handleChange = e => {
		setValues({...values, search: e.target.value, searched: false, results: []})
	}

	const searchedStories = (results = []) => {
		return (
			<React.Fragment>
				{message && <div className="col md-12 padding-none">
					<p className="pt-4 text-muted font-italic">{message}</p>
				</div>}

				{results.length > 0 && results.map((story, i) => {
					return (
						<article key={i} className="col lg-4 md-6">
							<SmallCard story={story}/>
						</article>
					)
				})}
			</React.Fragment>
		)
	}

	const searchForm = () => (
		<form onSubmit={searchSubmit}>
			<div className="row flex-center">
				<div className="col md-5 padding-bottom-none">
					<div className="form-group">
						<input onChange={handleChange} className="input-block form-control" type="search" placeholder="Search Stories" />
					</div>
				</div>

				<div className="col md-2 padding-bottom-none">
					<div className="form-group">
						<button className="btn-small input-block" type="submit">
							Search
						</button>
					</div>
				</div>
			</div>
		</form>


	)

	return (
		<div className="col md-12">
			{searchForm()}
			{searched && <div className="row margin-none" style={{  }}>{searchedStories(results)}</div>}
		</div>
	)
}

export default Search