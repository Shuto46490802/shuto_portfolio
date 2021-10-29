import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

//Libraries
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

//Components
import Link from '../PageLayout/Link';

const WorkPageIntro = ({ workPageIntroImage, introDetails }) => {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
    }, [])

    const downButtonWrapper = useRef();
    const arrow = useRef();
    const circHover = useRef();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 1000)
        gsap.set(circHover.current,
            {
                strokeDashoffset: -569.628,
                strokeDasharray: '1e-05px, 579.628px'
            })
        getImageOffsetY();
        window.addEventListener('resize', getImageOffsetY);
        window.addEventListener('scroll', getImageOffsetY);

        return () => {
            window.removeEventListener('resize', getImageOffsetY);
            window.removeEventListener('scroll', getImageOffsetY);
        }
    }, [])

    const imageWrapper = useRef();
    const [imageOffsetY, setImageOffsetY] = useState();

    const getImageOffsetY = () => {

        const params = imageWrapper.current.getBoundingClientRect()
        const imageOffsetY = params.top + window.pageYOffset + (params.height / 2) - window.innerHeight;

        setImageOffsetY(imageOffsetY);
    }

    const image = useRef();

    useEffect(() => {

        if (isReady) {

            if (imageWrapper.current) {

                const trigger = {
                    trigger: imageWrapper.current,
                    start: "top bottom",
                    toggleActions: "play none none reset",
                }

                gsap.fromTo(image.current,
                    {
                        scale: 1.5
                    },
                    {
                        scale: 1,
                        duration: 3,
                        transformOrigin: "bottom",
                        ease: 'Power4.easeOut',
                        scrollTrigger: trigger
                    })

            }

        }

    }, [isReady])

    const getOverview = (_arr) => {

        if (_arr.length > 0) {

            return (_arr.map((text, index) => {

                return (
                    <p key={index} className={`work-page-intro-detail-items ${index === _arr.length - 1 ? "m-0" : ""}`}>
                        {text}
                    </p>
                )
            })

            )

        }

    }

    return (
        <div className="work-page-intro">

            <div className="work-page-intro-text__wrapper">

                <div className="work-page-intro-title__wrapper">

                    <h1 className="work-page-intro-title m-0">

                        <span className="work-page-intro-title__inner">

                            {introDetails.introTitle}

                        </span>

                    </h1>

                </div>

                <div className="work-page-intro-subtitle__wrapper">

                    <p className="work-page-intro-subtitle m-0">

                        {introDetails.introSubtitle}

                    </p>

                </div>

                <button
                    ref={downButtonWrapper}
                    className="work-page-intro-button"
                    onClick={() => {
                        if (window.pageYOffset < imageOffsetY) {
                            window.scrollTo(0, imageOffsetY)
                        }
                    }}
                    aria-label='go down'
                    onMouseOver={() => {
                        gsap.to(downButtonWrapper.current,
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
                        gsap.to(downButtonWrapper.current,
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

                    <svg className="down-button" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">

                        <g transform="translate(-102.5 -14780.5)">

                            <path ref={arrow} className="circ-arrow" d="M-57.625-7.9l38.054-38.054H-27.2l-4.723-4.723,20.889.363.227.182.363,20.934-4.768-4.768v-7.811l-38.1,38.145Z" transform="matrix(0.719,-0.695,0.695,0.719,246.656,14877.2)" data-svg-origin="-57.625 -50.677001953125" />

                            <circle className="circ-static" opacity=".2" cx="90.5" cy="90.5" r="90.5" transform="translate(112.5 14790.5)" fill="none" strokeWidth="3" />

                            <circle ref={circHover} className="circ-hover" cx="90.5" cy="90.5" r="90.5" transform="matrix(0,1,-1,0,293.5,14790.5)" fill="none" strokeWidth="3" data-svg-origin="90.5 90.5" />

                        </g>

                    </svg>

                </button>

                <div className="work-page-intro-details__wrapper">

                    <div className="work-page-intro-details__inner">

                        <div className="work-page-intro-detail">

                            <h4 className="work-page-intro-detail-title ">
                                <strong>Technologies:</strong>
                            </h4>

                            <p className="work-page-intro-detail-items m-0">
                                {
                                    introDetails.technologies
                                        ? introDetails.technologies.join(' / ')
                                        : null
                                }
                            </p>

                        </div>

                        <div className="work-page-intro-detail">

                            <h4 className="work-page-intro-detail-title">
                                <strong>Credit:</strong>
                            </h4>

                            <p className="work-page-intro-detail-items m-0">
                                {
                                    introDetails.credit
                                        ? `${Object.keys(introDetails.credit)[0]} : ${introDetails.credit[`${Object.keys(introDetails.credit)[0]}`]}`
                                        : null
                                }
                            </p>

                        </div>

                        <div className="work-page-intro-detail">

                            <h4 className="work-page-intro-detail-title ">
                                <strong>Overview:</strong>
                            </h4>

                            {
                                introDetails.introOverview
                                    ? getOverview(introDetails.introOverview)
                                    : null
                            }

                        </div>

                        <div className="work-page-intro-detail">

                            <h4 className="work-page-intro-detail-title ">
                                <strong>Launch:</strong>
                            </h4>

                            <Link href={`${introDetails.url}`} scroll={false} ariaLabel='work page'>

                                <a className="work-page-intro-link" aria-label='work page'>

                                    <span className="line-link work-page-intro-detail-items">
                                        {
                                            introDetails.url
                                                ? introDetails.url
                                                : null
                                        }
                                    </span>

                                </a>

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

            <div ref={imageWrapper} className="work-page-intro-image__wrapper">

                <div ref={image} className="work-page-intro-image">

                    <figure className="fig__wrapper m-0">

                        <Image priority src={workPageIntroImage} layout="responsive" width="1920" height="1200" />

                    </figure>

                </div>

            </div>

        </div>
    );
}

export default WorkPageIntro;