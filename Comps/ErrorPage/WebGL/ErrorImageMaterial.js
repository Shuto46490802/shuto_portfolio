import { Color, RawShaderMaterial } from "three";
import { extend } from "@react-three/fiber";
import * as THREE from "three"

class ErrorImageMaterial extends RawShaderMaterial {
    constructor() {
        super({
            vertexShader: `
            precision highp float;
            precision highp int;
            uniform vec2 uOffset;
            uniform mat4 projectionMatrix;
            uniform mat4 modelViewMatrix;
            attribute vec3 position;
            attribute vec2 uv;
            varying vec2 vUv;
            #define M_PI 3.1415926535897932384626433832795

            vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
                position.x = position.x + (sin(uv.y * M_PI) * offset.x);
                position.y = position.y + (sin(uv.x * M_PI) * offset.y);
                return position;
            }
             
            void main() {
                vUv = uv;
                vec3 newPosition = deformationCurve(position, uv, uOffset);
                gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
            }
      `,
            fragmentShader: `
            precision highp float;
            precision highp int;
            uniform sampler2D tex;
            uniform float alpha;              
            uniform vec2 uOffset;              
            varying vec2 vUv;              
            vec3 rgbShift(sampler2D tex, vec2 uv, vec2 offset) {                
                float r = texture2D(tex,vUv + uOffset * 0.005).r;                
                vec2 gb = texture2D(tex,vUv).gb;                
                return vec3(r,gb);              
            }              
            void main() {                
                vec3 color = rgbShift(tex,vUv,uOffset);                
                gl_FragColor = vec4(color,alpha);
            }
      `,
            uniforms: {
                time: {
                    value: 0
                },
                tex: {
                    value: null
                },
                uOffset: {
                    value: new THREE.Vector2(0, 0)
                },
                alpha: {
                    value: 0
                }
            },
            depthTest: false,
            depthWrite: false,
            transparent: true,
        })
    }

    set time(value) {
        this.uniforms.time.value = value
    }

    get time() {
        return this.uniforms.time.value
    }

    set tex(value) {
        this.uniforms.tex.value = value
    }

    get tex() {
        return this.uniforms.tex.value
    }

    set uOffset(value) {
        this.uniforms.uOffset.value = value
    }

    get uOffset() {
        return this.uniforms.uOffset.value
    }

    set alpha(value) {
        this.uniforms.alpha.value = value
    }

    get alpha() {
        return this.uniforms.alpha.value
    }
}

extend({ ErrorImageMaterial })
