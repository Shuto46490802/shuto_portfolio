import React, { useEffect } from 'react';

//Comppnents
import ProfileImagePlane from "./ProfileImagePlane";

//Libraries
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";

const ProfileImage = ({ image, profileImageRef, GLColor, imageGLContainer, setIsReady, ease, animationValue, alpha, imgShowOffsetX, imgShowOffsetY, glParams, ...props }) => {

    const imageTexture = useLoader(TextureLoader, image);
    const noiseTexture = useLoader(TextureLoader, '/noiseTexture.webp');
    const { camera } = useThree();
    const args = [glParams.width * 0.9, glParams.height * 0.9, glParams.width * 0.4, glParams.height * 0.4];
    const resolution = [glParams.width, glParams.height];

    useEffect(() => {
        updateCameraPosition();
        window.addEventListener('resize', updateCameraPosition);
        return () => window.removeEventListener('resize', updateCameraPosition);
    }, [])

    const updateCameraPosition = () => {

        if (window.innerWidth >= 768) {
            const defaultWindowWidth = 1920;
            const defaultCameraPosZ = 870;
            const windowWidth = window.innerWidth;
            const factor = 0.5

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
    }

    return (
        <ProfileImagePlane
            tex={imageTexture}
            noiseTexture={noiseTexture}
            uvSize={[1, 1]}
            uvOffset={[0, 0]}
            profileImageRef={profileImageRef}
            GLColor={GLColor}
            args={args}
            resolution={resolution}
            imageGLContainer={imageGLContainer}
            setIsReady={setIsReady}
            ease={ease}
            animationValue={animationValue}
            alpha={0}
            imgShowOffsetX={-args[0] / 10}
            imgShowOffsetY={-args[0] / 6}
            {...props}
        />
    );
}

export default ProfileImage;