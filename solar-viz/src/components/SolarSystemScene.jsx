import { Canvas } from "@react-three/fiber"
import { OrbitControls, useTexture } from "@react-three/drei"
import { Stars } from "@react-three/drei"
import Planet from "../components/Planet"
import planets from "../data/bodies"
import { useEphemeris } from "@/hooks/useEphemeris"
import OrbitRing from "@/components/OrbitRing"
import TargetMarker from "@/components/TargetMarker"
import { Fragment, Suspense, useRef } from 'react'


export default function SolarSystemScene() {
    const { getPosition, loading } = useEphemeris();
    const controlsRef = useRef();
    const sunTexturePath = "/textures/Sun.jpg";

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas camera={{ position: [0, 40, 100], far: 100000 }}>
                <color attach="background" args={["Black"]} />
                <ambientLight intensity={1} />

                <pointLight
                    position={[0, 0, 0]}
                    intensity={6000}
                    distance={1000}
                />

                <Stars
                    radius={1050}
                    depth={10}
                    count={2000}
                    factor={4}
                    saturation={10}
                    fade
                    speed={0.25}
                />

                <OrbitControls ref={controlsRef}
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    zoomSpeed={1.5}
                    panSpeed={1}
                    rotateSpeed={0.7}
                    minDistance={10}
                    maxDistance={800}
                />

                <TargetMarker controlsRef={controlsRef} />


                {/* Sun */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[8, 32, 32]} />
                    <Suspense fallback={<meshStandardMaterial color="yellow" />} >
                        { sunTexturePath ? (
                            <SunTexture texturePath={sunTexturePath} />
                        ) : (
                            <meshStandardMaterial color="yellow" />
                        )}
                    
                    </Suspense>
                </mesh>
                {/* Sun Halo */}
                <mesh>
                    <sphereGeometry args={[9, 32, 32]} />
                    <meshBasicMaterial
                        color="orange"
                        transparent
                        opacity={0.04}
                    />
                </mesh>

                {planets.map((body) => (
                    <Fragment key={body.id}>
                        <OrbitRing
                            orbit={body.orbit}
                            color={body.color}
                            opacity={0.42}
                        />
                        <Planet
                            objectId={body.id}
                            objectName={body.name}
                            radius={body.radius}
                            color={body.color}
                            axialTilt={body.axialTilt}
                            getPosition={getPosition}
                            texturePath={body.texturePath}
                        />
                    </Fragment>
                ))}

            </Canvas>
        </div>
    )
}

function SunTexture({ texturePath }) {
    const texture = useTexture(texturePath);

    return <meshStandardMaterial map={texture} />
}