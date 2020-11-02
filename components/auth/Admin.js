import Router from 'next/router'
import { useEffect } from 'react'
import { isAuthenticated } from '../../actions/authAction'


const Admin = ({children}) => {
	useEffect(() => {
		if (!isAuthenticated()) {
			Router.push('/login')
		} else if (isAuthenticated().role !== 1) {
			Router.push('/')
		}
	}, [])
	return <React.Fragment>
		{children}
	</React.Fragment>
}

export default Admin