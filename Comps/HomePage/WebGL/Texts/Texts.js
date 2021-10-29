import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

//Libraries
import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

//components
import TextPlane from "./TextPlane";
import frames from "./Chars";

const Texts = ({ GLColor, isGLFirstLoaded, isFirstAnimationReady }) => {

    const noiseTexture = useLoader(TextureLoader, '/noiseTexture.webp');
    const charKeys = Object.keys(frames.chars);
    const textTexture = useLoader(TextureLoader, charKeys.map((key) => frames.chars[`${key}`].img));

    const { size, camera } = useThree();
    const canvasWidth = size.width;
    const margin = window.innerWidth >= 768 ? 120 : 30
    // const viewportRatio = (window.innerWidth - margin) / frames.meta.size.w;
    const [viewportRatio, setViewportRatio] = useState(0);

    const randomValues = [];
    for (let i = charKeys.length; i >= 0, i--;) {

        let value = Math.random() * (1.5 - 0.5) + 0.5

        randomValues.push(value)
    };

    useEffect(() => {
        updateCameraPosition();
        getViewportRatio();
        window.addEventListener('resize', () => {
            updateCameraPosition();
            getViewportRatio();
        });
        return () => window.removeEventListener('resize', () => {
            updateCameraPosition();
            getViewportRatio();
        });
    }, [])

    const updateCameraPosition = () => {

        if (window.innerWidth >= 768) {
            const defaultWindowWidth = 1920;
            const defaultCameraPosZ = 880;
            const windowWidth = window.innerWidth;
            const factor = 0.55

            const newCameraPosZ = defaultCameraPosZ - ((defaultWindowWidth - windowWidth) * factor);
            camera.position.z = newCameraPosZ
        } else {
            const defaultWindowWidth = 767;
            const defaultCameraPosZ = 485;
            const windowWidth = window.innerWidth;
            const factor = 0.6

            const newCameraPosZ = defaultCameraPosZ - ((defaultWindowWidth - windowWidth) * factor);
            camera.position.z = newCameraPosZ
        }

    }

    const getViewportRatio = () => {
        let viewportRatio = 0

        if (window.innerWidth >= 768) {
            const margin = 120
            const defaultWindowWidth = 1920;
            const windowWidth = window.innerWidth - margin;
            const defaultViewport = 0.87
            const factor = 0.05

            viewportRatio = defaultViewport - ((defaultWindowWidth - windowWidth) / 100 * factor)
        } else {

            const margin = 30
            const defaultWindowWidth = 767;
            const windowWidth = window.innerWidth - margin;
            const defaultViewport = 0.36
            const factor = 0.05

            viewportRatio = defaultViewport - ((defaultWindowWidth - windowWidth) / 100 * factor)

        }

        setViewportRatio(viewportRatio)
    }

    return (
        <>

            {
                textTexture.map((texture, i) =>
                    <TextPlane
                        key={i}
                        noiseTexture={noiseTexture}
                        tex={texture}
                        color={GLColor}
                        uvSize={[1, 1]}
                        uvOffset={[0, 0]}
                        geometryScale={new THREE.Vector2(frames.chars[`${charKeys[i]}`].size.w * viewportRatio, frames.chars[`${charKeys[i]}`].size.h * viewportRatio)}
                        offset={new THREE.Vector2(frames.chars[`${charKeys[i]}`].offset.x * viewportRatio, frames.chars[`${charKeys[i]}`].offset.y * viewportRatio)}
                        delay={randomValues[i]}
                        isFirstAnimationReady={isFirstAnimationReady}
                    />
                )
            }

        </>
    );
}

export default Texts;