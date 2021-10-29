import React, { useEffect, useRef, useState } from 'react';

//Components
import { onMouseMoveTranslate, onMouseLeaveTranslateScale } from '../PageLayout/animation';
import Link from '../PageLayout/Link';

const HomeContact = () => {

    const request = useRef();
    const autoScrollerInner = useRef();
    const autoScrollerText = useRef();

    useEffect(() => {
        getAutoScrollerParams();
        request.current = requestAnimationFrame(animationLoop);
        window.addEventListener('resize', getAutoScrollerParams);
        window.addEventListener('scroll', getAutoScrollerParams);
        return () => {
            cancelAnimationFrame(request.current);
            window.removeEventListener('resize', getAutoScrollerParams)
            window.removeEventListener('scroll', getAutoScrollerParams);
        }
    }, [])

    var offsetX = 0;

    const animate = () => {
        if (autoScrollerText.current) {

            if (offsetX <= autoScrollerText.current.clientWidth) {
                offsetX = offsetX + 1.5;
                autoScrollerInner.current.style.transform = `translate3d(-${offsetX}px, 0px, 0px)`
            }

        }
    }

    const animationLoop = () => {

        if (autoScrollerText.current) {

            if (offsetX >= autoScrollerText.current.clientWidth) {
                offsetX = 0
            }

        }
        animate();
        request.current = requestAnimationFrame(animationLoop)
    }

    const [params, setParams] = useState({});
    const autoScroller = useRef();
    const [wrapperOffset, setWrapperOffset] = useState({});

    const getAutoScrollerParams = () => {

        if (autoScroller.current) {

            const params = autoScroller.current.getBoundingClientRect();

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

            setParams(params)

        }

    }

    return (
        <div className="home-contact">

            <div className="home-contact-big-title__wrapper">

                <div className="home-contact-big-title__container no-mobile">

                    <div className="home-contact-big-title">
                        conta
                    </div>

                </div>

                <div className="home-contact-big-title__container no-mobile">

                    <div className="home-contact-big-title">
                        ct
                    </div>

                </div>

                <div className="home-contact-big-title__container-mobile no-desk">

                    <div className="home-contact-big-title-mobile">
                        contact
                    </div>

                </div>

            </div>

            <div className="home-contact-introduction__wrapper">

                <div className="home-contact-introduction__inner">

                    <div className="home-contact-introduction-text">
                        Thank you so much for visiting my portfolio
                    </div>

                    <div className="home-contact-introduction-text">
                        website. I hope you enjoyed it and got to know
                    </div>

                    <div className="home-contact-introduction-text">
                        me. Now that you already know me, it is time to
                    </div>

                    <div className="home-contact-introduction-text">
                        start building something amazing and achieving
                    </div>

                    <div className="home-contact-introduction-text">
                        your goals together with me.
                    </div>

                    <div className="home-contact-introduction-text">
                        Click the address below and say hi.
                    </div>

                </div>

            </div>

            <div
                className="home-contact-address__wrapper"
                onMouseMove={(e) => {
                    onMouseMoveTranslate(e, autoScroller.current, params, 20, 10, wrapperOffset.x, wrapperOffset.y);
                }}
                onMouseOver={() => {
                    autoScrollerInner.current.classList.add("is-hovered");
                }}
                onMouseLeave={() => {
                    autoScrollerInner.current.classList.remove("is-hovered");
                    onMouseLeaveTranslateScale(autoScroller.current);
                }}
            >

                <span className="frame-top grow" />

                <div className="home-contact-address__inner" >

                    <Link href="mailto:hello@shutosuganuma.com" scroll={false} ariaLabel='mail'>

                        <a className="home-contact-address-link text-mode2" aria-label='mail'>

                            <div ref={autoScroller} className="home-contact-address-autoScroller">

                                <div ref={autoScrollerInner} className="home-contact-address-autoScroller__inner">

                                    <span ref={autoScrollerText} className="home-contact-address">

                                        <span className="home-contact-address-text">
                                            hello@shutosuganuma.com
                                        </span>

                                    </span>

                                    <span className="home-contact-address">

                                        <span className="home-contact-address-text">
                                            hello@shutosuganuma.com
                                        </span>

                                    </span>

                                </div>

                            </div>

                        </a>

                    </Link>

                </div>

            </div>

        </div>
    );
}

export default HomeContact;