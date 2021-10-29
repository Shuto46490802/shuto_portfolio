import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
//Components
import PreLoader from "./PreLoader";
import ColorPalette from "./ColorPalette";
import Cursor from "./Cursor";
import MenuBar from "./MenuBar";
import LocalTime from "./LocalTime";
import Frame from "./Frame";
import Logo from "./Logo";
import PageTransitionCover from "./PageTransitionCover";
//Libraries
import { gsap } from 'gsap';

const Layout = ({ children, setTheme, GLColor, setIsFirstAnimationReady, isGLFirstLoaded, setIsScrollingToWorks }) => {

    const [isLoading, setIsLoading] = useState(false);
    const pageTransitionMesh = useRef();
    const pageTransitionMaterial = useRef();
    const [pageTransitionCenter, setPageTransitionCenter] = useState([0, 0]);
    const pageTransitionCover = useRef();
    const localTime = useRef();
    const [isExiting, setIsExiting] = useState(false);
    const [isRouteChangeComplete, setIsRouteChangeComplete] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        document.body.classList.add('page-loading');

        window.addEventListener('load', () => {
            handleLoading();
        });

        return () => {
            window.removeEventListener('load', () => {
                handleLoading();
            });
        }
    }, [])

    const handleLoading = () => {
        setTimeout(() => {
            setIsLoading(false);
            window.scrollTo(0, 1)
            setTimeout(() => {
                document.body.classList.remove('page-loading');
                document.body.classList.add('page-loaded');
                pageShow();
            }, 2400)
        }, 3000);
    }

    const router = useRouter();

    useEffect(() => {

        const onRouteChangeStart = () => {
            pageHide();
            setIsExiting(true);
            setIsFirstAnimationReady(false);
        };

        const onRouteChangeComplete = () => {
            setIsRouteChangeComplete(true);
        };

        router.events.on('routeChangeStart', () => {
            onRouteChangeStart();
        });

        router.events.on('routeChangeComplete', () => {
            onRouteChangeComplete();
        });

        return () => {
            router.events.off('routeChangeStart', () => {
                onRouteChangeStart();
            });

            router.events.off('routeChangeComplete', () => {
                onRouteChangeComplete();
            });
        }

    }, [])

    useEffect(() => {
        if (!isExiting && isRouteChangeComplete) {
            setTimeout(() => {
                pageShow();
            }, 1800)
        }
    }, [isExiting, isRouteChangeComplete])

    const pageHide = () => {

        if (pageTransitionMaterial.current) {

            gsap.timeline({
                paused: false,
                onStart: () => {
                    pageTransitionCover.current.style.zIndex = '85';
                    document.body.classList.remove('isTransitionEnded');

                },
                onComplete: () => {
                    setIsExiting(false);
                }
            })
                .fromTo(pageTransitionMaterial.current.uniforms.animationValue,
                    {
                        value: 0,
                    },
                    {
                        duration: 1.3,
                        value: 1,
                        ease: 'none'
                    })
                .fromTo(pageTransitionMaterial.current.uniforms.ease,
                    {
                        value: 0,
                    },
                    {
                        duration: 1.3,
                        value: 1,
                        ease: 'none'
                    }, 0)

        }

    }

    const pageShow = () => {

        if (pageTransitionMaterial.current) {

            gsap.timeline({
                paused: false,
                onComplete: () => {
                    pageTransitionCover.current.style.zIndex = '-1';
                    localTime.current.style.zIndex = '5001';
                    document.body.classList.add('isTransitionEnded');
                    if (isRouteChangeComplete) {
                        setIsRouteChangeComplete(false);
                    }
                },
                onStart: () => {
                    setTimeout(() => {
                        setIsFirstAnimationReady(true);
                    }, 800)
                    if (!isGLFirstLoaded) {
                        pageTransitionCover.current.style.zIndex = '100';
                    } else {
                        pageTransitionCover.current.style.zIndex = '85';
                    }

                    if (!setIsFirstAnimationReady) {
                        setTimeout(() => {
                            setIsFirstAnimationReady(true);
                        }, 800)
                    }
                }
            })
                .fromTo(pageTransitionMaterial.current.uniforms.animationValue,
                    {
                        value: 1,
                    },
                    {
                        duration: 1.3,
                        value: 0,
                        ease: 'none'
                    })
                .fromTo(pageTransitionMaterial.current.uniforms.ease,
                    {
                        value: 1,
                    },
                    {
                        duration: 1.3,
                        value: 0,
                        ease: 'none'
                    }, 0)

        }

    }

    return (
        <div
            className="layout"
            onClick={(e) => {
                const windowHeight = window.innerHeight;
                const centerX = e.clientX;
                const centerY = windowHeight - e.clientY;

                setPageTransitionCenter([centerX, centerY])
            }}
        >

            <div className="app__wrapper">

                <PreLoader isLoading={isLoading} />

                <Frame />

                <PageTransitionCover GLColor={GLColor} pageTransitionMesh={pageTransitionMesh} pageTransitionMaterial={pageTransitionMaterial} pageTransitionCenter={pageTransitionCenter} pageTransitionCover={pageTransitionCover} />

                <Logo />

                <MenuBar setIsScrollingToWorks={setIsScrollingToWorks} />

                <ColorPalette setTheme={setTheme} />

                <LocalTime localTime={localTime} />

                <Cursor isLoading={isLoading} isRouteChangeComplete={isRouteChangeComplete} />

                <div className="wrapper">

                    <main className="contents">

                        {
                            !isLoading
                                ? children
                                : null
                        }

                    </main>

                </div>

            </div>

        </div>
    );
}

export default Layout;