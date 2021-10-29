import React, { useEffect, useRef, useState } from "react";

//Libraries
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animated } from '@react-spring/three';

//Components
import './WorkListImageMaterial';

const WorkListImagePlane = ({ uvSize, uvOffset, uvSize2, uvOffset2, tex, tex2, noiseTexture, GLColor, glParams, imageGLWrapper, imageGL, imgIndex, prevImgIndex, imageTextures, setIsHoverReady, ...props }) => {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
    }, [])

    const mesh = useRef();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {

        if (imageGL.current) {

            mesh.current.imgShowOffsetX = glParams.width / 10;
            mesh.current.imgShowOffsetY = -glParams.width / 8;

            const trigger = {
                trigger: imageGLWrapper.current,
                start: "top bottom"
            }

            gsap.timeline({
                scrollTrigger: trigger,
                delay: 1,
                onUpdate: () => {
                    if (imageGL.current) {
                        var e = 1 - imageGL.current.uniforms.animationValue1.value;
                    }

                    if (mesh.current) {
                        mesh.current.position.x = mesh.current.imgShowOffsetX * e
                        mesh.current.position.y = mesh.current.imgShowOffsetY * e
                        mesh.current.updateMatrix();
                    }
                },
                onComplete: () => {
                    setIsReady(true);
                    setIsHoverReady(true);
                }
            })
                .fromTo(imageGL.current.uniforms.animationValue1,
                    {
                        value: 0
                    },
                    {
                        duration: 1.5,
                        value: 1,
                        ease: "Power2.easeOut"
                    }, 0)
                .fromTo(imageGL.current.uniforms.animationValue2,
                    {
                        value: 0
                    },
                    {
                        duration: 1.5,
                        value: 1,
                        ease: "Power2.easeOut"
                    }, 0)
                .fromTo(imageGL.current.uniforms.alpha,
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

        if (isReady) {

            const rotation = -0.1 + 7 * (Math.random() - 0.5) / 180 * Math.PI;

            gsap.timeline({
                defaults: { overwrite: true },
                onStart: () => {
                    imageGL.current.uniforms.tex2.value = imageTextures[imgIndex - 1];
                    if (imgIndex > prevImgIndex) {
                        imageGL.current.uniforms.animationDir.value = -1;
                    } else {
                        imageGL.current.uniforms.animationDir.value = 1;
                    }
                },
                onComplete: () => {
                    imageGL.current.uniforms.tex.value = imageTextures[imgIndex - 1];
                    imageGL.current.uniforms.imgAnimationValue.value = 0;
                    imageGL.current.uniforms.imgAnimationValue2.value = 0;
                }
            })
                .to(mesh.current.rotation,
                    {
                        z: rotation,
                        duration: 1,
                        ease: 'Power2.easeOut',
                        overwrite: true
                    }, 0)
                .to(mesh.current.scale,
                    {
                        x: .94,
                        y: .94,
                        duration: .06,
                        ease: 'Power2.easeOut',
                        overwrite: true
                    }, 0)
                .to(mesh.current.scale,
                    {
                        x: 1,
                        y: 1,
                        duration: .7,
                        ease: 'Power2.easeOut',
                        overwrite: false
                    }, 0.06)
                .fromTo(imageGL.current.uniforms.imgAnimationValue,
                    {
                        value: 0
                    },
                    {
                        value: 1,
                        duration: .6,
                        ease: 'none'
                    }, 0)
                .fromTo(imageGL.current.uniforms.imgAnimationValue2,
                    {
                        value: 0
                    },
                    {
                        value: 1,
                        duration: .76,
                        ease: 'Power2.easeOut'
                    }, 0)

        }

    }, [imgIndex])


    return (
        <animated.mesh
            ref={mesh}
            {...props}
        >

            <planeBufferGeometry attach="geometry" args={[glParams.width * 0.9, glParams.height * 0.9, glParams.width * 0.4, glParams.height * 0.4]} />

            <workListImageMaterial
                uvSize={uvSize}
                uvOffset={uvOffset}
                uvSize2={uvSize2}
                uvOffset2={uvOffset2}
                tex={tex}
                tex2={tex2}
                noiseTexture={noiseTexture}
                color={GLColor}
                resolution={[glParams.width, glParams.height]}
                ref={imageGL}
            />

        </animated.mesh>
    );
}

export default WorkListImagePlane;