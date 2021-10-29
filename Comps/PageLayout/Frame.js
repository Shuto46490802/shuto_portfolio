import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Frame = () => {

    const top = useRef();
    const bottom = useRef();
    const left = useRef();
    const right = useRef();

    useEffect(() => {

        if (top.current) {

            gsap.timeline({
                paused: false,
                delay: 0.8
            })
                .to([top.current, bottom.current],
                    {
                        scaleX: 1,
                        duration: 1.2,
                        ease: "Power4.easeInOut"
                    }, 0)
                .to([left.current, right.current],
                    {
                        scaleY: 1,
                        duration: 1.2,
                        ease: "Power4.easeInOut"
                    }, 0)

        }
    }, [])

    return (
        <div className="frame">

            <div className="frame__inner position-relative d-block w-100 h-100">

                <span ref={top} className="frame-top" />

                <span ref={bottom} className="frame-bottom" />

                <span ref={left} className="frame-left" />

                <span ref={right} className="frame-right" />

            </div>

        </div>
    );
}

export default Frame;