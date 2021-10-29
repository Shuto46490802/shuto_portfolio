import React, { Suspense } from 'react';
//Libraries
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from 'three';
//Components
import PageTransitionCoverPlane from './WebGL/PageTransitionCoverPlane';
import Frame from './Frame';

const PageTransitionCover = ({ GLColor, pageTransitionMesh, pageTransitionMaterial, pageTransitionCover, pageTransitionCenter }) => {

    return (
        <div
            className="page-transition-cover"
            ref={pageTransitionCover}
        >

            <Frame />

            <Canvas
                camera={{ position: new THREE.Vector3(0, 0, 760) }}
                colorManagement={false}
            >

                <Suspense
                    fallback={<Html center className="loading" children="" />}
                >

                    <PageTransitionCoverPlane GLColor={GLColor} mesh={pageTransitionMesh} material={pageTransitionMaterial} center={pageTransitionCenter} />

                </Suspense>

            </Canvas>

        </div>
    );
}

export default PageTransitionCover;