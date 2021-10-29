import { useEffect, useRef } from "react";
//Components
import "./ImageMaterial";
//Libraries
import gsap from "gsap";
import { animated } from '@react-spring/three';

const ImagePlane = ({
    tex,
    color,
    args,
    delay,
    imgShowOffsetX,
    imgShowOffsetY,
    isGLFirstLoaded,
    setIsGLFirstLoaded,
    isReady,
    setIsReady,
    isFirstAnimationReady,
    ...props
}) => {

    const mesh = useRef();
    const ref = useRef();

    useEffect(() => {
        if(isFirstAnimationReady){
            animation();
        }
    }, [isFirstAnimationReady])

    const animation = () => {
        if (ref.current) {

            mesh.current.imgShowOffsetX = imgShowOffsetX
            mesh.current.imgShowOffsetY = imgShowOffsetY,

                gsap.timeline({
                    delay: delay,
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
                    onComplete: () => {
                        if (!isGLFirstLoaded) {
                            setIsGLFirstLoaded(true)
                        }

                        setIsReady(true)
                    },
                    onStart: () => {
                        if (isReady) {
                            setIsReady(false)
                        }
                    }
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


    return (
        <animated.mesh
            ref={mesh}
            {...props}
        >

            <planeBufferGeometry attach="geometry" args={args} />

            <imageMaterial
                ref={ref}
                tex={tex}
                color={color}
            />

        </animated.mesh>
    );
}

export default ImagePlane;