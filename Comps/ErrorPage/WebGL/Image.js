import React, { useEffect, useState } from 'react';

//Libraries
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import ImagePlane from "./ImagePlane";

const Image = ({ errorImage, glParams, material, mesh }) => {

    const imageTexture = useLoader(TextureLoader, errorImage);
    const args = [
        glParams.width * 0.9,
        glParams.height * 0.9,
        glParams.width,
        glParams.height,
    ];

    return (
        <ImagePlane
            tex={imageTexture}
            args={args}
            material={material}
            mesh={mesh}
        />
    );
}

export default Image;