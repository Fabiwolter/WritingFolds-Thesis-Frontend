import Layout from '../../../components/Layout'
import Private from '../../../components/auth/Private'
import TagAddRemove from '../../../components/crud/TagAddRemove'

const CategoryTag = () => {
	return (
		<Layout>
			<Private>
				<div className="container-fluid">
					<div className="row">
						<div className="md-12 col">
							<h2>Manage Tags</h2>
						</div>
						<div className="col md-12">
							<TagAddRemove/>
						</div>
					</div>
				</div>
			</Private>
		</Layout>
	)
}

export default CategoryTag