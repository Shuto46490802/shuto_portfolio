import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';

const Cursor = ({ isRouteChangeComplete, isLoading }) => {

    const [isTouch, setIsTouch] = useState(false);
    const cursorRef = useRef();
    const circleRef = useRef();
    const dotRef = useRef();
    const router = useRouter();

    useEffect(() => {
        detectTouch();
        handleCursorEvent();
        cursorRef.current.classList.remove('is-hovered', 'is-text-mode', 'is-text-mode2')
        document.body.addEventListener('mousemove', onCursorMove);
        document.body.addEventListener('mouseleave', onCursorLeave);
        return () => {
            document.body.removeEventListener('mousemove', onCursorMove)
            document.body.removeEventListener('mouseleave', onCursorLeave)
        }
    }, [router, isRouteChangeComplete, isLoading])
    //isLoaded, isFirstLoaded, isRouteChangeComplete

    const detectTouch = () => {

        if ('ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
            setIsTouch(true)
        } else {
            setIsTouch(false)
        }

    }

    const onCursorMove = (event) => {

        const { clientX, clientY } = event;

        if (!isTouch) {

            circleRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0px)`
            dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0px)`

        }

    }

    const onCursorLeave = (event) => {

        const { clientX, clientY } = event;

        if (!isTouch) {

            circleRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0px)`
            dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0px)`

        }

    }

    const handleCursorEvent = () => {

        const links = document.getElementsByTagName('a');
        const buttons = document.getElementsByTagName('button');
        const hoveredLists = [...links, ...buttons];

        if (!isTouch) {

            if (hoveredLists.length > 0) {

                for (let i = 0; i < hoveredLists.length; i++) {

                    if (!hoveredLists[i].classList.contains('hover-setup')) {

                        hoveredLists[i].classList.add('hover-setup');

                        hoveredLists[i].addEventListener('mouseover', (e) => {

                            if (e.target.classList.contains('hover-setup')) {
                                cursorRef.current.classList.add("is-hovered")

                                if (e.target.classList.contains('text-mode')) {
                                    cursorRef.current.classList.add("is-text-mode")
                                }

                                if (e.target.classList.contains('text-mode2')) {
                                    cursorRef.current.classList.add("is-text-mode2")
                                }

                                if (e.target.classList.contains('small-mode')) {
                                    cursorRef.current.classList.add("is-small-mode")
                                }
                            }

                        })

                        hoveredLists[i].addEventListener('mouseout', () => {
                            cursorRef.current.classList.remove("is-hovered")
                            cursorRef.current.classList.remove("is-text-mode")
                            cursorRef.current.classList.remove("is-text-mode2")
                            cursorRef.current.classList.remove("is-small-mode")
                        })

                    }

                }

            }

        }

    }

    return (
        <div ref={cursorRef} className={`cursor ${isTouch ? "is-touch" : ""}`}>

            <div ref={circleRef} className="cursor-circle__wrapper">

                <div className="cursor-circle">

                    <div className="cursor-text">View</div>

                    <div className="cursor-text2">Contact</div>

                    <div className="cursor-loaderSpinner">

                        <svg viewBox="0 0 80 80">

                            <circle cx="40" cy="40" r="39" />

                        </svg>

                    </div>

                </div>

            </div>

            <div ref={dotRef} className="cursor-dot__wrapper">

                <div className="cursor-dot" />

            </div>

        </div>
    );
}

export default Cursor;