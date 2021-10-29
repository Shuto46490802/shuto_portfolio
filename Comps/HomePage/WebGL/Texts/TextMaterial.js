import { Color, RawShaderMaterial } from "three";
import { extend } from "@react-three/fiber";
import * as THREE from "three"

class TextMaterial extends RawShaderMaterial {
    constructor() {
        super({
            vertexShader: `
      precision highp float;
      precision highp int;
      #define GLSLIFY 1
      uniform mat4 projectionMatrix;
      uniform mat4 modelMatrix;
      uniform mat4 viewMatrix;
      uniform float moveAnimationValue;
      uniform vec2 offset;
      uniform vec2 geometryScale;
      uniform vec2 rotationOffset;
      uniform float rotation;
      uniform vec2 interactionPos;
      attribute vec3 position;
      attribute vec2 uv;
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
      vec2 rotateVec2(vec2 p, float angle){
            float s = sin(angle);
        float c = cos(angle);
        mat2 m = mat2(c, -s, s, c);
        return m * p;
    }
      void main(void){
          vec3 pos = position;
          float rma = 1.0 - moveAnimationValue;
          
          pos.xy *= geometryScale;
          pos *= (1.0 + rma * 2.0);
          
          pos.xy -= rotationOffset * offset;
          pos.xy = rotateVec2(pos.xy, rotation);
          pos.xy += rotationOffset * offset;
          
          pos.xy += offset;
          pos.xy -= offset * 0.1 * rma;
          pos.xy += interactionPos;
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
      uniform float alpha;
      uniform float fillAnimationValue;
      uniform float strokeAnimationValue;
      uniform float dir;
      uniform vec2 uvOffset;
      uniform vec2 uvSize;
      uniform vec3 color;
      uniform vec2 resolution;
      uniform float time;
      uniform vec2 geometryScale;
      varying vec2 vUv;
      float map(float value, float inputMin, float inputMax, float outputMin, float outputMax, bool clamp) {
            if(clamp == true) {
              if(value < inputMin) return outputMin;
            if(value > inputMax) return outputMax;
      }
        float p = (outputMax - outputMin) / (inputMax - inputMin);
        return ((value - inputMin) * p) + outputMin;
    }
      float getAnimationValue(float animationValue, float randomValue, float moveCoef) {
            float delay = randomValue * moveCoef;
          return map(animationValue, delay, delay + (1.0 - moveCoef), 0.0, 1.0, true);
    }
      void main() {
          vec2 uv = vUv;
          uv.y = 1.0 - uv.y;
          uv = uvOffset + uv * uvSize;
          uv.y = 1.0 - uv.y;
          vec2 noiseIn = vUv * geometryScale;
          float noiseValue = texture2D(noiseTexture, uv * 0.6).r;
          float a = getAnimationValue(alpha, noiseValue, 0.2);
          a = 1.0 - smoothstep(-0.1, 0.0, ((1.0 + dir) * 0.5 - uv.y) * dir - a * 1.1);
          vec4 distColor = texture2D(tex, uv);
          float distColorAlpha = distColor.a;
          distColorAlpha *= (1.0 - fillAnimationValue * step(0.4, distColor.g));
          distColorAlpha *= (1.0 - strokeAnimationValue * step(0.4, distColor.r));
          gl_FragColor = vec4(color, distColorAlpha * a);
    }
      `,
            uniforms: {
                tex: {
                    value: null
                },
                noiseTexture: {
                    value: null
                },
                alpha: {
                    value: 0
                },
                moveAnimationValue: {
                    value: 0
                },
                fillAnimationValue: {
                    value: 0
                },
                strokeAnimationValue: {
                    value: 0
                },
                uvSize: {
                    value: null
                },
                uvOffset: {
                    value: null
                },
                color: {
                    value: new Color("white")
                },
                offset: {
                    value: null
                },
                geometryScale: {
                    value: null
                },
                rotationOffset: {
                    value: new THREE.Vector2()
                },
                rotation: {
                    value: 0
                },
                interactionPos: {
                    value: new THREE.Vector2()
                },
                dir: {
                    value: 1
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


    set tex(value) {
        this.uniforms.tex.value = value
    }

    get tex() {
        return this.uniforms.tex.value
    }

    set noiseTexture(value) {
        this.uniforms.noiseTexture.value = value
    }

    get noiseTexture() {
        return this.uniforms.noiseTexture.value
    }

    set uvSize(value) {
        this.uniforms.uvSize.value = value
    }

    get uvSize() {
        return this.uniforms.uvSize.value
    }

    set uvOffset(value) {
        this.uniforms.uvOffset.value = value
    }

    get uvOffset() {
        return this.uniforms.uvOffset.value
    }

    set offset(value) {
        this.uniforms.offset.value = value
    }

    get offset() {
        return this.uniforms.offset.value
    }

    set geometryScale(value) {
        this.uniforms.geometryScale.value = value
    }

    get geometryScale() {
        return this.uniforms.geometryScale.value
    }

    set rotationOffset(value) {
        this.uniforms.rotationOffset.value = value
    }

    get rotationOffset() {
        return this.uniforms.rotationOffset.value
    }

    set interactionPos(value) {
        this.uniforms.interactionPos.value = value
    }

    get interactionPos() {
        return this.uniforms.interactionPos.value
    }

    set color(value) {
        this.uniforms.color.value = value
    }

    get color() {
        return this.uniforms.color.value
    }

    set alpha(value) {
        this.uniforms.alpha.value = value
    }

    get alpha() {
        return this.uniforms.alpha.value
    }

    set moveAnimationValue(value) {
        this.uniforms.moveAnimationValue.value = value
    }

    get moveAnimationValue() {
        return this.uniforms.moveAnimationValue.value
    }

    set fillAnimationValue(value) {
        this.uniforms.fillAnimationValue.value = value
    }

    get fillAnimationValue() {
        return this.uniforms.fillAnimationValue.value
    }

    set strokeAnimationValue(value) {
        this.uniforms.strokeAnimationValue.value = value
    }

    get strokeAnimationValue() {
        return this.uniforms.strokeAnimationValue.value
    }

    set rotation(value) {
        this.uniforms.rotation.value = value
    }

    get rotation() {
        return this.uniforms.rotation.value
    }

    set dir(value) {
        this.uniforms.dir.value = value
    }

    get dir() {
        return this.uniforms.dir.value
    }

    set time(value) {
        this.uniforms.time.value = value
    }

    get time() {
        return this.uniforms.time.value
    }


}

extend({ TextMaterial })