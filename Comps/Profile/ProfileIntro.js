import React, { Suspense, useEffect, useRef, useState } from 'react';

//Libraries
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSpring } from '@react-spring/three';

//Components
import Image from './WebGL/IntroImage/Image';

const ProfileIntro = ({ isFirstAnimationReady, GLColor, image, isGLFirstLoaded, setIsGLFirstLoaded }) => {

    const [isReady, setIsReady] = useState(false);

    const imageGLContainer = useRef();
    const imageGLWrapper = useRef();
    const [imageGLParams, setImageGLParams] = useState({});

    useEffect(() => {
        getImageGLWrapperHeight();
        window.addEventListener('resize', getImageGLWrapperHeight);
        return () => window.removeEventListener('resize', getImageGLWrapperHeight);
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
        rotation: [0, 0, -0.05],
        config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
    }));

    return (
        <div className="profile-intro">

            <div className="profile-intro-text__wrapper">

                <h2 className="profile-intro-name m-0">
                    Shuto Suganuma
                </h2>

                <div className="profile-intro-description__wrapper">

                    <p className="m-0">
                        Hello,
                        <br />
                        I'm Shuto Suganuma, Toronto-based Japanese guy, specializing in front-end web development and design.
                        <br />
                        I have been learning front-end development and design since February 2019 and my goal is to become
                        a web develper who can help people achieve their goals. I'm new in this field and inexperienced,
                        but I'm very passionate about building an innovative and creative website that help you with your goals,
                        and I will always do my best to live up to your expectations and think outside the box and face challenges 
                        with my passion and determination.
                        Thanks for your time.
                    </p>

                </div>

            </div>

            <div className="profile-intro-image__wrapper">

                <div
                    className="profile-intro-image__container-copy"
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
                />

                <div
                    ref={imageGLContainer}
                    className="profile-intro-image__container"
                >

                    <div ref={imageGLWrapper} className="profile-intro-image-gl__wrapper">

                        <div className="web-gl__wrapper">

                            <Canvas
                                camera={{ position: [0, 0, 500] }}
                                colorManagement={false}
                            >

                                <Suspense
                                    fallback={<Html center className="loading" children="" />}
                                >

                                    <Image isFirstAnimationReady={isFirstAnimationReady} GLColor={GLColor} image={image} imageGLParams={imageGLParams} isGLFirstLoaded={isGLFirstLoaded} setIsGLFirstLoaded={setIsGLFirstLoaded} isReady={isReady} setIsReady={setIsReady} {...props} />

                                </Suspense>

                            </Canvas>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProfileIntro;