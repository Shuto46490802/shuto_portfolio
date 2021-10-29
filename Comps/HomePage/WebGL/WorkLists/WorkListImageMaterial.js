import { Color, RawShaderMaterial } from "three";
import { extend } from "@react-three/fiber";
import * as THREE from "three"

class WorkListImageMaterial extends RawShaderMaterial {
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
     
     const vec3 P1 = vec3(-1.0, 1.0, 0.0);
     const vec3 P2 = vec3(1.0, -1.0, 0.0);
    
     const vec3 P3 = vec3(1.0, 1.0, 0.0);
     const vec3 P4 = vec3(-1.0, -1.0, 0.0);
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
       vec2 nUV = uv * 3.0 - 1.0;
       float ra1 = 1.0 - animationValue1;
       float ra2 = 1.0 - animationValue2;
      
       float isType1 = step(dirX * dirY, 0.0);
       vec3 p1 = mix(P1, P3, isType1);
       vec3 p2 = mix(P2, P4, isType1);
       vec3 rotationAxis = normalize(p2 - p1);
       
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
           uniform sampler2D tex2;
           uniform float animationDir;
           uniform float imgAnimationValue;
           uniform float imgAnimationValue2;
           uniform float alpha;
           uniform float isTexture1Loaded;
           uniform float isTexture2Loaded;
           uniform float time;
           uniform vec3 color;
           uniform vec2 resolution;
           uniform vec2 uvSize;
           uniform vec2 uvOffset;
           uniform vec2 uvSize2;
           uniform vec2 uvOffset2;
           varying vec2 vUv;
           varying float vShadowFactor;
           const float PI = 3.1415926535897932384626433832795;
           float map(float value, float inputMin, float inputMax, float outputMin, float outputMax, bool clamp) {
                 if(clamp == true) {
                   if(value < inputMin) return outputMin;
                       if(value > inputMax) return outputMax;
                  }
                     float p = (outputMax - outputMin) / (inputMax - inputMin);
                       return ((value - inputMin) * p) + outputMin;
                    }
                     float cubicOut(float t) {
                           float f = t - 1.0;
                             return f * f * f + 1.0;
                        }
                           const vec4 white = vec4(1.0);
                           float getAnimationValue(float animationValue, float randomValue, float moveCoef) {
                                 float delay = randomValue * moveCoef;
                              return map(animationValue, delay, delay + (1.0 - moveCoef), 0.0, 1.0, true);
                            }
                              void main() {
                                vec2 uv = uvOffset + vUv * uvSize;
                                vec2 uv2 = uvOffset2 + vUv * uvSize2;
                                float noiseValue = texture2D(noiseTexture, gl_FragCoord.xy / resolution.x * 0.4).r;
                                float a = getAnimationValue(imgAnimationValue, noiseValue, 0.1);
                                a = cubicOut(a);
                                a = 1.0 - smoothstep(-0.2, 0.0, ((1.0 + animationDir) * 0.5 - uv2.x) * animationDir - a * 1.2);
                                
                                uv.x += 0.1 * (imgAnimationValue2) * animationDir;
                                 uv2.x += 0.1 * (1.0 - imgAnimationValue2) * -animationDir;
                                 vec4 color1 = mix(white, texture2D(tex, uv), isTexture1Loaded);
                                 vec4 color2 = mix(white, texture2D(tex2, uv2), isTexture2Loaded);

                                 vec4 distColor = mix(color1, color2, a);
                                
                                distColor.rgb = vec3(1.0) - (vec3(1.0) - distColor.rgb) * (vec3(1.0) - color * 0.5);  
                                distColor.rgb *= vShadowFactor;
                                distColor.a *= alpha;
                                // distColor.rgb = mix(distColor.rgb, color, 1.0 - smoothstep(0.2, 0.3, abs(a - 0.5)));
                                gl_FragColor = distColor;
                            }
      `,
            uniforms: {
                noiseTexture: {
                    value: null
                },
                tex: {
                    value: null
                },
                tex2: {
                    value: null
                },
                animationValue1: {
                    value: 0
                },
                animationValue2: {
                    value: 0
                },
                imgAnimationValue: {
                    value: 0
                },
                imgAnimationValue2: {
                    value: 0
                },
                dirX: {
                    value: 1
                },
                dirY: {
                    value: -1
                },
                alpha: {
                    value: 0
                },
                isTexture1Loaded: {
                    value: 1
                },
                isTexture2Loaded: {
                    value: 1
                },
                animationDir: {
                    value: -1
                },
                color: {
                    value: new THREE.Color("white")
                },
                resolution: {
                    value: new THREE.Vector2()
                },
                test: {
                    value: 0
                },
                uvOffset: {
                    value: new THREE.Vector2()
                },
                uvSize: {
                    value: new THREE.Vector2()
                },
                uvOffset2: {
                    value: new THREE.Vector2()
                },
                uvSize2: {
                    value: new THREE.Vector2()
                },
                time: {
                    value: 0
                }
            },
            depthTest: false,
            depthWrite: false,
            transparent: true,
        })
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

    set tex2(value) {
        this.uniforms.tex2.value = value
    }

    get tex2() {
        return this.uniforms.tex2.value
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

    set imgAnimationValue(value) {
        this.uniforms.imgAnimationValue.value = value
    }

    get imgAnimationValue() {
        return this.uniforms.imgAnimationValue.value
    }

    set imgAnimationValue2(value) {
        this.uniforms.imgAnimationValue2.value = value
    }

    get imgAnimationValue2() {
        return this.uniforms.imgAnimationValue2.value
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

    set alpha(value) {
        this.uniforms.alpha.value = value
    }

    get alpha() {
        return this.uniforms.alpha.value
    }

    set isTexture1Loaded(value) {
        this.uniforms.isTexture1Loaded.value = value
    }

    get isTexture1Loaded() {
        return this.uniforms.isTexture1Loaded.value
    }

    set isTexture2Loaded(value) {
        this.uniforms.isTexture2Loaded.value = value
    }

    get isTexture2Loaded() {
        return this.uniforms.isTexture2Loaded.value
    }

    set animationDir(value) {
        this.uniforms.animationDir.value = value
    }

    get animationDir() {
        return this.uniforms.animationDir.value
    }

    set color(value) {
        this.uniforms.color.value = value
    }

    get color() {
        return this.uniforms.color.value
    }

    set resolution(value) {
        this.uniforms.resolution.value = value
    }

    get resolution() {
        return this.uniforms.resolution.value
    }

    set test(value) {
        this.uniforms.test.value = value
    }

    get test() {
        return this.uniforms.test.value
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

    set uvOffset2(value) {
        this.uniforms.uvOffset2.value = value
    }

    get uvOffset2() {
        return this.uniforms.uvOffset2.value
    }

    set uvSize2(value) {
        this.uniforms.uvSize2.value = value
    }

    get uvSize2() {
        return this.uniforms.uvSize2.value
    }

    set time(value) {
        this.uniforms.time.value = value
    }

    get time() {
        return this.uniforms.time.value
    }

}

extend({ WorkListImageMaterial })