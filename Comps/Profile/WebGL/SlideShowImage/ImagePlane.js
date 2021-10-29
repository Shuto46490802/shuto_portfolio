import { useEffect, useRef } from "react";

//Components
import "./SlideShowImageMaterial";

//Libraries
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animated } from '@react-spring/three';

const ImagePlane = ({
    tex,
    color,
    args,
    delay,
    imgShowOffsetX,
    imgShowOffsetY,
    imageGLContainer,
    setIsReady,
    setIsTextReady,
    isFirstAnimationReady,
    ...props
}) => {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
    }, [])

    const mesh = useRef();
    const ref = useRef();

    useEffect(() => {

        if (isFirstAnimationReady) {

            if (ref.current) {

                const trigger = {
                    trigger: imageGLContainer.current,
                    start: "top bottom"
                }

                mesh.current.imgShowOffsetX = imgShowOffsetX
                mesh.current.imgShowOffsetY = imgShowOffsetY,

                    gsap.timeline({
                        delay: delay,
                        scrollTrigger: trigger,
                        onUpdate: () => {

                            if (ref.current) {
                                var e = 1 - ref.current.uniforms.animationValue1.value;

                            }

                            if (mesh.current) {
                                mesh.current.position.x = mesh.current.imgShowOffsetX * e
                                mesh.current.position.y = mesh.current.imgShowOffsetY * e
                                mesh.current.updateMatrix()
                            }

                        },
                        onStart: () => setIsTextReady(true),
                        onComplete: () => setIsReady(true)
                    })
                        .fromTo(ref.current.uniforms.animationValue1,
                            {
                                value: 0
                            },
                            {
                                duration: 1.5,
                                value: 1,
                                ease: "Power2.easeOut"
                            }, 0)
                        .fromTo(ref.current.uniforms.animationValue2,
                            {
                                value: 0
                            },
                            {
                                duration: 1.5,
                                value: 1,
                                ease: "Power2.easeOut"
                            }, 0)
                        .fromTo(ref.current.uniforms.alpha,
                            {
                                value: 0
                            },
                            {
                                duration: .4,
                                value: 1,
                                ease: "none"
                            }, 0)

            }

        }

    }, [isFirstAnimationReady])


    return (
        <animated.mesh
            ref={mesh}
            {...props}
        >

            <planeBufferGeometry attach="geometry" args={args} />

            <slideShowImageMaterial
                ref={ref}
                tex={tex}
                color={color}
            />

        </animated.mesh>
    );
}

export default ImagePlane;