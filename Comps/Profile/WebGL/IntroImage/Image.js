import React, { useEffect, useState } from "react";

//Libraries
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";

//Components
import ImagePlane from "../../../HomePage/WebGL/IntroImage/ImagePlane";

const Image = ({ isFirstAnimationReady, GLColor, imageGLParams, image, isGLFirstLoaded, setIsGLFirstLoaded, isReady, setIsReady, ...props }) => {

    const imageTexture = useLoader(TextureLoader, image);
    const args = [
        imageGLParams.width * 0.9,
        imageGLParams.height * 0.9,
        imageGLParams.width * 0.4,
        imageGLParams.height * 0.4,
    ];
    const { camera } = useThree();

    useEffect(() => {
        updateCameraPosition();
        window.addEventListener('resize', updateCameraPosition);
        return () => window.removeEventListener('resize', updateCameraPosition);
    }, [])


    const updateCameraPosition = () => {

        if (window.innerWidth >= 768) {
            const defaultWindowWidth = 1920;
            const defaultCameraPosZ = 800;
            const windowWidth = window.innerWidth;
            const factor = 0.6

            const newCameraPosZ = defaultCameraPosZ - ((defaultWindowWidth - windowWidth) * factor);
            camera.position.z = newCameraPosZ
        } else {
            const defaultWindowWidth = 767;
            const defaultCameraPosZ = 500;
            const windowWidth = window.innerWidth;
            const factor = 0.65

            const newCameraPosZ = defaultCameraPosZ - ((defaultWindowWidth - windowWidth) * factor);
            camera.position.z = newCameraPosZ
        }



    }

    return (
        <ImagePlane
            color={GLColor}
            args={args}
            tex={imageTexture}
            delay={1}
            imgShowOffsetX={args[0] / 10}
            imgShowOffsetY={-args[0] / 8}
            isGLFirstLoaded={isGLFirstLoaded}
            setIsGLFirstLoaded={setIsGLFirstLoaded}
            isReady={isReady}
            setIsReady={setIsReady}
            isFirstAnimationReady={isFirstAnimationReady}
            {...props}
        />
    );
}

export default Image;