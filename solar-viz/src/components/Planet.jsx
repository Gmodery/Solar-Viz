import { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { scalePosition } from '../lib/coordinates' 
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function Planet({ objectId, radius, color, axialTilt, getPosition, texturePath }) {
    // meshRef gives direct handle to the Three.js mesh object
    const meshRef = useRef()
    const topMeshRef = useRef()


    // useFrame runs every animation frame (~60fps)
    useFrame((state, delta) => {
        const pos = getPosition(objectId, Date.now())

        if (!pos || !meshRef.current) return

        // Apply your coordinate scale transform, then set position directly
        const scaled = scalePosition(pos)
        
        meshRef.current.position.set(scaled.x, scaled.y, scaled.z)

        // Planet rotation
        meshRef.current.rotation.y += 0.05 * delta;

        // Atmosphere rotation
        if (topMeshRef.current) {
            topMeshRef.current.rotation.y += 0.025 * delta;
        }
    })


    // If Earth, render atmosphere and planet texture
    if (objectId == 399) {
        const topTexturePath = "/textures/Earth_clouds.jpg"

        return (
            <group ref={meshRef}>
                <group rotation={[axialTilt * Math.PI / 180, 0, 0]}>
                    {/* Planet Mesh */}
                    <mesh>
                        <sphereGeometry args={[radius, 32, 32]} />
                        <Suspense fallback={<meshStandardMaterial color={color} />} >
                            { texturePath ? (
                                <PlanetTexture texturePath={texturePath} />
                            ) : (
                                <meshStandardMaterial color={color} />
                            )}
                        </Suspense>
                    </mesh>

                    {/* Atmosphere Mesh */}
                    <mesh ref={topMeshRef}>
                        <sphereGeometry args={[radius*1.015, 32, 32]} />
                        <Suspense fallback={<meshStandardMaterial transparent={true} /> } >
                            { topTexturePath ? (
                                <PlanetTextureTopLayer topTexturePath={topTexturePath} />
                            ) : (
                                <meshStandardMaterial transparent={true} />
                            )}

                        </Suspense>
                    </mesh>
                </group>
            </group>
        )

    } else if (objectId == 699) {
        return (
            <group ref={meshRef} rotation={[axialTilt * Math.PI / 180, 0, 0]}>
                {/* Planet Mesh */}
                <mesh>
                    <sphereGeometry args={[radius, 32, 32]} />
                    {/* Fixed the duplicate meshStandardMaterial attribute from your earlier snippet */}
                    <Suspense fallback={<meshStandardMaterial color={color} />} >
                        {texturePath ? (
                            <PlanetTexture texturePath={texturePath} />
                        ) : (
                            <meshStandardMaterial color={color} />
                        )}
                    </Suspense>
                </mesh>

                {/* Ring mesh at same position */}
                <SaturnRings />
            </group>
        )
    } else {

        return (
            <mesh ref={meshRef} rotation={[axialTilt * Math.PI / 180, 0, 0]}>
                <sphereGeometry args={[radius, 32, 32]} />
                <Suspense fallback={<meshStandardMaterial color={color} />}>
                    {texturePath ? (
                        <PlanetTexture texturePath={texturePath} />
                    ) : (
                        <meshStandardMaterial color={color} />
                    )
                }
                </Suspense>
            </mesh>
        ) 
    }
}


// Maps the recatangular texture into a ring
// Outer component handles texture loading via Suspense
export function SaturnRings() {
    return (
        <Suspense fallback={null}>
            <SaturnRingsInner />
        </Suspense>
    )
}

// Inner component - only mounts after texture is ready, so no suspend/remount risk
function SaturnRingsInner() {
    const ringGeoRef = useRef()
    const texture = useTexture("/textures/Saturn_ring.png")

    // Geometry disposal
    useEffect(() => {
        return () => {
            if (ringGeoRef.current) ringGeoRef.current.dispose()
        }
    }, [])

    useLayoutEffect(() => {
        if (!ringGeoRef.current) return

        const geometry = ringGeoRef.current
        const pos = geometry.attributes.position
        const v3 = new THREE.Vector3()

        for (let i = 0; i < pos.count; i++) {
            v3.fromBufferAttribute(pos, i)

            let u = (Math.atan2(v3.x, v3.y) + Math.PI) / (Math.PI * 2)
            let v = v3.length()
            v = (v - 5) / (10 - 5)

            geometry.attributes.uv.setXY(i, u, v)
        }

        geometry.attributes.uv.needsUpdate = true
    }, [])

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry ref={ringGeoRef} args={[5, 10, 64, 8]} />
            <meshStandardMaterial
                map={texture}
                side={THREE.DoubleSide}
                transparent={true}
            />
        </mesh>
    )
}


function PlanetTexture({ texturePath }) {
    const texture = useTexture(texturePath)

    return <meshStandardMaterial map={texture} />
}

function PlanetTextureTopLayer({ topTexturePath }) {
    const topTexture = useTexture(topTexturePath)

    return <meshStandardMaterial
            map={topTexture}
            transparent={true}            
            blending={THREE.NormalBlending} 
            opacity={0.8}                  
            depthWrite={false}
        />
}