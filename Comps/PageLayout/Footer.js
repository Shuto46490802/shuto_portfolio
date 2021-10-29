import React, { useEffect, useRef, useState } from 'react';

//Components
import { onMouseMoveTranslateScale, onMouseLeaveTranslateScale } from './animation';
import Link from './Link';

//Libraries
import { gsap } from 'gsap';

const Footer = () => {

    const [paramsArr, setParamsArr] = useState([]);
    const iconRefs = useRef([]);
    const addToIconRefs = (_el) => {
        if (_el && !iconRefs.current.includes(_el)) {
            iconRefs.current.push(_el)
        } else {
            iconRefs.current = [];
        }
    };
    const [wrapperOffset, setWrapperOffset] = useState({});

    useEffect(() => {
        gsap.set(circHover.current,
            {
                strokeDashoffset: -569.628,
                strokeDasharray: '1e-05px, 579.628px'
            })
        getIconsParams();
        window.addEventListener('resize', getIconsParams);
        window.addEventListener('scroll', getIconsParams);
        return () => {
            window.removeEventListener('resize', getIconsParams);
            window.removeEventListener('scroll', getIconsParams);
        }
    }, [])

    const getIconsParams = () => {

        if (iconRefs.current) {

            const paramsArr = iconRefs.current.map((icon) => icon.getBoundingClientRect());

            if (window.innerWidth > 768) {

                paramsArr.map((params) => {
                    params.centerX = params.x + (params.width / 2) - 100;
                    params.centerY = params.y + (params.height / 2) - 20;
                })

                setWrapperOffset({
                    x: 100,
                    y: 20
                })
            } else {

                paramsArr.map((params) => {
                    params.centerX = params.x + (params.width / 2) - 15;
                    params.centerY = params.y + (params.height / 2) - 90;
                })

                setWrapperOffset({
                    x: 15,
                    y: 90
                })
            }

            setParamsArr(paramsArr)

        }

    }

    const upButtonWrapper = useRef();
    const arrow = useRef();
    const circHover = useRef();

    return (
        <footer className="footer">

            <span className="frame-top grow" />

            <div className="footer-button__wrapper">

                <button
                    className="footer-up-button"
                    ref={upButtonWrapper}
                    onClick={() => {
                        window.scrollTo(0, 0)
                    }}
                    aria-label='top'
                    onMouseOver={() => {
                        gsap.to(upButtonWrapper.current,
                            {
                                scale: 0.9,
                                duration: 0.75,
                                ease: "Power3.easeOut"
                            })

                        gsap.timeline()
                            .fromTo(arrow.current,
                                {
                                    opacity: 1,
                                    yPercent: 0
                                },
                                {
                                    opacity: 0,
                                    yPercent: -120,
                                    duration: 0.375,
                                    ease: "Power3.easeIn"
                                })
                            .fromTo(arrow.current,
                                {
                                    opacity: 0,
                                    yPercent: 120
                                },
                                {
                                    opacity: 1,
                                    yPercent: -0,
                                    ease: "Power3.easeOut"
                                })

                        gsap.timeline()
                            .fromTo(circHover.current,
                                {
                                    strokeDashoffset: 569.628,
                                    strokeDasharray: '569.628px, 579.628px'
                                },
                                {
                                    strokeDashoffset: 1e-05,
                                    strokeDasharray: '569.628px, 579.628px',
                                    duration: 0.75,
                                    ease: 'Power3.easeInOut'
                                })
                            .to(circHover.current,
                                {
                                    rotation: "+=90",
                                    transformOrigin: "center center",
                                    duration: 0.75,
                                    ease: 'Power3.easeInOut'
                                }, 0)
                            .set(circHover.current, {
                                strokeDasharray: 'none',
                            })
                    }}
                    onMouseLeave={() => {
                        gsap.to(upButtonWrapper.current,
                            {
                                scale: 1,
                                duration: 0.75,
                                ease: "Power3.easeOut"
                            })

                        gsap.timeline()
                            .fromTo(circHover.current,
                                {

                                    strokeDashoffset: 1e-05,
                                    strokeDasharray: '569.628px, 579.628px',
                                },
                                {
                                    strokeDashoffset: -569.628,
                                    strokeDasharray: '1e-05px, 579.628px',
                                    duration: 0.75,
                                    ease: 'Power3.easeInOut'
                                })

                    }}
                >

                    <svg className="up-button" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">

                        <g transform="translate(-102.5 -14780.5)">

                            <path ref={arrow} className="circ-arrow" d="M-57.625-7.9l38.054-38.054H-27.2l-4.723-4.723,20.889.363.227.182.363,20.934-4.768-4.768v-7.811l-38.1,38.145Z" transform="matrix(0.719,-0.695,0.695,0.719,246.656,14877.2)" data-svg-origin="-57.625 -50.677001953125" />

                            <circle className="circ-static" opacity=".2" cx="90.5" cy="90.5" r="90.5" transform="translate(112.5 14790.5)" fill="none" strokeWidth="3" />

                            <circle ref={circHover} className="circ-hover" cx="90.5" cy="90.5" r="90.5" transform="matrix(0,1,-1,0,293.5,14790.5)" fill="none" strokeWidth="3" data-svg-origin="90.5 90.5" />

                        </g>

                    </svg>

                </button>

            </div>

            <div className="footer-social-medias__wrapper">

                <span className="frame-left grow" />

                <div className="footer-social-medias-links">

                    <p className="footer-social-medias-links-header m-0">
                        Connect with me on the following social media platforms:
                    </p>

                    <div className="footer-social-medias-links-icons">

                        <p
                            className="footer-social-medias-links-icon__wrapper "
                            onMouseMove={(e) => {
                                onMouseMoveTranslateScale(e, iconRefs.current[0], paramsArr[0], 5, 5, wrapperOffset.x, wrapperOffset.y, 0.8);
                            }}
                            onMouseLeave={() => {
                                onMouseLeaveTranslateScale(iconRefs.current[0])
                            }}
                        >

                            <Link href="https://github.com/Shuto46490802" scroll={false} ariaLabel='github'>

                                <a className="footer-social-medias-links-icon-link small-mode" aria-label='github'>

                                    <span ref={addToIconRefs} className="footer-social-medias-links-icon">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">

                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />

                                        </svg>

                                    </span>

                                </a>

                            </Link>

                        </p>

                        <p
                            className="footer-social-medias-links-icon__wrapper "
                            onMouseMove={(e) => {
                                onMouseMoveTranslateScale(e, iconRefs.current[1], paramsArr[1], 5, 5, wrapperOffset.x, wrapperOffset.y, 0.8);
                            }}
                            onMouseLeave={() => {
                                onMouseLeaveTranslateScale(iconRefs.current[1])
                            }}
                        >

                            <Link href="https://www.linkedin.com/in/shuto-suganuma-2105a6220/" scroll={false} ariaLabel='linkedin'>

                                <a className="footer-social-medias-links-icon-link small-mode" aria-label='linkedin'>

                                    <span ref={addToIconRefs} className="footer-social-medias-links-icon">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">

                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />

                                        </svg>

                                    </span>

                                </a>

                            </Link>

                        </p>

                        <p
                            className="footer-social-medias-links-icon__wrapper "
                            onMouseMove={(e) => {
                                onMouseMoveTranslateScale(e, iconRefs.current[2], paramsArr[2], 5, 5, wrapperOffset.x, wrapperOffset.y, 0.8);
                            }}
                            onMouseLeave={() => {
                                onMouseLeaveTranslateScale(iconRefs.current[2])
                            }}
                        >

                            <Link href="/" scroll={false} ariaLabel='twitter'>

                                <a className="footer-social-medias-links-icon-link small-mode" aria-label='twitter'>

                                    <span ref={addToIconRefs} className="footer-social-medias-links-icon">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">

                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />

                                        </svg>

                                    </span>

                                </a>

                            </Link>

                        </p>

                    </div>

                </div>

                <p className="footer-copy-right m-0">

                    <span className="footer-copy-right__inner">

                        <span className="footer-copy-right-text">©</span>

                        <span className="footer-copy-right-text ps-1">shuto</span>

                        <span className="footer-copy-right-text ps-1">suganuma</span>

                    </span>

                </p>

                <p className="footer-rights-reserved m-0">

                    <span>2021 All Rights Reserved</span>

                </p>

            </div>

        </footer>
    );
}

export default Footer;