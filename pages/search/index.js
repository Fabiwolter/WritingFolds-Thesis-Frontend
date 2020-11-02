import Layout from '../../components/Layout'
import Search from '../../components/story/Search'

const SearchIndex = () => {
	return (
		<Layout>
			<div className="container-fluid">
				<section>
					<div className="row flex-center padding-top-large">
						<Search/>
					</div>
				</section>
			</div>
		</Layout>
	)
}

export default SearchIndex