import { useState } from 'react'
import { APP_NAME } from '../config'
import Link from 'next/link'
import Router from 'next/router'
import {signout, isAuthenticated} from '../actions/authAction'
import NProgress from 'nprogress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()


const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    return (
        <React.Fragment>
            <nav className="border fixed split-nav">
                <div className="nav-brand">
                    <Link href="/stories">
                        <a>
                            <h3>{APP_NAME}</h3>
                        </a>
                    </Link>
                </div>
                <div className="collapsible">
                    <input id="collapsible1" type="checkbox" name="collapsible1"/>
                    <button>
                        <label htmlFor="collapsible1" style={{paddingTop: 4, paddingBottom: 4}}>
                            <div><FontAwesomeIcon icon={faBars} size="3x" transform="shrink-1" /></div>
                        </label>
                    </button>
                    <div className="collapsible-body">
                        <ul className="inline">
                            {!isAuthenticated() && (
                                <React.Fragment>
                                    <li>
                                        <Link href="/login">
                                            <a>Login</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/signup">
                                            <a>Signup</a>
                                        </Link>
                                    </li>
                                </React.Fragment>
                            )}


                            <li>
                                <Link href="/search">
                                    <a><FontAwesomeIcon icon={faSearch} /></a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/stories">
                                    <a>Stories</a>
                                </Link>
                            </li>

                            {isAuthenticated() && (
                                <li>
                                    <Link href="/user/feed">
                                        <a>{`Feed`}</a>
                                    </Link>
                                </li>
                            )}

                            {isAuthenticated() && isAuthenticated().role === 0 && (
                                <li>
                                    <Link href="/user">
                                        <a>{`Dashboard`}</a>
                                    </Link>
                                </li>
                            )}
                            {isAuthenticated() && isAuthenticated().role === 0 && (
                                <li>
                                    <Link href={`/profile/${isAuthenticated().username}`}>
                                        <a><FontAwesomeIcon icon={faUser} /></a>
                                    </Link>
                                </li>
                            )}

                            {isAuthenticated() && isAuthenticated().role === 1 && (
                                <li>
                                    <Link href="/admin">
                                        <a>{`Admin Dashboard`}</a>
                                    </Link>
                                </li>
                            )}
                            {isAuthenticated() && isAuthenticated().role === 1 && (
                                <li>
                                    <Link href={`/profile/${isAuthenticated().username}`}>
                                        <a><FontAwesomeIcon icon={faUser} /></a>
                                    </Link>
                                </li>
                            )}

                            {isAuthenticated() && (
                                <li>
                                    <a style={{cursor: 'pointer'}} onClick={() => signout(() => Router.replace(`/login`))}>
                                        Signout
                                    </a>
                                </li>
                            )}

                            {isAuthenticated() && (
                                <React.Fragment>
                                    <li>
                                        <Link href="/user/crud/story">
                                            <button className="paper-btn btn-secondary margin-none padding-bottom-small padding-top-small">
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </Link>
                                    </li>
                                </React.Fragment>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>

            < br/>
            < br/>
        </React.Fragment>
    )
}

export default Header;