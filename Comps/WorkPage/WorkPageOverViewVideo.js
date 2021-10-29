import React, { useEffect, useRef, useState } from 'react';

//Libraries
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WorkPageOverViewVideo = ({ workPageOverviewVideo }) => {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
    }, [])

    const contentWrapper = useRef();
    const videoInner = useRef();
    const videoContainer = useRef();
    const video = useRef();

    useEffect(() => {

        if (video.current) {

            const trigger = {
                trigger: contentWrapper.current,
                start: "top bottom",
                toggleActions: "play none none reset",
            }

            gsap.timeline({
                scrollTrigger: trigger,
                ease: "Power2.easeOut",
                onStart: () => {
                    if(video.current){
                        video.current.play()
                    }
                }
            })
                .fromTo(videoInner.current,
                    {
                        scale: 0.7
                    },
                    {
                        scale: 1,
                        duration: 1
                    }, 0)
                .fromTo(videoContainer.current,
                    {
                        scale: 1.5
                    },
                    {
                        scale: 1,
                        duration: 1
                    }, 0)

        }

    }, [])

    return (
        <div ref={contentWrapper} className="work-page-content-1">

            <div className="work-page-content-1-video__wrapper">

                <div ref={videoInner} className="work-page-content-1-video__inner">

                    <figure className="fig__wrapper">

                        <div ref={videoContainer} className="work-page-content-1-video">

                            <video ref={video} src={workPageOverviewVideo} playsInline autoPlay muted loop />

                        </div>

                    </figure>

                </div>

            </div>

        </div>
    );
}

export default WorkPageOverViewVideo;