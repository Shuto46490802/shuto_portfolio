import React, { useEffect, useRef } from "react";

//Libraries
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animated } from '@react-spring/three';

//Components
import './ProfileImageMaterial';

const ProfileImagePlane = ({ tex, noiseTexture, uvSize, uvOffset, profileImageRef, GLColor, args, resolution, imageGLContainer, setIsReady, ease, animationValue, alpha, imgShowOffsetX, imgShowOffsetY, ...props }) => {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, [])

    const mesh = useRef();
    const ref = useRef();

    useEffect(() => {
       
        if (profileImageRef.current) {

            mesh.current.imgShowOffsetX = imgShowOffsetX
            mesh.current.imgShowOffsetY = imgShowOffsetY

            const trigger = {
                trigger: imageGLContainer.current,
                start: "top bottom"
            }

            gsap.timeline({
                scrollTrigger: trigger,
                delay: 1,
                onUpdate: () => {
                    if (profileImageRef.current) {
                        var e = 1 - profileImageRef.current.uniforms.animationValue1.value;
                    }

                    if (mesh.current) {
                        mesh.current.position.x = mesh.current.imgShowOffsetX * e
                        mesh.current.position.y = mesh.current.imgShowOffsetY * e
                        mesh.current.updateMatrix();
                    }
                },
                onComplete: () => {
                    setIsReady(true)
                }
            })
                .fromTo(profileImageRef.current.uniforms.animationValue1,
                    {
                        value: 0
                    },
                    {
                        duration: 1.5,
                        value: 1,
                        ease: "Power2.easeOut"
                    }, 0)
                .fromTo(profileImageRef.current.uniforms.animationValue2,
                    {
                        value: 0
                    },
                    {
                        duration: 1.5,
                        value: 1,
                        ease: "Power2.easeOut"
                    }, 0)
                .fromTo(profileImageRef.current.uniforms.alpha1,
                    {
                        value: 0
                    },
                    {
                        duration: .4,
                        value: 1,
                        ease: "none"
                    }, 0)
                .fromTo(profileImageRef.current.uniforms.alpha,
                    {
                        value: 0
                    },
                    {
                        duration: .4,
                        value: 1,
                        ease: "none"
                    }, 0)

        }

    }, [])

    useEffect(() => {

        if (profileImageRef.current) {

            gsap.set(profileImageRef.current.uniforms.ease,
                {
                    value: ease
                })

            gsap.set(profileImageRef.current.uniforms.animationValue,
                {
                    value: animationValue
                })

            gsap.set(profileImageRef.current.uniforms.alpha,
                {
                    value: alpha
                })

        }

    }, [])

    return (
        <animated.mesh
            ref={mesh}
            {...props}
        >

            <planeBufferGeometry attach="geometry" args={args} />

            <profileImageMaterial
                tex={tex}
                noiseTexture={noiseTexture}
                uvSize={uvSize}
                uvOffset={uvOffset}
                color={GLColor}
                center={[0, 0]}
                maxLength={args[1]}
                resolution={resolution}
                ref={profileImageRef}
            />

        </animated.mesh>
    );
}

export default ProfileImagePlane;