import React, { Suspense, useEffect, useRef, useState } from 'react';

//Components
import Image from "./WebGL/Image";

//Libraries
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSpring } from '@react-spring/three';
import { gsap } from 'gsap';

const ErrorPageContent = ({ errorImage }) => {

    const content = useRef();
    const [glParams, setGlParams] = useState();

    useEffect(() => {
        getImageGLWrapperHeight();
        getViewSize();
        window.addEventListener('resize', (e) => {
            getImageGLWrapperHeight();
            getViewSize();
        })
        window.addEventListener('scroll', () => getImageGLWrapperHeight())
        return () => {
            window.removeEventListener('resize', (e) => {
                getImageGLWrapperHeight();
                getViewSize();
            })
            window.removeEventListener('scroll', () => getImageGLWrapperHeight())
        }

    }, [])

    const getImageGLWrapperHeight = () => {

        const windowWidth = window.innerWidth;

        const glWidth = windowWidth * 0.15;
        const glHeight = glWidth / 0.662;

        setGlParams({ width: glWidth, height: glHeight })
    }

    const material = useRef();
    const mesh = useRef();

    const [viewSize, setViewSize] = useState({});

    const onMouseMove = (e) => {

        if (mesh.current && material.current) {
            const mousePosX = (e.clientX / viewSize.contentWidth) * 2 - 1;
            const mousePosY = -(e.clientY / viewSize.contentHeight) * 2 + 1;

            const getPos = (mousePos, in_min, in_max, out_min, out_max) => {
                return ((mousePos - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
            };

            const x = getPos(mousePosX, -1, 1, -viewSize.width / 2, viewSize.width / 2) - viewSize.menuBarWidth;
            const y = getPos(mousePosY, -1, 1, -viewSize.height / 2, viewSize.height / 2) + viewSize.menuBarHeight;

            gsap.to(mesh.current.position,
                {
                    x: x,
                    y: y,
                    ease: "Power4.easeOut",
                    duration: 1,
                    onUpdate: () => {
                        const offset = mesh.current.position
                            .clone()
                            .sub({ x: x, y: y, z: 0 })
                            .multiplyScalar(-0.25)
                        material.current.uniforms.uOffset.value = offset;
                    }
                })
        }
    }

    const getViewSize = () => {

        if (content.current) {

            const dis = 425;
            const vFov = (75 * Math.PI) / 180;
            const height = 2 * Math.tan(vFov / 2) * dis;
            const width = height * (content.current.clientWidth / content.current.clientHeight);
            const contentWidth = content.current.clientWidth;
            const contentHeight = content.current.clientHeight;
            let menuBarWidth = 0;
            let menuBarHeight = 0;

            if (window.innerWidth >= 768) {
                menuBarWidth = 80;
                menuBarHeight = 0;
            } else {
                menuBarWidth = 0;
                menuBarHeight = 65;
            }

            setViewSize({
                width: width,
                height: height,
                vFov: vFov,
                contentWidth: contentWidth,
                contentHeight: contentHeight,
                menuBarWidth: menuBarWidth,
                menuBarHeight: menuBarHeight
            })

        }
    }

    return (
        <div
            className="error-content"
            ref={content}
            onMouseEnter={() => {
                if (material.current) {
                    gsap.to(material.current.uniforms.alpha,
                        {
                            value: 1,
                            ease: "Power2.easeOut",
                            duration: 0.5
                        })
                }
            }}
            onMouseLeave={() => {
                if (material.current) {
                    gsap.to(material.current.uniforms.alpha,
                        {
                            value: 0,
                            ease: "Power2.easeOut",
                            duration: 0.5
                        })
                }
            }}
            onMouseMove={(e) => {
                onMouseMove(e);
            }}
        >

            <div className="error-text__wrapper">

                <div className="error-text m-0">

                    <div className="error-text__inner">4</div>

                    <div className="error-text__inner">0</div>

                    <div className="error-text__inner">4</div>

                </div>

                <p className="error-sub-text">
                    Ooops... Page not found.
                </p>

            </div>

            <div className="error-canvas__wrapper">

                <Canvas
                    camera={{ position: [0, 0, 425] }}
                    colorManagement={false}
                >

                    <Suspense
                        fallback={<Html center className="loading" children="loading" />}
                    >

                        <Image errorImage={errorImage} glParams={glParams} material={material} mesh={mesh} />

                    </Suspense>

                </Canvas>

            </div>

        </div>
    );
}

export default ErrorPageContent;