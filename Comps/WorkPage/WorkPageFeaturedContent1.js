import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

//Components 
import { onMouseMoveTranslateScale, onMouseLeaveTranslateScale } from '../PageLayout/animation'

//Libraries
import { gsap } from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);

const WorkPageFeaturedContent1 = ({ images, execution1, execution }) => {

    const wrapInSpanCurrent = (_arr) => {

        if (_arr.length < 10) {

            return (
                <span className="digit-item">

                    <span ref={digitItemInner1} className="digit-item__inner">

                        <span className="digit-items">

                            {
                                _arr.map((image, index) =>
                                    <span key={index} ref={digit}>{index + 1}</span>
                                )
                            }

                        </span>

                        <span className="digit-items">

                            {
                                _arr.map((image, index) =>
                                    <span key={index}>{index + 1}</span>
                                )
                            }

                        </span>

                    </span>

                </span>
            )

        } else {
            return (
                _arr.map((image, index) =>
                    <>

                        <span className="digit-item">

                            <span className="digit-item__inner">

                                <span className="digit-items">

                                    <span ref={digit}>0</span>

                                    <span>1</span>

                                </span>

                                <span className="digit-items">

                                    <span>0</span>

                                    <span>1</span>

                                </span>

                            </span>

                        </span>

                        <span className="digit-item">

                            <span className="digit-item__inner">

                                <span className="digit-items">

                                    {
                                        _arr.map((image, index) =>
                                            <span key={index}>
                                                {
                                                    index + 1 >= 10
                                                        ? index - 10
                                                        : null
                                                }
                                            </span>
                                        )
                                    }

                                </span>

                                <span className="digit-items">

                                    {
                                        _arr.map((image, index) =>
                                            <span key={index}>
                                                {
                                                    index + 1 >= 10
                                                        ? index - 10
                                                        : null
                                                }
                                            </span>
                                        )
                                    }

                                </span>

                            </span>

                        </span>

                    </>
                )
            )
        }

    }

    const wrapInSpanTotal = (_arr) => {

        if (_arr.length < 10) {

            return (
                <span className="digit-item">

                    <span className="digit-item__inner">

                        <span className="digit-items">

                            <span>{_arr.length}</span>

                        </span>

                    </span>

                </span>
            )

        } else {

            return (
                <>

                    <span className="digit-item">

                        <span className="digit-item__inner">

                            <span className="digit-items">

                                <span>1</span>

                            </span>

                        </span>

                    </span>

                    <span className="digit-item">

                        <span className="digit-item__inner">

                            <span className="digit-items">

                                <span>
                                    {_arr.length - 10}
                                </span>

                            </span>

                        </span>

                    </span>

                </>
            )

        }

    }

    const digitItemInner1 = useRef();
    const digit = useRef();
    const [currentPos, setCurrentPos] = useState(null);

    useEffect(() => {
        getArrowParams();
        getIntialPos();
        window.addEventListener('resize', () => {
            getArrowParams();
        });
        window.addEventListener('scroll', () => {
            getArrowParams();
        })
        return () => {
            window.removeEventListener('resize', () => {
                getArrowParams()
            });
            window.removeEventListener('scroll', () => {
                getArrowParams();
            })
        }
    }, [])

    const getIntialPos = () => {

        if (digitItemInner1.current) {

            const height = digitItemInner1.current.clientHeight;
            const initPos = height / 2;

            digitItemInner1.current.style.transform = `translate(0px, -${initPos}px)`;
            setCurrentPos(initPos)
        }

    }

    const togglePosUp = () => {

        if (digitItemInner1.current) {

            if (currentPos >= digitItemInner1.current.clientHeight - (2 * digit.current.clientHeight)) {

                gsap.timeline()
                    .fromTo(digitItemInner1.current,
                        {
                            yPercent: 0,
                            y: -currentPos
                        },
                        {
                            yPercent: 0,
                            y: -currentPos - digit.current.clientHeight,
                            duration: 0.3
                        })
                    .set(digitItemInner1.current,
                        {
                            yPercent: 0,
                            y: -(digitItemInner1.current.clientHeight / 2) + digit.current.clientHeight,
                            onComplete: () => {
                                setCurrentPos((digitItemInner1.current.clientHeight / 2) - digit.current.clientHeight)
                            }
                        })

            } else {

                gsap.fromTo(digitItemInner1.current,
                    {
                        yPercent: 0,
                        y: -currentPos
                    },
                    {
                        yPercent: 0,
                        y: -currentPos - digit.current.clientHeight,
                        duration: 0.3,
                        onComplete: () => {
                            setCurrentPos(currentPos + digit.current.clientHeight)
                        }
                    })

            }

        }

    }

    const togglePosDown = () => {

        if (digitItemInner1.current) {

            if (currentPos === (digitItemInner1.current.clientHeight / 2) - digit.current.clientHeight) {

                gsap.timeline()
                    .fromTo(digitItemInner1.current,
                        {
                            yPercent: 0,
                            y: -currentPos
                        },
                        {
                            yPercent: 0,
                            y: -currentPos + digit.current.clientHeight,
                            duration: 0.3
                        })
                    .set(digitItemInner1.current,
                        {
                            yPercent: 0,
                            y: -digitItemInner1.current.clientHeight + (2 * digit.current.clientHeight),
                            onComplete: () => {
                                setCurrentPos(digitItemInner1.current.clientHeight - (2 * digit.current.clientHeight))
                            }
                        })

            } else {

                gsap.fromTo(digitItemInner1.current,
                    {
                        yPercent: 0,
                        y: -currentPos
                    },
                    {
                        yPercent: 0,
                        y: -currentPos + digit.current.clientHeight,
                        duration: 0.3,
                        onComplete: () => {
                            setCurrentPos(currentPos - digit.current.clientHeight)
                        }
                    })

            }

        }

    }

    const arrowRefs = useRef([]);
    const addToArrowRefs = (_el) => {
        if (_el && !arrowRefs.current.includes(_el)) {
            arrowRefs.current.push(_el)
        } else {
            arrowRefs.current = [];
        }
    };
    const [paramsArr, setParamsArr] = useState();
    const [wrapperOffset, setWrapperOffset] = useState();

    const getArrowParams = () => {

        if (arrowRefs.current) {

            const paramsArr = arrowRefs.current.map((title) => title.getBoundingClientRect());

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

    const getOverview = (_arr) => {

        if (_arr.length > 0) {

            return (_arr.map((text, index) => {

                return (
                    <p key={index} className={`${index === _arr.length - 1 ? "m-0" : ""}`}>
                        {text}
                    </p>
                )
            })

            )

        }

    }

    return (
        <div className="work-page-featured-content-1 work-page-featured-content">

            <div className="work-page-featured-content-1-header__wrapper work-page-featured-content-header__wrapper">

                <div className="work-page-featured-content-header">

                    <h2 className="work-page-featured-content-header-title m-0">
                        {execution}
                    </h2>

                    <div className="work-page-featured-content-header-description">

                        <p>
                            {execution1.title}
                        </p>

                    </div>

                </div>

                <div className="work-page-featured-content-images__wrapper">

                    <div className="work-page-featured-content-images__inner">

                        <div className="work-page-featured-content-images">

                            <Swiper
                                className="swiper-container"
                                direction="vertical"
                                loop
                                navigation={{
                                    nextEl: '.featured-content-nav-buttons-next',
                                    prevEl: '.featured-content-nav-buttons-previous'
                                }}
                            >

                                {
                                    images.map((image, index) => (
                                        <SwiperSlide key={index} >

                                            <figure className="fig__wrapper">

                                                <Image src={image} layout='fill' priority />

                                            </figure>

                                        </SwiperSlide>
                                    ))
                                }

                            </Swiper>

                            <div className="work-page-featured-content-images-navigation">

                                <div className="featured-content-nav-indicator">

                                    <p className="featured-content-nav-indicator-current m-0">

                                        <span className="digits">

                                            {wrapInSpanCurrent(images)}

                                        </span>

                                    </p>

                                    <p className="featured-content-nav-indicator-total m-0">

                                        <span className="digits">
                                            {wrapInSpanTotal(images)}
                                        </span>

                                    </p>

                                </div>

                                <div className="featured-content-nav-buttons">

                                    <span className="frame-top grow" />

                                    <span className="frame-bottom grow" />

                                    <span className="frame-left grow" />

                                    <span className="frame-right grow" />

                                    <button
                                        className="featured-content-nav-buttons-previous featured-content-nav-button"
                                        onClick={() => {
                                            togglePosDown()
                                        }}
                                        onMouseMove={(e) => {
                                            onMouseMoveTranslateScale(e, arrowRefs.current[0], paramsArr[0], 10, 10, wrapperOffset.x, wrapperOffset.y, 0.8);
                                        }}
                                        onMouseLeave={() => {
                                            onMouseLeaveTranslateScale(arrowRefs.current[0]);
                                        }}
                                        aria-label='prev image'
                                    >

                                        <span className="frame-top grow" />

                                        <span className="frame-right grow" />

                                        <span ref={addToArrowRefs} className="featured-content-nav-buttons-arrow" />

                                    </button>

                                    <button
                                        className="featured-content-nav-buttons-next featured-content-nav-button"
                                        onClick={() => {
                                            togglePosUp()
                                        }}
                                        onMouseMove={(e) => {
                                            onMouseMoveTranslateScale(e, arrowRefs.current[1], paramsArr[1], 10, 10, wrapperOffset.x, wrapperOffset.y, 0.8);
                                        }}
                                        onMouseLeave={() => {
                                            onMouseLeaveTranslateScale(arrowRefs.current[1]);
                                        }}
                                        aria-label='next image'
                                    >

                                        <span ref={addToArrowRefs} className="featured-content-nav-buttons-arrow" />

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="work-page-featured-content-1-text__wrapper work-page-featured-content-text__wrapper">

                <div className="work-page-featured-content-1-text work-page-featured-content-text">

                    <h2 className="work-page-featured-content-text-title">
                        Overview
                    </h2>

                    <div className="work-page-featured-content-text-description">

                        {
                            execution1.overview
                                ? getOverview(execution1.overview)
                                : null
                        }

                    </div>

                </div>

            </div>

        </div >
    );
}

export default WorkPageFeaturedContent1;