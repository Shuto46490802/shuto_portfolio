import React, { useEffect, useRef, useState } from 'react';

//Components
import { onMouseMoveTranslate, onMouseLeaveTranslateScale } from '../PageLayout/animation';
import Link from '../PageLayout/Link';

const WorkPageContact = () => {

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
        <div className="work-page-contact">

            <div
                className="work-page-contact-address__wrapper"
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

                <span className="frame-top grow"/>

                <div className="work-page-contact-address__inner" >

                    <Link href="/" scroll={false} ariaLabel='home'>

                        <a className="work-page-contact-address-link text-mode2" aria-label='home'>

                            <div ref={autoScroller} className="work-page-contact-address-autoScroller">

                                <div ref={autoScrollerInner} className="work-page-contact-address-autoScroller__inner">

                                    <span ref={autoScrollerText} className="work-page-contact-address">

                                        <span className="work-page-contact-address-text">
                                            @shutosuganuma.com
                                        </span>

                                    </span>

                                    <span className="work-page-contact-address">

                                        <span className="work-page-contact-address-text">
                                            @shutosuganuma.com
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

export default WorkPageContact;