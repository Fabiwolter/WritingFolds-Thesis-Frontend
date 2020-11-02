// https://gist.github.com/macro6461/b144e95dddbdd692addf968d3e8a4dda#file-scrollarrow-js

import {useState} from 'react'


const ScrollArrow = () => {

    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 800){
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 800){
            setShowScroll(false)
        }
    };

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <div className="scrollTop" style={{height: 40, display: showScroll ? 'inline-block' : 'none'}}>
            <a onClick={scrollTop} className="paper-btn margin back-to-top-link">^</a>
        </div>
    );
}

export default ScrollArrow;