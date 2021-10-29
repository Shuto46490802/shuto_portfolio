import { useEffect, useRef } from "react";
//Components
import "./ErrorImageMaterial";
//Libraries
import gsap from "gsap";
import { animated } from '@react-spring/three';
import { useFrame } from "@react-three/fiber";
import lerp from "lerp";

const ImagePlane = ({ tex, args, material, mesh }) => {

    return (
        <animated.mesh
            ref={mesh}
        >

            <planeBufferGeometry attach="geometry" args={args} />

            <errorImageMaterial
                tex={tex}
                ref={material}
            />

        </animated.mesh>
    );
}

export default ImagePlane;