import Link from "next/link";

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="page-footer paper margin-bottom-none padding-bottom">
                <div className="container-fluid text-left">
                    <div className="row padding-top-none flex-edges">
                        <div className="col md-6 sm6 padding-bottom-none padding-top-none">
                            <h5 className="text-uppercase margin-top-none">Disclaimer</h5>
                            <p>This app is actively in development and product of my Bachelor's Thesis i'm currently writing on. Please keep in mind that errors can occur and all of your data as well as your account could get removed. Reasons for that can be a Database flush or upgrade or just a dumb mistake. Feel free to contact me @fabivoltair.</p>
                        </div>
                        <div className="col md-3 sm-6 padding-bottom-none padding-top-none">
                            <h5 className="text-uppercase margin-top-none">
                                <Link href="/how-to-play">
                                    <a className="custom-link">How to play?</a>
                                </Link>
                            </h5>
                            <ul className="">
                                <li>
                                    <Link href="/"><a className="custom-link">What are Folding Stories?</a></Link>
                                </li>
                                <li>
                                    <Link href="/stories"><a className="custom-link">Stories</a></Link>
                                </li>
                                <li>
                                    <Link href="/search"><a className="custom-link">Search</a></Link>
                                </li>
                                <li>
                                    <Link href="/user"><a className="custom-link">User Dashboard</a></Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col md-3 sm-6 padding-bottom-none padding-top-none">
                            <h5 className="text-uppercase margin-top-none">Links</h5>
                            <ul className="">
                                <li>
                                    <Link href="/feed"><a className="custom-link">personal Feed</a></Link>
                                </li>
                                <li>
                                    <Link href="/user/crud/story"><a className="custom-link">create a Story</a></Link>
                                </li>
                                <li>
                                    <Link href="/user/crud/tags"><a className="custom-link">create/delete Tags</a></Link>
                                </li>
                                <li>
                                    <Link href="/user/crud/stories"><a className="custom-link">manage your Stories</a></Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
                <hr />
                <div className="footer-copyright text-center py-3 margin-top-large">© 2020 Copyright:
                    <a href="https://github.com/Fabiwolter"> Fabian Wolter</a>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer