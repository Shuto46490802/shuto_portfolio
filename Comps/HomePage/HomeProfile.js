import React, { Suspense, useEffect, useRef, useState } from 'react';
//Libraries
import { Canvas } from '@react-three/fiber';
import { Html } from "@react-three/drei";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSpring } from '@react-spring/three';
//Components
import ProfileImage from './WebGL/ProfileImage/ProfileImage';
import Link from '../PageLayout/Link';

const HomeProfile = ({ GLColor, homeProfileImages }) => {

    const [isReady, setIsReady] = useState(false)

    const profileImage = useRef();
    const profileImage2 = useRef();
    const textSlider = useRef();
    const [glParams, setGlParams] = useState([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        getImageGLWrapperHeight();
        window.addEventListener('resize', () => {
            getImageGLWrapperHeight();
        })
        window.addEventListener('scroll', () => getImageGLWrapperHeight())
        return () => {
            window.removeEventListener('resize', () => getImageGLWrapperHeight())
            window.removeEventListener('scroll', () => getImageGLWrapperHeight())
        }

    }, [])

    const [props, set] = useSpring(() => ({
        position: [0, 0, -1],
        // scale: [1, 1, 1],
        rotation: [0, 0, 0.05],
        config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
    }));

    useEffect(() => {

        if (textSlider.current) {

            const trigger = {
                trigger: imageGLContainer.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }

            gsap.fromTo(textSlider.current,
                {
                    xPercent: 40
                },
                {
                    xPercent: 0,
                    scrollTrigger: trigger
                })

        }

    }, [])

    const imageGLContainer = useRef();
    const imageGLWrapper = useRef();
    const imageGLLink = useRef();

    const getImageGLWrapperHeight = () => {

        if (imageGLContainer.current) {

            const containerParams = imageGLContainer.current.getBoundingClientRect();
            const containerHeight = containerParams.height;
            const containerWidth = containerParams.width;


            imageGLWrapper.current.style.height = `${containerHeight * 1.8}px`;
            imageGLWrapper.current.style.width = `${containerWidth * 1.8}px`;
            imageGLLink.current.style.height = `${containerHeight}px`;
            imageGLLink.current.style.width = `${containerWidth}px`;


            setGlParams(containerParams);
        }

    }

    return (
        <div className="home-profile">

            <div className="home-profile-big-title__wrapper">

                <div className="home-profile-big-title__container no-mobile">

                    <div className="home-profile-big-title">
                        profi
                    </div>

                </div>

                <div className="home-profile-big-title__container no-mobile">

                    <div className="home-profile-big-title">
                        le
                    </div>

                </div>

                <div className="home-profile-big-title__container-mobile no-desk">

                    <div className="home-profile-big-title-mobile">
                        Profile
                    </div>

                </div>

            </div>

            <div className="home-profile-introduction__wrapper">

                <div className="home-profile-introduction__inner">

                    <div className="home-profile-introduction-text">
                        First of all, welcome to my portfolio. It is amazing
                    </div>

                    <div className="home-profile-introduction-text">
                        to have you here. My name is Shuto, I'm Japanese
                    </div>

                    <div className="home-profile-introduction-text">
                        front-end developer and designer currently based
                    </div>

                    <div className="home-profile-introduction-text">
                        in Toronto. I'm really passionate about building
                    </div>

                    <div className="home-profile-introduction-text">
                        a website that helps you achieve your goals and
                    </div>

                    <div className="home-profile-introduction-text">
                        looking to land a job as a Front-End developer.
                    </div>

                    <div className="home-profile-introduction-text">
                        I love learning new things  and challenging
                    </div>

                    <div className="home-profile-introduction-text">
                        myself to solve problems.
                    </div>

                    <div className="home-profile-introduction-text">
                        Enjoy your time here.
                    </div>

                </div>

            </div>

            <div
                className="home-profile-image__wrapper"
                onPointerMove={(e) => {

                    if (isReady) {

                        const x = (e.clientX / window.innerWidth) * 2 - 1
                        const y = -(e.clientY / window.innerHeight) * 2 + 1

                        set({
                            position: [x, 0, -1],
                            // scale: [1 - y * 0.02, 1 - y * 0.02, 1],
                            rotation: [-y * (Math.PI / 3) * 0.2, x * (Math.PI / 3) * 0.2, 0.05]
                        })

                    }
                }}
                onMouseLeave={() => {
                    if (isReady) {

                        set({
                            position: [0, 0, -1],
                            // scale: [1, 1, 1],
                            rotation: [0, 0, 0.05],
                        })

                    }
                }}
            >

                <Link href="/profile" scroll={false} ariaLabel='profile'>

                    <a className="home-profile-link text-mode" aria-label='profile'>

                        <div
                            className="home-profile-image__container-copy"
                            onMouseEnter={(e) => {
                                if (isReady) {

                                    if (profileImage.current) {
                                        gsap.timeline({
                                            onComplete: () => {
                                                profileImage.current.uniforms.ease.value = 0;
                                            },
                                            defaults: {
                                                overwrite: true
                                            }
                                        })
                                            .set(profileImage.current.uniforms.center,
                                                {
                                                    value: [e.clientX - glParams.x, glParams.bottom - e.clientY]
                                                })
                                            .to(profileImage.current.uniforms.animationValue, {
                                                value: 0,
                                                duration: 1.5,
                                                ease: "none"
                                            }, 0)
                                            .to(profileImage.current.uniforms.ease,
                                                {
                                                    value: 0,
                                                    duration: 1.5,
                                                    ease: "none"
                                                }, 0)
                                            .set(profileImage.current.uniforms.alpha, {
                                                value: 0
                                            })
                                    }

                                    if (profileImage2.current) {
                                        gsap.timeline({
                                            onComplete: () => {
                                                profileImage2.current.uniforms.ease.value = 0;
                                            },
                                            defaults: {
                                                overwrite: true
                                            },
                                        })
                                            .set(profileImage2.current.uniforms.center,
                                                {
                                                    value: [glParams.width - (e.clientX - glParams.x), e.clientY - glParams.y]
                                                })
                                            .set(profileImage2.current.uniforms.alpha,
                                                {
                                                    value: 1
                                                })
                                            .to(profileImage2.current.uniforms.animationValue, {
                                                value: 1,
                                                duration: 1.5,
                                                ease: "none"
                                            }, 0)
                                            .to(profileImage2.current.uniforms.ease,
                                                {
                                                    value: 1,
                                                    duration: 1.5,
                                                    ease: "none"
                                                }, 0)


                                    }

                                }

                            }}
                            onMouseLeave={() => {
                                if (isReady) {

                                    if (profileImage.current) {
                                        gsap.timeline({
                                            onComplete: () => {
                                                profileImage.current.uniforms.ease.value = 1;
                                            },
                                            defaults: {
                                                overwrite: true
                                            },
                                        })
                                            .set(profileImage.current.uniforms.alpha,
                                                {
                                                    value: 1
                                                })
                                            .to(profileImage.current.uniforms.animationValue, {
                                                duration: 1.5,
                                                value: 1,
                                                ease: "none"
                                            }, 0)
                                            .to(profileImage.current.uniforms.ease,
                                                {
                                                    duration: 1.5,
                                                    value: 1,
                                                    ease: "none"
                                                }, 0)
                                    }

                                    if (profileImage2.current) {
                                        gsap.timeline({
                                            onComplete: () => {
                                                profileImage2.current.uniforms.ease.value = 1;
                                            },
                                            defaults: {
                                                overwrite: true
                                            }
                                        })
                                            .to(profileImage2.current.uniforms.animationValue, {
                                                duration: 1.5,
                                                value: 0,
                                                ease: "none"
                                            }, 0)
                                            .to(profileImage2.current.uniforms.ease,
                                                {
                                                    duration: 1.5,
                                                    value: 0,
                                                    ease: "none"
                                                }, 0)
                                            .set(profileImage2.current.uniforms.alpha,
                                                {
                                                    value: 0
                                                })
                                    }

                                }
                            }}
                        >

                            <Link href="/profile" scroll={false} ariaLabel='profile'>

                                <a ref={imageGLLink} aria-label='profile' className="home-profile-link text-mode position-absolute t-0 l-0">
                                </a>

                            </Link>

                        </div>

                        <div
                            className="home-profile-text-slider__wrapper"
                            onMouseOver={() => {
                                textSlider.current.classList.add("is-hovered")
                            }}
                            onMouseLeave={() => {
                                textSlider.current.classList.remove("is-hovered")
                            }}>

                            <Link href="/profile" scroll={false} ariaLabel='profile'>

                                <a className="home-profile-link text-mode" aria-label='profile'>

                                    <div ref={textSlider} className="home-profile-text-slider__inner">

                                        <h2 className="home-profile-text-slider m-0">Web Designer ― Web Developer ― Photographer</h2>

                                    </div>

                                </a>

                            </Link>

                        </div>

                        <div ref={imageGLContainer} className="home-profile-image__container">

                            <div ref={imageGLWrapper} className="home-profile-image-gl__wrapper">

                                <div className="web-gl__wrapper">

                                    <Canvas
                                        camera={{ position: [0, 0, 510] }}
                                        colorManagement={false}
                                    >

                                        <Suspense
                                            fallback={<Html center className="loading" children="" />}
                                        >

                                            <ProfileImage
                                                image={homeProfileImages[0].mediaURL}
                                                profileImageRef={profileImage}
                                                imageGLContainer={imageGLContainer}
                                                GLColor={GLColor}
                                                setIsReady={setIsReady}
                                                glParams={glParams}
                                                ease={1}
                                                animationValue={1}
                                                {...props}
                                            />

                                            <ProfileImage
                                                image={homeProfileImages[1].mediaURL}
                                                profileImageRef={profileImage2}
                                                imageGLContainer={imageGLContainer}
                                                GLColor={GLColor}
                                                setIsReady={setIsReady}
                                                glParams={glParams}
                                                ease={0}
                                                animationValue={0}
                                                {...props}
                                            />

                                        </Suspense>

                                    </Canvas>

                                </div>

                            </div>

                        </div>

                    </a>

                </Link>

            </div>

        </div>
    );
}

export default HomeProfile;