import React, { Suspense, useEffect, useRef, useState } from 'react';

//Components
import { onMouseMoveTranslate, onMouseLeaveTranslateScale, onMouseMoveTranslateScale } from '../PageLayout/animation';
import Link from '../PageLayout/Link';

//Libraries
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import WorkListImage from '../HomePage/WebGL/WorkLists/WorkListImage';
import { usePrevious } from 'react-use';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WorkPageOtherWorks = ({ workImages, GLColor, pathname }) => {

    const [isHoverReady, setIsHoverReady] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [imgIndex, setImgIndex] = useState(1);
    const [textIndex, setTextIndex] = useState(1);
    const [isCharsExiting, setIsCharsExiting] = useState(false);
    const prevImgIndex = usePrevious(imgIndex);

    useEffect(() => {
        setTimeout(() => {
            setIsReady(true)
        }, 1000)
        gsap.registerPlugin(ScrollTrigger);
        getTitleParams();
        getImageGLWrapperHeight();
        window.addEventListener('resize', () => {
            getImageGLWrapperHeight();
            getTitleParams();
            getArrowParams();
        });
        window.addEventListener('scroll', () => {
            getTitleParams();
            getArrowParams();
        });
        return () => {
            window.removeEventListener('resize', () => {
                getImageGLWrapperHeight();
                getTitleParams();
                getArrowParams();
            });
            window.removeEventListener('scroll', () => {
                getTitleParams();
                getArrowParams();
            });
        }
    }, [])

    const imageGLContainer = useRef();
    const imageGLWrapper = useRef();
    const [glParams, setGlParams] = useState({});
    const imageGL = useRef();

    const getImageGLWrapperHeight = () => {

        if (imageGLContainer.current) {

            const containerParams = imageGLContainer.current.getBoundingClientRect();
            const containerHeight = containerParams.height;
            const containerWidth = containerParams.width;


            imageGLWrapper.current.style.height = `${containerHeight * 1.8}px`;
            imageGLWrapper.current.style.width = `${containerWidth * 1.8}px`;

            setGlParams(containerParams);
        }

    }

    const [props, set] = useSpring(() => ({
        position: [0, 0, -1],
        // scale: [1, 1, 1],
        rotation: [0, 0, -0.05],
        config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
    }));

    const titleWrapper = useRef();
    const titleRef = useRef();
    const [titleParams, setTitleParams] = useState({});
    const [wrapperOffset, setWrapperOffset] = useState();

    const getTitleParams = () => {

        if (titleRef.current) {

            const params = titleRef.current.getBoundingClientRect();

            if (window.innerWidth > 768) {

                params.centerX = params.x + (params.width / 2) - 100;
                params.centerY = params.y + (params.height / 2) - 20;

                setWrapperOffset({
                    x: 100,
                    y: 20
                })
            } else {

                params.centerX = params.x + (params.width / 2) - 15;
                params.centerY = params.y + (params.height / 2) - 90;

                setWrapperOffset({
                    x: 15,
                    y: 90
                })
            }

            setTitleParams(params)

        }

    }

    const charRefs = useRef([]);
    const addToCharRefs = (_el) => {
        if (_el && !charRefs.current.includes(_el)) {
            charRefs.current.push(_el)
        } else {
            charRefs.current = [];
        }
    };

    const wrapInSpan = (p) => {

        const wrappedText = p
            .split("")
            .map((i) => i === "-" ? i = String.fromCharCode(160) : i = i);

        return wrappedText.map((i, key) => {

            return (
                <span
                    key={key}
                    ref={addToCharRefs}
                    className="work-page-other-works-title-char"
                >
                    {i}
                </span>
            )
        })
    };

    useEffect(() => {
        if (isReady) {
            getCharOffset(charRefs.current);
        }
    }, [isReady]);

    useEffect(() => {

        if(isCharsExiting){
            charsExit(charRefs.current);
        }else{
            charsEnter(charRefs.current);
        }

    }, [isCharsExiting])

    const charsEnter = (_arr) => {

        if (_arr.length > 0) {
            return _arr
                .map((el) => {
                    const randomX = Math.random() * 100 - 50;
                    const randomY = Math.random() * 100 - 50;

                    const randomTime = Math.random() * 0.6;

                    gsap.timeline({
                        paused: false,
                        delay: randomTime,
                    })
                        .fromTo(el,
                            {
                                opacity: 0,
                            },
                            {
                                opacity: 1,
                                duration: 0.4,
                                ease: 'linear'
                            }, 0)
                        .fromTo(el,
                            {
                                xPercent: randomX,
                                yPercent: randomY
                            },
                            {
                                xPercent: 0,
                                yPercent: 0,
                                duration: 0.8,
                                ease: 'Expo.easeOut'
                            }, 0)

                })

        }

    }

    const charsExit = (_arr) => {
        if (_arr.length > 0) {
            return _arr
                .map((el) => {
                    const randomX = Math.random() * 100 - 50;
                    const randomY = Math.random() * 100 - 50;

                    gsap.timeline({
                        paused: false,
                    })
                        .fromTo(el,
                            {
                                opacity: 1,
                            },
                            {
                                opacity: 0,
                                duration: 0.4,
                                ease: 'linear'
                            }, 0)
                        .fromTo(el,
                            {
                                xPercent: 0,
                                yPercent: 0
                            },
                            {
                                xPercent: randomX,
                                yPercent: randomY,
                                duration: 0.8,
                                ease: 'Expo.easeOut'
                            }, 0)

                })

        }
    }

    const getCharOffset = (_arr) => {

        if (_arr.length > 0) {

            const trigger = {
                trigger: imageGLWrapper.current,
                start: 'top bottom'
            };

            return _arr
                .map((el) => {
                    const randomX = Math.random() * 100 - 50;
                    const randomY = Math.random() * 100 - 50;

                    const randomTime = Math.random() * 0.6 + 2;

                    gsap.timeline({
                        paused: false,
                        delay: randomTime,
                        scrollTrigger: trigger,
                    })
                        .fromTo(el,
                            {
                                opacity: 0,
                            },
                            {
                                opacity: 1,
                                duration: 0.4,
                                ease: 'linear'
                            }, 0)
                        .fromTo(el,
                            {
                                xPercent: randomX,
                                yPercent: randomY
                            },
                            {
                                xPercent: 0,
                                yPercent: 0,
                                duration: 0.8,
                                ease: 'Expo.easeOut'
                            }, 0)

                })

        }

    };

    const arrowRefs = useRef([]);
    const addToArrowRefs = (_el) => {
        if (_el && !arrowRefs.current.includes(_el)) {
            arrowRefs.current.push(_el)
        } else {
            arrowRefs.current = [];
        }
    };

    const [paramsArr, setParamsArr] = useState();

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

    const toggleWorkUp = () => {

        if (workImages.length > imgIndex) {

            setImgIndex(imgIndex + 1)
            setIsCharsExiting(true);
            setTimeout(() => {
                setTextIndex(textIndex + 1);
                setIsCharsExiting(false);
            }, 800)
        } else {
            setImgIndex(1);
            setIsCharsExiting(true);
            setTimeout(() => {
                setTextIndex(1);
                setIsCharsExiting(false);
            }, 800)
        }
    }

    const toggleWorkDown = () => {

        if (imgIndex > 1) {

            setImgIndex(imgIndex - 1);
            setIsCharsExiting(true);
            setTimeout(() => {
                setTextIndex(textIndex - 1);
                setIsCharsExiting(false);
            }, 800)
        } else {
            setImgIndex(workImages.length);
            setIsCharsExiting(true);
            setTimeout(() => {
                setTextIndex(workImages.length);
                setIsCharsExiting(false);
            }, 800)
        }

    }

    return (
        <div className="work-page-other-works">

            <span className="frame-top grow" />

            <Link href={`/works/[slug]`} as={`/works/${workImages ? workImages[imgIndex - 1].title : ""}`} scroll={false} ariaLabel='work page'>

                <a
                    className="work-page-other-works-link text-mode"
                    aria-label='work page'
                    onPointerMove={(e) => {

                        if (isHoverReady) {

                            const x = (e.clientX / window.innerWidth) * 2 - 1
                            const y = -(e.clientY / window.innerHeight) * 2 + 1

                            set({
                                position: [x, 0, -1],
                                // scale: [1 - y * 0.01, 1 - y * 0.01, 1],
                                rotation: [-y * (Math.PI / 3) * 0.1, x * (Math.PI / 3) * 0.1, -0.05]
                            })

                        }

                        titleWrapper.current.classList.add('is-hovered');
                        onMouseMoveTranslate(e, titleRef.current, titleParams, 20, 15, wrapperOffset.x, wrapperOffset.y);

                    }}
                    onMouseLeave={() => {
                        if (isHoverReady) {

                            set({
                                position: [0, 0, -1],
                                // scale: [1, 1, 1],
                                rotation: [0, 0, -0.05],
                            })

                        }

                        titleWrapper.current.classList.remove('is-hovered');
                        onMouseLeaveTranslateScale(titleRef.current);
                    }}
                >

                    <h2 className="work-page-other-works-section-title m-0">Other works</h2>

                    <div
                        ref={titleWrapper}
                        className={`work-page-other-works-title__wrapper`}
                    >
                        {/* ${isHoverReady ? "is-playing" : ""} */}

                        <div className="work-page-other-works-title__inner">

                            <p ref={titleRef} className="work-page-other-works-title-chars m-0">

                                {
                                    workImages
                                        ? wrapInSpan(workImages[textIndex - 1].title)
                                        : null
                                }

                            </p>

                        </div>

                        <div className="work-page-other-works-image__container-copy" />

                        <div ref={imageGLContainer} className="work-page-other-works-image__container">

                            <div ref={imageGLWrapper} className="work-page-other-works-image-gl__wrapper">

                                <div className="web-gl__wrapper">

                                    <Canvas
                                        camera={{ position: [0, 0, 200] }}
                                        colorManagement={false}
                                    >

                                        <Suspense
                                            fallback={<Html center className="loading" children="" />}
                                        >

                                            <WorkListImage setIsHoverReady={setIsHoverReady} images={workImages ? workImages.map((image) => image.mediaURL) : null} GLColor={GLColor} glParams={glParams} imageGLWrapper={imageGLWrapper} imageGL={imageGL} imgIndex={imgIndex} prevImgIndex={prevImgIndex} pathname={pathname} {...props} />

                                        </Suspense>

                                    </Canvas>

                                </div>

                            </div>

                        </div>

                    </div>

                </a>

            </Link>

            <button
                className="work-page-other-works-nav-buttons-previous work-page-other-works-nav-button"
                onClick={() => {
                    toggleWorkDown();
                }}
                onMouseMove={(e) => {
                    onMouseMoveTranslateScale(e, arrowRefs.current[0], paramsArr[0], 10, 10, wrapperOffset.x, wrapperOffset.y, 0.8);
                }}
                onMouseLeave={() => {
                    onMouseLeaveTranslateScale(arrowRefs.current[0]);
                }}
                aria-label='previous work'
            >

                <span className="frame-top grow" />

                <span className="frame-right grow" />

                <span className="frame-bottom grow" />

                <span ref={addToArrowRefs} className="work-page-other-works-nav-buttons-arrow" />

            </button>

            <button
                className="work-page-other-works-nav-buttons-next work-page-other-works-nav-button"
                onClick={() => {
                    toggleWorkUp();
                }}
                onMouseMove={(e) => {
                    onMouseMoveTranslateScale(e, arrowRefs.current[1], paramsArr[1], 10, 10, wrapperOffset.x, wrapperOffset.y, 0.8);
                }}
                onMouseLeave={() => {
                    onMouseLeaveTranslateScale(arrowRefs.current[1]);
                }}
                aria-label='next work'
            >

                <span className="frame-top grow" />

                <span className="frame-left grow" />

                <span className="frame-bottom grow" />

                <span ref={addToArrowRefs} className="work-page-other-works-nav-buttons-arrow" />

            </button>


        </div >
    );
}

export default WorkPageOtherWorks;