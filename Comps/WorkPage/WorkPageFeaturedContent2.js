import React, { useEffect, useRef } from 'react';

//Libraries
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WorkPageFeaturedContent2 = ({ featuredVideo2, execution2 }) => {

    useEffect(() => {

        gsap.registerPlugin(ScrollTrigger);

        if (video1.current) {

            const trigger = {
                trigger: videoWrapper1.current,
                start: "top bottom",
                toggleActions: "play none none reset",
            }

            gsap.timeline({
                scrollTrigger: trigger,
                ease: "Power2.easeOut",
                onStart: () => {
                    if(video1.current){
                        video1.current.play()
                    }
                }
            })
                .fromTo(videoInner1.current,
                    {
                        scale: 0.7
                    },
                    {
                        scale: 1,
                        duration: 1
                    }, 0)
                .fromTo(videoContainer1.current,
                    {
                        scale: 1.5
                    },
                    {
                        scale: 1,
                        duration: 1
                    }, 0)

        }

        if (video2.current) {

            const trigger = {
                trigger: videoWrapper2.current,
                start: "top bottom",
                toggleActions: "play none none reset",
            }

            gsap.timeline({
                scrollTrigger: trigger,
                ease: "Power2.easeOut",
                onStart: () => {
                    if(video2.current){
                        video2.current.play()
                    }
                }
            })
                .fromTo(videoInner2.current,
                    {
                        scale: 0.7
                    },
                    {
                        scale: 1,
                        duration: 1
                    }, 0)
                .fromTo(videoContainer2.current,
                    {
                        scale: 1.5
                    },
                    {
                        scale: 1,
                        duration: 1
                    }, 0)

        }

    }, [])

    const videoWrapper1 = useRef();
    const videoWrapper2 = useRef();
    const videoInner1 = useRef();
    const videoInner2 = useRef();
    const videoContainer1 = useRef();
    const videoContainer2 = useRef();
    const video1 = useRef();
    const video2 = useRef();

    return (
        <div className="work-page-featured-content-2 work-page-featured-content">

            <div className="work-page-featured-content-2-header">

                <h2 className="work-page-featured-content-header-title m-0">
                    Execution2
                </h2>

                <div className="work-page-featured-content-header-description">

                    <p>
                        {execution2.title}
                    </p>

                </div>

            </div>

            <div ref={videoWrapper1} className="work-page-featured-content-video__wrapper work-page-featured-content-video-1__wrapper">

                <div ref={videoInner1} className="work-page-featured-content-video__inner">

                    <figure className="fig__wrapper">

                        <div ref={videoContainer1} className="work-page-featured-content-video">

                            <video ref={video1} src={featuredVideo2[0]} playsInline autoPlay muted loop />

                        </div>

                    </figure>

                </div>

            </div>

            <div ref={videoWrapper2} className="work-page-featured-content-video__wrapper">

                <div ref={videoInner2} className="work-page-featured-content-video__inner">

                    <figure className="fig__wrapper">

                        <div ref={videoContainer2} className="work-page-featured-content-video">

                            <video ref={video2} src={featuredVideo2[1]} playsInline autoPlay muted loop />

                        </div>

                    </figure>

                </div>

            </div>

        </div>
    );
}

export default WorkPageFeaturedContent2;