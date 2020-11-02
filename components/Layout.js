import Header from './Header'
import Footer from './Footer'
import ScrollArrow from './ScrollArrow'

const Layout = ({children}) => {
	return (
		<React.Fragment>
			<Header/>
			<div className="content-above-footer">
				{children}
			</div>
			{ process.browser && <ScrollArrow />}

			<Footer />
		</React.Fragment>
	)
}

export default Layout