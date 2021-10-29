import { Color, RawShaderMaterial } from "three";
import { extend } from "@react-three/fiber";
import * as THREE from "three"

class ProfileImageMaterial extends RawShaderMaterial {
    constructor() {
        super({
            vertexShader: `
            precision highp float;
     precision highp int;
     #define GLSLIFY 1
     uniform mat4 projectionMatrix;
     uniform mat4 modelMatrix;
     uniform mat4 viewMatrix;
     uniform float dirX;
     uniform float dirY;
     uniform float animationValue1;
     uniform float animationValue2;
     uniform vec2 resolution;
     uniform float test;
     attribute vec3 position;
     attribute vec2 uv;
     varying vec2 vUv;
     varying float vShadowFactor;
     
     const vec3 P3 = vec3(-1.0, 1.0, 0.0);
     const vec3 P4 = vec3(1.0, -1.0, 0.0);
     
     const vec3 P1 = vec3(1.0, 1.0, 0.0);
     const vec3 P2 = vec3(-1.0, -1.0, 0.0);
     const float PI = 3.1415926535897932384626433832795;
     float map(float value, float inputMin, float inputMax, float outputMin, float outputMax, bool clamp) {
           if(clamp == true) {
             if(value < inputMin) return outputMin;
         if(value > inputMax) return outputMax;
      }
       float p = (outputMax - outputMin) / (inputMax - inputMin);
       return ((value - inputMin) * p) + outputMin;
    }
     vec3 rotateVec3(vec3 p, float angle, vec3 axis){
       vec3 a = normalize(axis);
       float s = sin(angle);
       float c = cos(angle);
       float r = 1.0 - c;
       mat3 m = mat3(
         a.x * a.x * r + c,
         a.y * a.x * r + a.z * s,
         a.z * a.x * r - a.y * s,
         a.x * a.y * r - a.z * s,
         a.y * a.y * r + c,
         a.z * a.y * r + a.x * s,
         a.x * a.z * r + a.y * s,
         a.y * a.z * r - a.x * s,
         a.z * a.z * r + c
       );
       return m * p;
    }
       float cross(vec2 a, vec2 b) {
             return a.x * b.y - a.y * b.x;
    }
     float getAnimationValue(float animationValue, float randomValue, float moveCoef) {
           float delay = randomValue * moveCoef;
       return map(animationValue, delay, delay + (1.0 - moveCoef), 0.0, 1.0, true);
    }
     void main(void){
       vec3 pos = position;
       vec2 nUV = uv * 2.5 - 1.0;
       float ra1 = 1.0 - animationValue1;
       float ra2 = 1.0 - animationValue2;
       
       float isType1 = step(dirX * dirY, 0.0);
       vec3 p1 = mix(P1, P3, isType1);
       vec3 p2 = mix(P2, P4, isType1);
       vec3 rotationAxis = normalize(p1 - p2);
       
       float dv2 = sign(cross(rotationAxis.xy, pos.xy - p1.xy));
       float rot = length(nUV) * dv2 * (1.0 - 0.4 * step(0.0, dv2 * -dirX * dirY)) * 1.2;
       pos = rotateVec3(pos * 0.3, rot, rotationAxis) + pos * 0.8;
       
       vShadowFactor = 1.0 - (0.1 + clamp(pos.z / 100.0, 0.0, 1.0) * 0.6) * ra2;
       pos.z -= 120.0 * ra1;
       pos = mix(position, pos, ra2);
       
       pos = rotateVec3(pos, -2.0 * PI * test, vec3(1.0, 0.0, 0.0));
       vec4 modelPos = modelMatrix * vec4(pos, 1.0);
       gl_Position = projectionMatrix * viewMatrix * modelPos;
       vUv = uv;
    }
      `,
            fragmentShader: `
            precision highp float;
            precision highp int;
            #define GLSLIFY 1
            uniform sampler2D noiseTexture;
            uniform sampler2D tex;
            uniform vec2 uvOffset;
            uniform vec2 uvSize;
            uniform vec2 resolution;
            uniform vec2 center;
            uniform float alpha;
            uniform float alpha1;
            uniform float animationValue;
            uniform vec3 color;
            uniform float time;
            uniform float ease;
            uniform float maxLength;
            varying float vShadowFactor;
            varying vec2 vUv;
            const float PI = 3.1415926535897932384626433832795;
            float map(float value, float inputMin, float inputMax, float outputMin, float outputMax, bool clamp) {
                  if(clamp == true) {
                    if(value < inputMin) return outputMin;
                        if(value > inputMax) return outputMax;
                  }
                      float p = (outputMax - outputMin) / (inputMax - inputMin);
                        return ((value - inputMin) * p) + outputMin;
                    }
                      #ifndef HALF_PI
                      #define HALF_PI 1.5707963267948966
                      #endif
                      float sineOut(float t) {
                            return sin(t * HALF_PI);
                    }
                      #ifndef HALF_PI
                      #define HALF_PI 1.5707963267948966
                      #endif
                      float sineIn(float t) {
                            return sin((t - 1.0) * HALF_PI) + 1.0;
                        }
                            float getAnimationValue(float animationValue, float randomValue, float moveCoef) {
                                  float delay = randomValue * moveCoef;
                                    return map(animationValue, delay, delay + (1.0 - moveCoef), 0.0, 1.0, true);
                                }
                                  void main() {
                                    vec2 uv = uvOffset + uvSize * gl_FragCoord.xy / resolution;
                                    vec2 uv2 = vUv;
                                    uv2.y = 1.0 - uv2.y;
                                    vec4 distColor = texture2D(tex, vUv);
                                    vec4 visualColor = texture2D(tex, uv);
                                    float noiseValue = texture2D(noiseTexture, gl_FragCoord.xy / resolution.x * 0.6).r;
                                    float a = getAnimationValue(animationValue, noiseValue, 0.2);
                                    a = mix(sineOut(a), sineIn(a), ease);
                                    float maxLength2 = maxLength * a;
                                    float alpha2 = 1.0 - smoothstep(0.0, 0.7, (maxLength2 - length(gl_FragCoord.xy - center) * (1.0 + noiseValue * 0.8)) / maxLength2);
                                    alpha2 *= (1.0 - smoothstep(0.5, 1.0, a));
                                    visualColor.rgb = vec3(1.0) - (vec3(1.0) - distColor.rgb) * (vec3(1.0) - color * 0.5);
                                    visualColor.rgb *= vShadowFactor;
                                    visualColor.a *= alpha1;
                                    gl_FragColor = vec4(
                                        mix(visualColor.rgb, color, alpha2),
                                        (1.0 - alpha2) * alpha
                                    );
                    }
      `,
            uniforms: {
                animationValue1: {
                    value: 0
                },
                animationValue2: {
                    value: 0
                },
                dirX: {
                    value: 1
                },
                dirY: {
                    value: -1
                },
                alpha1: {
                    value: 0
                },
                resolution: {
                    value: new THREE.Vector2()
                },
                noiseTexture: {
                    value: null
                },
                tex: {
                    value: null
                },
                uvOffset: {
                    value: new THREE.Vector2()
                },
                uvSize: {
                    value: new THREE.Vector2()
                },
                center: {
                    value: new THREE.Vector2()
                },
                maxLength: {
                    value: 0
                },
                alpha: {
                    value: 0
                },
                ease: {
                    value: 0
                },
                animationValue: {
                    value: 0
                },
                time: {
                    value: 0
                },
                color: {
                    value: new Color("white")
                }
            },
            depthTest: false,
            depthWrite: false,
            transparent: true,
        })
    }

    set animationValue1(value) {
        this.uniforms.animationValue1.value = value
    }

    get animationValue1() {
        return this.uniforms.animationValue1.value
    }

    set animationValue2(value) {
        this.uniforms.animationValue2.value = value
    }

    get animationValue2() {
        return this.uniforms.animationValue2.value
    }

    set dirX(value) {
        this.uniforms.dirX.value = value
    }

    get dirX() {
        return this.uniforms.dirX.value
    }

    set dirY(value) {
        this.uniforms.dirY.value = value
    }

    get dirY() {
        return this.uniforms.dirY.value
    }

    set alpha1(value) {
        this.uniforms.alpha1.value = value
    }

    get alpha1() {
        return this.uniforms.alpha1.value
    }

    set resolution(value) {
        this.uniforms.resolution.value = value
    }

    get resolution() {
        return this.uniforms.resolution.value
    }

    set noiseTexture(value) {
        this.uniforms.noiseTexture.value = value
    }

    get noiseTexture() {
        return this.uniforms.noiseTexture.value
    }


    set tex(value) {
        this.uniforms.tex.value = value
    }

    get tex() {
        return this.uniforms.tex.value
    }

    set uvOffset(value) {
        this.uniforms.uvOffset.value = value
    }

    get uvOffset() {
        return this.uniforms.uvOffset.value
    }

    set uvSize(value) {
        this.uniforms.uvSize.value = value
    }

    get uvSize() {
        return this.uniforms.uvSize.value
    }

    set center(value) {
        this.uniforms.center.value = value
    }

    get center() {
        return this.uniforms.center.value
    }

    set maxLength(value) {
        this.uniforms.maxLength.value = value
    }

    get maxLength() {
        return this.uniforms.maxLength.value
    }

    set alpha(value) {
        this.uniforms.alpha.value = value
    }

    get alpha() {
        return this.uniforms.alpha.value
    }

    set ease(value) {
        this.uniforms.ease.value = value
    }

    get ease() {
        return this.uniforms.ease.value
    }

    set animationValue(value) {
        this.uniforms.animationValue.value = value
    }

    get animationValue() {
        return this.uniforms.animationValue.value
    }

    set time(value) {
        this.uniforms.time.value = value
    }

    get time() {
        return this.uniforms.time.value
    }

    set color(value) {
        this.uniforms.color.value = value
    }

    get color() {
        return this.uniforms.color.value
    }

}

extend({ ProfileImageMaterial })