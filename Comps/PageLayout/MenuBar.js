import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';

//Components
import { onMouseMoveTranslateScale, onMouseLeaveTranslateScale } from './animation';
import Link from './Link'

const MenuBar = ({ setIsScrollingToWorks }) => {

    const router = useRouter();
    const [paramsArr, setParamsArr] = useState([]);
    const textRefs = useRef([]);
    const addToTextRefs = (_el) => {
        if (_el && !textRefs.current.includes(_el)) {
            textRefs.current.push(_el)
        } else {
            textRefs.current = [];
        }
    };
    const [wrapperOffset, setWrapperOffset] = useState({});

    const getTextParams = () => {

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

    useEffect(() => {
        getTextParams();

        window.addEventListener('resize', () => {
            getTextParams();
        });

        return () => {
            window.removeEventListener('resize', () => {
                getTextParams();
            });
        }
    }, [])

    useEffect(() => {
        onMouseLeaveTranslateScale(textRefs.current[2])
    }, [router])


    return (
        <div className="menubar">

            <span className="frame-top grow" />

            <span className="frame-left grow" />

            <span className="frame-bottom grow" />

            <span className="frame-right grow" />

            <div
                className="menubar-link__wrapper menubar-contact text-center"
                onMouseMove={(e) => {
                    onMouseMoveTranslateScale(e, textRefs.current[0], paramsArr[0], 15, 10, wrapperOffset.x, wrapperOffset.y, 0.8);
                }}
                onMouseLeave={() => {
                    onMouseLeaveTranslateScale(textRefs.current[0])
                }}
            >

                <span className="frame-top grow" />

                <span className="frame-right grow" />

                <span className="frame-left grow" />

                <Link href="mailto:hello@shutosuganuma.com" scroll={false} ariaLabel='mail'>

                    <a
                        className="menubar-link"
                        ref={addToTextRefs}
                        aria-label='mail'
                    >

                        <span className="text-uppercase menubar-link-text">
                            contact
                        </span>

                    </a>

                </Link>

            </div>

            <div
                className="menubar-link__wrapper menubar-works text-center"
                onMouseMove={(e) => {
                    onMouseMoveTranslateScale(e, textRefs.current[1], paramsArr[1], 15, 10, wrapperOffset.x, wrapperOffset.y, 0.8);
                }}
                onMouseLeave={() => {
                    onMouseLeaveTranslateScale(textRefs.current[1])
                }}
            >
                <span className="frame-top grow" />

                <span className="frame-right grow" />

                <Link href="/" scroll={false} ariaLabel='works'>

                    <a
                        className="menubar-link"
                        ref={addToTextRefs}
                        aria-label='works'
                        onClick={() => {
                            setIsScrollingToWorks(true)
                        }}
                    >

                        <span className="text-uppercase menubar-link-text">
                            works
                        </span>

                    </a>

                </Link>

            </div>

            <div
                className={`menubar-link__wrapper menubar-profile text-center ${router.pathname.includes('profile') ? 'is-active' : ''}`}
                onMouseMove={(e) => {
                    if (!router.pathname.includes('profile')) {
                        onMouseMoveTranslateScale(e, textRefs.current[2], paramsArr[2], 15, 10, wrapperOffset.x, wrapperOffset.y, 0.8);
                    }
                }}
                onMouseLeave={() => {
                    if (!router.pathname.includes('profile')) {
                        onMouseLeaveTranslateScale(textRefs.current[2])
                    }
                }}
            >

                <span className="frame-top grow" />

                <span className="frame-right grow" />

                <Link href="/profile" scroll={false} ariaLabel='profile'>

                    <a
                        className="menubar-link"
                        ref={addToTextRefs}
                        aria-label='profile'
                    >

                        <span className="text-uppercase menubar-link-text">
                            profile
                        </span>

                    </a>

                </Link>

            </div>

        </div>
    );
}

export default MenuBar;