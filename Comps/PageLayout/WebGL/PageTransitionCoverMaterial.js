import { Color, RawShaderMaterial } from "three";
import { extend } from "@react-three/fiber";
import * as THREE from "three"

class PageTransitionCoverMaterial extends RawShaderMaterial {
    constructor() {
        super({
            vertexShader: `
            precision highp float;
            precision highp int;
            #define GLSLIFY 1
            attribute vec3 position;
            void main(void){
                  gl_Position = vec4(position, 1.0);
            }
      `,
            fragmentShader: `
            precision highp float;
            precision highp int;
            #define GLSLIFY 1
            uniform sampler2D bgTexture;
            uniform sampler2D sandNoiseTexture;
            uniform sampler2D noiseTexture;
            uniform vec2 noiseUVSize;
            uniform vec2 noiseUVOffset;
            uniform vec2 bgUVSize;
            uniform vec2 resolution;
            uniform vec2 center;
            uniform float animationValue;
            uniform vec3 color;
            uniform float time;
            uniform float ease;
            uniform float maxLength;
            uniform float sandNoiseAlpha;
            float map(float value, float inputMin, float inputMax, float outputMin, float outputMax, bool clamp) {
                  if(clamp == true) {
                    if(value < inputMin) return outputMin;
                    if(value > inputMax) return outputMax;
                  }
                      float p = (outputMax - outputMin) / (inputMax - inputMin);
                        return ((value - inputMin) * p) + outputMin;
                    }
                        #ifndef PI
                        #define PI 3.141592653589793
                        #endif
                        float sineInOut(float t) {
                              return -0.5 * (cos(PI * t) - 1.0);
                            }
                              #ifndef HALF_PI\n#define HALF_PI 1.5707963267948966
                              #endif
                              float sineIn(float t) {
                                    return sin((t - 1.0) * HALF_PI) + 1.0;
                            }
                              float getAnimationValue(float animationValue, float randomValue, float moveCoef) {
                                    float delay = randomValue * moveCoef;
                                      return map(animationValue, delay, delay + (1.0 - moveCoef), 0.0, 1.0, true);
                                }
                                    void main() {
                                          vec2 uv = gl_FragCoord.xy / resolution;
                                          uv.y = 1.0 - uv.y;
                                          vec2 bgUV = mod(uv * bgUVSize, 1.0);
                                          bgUV.y = 1.0 - bgUV.y;
                                            vec4 bgColor = texture2D(bgTexture, bgUV);
                                            vec2 noiseUV = mod(noiseUVOffset + uv * noiseUVSize, 1.0);
                                              noiseUV.y = 1.0 - noiseUV.y;
                                              vec4 noiseColor = texture2D(sandNoiseTexture, noiseUV);
                                                noiseColor.a *= sandNoiseAlpha;
                                                float alpha = animationValue;
                                                  float noiseValue = texture2D(noiseTexture, gl_FragCoord.xy / max(resolution.x, resolution.y) * 1.2).r;
                                                    float a = getAnimationValue(1.0 - animationValue, noiseValue, 0.1);
                                                      a = mix(sineInOut(a), sineIn(a), ease);
                                                      float maxLength2 = maxLength * a;
                                                        alpha = 1.0 - smoothstep(0.0, 0.7, (maxLength2 - length(gl_FragCoord.xy - center) * (1.0 + noiseValue * 0.8)) / maxLength2);
                                                          gl_FragColor = vec4(
                                                                mix(mix(bgColor.rgb, color, 1.0 - alpha), noiseColor.rgb, noiseColor.a),
                                                                    alpha * (1.0 - smoothstep(0.8, 1.0, a))
                                                                      );
                                                                }

            
      `,
            uniforms: {
                resolution: {
                    value: new THREE.Vector2()
                },
                bgTexture: {
                    value: null
                },
                noiseTexture: {
                    value: null
                },
                sandNoiseTexture: {
                    value: null
                },
                bgUVSize: {
                    value: new THREE.Vector2()
                },
                noiseUVOffset: {
                    value: new THREE.Vector2()
                },
                noiseUVSize: {
                    value: new THREE.Vector2()
                },
                center: {
                    value: new THREE.Vector2()
                },
                maxLength: {
                    value: 0
                },
                animationValue: {
                    value: 1
                },
                ease: {
                    value: 0
                },
                time: {
                    value: 0
                },
                sandNoiseAlpha: {
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


    set resolution(value) {
        this.uniforms.resolution.value = value
    }

    get resolution() {
        return this.uniforms.resolution.value
    }

    set bgTexture(value) {
        this.uniforms.bgTexture.value = value
    }

    get bgTexture() {
        return this.uniforms.bgTexture.value
    }

    set noiseTexture(value) {
        this.uniforms.noiseTexture.value = value
    }

    get noiseTexture() {
        return this.uniforms.noiseTexture.value
    }

    set sandNoiseTexture(value) {
        this.uniforms.sandNoiseTexture.value = value
    }

    get sandNoiseTexture() {
        return this.uniforms.sandNoiseTexture.value
    }

    set bgUVSize(value) {
        this.uniforms.bgUVSize.value = value
    }

    get bgUVSize() {
        return this.uniforms.bgUVSize.value
    }

    set noiseUVOffset(value) {
        this.uniforms.noiseUVOffset.value = value
    }

    get noiseUVOffset() {
        return this.uniforms.noiseUVOffset.value
    }

    set noiseUVSize(value) {
        this.uniforms.noiseUVSize.value = value
    }

    get noiseUVSize() {
        return this.uniforms.noiseUVSize.value
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

    set animationValue(value) {
        this.uniforms.animationValue.value = value
    }

    get animationValue() {
        return this.uniforms.animationValue.value
    }

    set ease(value) {
        this.uniforms.ease.value = value
    }

    get ease() {
        return this.uniforms.ease.value
    }

    set time(value) {
        this.uniforms.time.value = value
    }

    get time() {
        return this.uniforms.time.value
    }

    set sandNoiseAlpha(value) {
        this.uniforms.sandNoiseAlpha.value = value
    }

    get sandNoiseAlpha() {
        return this.uniforms.sandNoiseAlpha.value
    }

    set color(value) {
        this.uniforms.color.value = value
    }

    get color() {
        return this.uniforms.color.value
    }
}

extend({ PageTransitionCoverMaterial })
