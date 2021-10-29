import React, { Suspense, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

//Components
import workLists from "./WorkLists";
import WorkListImage from './WebGL/WorkLists/WorkListImage';
import { onMouseMoveTranslateScale, onMouseMoveTranslate, onMouseLeaveTranslateScale } from '../PageLayout/animation';
import Link from '../PageLayout/Link';

//Libraries
import { Canvas } from '@react-three/fiber';
import { Html } from "@react-three/drei";
import { usePrevious } from 'react-use';
import { useSpring } from '@react-spring/three';
import gsap from 'gsap/gsap-core';

const HomeWorks = ({ GLColor, homeWorkImages, pathname, worksWrapper }) => {

    useEffect(() => {
        getImageGLWrapperHeight();
        getGLParams();
        getTitleParams();
        getHoverImageParams()
        window.addEventListener('resize', () => {
            getImageGLWrapperHeight();
            getGLParams();
            getTitleParams();
            getHoverImageParams()
        });
        window.addEventListener('scroll', () => {
            getTitleParams();
            getHoverImageParams();
        })
        return () => {
            window.removeEventListener('resize', () => {
                getImageGLWrapperHeight();
                getGLParams();
                getHoverImageParams();
            });
            window.removeEventListener('scroll', () => {
                getTitleParams();
                getHoverImageParams();
            })
        }
    }, [])

    const [isHovereReady, setIsHoverReady] = useState(false);
    const workListKeys = Object.keys(workLists);

    //Set the image wrapper height as 3 of the text list
    const textListRefs = useRef([]);
    const addToTextListRefs = (_el) => {
        if (_el && !textListRefs.current.includes(_el)) {
            textListRefs.current.push(_el)
        } else {
            textListRefs.current = [];
        }
    };
    const imageWrapper = useRef();
    const imageGLContainer = useRef();
    const imageGLWrapper = useRef();
    const imageGL = useRef();

    const getImageGLWrapperHeight = () => {

        if (textListRefs.current[0]) {
            const listHeight = textListRefs.current[0].clientHeight;
            const imageGLWrapperHeight = listHeight * 3;

            imageWrapper.current.style.height = `${imageGLWrapperHeight}px`
        }

        if (imageGLContainer.current) {
            const imageHeight = imageGLContainer.current.clientHeight;
            const imageWidth = imageGLContainer.current.clientWidth;
            const containerHeight = imageHeight * 1.8;
            const containerWidth = imageWidth * 1.8;

            imageGLWrapper.current.style.height = `${containerHeight}px`;
            imageGLWrapper.current.style.width = `${containerWidth}px`;
        }

    }

    //Get gl image params
    const [glParams, setGlParams] = useState({});

    const getGLParams = () => {

        if (imageGLContainer.current) {
            const params = imageGLContainer.current.getBoundingClientRect();
            setGlParams(params)
        }
    }

    //Toggle Image
    const [imgIndex, setImgIndex] = useState(1);
    const prevImgIndex = usePrevious(imgIndex);

    const [props, set] = useSpring(() => ({
        position: [0, 0, -1],
        // scale: [1, 1, 1],
        rotation: [0, 0, -0.1],
        config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
    }));

    //Title hover transform animation
    const [wrapperOffset, setWrapperOffset] = useState({});
    const titleRefs = useRef([]);
    const addToTitleRefs = (_el) => {
        if (_el && !titleRefs.current.includes(_el)) {
            titleRefs.current.push(_el)
        } else {
            titleRefs.current = [];
        }
    };
    const [paramsArr, setParamsArr] = useState([]);

    const getTitleParams = () => {

        if (titleRefs.current) {

            const paramsArr = titleRefs.current.map((title) => title.getBoundingClientRect());

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

    //Image hover animation on mobile
    const hoverImageWrappers = useRef([]);
    const addToHoverImageWrappers = (_el) => {
        if (_el && !hoverImageWrappers.current.includes(_el)) {
            hoverImageWrappers.current.push(_el)
        } else {
            hoverImageWrappers.current = [];
        }
    };

    const hoverImages = useRef([]);
    const addToHoverImages = (_el) => {
        if (_el && !hoverImages.current.includes(_el)) {
            hoverImages.current.push(_el)
        } else {
            hoverImages.current = [];
        }
    };

    const hoverImagesCopies = useRef([]);
    const addToHoverImagesCopies = (_el) => {
        if (_el && !hoverImagesCopies.current.includes(_el)) {
            hoverImagesCopies.current.push(_el)
        } else {
            hoverImagesCopies.current = [];
        }
    };

    const [hoverImageParamsArr, setHoverImageParamsArr] = useState({});

    const getHoverImageParams = () => {

        if (hoverImageWrappers.current) {

            const paramsArr = hoverImageWrappers.current.map((title) => title.getBoundingClientRect());

            if (window.innerWidth > 768) {

                paramsArr.map((params) => {
                    params.centerX = params.x + (params.width / 2) - 100;
                    params.centerY = params.y + (params.height / 2) - 20;
                })

            } else {

                paramsArr.map((params) => {
                    params.centerX = params.x + (params.width / 2) - 15;
                    params.centerY = params.y + (params.height / 2) - 90;
                })

            }

            setHoverImageParamsArr(paramsArr)

        }

    }

    const handleHoverImage = (_el, _elCopy) => {

        if (_el) {

            const rotation1 = 10 * Math.random() * Math.sign(10 * Math.random() - 5);
            const rotation2 = 5 * Math.random() * Math.sign(10 * Math.random() - 5);

            gsap.timeline({ paused: false })
                .to(_el,
                    {
                        opacity: 0.5,
                        duration: 0.4,
                        ease: 'none'
                    }, 0)
                .fromTo(_el,
                    {
                        x: 80,
                        y: 0,
                        rotate: rotation1
                    },
                    {
                        x: 0,
                        y: 0,
                        rotate: rotation2,
                        ease: 'Power4.easeOut',
                        duration: 1.2
                    }, 0)

            gsap.timeline({ paused: false })
                .to(_elCopy,
                    {
                        opacity: 1,
                        duration: 0.4,
                        ease: 'none'
                    }, 0)
                .fromTo(_elCopy,
                    {
                        x: 80,
                        y: 0,
                        rotate: rotation1
                    },
                    {
                        x: 0,
                        y: 0,
                        rotate: rotation2,
                        ease: 'Power4.easeOut',
                        duration: 1.2
                    }, 0)

        }

    }

    const handleLeaveImage = (_el, _elCopy) => {

        if (_el) {

            gsap.timeline({ paused: false })
                .to([_el, _elCopy],
                    {
                        opacity: 0,
                        duration: 0.2,
                        ease: 'none'
                    }, 0)
                .to(_el,
                    {
                        x: -80,
                        ease: 'Power4.easeOut',
                        duration: .8,
                    }, 0)

        }

    }

    return (
        <div className="home-works" ref={worksWrapper}>

            <div className="home-works-big-title__wrapper">

                <div className="home-works-big-title__container no-mobile">

                    <div className="home-works-big-title">
                        wor
                    </div>

                </div>

                <div className="home-works-big-title__container no-mobile">

                    <div className="home-works-big-title">
                        ks
                    </div>

                </div>

                <div className="home-works-big-title__container-mobile no-desk">

                    <div className="home-works-big-title-mobile">
                        Works
                    </div>

                </div>

            </div>

            <div className="home-works-introduction__wrapper">

                <div className="home-works-introduction__inner">

                    <div className="home-works-introduction-text">
                        Every website is meaningful and require a lot of
                    </div>

                    <div className="home-works-introduction-text">
                        effort to reach the goals, regardless of which
                    </div>

                    <div className="home-works-introduction-text">
                        goals you are looking to meet. I can work with
                    </div>

                    <div className="home-works-introduction-text">
                        you to reach them. Below you can see some of
                    </div>

                    <div className="home-works-introduction-text">
                        the projects that I've worked in and see my
                    </div>

                    <div className="home-works-introduction-text">
                        skill set.
                    </div>

                    <div className="home-works-introduction-text">
                        I hope you enjoy them.
                    </div>

                </div>

            </div>

            <div className="home-works-list__wrapper">

                <span className="frame-top grow" />

                <span className="frame-bottom grow no-tablet" />

                <div className="home-works-list-text__wrapper">

                    <span className="frame-right grow" />

                    <ul className="home-works-list-text-list">

                        {
                            workListKeys.map((key, index) =>

                                <li
                                    ref={addToTextListRefs}
                                    className={`home-works-list-text ${imgIndex - 1 === index ? "is-active" : ""} ${imgIndex - 1 === index ? "is-hovered" : ""}`}
                                    key={index}
                                    onMouseOver={(e) => {
                                        textListRefs.current[index].classList.add("is-hovered");
                                        setImgIndex(index + 1);
                                        handleHoverImage(hoverImages.current[index], hoverImagesCopies.current[index])
                                    }}
                                    onMouseMove={(e) => {
                                        onMouseMoveTranslateScale(e, titleRefs.current[index], paramsArr[index], 20, 15, wrapperOffset.x, wrapperOffset.y, 0.9);
                                        onMouseMoveTranslate(e, hoverImageWrappers.current[index], hoverImageParamsArr[index], 2, 2, wrapperOffset.x, wrapperOffset.y);
                                    }}
                                    onMouseLeave={() => {
                                        textListRefs.current[index].classList.remove("is-hovered");
                                        onMouseLeaveTranslateScale(titleRefs.current[index]);
                                        onMouseLeaveTranslateScale(hoverImageWrappers.current[index]);
                                        handleLeaveImage(hoverImages.current[index], hoverImagesCopies.current[index]);
                                    }}
                                >

                                    <span style={{ zIndex: '-2' }} className="frame-bottom grow" />

                                    <Link href={`/works/[slug]`} as={`/works/${workLists[key].slug}`} scroll={false} ariaLabel='workpage'>

                                        <a className="home-works-list-text-link" aria-label='workpage'>

                                            <span className="home-works-list-year">{workLists[key].year}</span>

                                            <div ref={addToTitleRefs} className="home-works-list-title__wrapper">

                                                <h2 className="home-works-list-title m-0">
                                                    {workLists[key].title}
                                                </h2>

                                            </div>

                                            <div className="home-works-subtitle__wrapper tablet">

                                                <div className="home-works-subtitle__inner">

                                                    {workLists[workListKeys[index]].subtitle.map((subtitle, index) =>
                                                        <p key={index} className="home-works-subtitle m-0">

                                                            {subtitle}

                                                        </p>
                                                    )}

                                                </div>

                                            </div>

                                        </a>

                                    </Link>

                                    <div ref={addToHoverImageWrappers} className="home-works-list-hover-image__wrapper">

                                        <div ref={addToHoverImages} className="home-works-list-hover-image">

                                            <figure className="fig__wrapper">

                                                <Image src={homeWorkImages[index].mediaURL} layout='fill' />

                                            </figure>

                                        </div>

                                        <div ref={addToHoverImagesCopies} className="home-works-list-hover-image-copy" />

                                    </div>

                                </li>

                            )
                        }

                    </ul>

                </div>

                <div
                    ref={imageWrapper}
                    className="home-works-list-image__wrapper no-tab"
                    onPointerMove={(e) => {

                        if (isHovereReady) {

                            const x = (e.clientX / window.innerWidth) * 2 - 1
                            const y = -(e.clientY / window.innerHeight) * 2 + 1

                            set({
                                position: [x, 0, -1],
                                // scale: [1 - y * 0.02, 1 - y * 0.02, 1],
                                rotation: [-y * (Math.PI / 3) * 0.2, x * (Math.PI / 3) * 0.2, -0.1]
                            })

                        }
                    }}
                    onMouseLeave={() => {
                        if (isHovereReady) {

                            set({
                                position: [0, 0, -1],
                                // scale: [1, 1, 1],
                                rotation: [0, 0, -0.1],
                            })

                        }
                    }}
                >

                    <div className="home-works-list-image__inner">

                        <Link href={`/works/[slug]`} as={`/works/${workLists[workListKeys[imgIndex - 1]].slug}`} scroll={false} ariaLabel='workpage'>

                            <a className="home-works-list-image-link text-mode" aria-label='workpage'>

                                <div ref={imageGLContainer} className="home-works-list-image__container">

                                    <div ref={imageGLWrapper} className="home-works-list-image-gl__wrapper">

                                        <div className="web-gl__wrapper">

                                            <Canvas camera={{ position: [0, 0, 525] }}>

                                                <Suspense
                                                    fallback={<Html center className="loading" children="" />}
                                                >

                                                    <WorkListImage setIsHoverReady={setIsHoverReady} images={homeWorkImages.map((image) => image.mediaURL)} GLColor={GLColor} glParams={glParams} imageGLWrapper={imageGLWrapper} imageGL={imageGL} imgIndex={imgIndex} prevImgIndex={prevImgIndex} pathname={pathname} {...props} />

                                                </Suspense>

                                            </Canvas>

                                        </div>

                                    </div>

                                </div>

                                <div className="home-works-subtitle__wrapper">

                                    {workLists[workListKeys[imgIndex - 1]].subtitle.map((subtitle, index) =>
                                        <p key={index} className="home-works-subtitle m-0">

                                            {subtitle}

                                        </p>
                                    )}

                                </div>

                            </a>

                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default HomeWorks;