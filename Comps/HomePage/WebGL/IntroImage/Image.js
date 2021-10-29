import React, { useEffect, useState } from 'react';

//Libraries
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import ImagePlane from "./ImagePlane";

const Image = ({ GLColor, homeIntroImage, isFirstAnimationReady, isGLFirstLoaded, setIsGLFirstLoaded, isReady, setIsReady, imageGLParams, ...props }) => {

    const imageTexture = useLoader(TextureLoader, homeIntroImage);
    const args = [
        imageGLParams.width * 0.9,
        imageGLParams.height * 0.9,
        imageGLParams.width * 0.4,
        imageGLParams.height * 0.4,
    ];

    return (
        <ImagePlane
            tex={imageTexture}
            color={GLColor}
            args={args}
            delay={3}
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