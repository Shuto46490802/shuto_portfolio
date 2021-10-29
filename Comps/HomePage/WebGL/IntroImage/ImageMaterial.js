import { Color, RawShaderMaterial } from "three";
import { extend } from "@react-three/fiber";
import * as THREE from "three"

class ImageMaterial extends RawShaderMaterial {
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
     // 左上右下
     const vec3 P1 = vec3(-1.0, 1.0, 0.0);
     const vec3 P2 = vec3(1.0, -1.0, 0.0);
     // 右上左下
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

    //座標を指定した分だけ回転する
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
       // 回転軸を移動方向によって決める
       float isType1 = step(dirX * dirY, 0.0);

       vec3 p1 = mix(P1, P3, isType1);
       vec3 p2 = mix(P2, P4, isType1);
       vec3 rotationAxis = normalize(p2 - p1);
       // 回転軸の左にあるか、右にあるか
       float dv2 = sign(cross(rotationAxis.xy, pos.xy - p1.xy));
       float rot = length(nUV) * dv2 * (1.0 - 0.4 * step(0.0, dv2 * -dirX * dirY)) * 1.2;
       pos = rotateVec3(pos * 0.3, rot, rotationAxis) + pos * 0.8;
       // めくれているところは少し暗く描写したいので
       // fragmentShaderにそのための値を渡す
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
            uniform sampler2D tex;
            uniform float alpha;
            uniform vec3 color;
            varying vec2 vUv;
            varying float vShadowFactor;
            void main() {
                  vec2 uv = vUv;
                  uv.y = 1.0 - uv.y;
                  vec4 distColor = texture2D(tex, vUv);
                  
                  distColor.rgb = vec3(1.0) - (vec3(1.0) - distColor.rgb) * (vec3(1.0) - color * 0.5);
                  distColor.rgb *= vShadowFactor;
                  distColor.a *= alpha;
                  gl_FragColor = distColor;
            }
            
      `,
            uniforms: {
                tex: {
                    value: null
                },
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
                alpha: {
                    value: 0
                },
                color: {
                    value: new Color("white")
                },
                resolution: {
                    value: new THREE.Vector2()
                },
                test: {
                    value: 0
                }
            },
            depthTest: false,
            depthWrite: false,
            transparent: true,
        })
    }


    set tex(value) {
        this.uniforms.tex.value = value
    }

    get tex() {
        return this.uniforms.tex.value
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

    set alpha(value) {
        this.uniforms.alpha.value = value
    }

    get alpha() {
        return this.uniforms.alpha.value
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
}

extend({ ImageMaterial })
