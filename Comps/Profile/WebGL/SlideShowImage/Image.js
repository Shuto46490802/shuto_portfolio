import React, { useEffect } from "react";

//Libraries
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";

//Components
import ImagePlane from "./ImagePlane";

const Image = ({ imageGLParams, image, GLColor, imageGLContainer, setIsReady, setIsTextReady, isFirstAnimationReady, ...props }) => {

  const imageTexture = useLoader(TextureLoader, image)
  const args = [
    imageGLParams.width * 0.9,
    imageGLParams.height * 0.9,
    imageGLParams.width * 0.4,
    imageGLParams.height * 0.4
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
        const defaultCameraPosZ = 855;
        const windowWidth = window.innerWidth;
        const factor = 0.45

        const newCameraPosZ = defaultCameraPosZ - ((defaultWindowWidth - windowWidth) * factor);
        camera.position.z = newCameraPosZ
    } else {
        const defaultWindowWidth = 767;
        const defaultCameraPosZ = 510;
        const windowWidth = window.innerWidth;
        const factor = 0.7

        const newCameraPosZ = defaultCameraPosZ - ((defaultWindowWidth - windowWidth) * factor);
        camera.position.z = newCameraPosZ
    }

}

  return (
    <ImagePlane
      args={args}
      tex={imageTexture}
      color={GLColor}
      delay={1}
      imgShowOffsetX={-args[0] / 10}
      imgShowOffsetY={-args[0] / 8}
      imageGLContainer={imageGLContainer}
      setIsReady={setIsReady}
      setIsTextReady={setIsTextReady}
      isFirstAnimationReady={isFirstAnimationReady}
      {...props}
    />
  );
}

export default Image;