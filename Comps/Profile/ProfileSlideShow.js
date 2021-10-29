import React, { Suspense, useEffect, useRef, useState } from 'react';

//Libraries
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSpring } from '@react-spring/three';

//Components
import Image from './WebGL/SlideShowImage/Image';
import { onMouseMoveTranslate, onMouseLeaveTranslateScale } from '../PageLayout/animation';

const ProfileSlideShow = ({ GLColor, slideShowImages, isFirstAnimationReady }) => {

    const [isReady, setIsReady] = useState(false);
    const [isTextReady, setIsTextReady] = useState(false);

    const imageGLContainer = useRef();
    const imageGLWrapper = useRef();
    const [imageGLParams, setImageGLParams] = useState({});

    useEffect(() => {
        getImageGLWrapperHeight();
        getTextsParams();
        window.addEventListener('resize', () => {
            getImageGLWrapperHeight();
            getTextsParams();
        });
        window.addEventListener('scroll', () => {
            getTextsParams();
        })
        return () => {
            window.removeEventListener('resize', () => {
                getImageGLWrapperHeight()
                getTextsParams()
            })
            window.removeEventListener('scroll', () => {
                getTextsParams();
            })
        };
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

    }

    const [props, set] = useSpring(() => ({
        position: [0, 0, -1],
        // scale: [1, 1, 1],
        rotation: [0, 0, 0.05],
        config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
    }));

    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {

        setTimeout(() => {
            let counter = 0;

            const interval = setInterval(() => {

                if (counter === 7) {
                    counter = 0;
                    setImgIndex(0);
                } else {
                    counter++;
                    setImgIndex(imgIndex => imgIndex + 1);
                }

            }, 300);

            return () => clearInterval(interval);
        }, 1000)

    }, [])

    const quote = [
        "Passion",
        "and",
        "curiosity",
        "are",
        "the",
        "engine",
        "of",
        "achievement"
    ];

    const charWrapperRefs = useRef([]);
    const addToCharWrapperRefs = (_el) => {
        if (_el && !charWrapperRefs.current.includes(_el)) {
            charWrapperRefs.current.push(_el)
        } else {
            charWrapperRefs.current = [];
        }
    };

    const charRefs = useRef([]);
    const addToCharRefs = (_el) => {
        if (_el && !charRefs.current.includes(_el)) {
            charRefs.current.push(_el)
        } else {
            charRefs.current = [];
        }
    };

    useEffect(() => {
        getCharOffset(charRefs.current)
    }, [])

    const wrapInSpan = (p) => {

        const wrappedText = p
            .split("")
            .map((i) => i === " " ? i = String.fromCharCode(160) : i = i);

        return wrappedText.map((i, key) => {
            return (
                <span key={key} ref={addToCharRefs} className="profile-slide-show-word-char">{i}</span>
            )
        })
    };

    const getCharOffset = (_arr) => {

        return _arr
            .map((el) => {
                const randomX = Math.random() * 100 - 50;
                const randomY = Math.random() * 100 - 50;

                const randomTime = Math.random() * 0.6 + 2;

                el.style.transform = `translate3d(${randomX}%, ${randomY}%, 0px)`;
                el.style.transitionDelay = `${randomTime}s`;
            })

    };

    const [paramsArr, setParamsArr] = useState([]);
    const [wrapperOffset, setWrapperOffset] = useState({})

    const getTextsParams = () => {

        if (charWrapperRefs.current) {

            const paramsArr = charWrapperRefs.current.map((text) => text.getBoundingClientRect());

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
        <div className="profile-slide-show">

            <div className="profile-slide-show-image__wrapper">

                <div
                    className={`profile-slide-show-image-copy ${isTextReady ? "is-playing" : ""}`}
                    onPointerMove={(e) => {
                        if (isReady) {

                            const x = (e.clientX / window.innerWidth) * 2 - 1
                            const y = -(e.clientY / window.innerHeight) * 2 + 1

                            set({
                                position: [x, 0, -1],
                                // scale: [1 - y * 0.02, 1 - y * 0.02, 1],
                                rotation: [-y * (Math.PI / 3) * 0.2, x * (Math.PI / 3) * 0.2, 0.05]
                            })

                            onMouseMoveTranslate(e, charWrapperRefs.current[0], paramsArr[0], 20, 15, wrapperOffset.x, wrapperOffset.y);
                            onMouseMoveTranslate(e, charWrapperRefs.current[1], paramsArr[1], 20, 15, wrapperOffset.x, wrapperOffset.y);
                            onMouseMoveTranslate(e, charWrapperRefs.current[2], paramsArr[2], 20, 15, wrapperOffset.x, wrapperOffset.y);
                            onMouseMoveTranslate(e, charWrapperRefs.current[3], paramsArr[3], 20, 15, wrapperOffset.x, wrapperOffset.y);
                            onMouseMoveTranslate(e, charWrapperRefs.current[4], paramsArr[4], 20, 15, wrapperOffset.x, wrapperOffset.y);
                            onMouseMoveTranslate(e, charWrapperRefs.current[5], paramsArr[5], 20, 15, wrapperOffset.x, wrapperOffset.y);
                            onMouseMoveTranslate(e, charWrapperRefs.current[6], paramsArr[6], 20, 15, wrapperOffset.x, wrapperOffset.y);
                            onMouseMoveTranslate(e, charWrapperRefs.current[7], paramsArr[7], 20, 15, wrapperOffset.x, wrapperOffset.y);

                        }

                    }}
                    onPointerLeave={() => {
                        if (isReady) {

                            set({
                                position: [0, 0, -1],
                                // scale: [1, 1, 1],
                                rotation: [0, 0, 0.05],
                            })

                            onMouseLeaveTranslateScale (charWrapperRefs.current[0]);
                            onMouseLeaveTranslateScale (charWrapperRefs.current[1]);
                            onMouseLeaveTranslateScale (charWrapperRefs.current[2]);
                            onMouseLeaveTranslateScale (charWrapperRefs.current[3]);
                            onMouseLeaveTranslateScale (charWrapperRefs.current[4]);
                            onMouseLeaveTranslateScale (charWrapperRefs.current[5]);
                            onMouseLeaveTranslateScale (charWrapperRefs.current[6]);
                            onMouseLeaveTranslateScale (charWrapperRefs.current[7]);

                        }
                    }}
                >

                    <p ref={addToCharWrapperRefs} className="profile-slide-show-word profile-slide-show-word-0">
                        {wrapInSpan(quote[0])}
                    </p>

                    <p ref={addToCharWrapperRefs} className="profile-slide-show-word profile-slide-show-word-1">
                        {wrapInSpan(quote[1])}
                    </p>

                    <p ref={addToCharWrapperRefs} className="profile-slide-show-word profile-slide-show-word-2">
                        {wrapInSpan(quote[2])}
                    </p>

                    <p ref={addToCharWrapperRefs} className="profile-slide-show-word profile-slide-show-word-3">
                        {wrapInSpan(quote[3])}
                    </p>

                    <p ref={addToCharWrapperRefs} className="profile-slide-show-word profile-slide-show-word-4">
                        {wrapInSpan(quote[4])}
                    </p>

                    <p ref={addToCharWrapperRefs} className="profile-slide-show-word profile-slide-show-word-5">
                        {wrapInSpan(quote[5])}
                    </p>

                    <p ref={addToCharWrapperRefs} className="profile-slide-show-word profile-slide-show-word-6">
                        {wrapInSpan(quote[6])}
                    </p>

                    <p ref={addToCharWrapperRefs} className="profile-slide-show-word profile-slide-show-word-7">
                        {wrapInSpan(quote[7])}
                    </p>

                </div>

                <div ref={imageGLContainer} className="profile-slide-show-image">

                    <div ref={imageGLWrapper} className="profile-slide-show-image-gl__wrapper">

                        <div className="web-gl__wrapper">

                            <Canvas
                                camera={{ position: [0, 0, 440] }}
                                colorManagement={false}
                            >

                                <Suspense
                                    fallback={<Html center className="loading" children="" />}
                                >

                                    <Image isFirstAnimationReady={isFirstAnimationReady} GLColor={GLColor} imageGLParams={imageGLParams} imageGLContainer={imageGLContainer} image={slideShowImages[imgIndex].mediaURL} setIsReady={setIsReady} setIsTextReady={setIsTextReady} {...props} />

                                </Suspense>

                            </Canvas>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProfileSlideShow;