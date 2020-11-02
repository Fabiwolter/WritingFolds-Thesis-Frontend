import Router from 'next/router'
import { useEffect } from 'react'
import { isAuthenticated } from '../../actions/authAction'


const Private = ({children}) => {
	useEffect(() => {
		if (!isAuthenticated()) {
			Router.push('/login')
		}
	}, [])
	return <React.Fragment>
		{children}
	</React.Fragment>
}

export default Private