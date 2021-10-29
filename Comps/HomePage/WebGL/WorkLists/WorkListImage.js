import React, { useEffect } from 'react';

//Libraries
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";

//Components
import WorkListImagePlane from "./WorkListImagePlane";

const WorkListImage = ({ images, GLColor, glParams, imageGLWrapper, setIsHoverReady, imageGL, imgIndex, prevImgIndex, pathname, ...props }) => {

    const imageTextures = useLoader(TextureLoader, images);
    const noiseTexture = useLoader(TextureLoader, '/noiseTexture.webp');

    const { camera } = useThree();

    useEffect(() => {
        updateCameraPosition();
        window.addEventListener('resize', updateCameraPosition);
        return () => window.removeEventListener('resize', updateCameraPosition);
    }, [])

    const updateCameraPosition = () => {

        if (!pathname.includes('works')) {

            if (window.innerWidth >= 768) {
                const defaultWindowWidth = 1920;
                const defaultCameraPosZ = 555;
                const windowWidth = window.innerWidth;
                const factor = 0.3

                const newCameraPosZ = defaultCameraPosZ - ((defaultWindowWidth - windowWidth) * factor);
                camera.position.z = newCameraPosZ
            } else {
                const defaultWindowWidth = 767;
                const defaultCameraPosZ = 580;
                const windowWidth = window.innerWidth;
                const factor = 0.7

                const newCameraPosZ = defaultCameraPosZ - ((defaultWindowWidth - windowWidth) * factor);
                camera.position.z = newCameraPosZ
            }

        } else {

            if (window.innerWidth > 1445) {

                camera.position.z = 530

            } else if (window.innerWidth >= 768 && window.innerWidth <= 1445) {
                const defaultWindowWidth = 1445;
                const defaultCameraPosZ = 530;
                const windowWidth = window.innerWidth;
                const factor = 0.4

                const newCameraPosZ = defaultCameraPosZ - ((defaultWindowWidth - windowWidth) * factor);
                camera.position.z = newCameraPosZ
            } else if (window.innerWidth >= 440 && window.innerWidth <= 767) {

                camera.position.z = 265

            } else {
                const defaultWindowWidth = 440;
                const defaultCameraPosZ = 265;
                const windowWidth = window.innerWidth;
                const factor = 0.65

                const newCameraPosZ = defaultCameraPosZ - ((defaultWindowWidth - windowWidth) * factor);
                camera.position.z = newCameraPosZ
            }

        }
    }

    return (
        <WorkListImagePlane
            uvSize={[1, 1]}
            uvOffset={[0, 0]}
            uvSize2={[1, 1]}
            uvOffset2={[0, 0]}
            imageTextures={imageTextures}
            tex={imageTextures[0]}
            tex2={imageTextures[0]}
            noiseTexture={noiseTexture}
            GLColor={GLColor}
            glParams={glParams}
            imageGLWrapper={imageGLWrapper}
            imageGL={imageGL}
            imgIndex={imgIndex}
            prevImgIndex={prevImgIndex}
            setIsHoverReady={setIsHoverReady}
            {...props}
        />
    );
}

export default WorkListImage;