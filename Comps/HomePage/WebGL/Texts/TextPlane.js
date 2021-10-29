import React, { useEffect, useRef } from "react";
import "./TextMaterial";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";

const TextPlane = ({
    noiseTexture,
    uvSize,
    uvOffset,
    color,
    offset,
    geometryScale,
    tex,
    delay,
    isFirstAnimationReady,
    ...props
}) => {

    const ref = useRef();
    const mesh = useRef();

    useEffect(() => {
        if(isFirstAnimationReady){
            animation();
        }
    }, [isFirstAnimationReady]);


    const animation = () => {
        if (ref.current) {

            gsap.timeline({
                defaults: {
                    overwrite: !0
                },
                delay: delay,
            })
                .to(ref.current.uniforms.alpha,
                    {
                        duration: 1.4,
                        value: 1,
                        ease: "Power4.easeOut"
                    }, 0)
                .to(ref.current.uniforms.rotation,
                    {
                        duration: 3,
                        value: 0,
                        ease: "Power3.easeOut"
                    }, 0)
                .to(ref.current.uniforms.moveAnimationValue,
                    {
                        duration: 2,
                        value: 1,
                        ease: "Power3.easeOut"
                    }, 0)
                .to(ref.current.uniforms.fillAnimationValue,
                    {
                        duration: 1,
                        value: 1,
                        ease: "none"
                    }, 0)
                .to(ref.current.uniforms.strokeAnimationValue, {
                    duration: 1,
                    value: 1,
                    ease: "none"
                }, 0)

            gsap.to(ref.current.uniforms.interactionPos.value,
                {
                    duration: 1.4,
                    x: 5,
                    y: 5,
                    ease: "Power4.easeOut",
                    overwrite: !0,
                    delay: delay
                })

            ref.current.uniforms.rotationOffset.value.x = .5 * (Math.random() - .5)
            ref.current.uniforms.rotationOffset.value.y = .5 * (Math.random() - .5)
            ref.current.uniforms.rotation.value = Math.pow(-1, Math.floor(2 * Math.random())) * (Math.random() + .3) * Math.PI * .3
            ref.current.uniforms.time.value = 1e4 * Math.random()
            ref.current.uniforms.dir.value = Math.pow(-1, Math.floor(2 * Math.random()))

        }
    }

    return (
        <mesh
            ref={mesh}
            position={[0, 0, 0]}
            {...props}>
            <planeBufferGeometry attach="geometry" args={[1, 1]} />
            <textMaterial ref={ref} tex={tex} geometryScale={geometryScale} noiseTexture={noiseTexture} uvSize={uvSize} uvOffset={uvOffset} color={color} offset={offset} />
        </mesh>
    );
}

export default TextPlane;