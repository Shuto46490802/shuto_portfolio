import React, { Suspense, useEffect, useRef, useState } from 'react';

//Libraries
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSpring } from '@react-spring/three';
import * as THREE from 'three';

//Components
import Texts from './WebGL/Texts/Texts';
import Image from './WebGL/IntroImage/Image';
import { onMouseMoveTranslate, onMouseLeaveTranslateScale } from '../PageLayout/animation';

const HomeIntro = ({ GLColor, homeIntroImage, isFirstAnimationReady, isGLFirstLoaded, setIsGLFirstLoaded }) => {

    const [isReady, setIsReady] = useState(false);
    const content = useRef();

    const [props, set] = useSpring(() => ({
        position: [0, 0, -1],
        // scale: [1, 1, 1],
        rotation: [0, 0, -0.1],
        config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
    }));

    const imageWrapper = useRef();
    const textsWrapper = useRef();
    const imageGLContainer = useRef();
    const imageGLWrapper = useRef();
    const [imageGLParams, setImageGLParams] = useState({});

    useEffect(() => {
        console.log(window.devicePixelRatio)
        getCharOffset(charRefs.current);
        getTextsParams();
        getImageGLWrapperHeight()
        window.addEventListener('resize', () => {
            getTextsParams();
            getImageGLWrapperHeight();
        });
        window.addEventListener('scroll', () => {
            getTextsParams();
        })
        return () => {
            window.removeEventListener('resize', () => {
                getTextsParams();
                getImageGLWrapperHeight();
            });
            window.removeEventListener('scroll', () => {
                getTextsParams();
            })
        }
    }, [])

    const getImageGLWrapperHeight = () => {

        if (imageGLContainer.current) {

            const containerParams = imageGLContainer.current.getBoundingClientRect();
            const containerHeight = containerParams.height;
            const containerWidth = containerParams.width;


            imageGLWrapper.current.style.height = `${containerHeight * 1.8}px`;
            imageGLWrapper.current.style.width = `${containerWidth * 1.8}px`;

            setImageGLParams(containerParams);
        }

        if (imageWrapper.current) {
            const imageWrapperHeight = imageWrapper.current.clientHeight;
            textsWrapper.current.style.height = `${imageWrapperHeight}px`
        }

    }

    //Quote
    const quotes = [
        `It's all about the journey, not the outcome.`,
        `Success is the sum of small efforts, repeated day in and day out.`,
        `If at first I don’t succeed, try over and over again.`,
        `Never stop investing in my own growth and self-development.`,
        `I don’t wait for an opportunity to come, but create one.`
    ]
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
            .map((i) => i === " " ? i = String.fromCharCode(160) : i = i);

        return wrappedText.map((i, key) => {
            return (
                <span key={key} ref={addToCharRefs} className="home-logo-char">{i}</span>
            )
        })
    };

    const getCharOffset = (_arr) => {

        return _arr
            .map((el) => {
                const randomX = Math.random() * 200 - 100;
                const randomY = Math.random() * 200 - 100;

                const randomTime = Math.random() * 0.6

                el.style.transform = `translate3d(${randomX}%, ${randomY}%, 0px)`;
                el.style.transitionDelay = `${randomTime}s`;
            })

    };

    const [elIndex, setElIndex] = useState(0);
    useEffect(() => {
        if (isFirstAnimationReady) {
            let counter = 0;

            const interval = setInterval(() => {

                if (counter === 5) {
                    counter = 1;
                    setElIndex(1);
                } else {
                    counter++;
                    setElIndex(elIndex => elIndex + 1);
                }

            }, 7000);

            return () => clearInterval(interval);

        }
    }, [isFirstAnimationReady])

    //Text hover transform
    const textRefs = useRef([]);
    const addToTextRefs = (_el) => {
        if (_el && !textRefs.current.includes(_el)) {
            textRefs.current.push(_el)
        } else {
            textRefs.current = [];
        }
    };

    const [paramsArr, setParamsArr] = useState([]);
    const [wrapperOffset, setWrapperOffset] = useState({})

    const getTextsParams = () => {

        if (textRefs.current) {

            const paramsArr = textRefs.current.map((text) => text.getBoundingClientRect());

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

    return (
        <div
            className="home-intro"
            ref={content}
            onPointerMove={(e) => {
                if (isReady) {

                    const x = (e.clientX / window.innerWidth) * 2 - 1
                    const y = -(e.clientY / window.innerHeight) * 2 + 1

                    set({
                        position: [x, 0, -1],
                        // scale: [1 - y * 0.02, 1 - y * 0.02, 1],
                        rotation: [-y * (Math.PI / 3) * 0.2, x * (Math.PI / 3) * 0.2, -0.05]
                    })

                }

            }}
            onPointerLeave={() => {
                if (isReady) {

                    set({
                        position: [0, 0, -1],
                        // scale: [1, 1, 1],
                        rotation: [0, 0, -0.05],
                    })

                }
            }}
        >

            <div ref={imageWrapper} className="home-intro-image__wrapper">

                <div ref={imageGLContainer} className="home-intro-image__container">

                    <div ref={imageGLWrapper} className="home-logo-image-gl__wrapper">

                        <div className="web-gl__wrapper">

                            <Canvas
                                camera={{ position: [0, 0, 425] }}
                                colorManagement={false}
                            >

                                <Suspense
                                    fallback={<Html center className="loading" children="" />}
                                >

                                    <Texts isFirstAnimationReady={isFirstAnimationReady} GLColor={GLColor} isGLFirstLoaded={isGLFirstLoaded} />

                                    <Image {...props} isFirstAnimationReady={isFirstAnimationReady} GLColor={GLColor} homeIntroImage={homeIntroImage} isGLFirstLoaded={isGLFirstLoaded} setIsGLFirstLoaded={setIsGLFirstLoaded} isReady={isReady} setIsReady={setIsReady} imageGLParams={imageGLParams} />

                                </Suspense>

                            </Canvas>

                        </div>

                    </div>

                </div>

            </div>

            <div
                className="home-logo-texts"
                ref={textsWrapper}
                onPointerMove={(e) => {
                    if (isReady) {

                        const x = (e.clientX / window.innerWidth) * 2 - 1
                        const y = -(e.clientY / window.innerHeight) * 2 + 1

                        set({
                            position: [x, 0, -1],
                            scale: [1 - y * 0.01, 1 - y * 0.01, 1],
                            rotation: [-y * (Math.PI / 3) * 0.1, x * (Math.PI / 3) * 0.1, -0.1]
                        })

                        onMouseMoveTranslate(e, textRefs.current[0], paramsArr[0], 20, 15, wrapperOffset.x, wrapperOffset.y);
                        onMouseMoveTranslate(e, textRefs.current[1], paramsArr[1], 20, 15, wrapperOffset.x, wrapperOffset.y);
                        onMouseMoveTranslate(e, textRefs.current[2], paramsArr[2], 20, 15, wrapperOffset.x, wrapperOffset.y);
                        onMouseMoveTranslate(e, textRefs.current[3], paramsArr[3], 20, 15, wrapperOffset.x, wrapperOffset.y);
                        onMouseMoveTranslate(e, textRefs.current[4], paramsArr[4], 20, 15, wrapperOffset.x, wrapperOffset.y);
                    }

                }}
                onPointerLeave={() => {
                    if (isReady) {

                        set({
                            position: [0, 0, -1],
                            scale: [1, 1, 1],
                            rotation: [0, 0, -0.1],
                        })
                        onMouseLeaveTranslateScale(textRefs.current[0]);
                        onMouseLeaveTranslateScale(textRefs.current[1]);
                        onMouseLeaveTranslateScale(textRefs.current[2]);
                        onMouseLeaveTranslateScale(textRefs.current[3]);
                        onMouseLeaveTranslateScale(textRefs.current[4]);
                    }
                }}
            >

                <div className="home-logo-texts__inner">

                    <div className="home-logo-text home-logo-text__1">

                        <p
                            className={`home-logo-text__inner ${elIndex === 1 ? "is-playing" : ""}`}
                            ref={addToTextRefs}
                        >

                            {wrapInSpan(quotes[0])}

                        </p>

                    </div>

                    <div className="home-logo-text home-logo-text__2">

                        <p
                            className={`home-logo-text__inner ${elIndex === 2 ? "is-playing" : ""}`}
                            ref={addToTextRefs}
                        >

                            {wrapInSpan(quotes[1])}

                        </p>

                    </div>

                    <div className="home-logo-text home-logo-text__3" >

                        <p
                            className={`home-logo-text__inner ${elIndex === 3 ? "is-playing" : ""}`}
                            ref={addToTextRefs}
                        >

                            {wrapInSpan(quotes[2])}

                        </p>

                    </div>

                    <div className="home-logo-text home-logo-text__4" >

                        <p
                            className={`home-logo-text__inner ${elIndex === 4 ? "is-playing" : ""}`}
                            ref={addToTextRefs}
                        >

                            {wrapInSpan(quotes[3])}

                        </p>

                    </div>

                    <div className="home-logo-text home-logo-text__5">

                        <p
                            className={`home-logo-text__inner ${elIndex === 5 ? "is-playing" : ""}`}
                            ref={addToTextRefs}
                        >

                            {wrapInSpan(quotes[4])}

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default HomeIntro;