import React, { useEffect, useRef, useState } from 'react';

//Components 
import { onMouseMoveTranslateRotate, onMouseLeaveTranslateRotate } from '../PageLayout/animation'
import Link from '../PageLayout/Link';

const ProfileContact = () => {

    const request = useRef();
    const autoScrollerInner1 = useRef();
    const autoScrollerInner2 = useRef();
    const autoScrollerInner3 = useRef();
    const autoScrollerText1 = useRef();
    const autoScrollerText2 = useRef();
    const autoScrollerText3 = useRef();
    const offsetX1 = useRef();
    const offsetX2 = useRef(null);
    const offsetX3 = useRef();

    useEffect(() => {
        request.current = requestAnimationFrame(animationLoop);
        offsetX1.current = 0;
        offsetX2.current = -autoScrollerText2.current.clientWidth;
        offsetX3.current = 0;
        window.addEventListener('resize', getAutoScrollerParams);
        window.addEventListener('scroll', getAutoScrollerParams);
        return () => {
            cancelAnimationFrame(request.current);
            window.removeEventListener('resize', getAutoScrollerParams)
            window.removeEventListener('scroll', getAutoScrollerParams);
        }
    }, [])

    const animate = () => {

        if (autoScrollerText1.current) {

            if (offsetX1.current <= autoScrollerText1.current.clientWidth) {
                offsetX1.current = offsetX1.current + 1.5;
                autoScrollerInner1.current.style.transform = `translate3d(-${offsetX1.current}px, 0px, 0px)`
            }

        }

        if (autoScrollerText2.current) {

            if (offsetX2.current <= 0) {
                offsetX2.current = offsetX2.current + 1.5;
                autoScrollerInner2.current.style.transform = `translate3d(${offsetX2.current}px, 0px, 0px)`
            }

        }

        if (autoScrollerText3.current) {

            if (offsetX3.current <= autoScrollerText3.current.clientWidth) {
                offsetX3.current = offsetX3.current + 1.5;
                autoScrollerInner3.current.style.transform = `translate3d(-${offsetX3.current}px, 0px, 0px)`
            }

        }

    }

    const animationLoop = () => {

        if (autoScrollerText1.current) {

            if (offsetX1.current >= autoScrollerText1.current.clientWidth) {
                offsetX1.current = 0;
            }

        }

        if (autoScrollerText2.current) {

            if (offsetX2.current >= 0) {
                offsetX2.current = -autoScrollerText2.current.clientWidth;
            }

        }

        if (autoScrollerText3.current) {

            if (offsetX3.current >= autoScrollerText3.current.clientWidth) {
                offsetX3.current = 0;
            }

        }

        animate();
        request.current = requestAnimationFrame(animationLoop)
    }

    const autoScrollerContainer = useRef();
    const autoScroller1 = useRef();
    const autoScroller2 = useRef();
    const autoScroller3 = useRef();
    const [params, setParams] = useState({});
    const [wrapperOffset, setWrapperOffset] = useState({});

    const getAutoScrollerParams = () => {

        if (autoScrollerContainer.current) {

            const params = autoScrollerContainer.current.getBoundingClientRect();

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
        <div
            className="profile-contact"
            onMouseMove={(e) => {
                onMouseMoveTranslateRotate(e, autoScroller1.current, params, 20, 10, wrapperOffset.x, wrapperOffset.y);
                onMouseMoveTranslateRotate(e, autoScroller2.current, params, 20, 10, wrapperOffset.x, wrapperOffset.y);
                onMouseMoveTranslateRotate(e, autoScroller3.current, params, 20, 10, wrapperOffset.x, wrapperOffset.y);
            }}
            onMouseOver={() => {
                autoScrollerContainer.current.classList.add("is-hovered");
            }}
            onMouseLeave={() => {
                autoScrollerContainer.current.classList.remove("is-hovered");
                onMouseLeaveTranslateRotate(autoScroller1.current);
                onMouseLeaveTranslateRotate(autoScroller2.current);
                onMouseLeaveTranslateRotate(autoScroller3.current);
            }}
        >

            <span className="frame-top grow" />

            <Link href="mailto:hello@shutosuganuma.com" scroll={false} ariaLabel='mail'>

                <a className="profile-contact__inner text-mode2" aria-label='mail'>

                    <div ref={autoScrollerContainer} className="profile-contact-text__container">

                        <div ref={autoScroller1} className="profile-contact-autoScroller">

                            <div ref={autoScrollerInner1} className="profile-contact-autoScroller__inner">

                                <span ref={autoScrollerText1} className="profile-contact-autoScroller-text">

                                    <span className="profile-contact-autoScroller-text__inner">
                                        get in touch get in touch
                                    </span>

                                </span>

                                <span className="profile-contact-autoScroller-text">

                                    <span className="profile-contact-autoScroller-text__inner">
                                        get in touch get in touch
                                    </span>

                                </span>

                            </div>

                        </div>

                        <div ref={autoScroller2} className="profile-contact-autoScroller">

                            <div ref={autoScrollerInner2} className="profile-contact-autoScroller__inner">

                                <span ref={autoScrollerText2} className="profile-contact-autoScroller-text">

                                    <span className="profile-contact-autoScroller-text__inner">
                                        Let's work together.
                                    </span>

                                </span>

                                <span className="profile-contact-autoScroller-text">

                                    <span className="profile-contact-autoScroller-text__inner">
                                        Let's work together.
                                    </span>

                                </span>

                            </div>

                        </div>

                        <div ref={autoScroller3} className="profile-contact-autoScroller">

                            <div ref={autoScrollerInner3} className="profile-contact-autoScroller__inner">

                                <span ref={autoScrollerText3} className="profile-contact-autoScroller-text">

                                    <span className="profile-contact-autoScroller-text__inner">
                                        @shuto
                                        <span className="profile-contact-underscore">_</span>
                                        suganuma
                                    </span>

                                </span>

                                <span className="profile-contact-autoScroller-text">

                                    <span className="profile-contact-autoScroller-text__inner">
                                        @shuto
                                        <span className="profile-contact-underscore">_</span>
                                        suganuma
                                    </span>
                                </span>

                            </div>

                        </div>


                    </div>

                </a>

            </Link>

        </div>
    );
}

export default ProfileContact;