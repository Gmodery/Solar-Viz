import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { scalePosition } from '../lib/coordinates'

const DEG = Math.PI / 180

export default function OrbitRing({ orbit, color = 'white', opacity = 0.15, segments = 256 }) {
    const { a, e, i, omega, Omega } = orbit

    const geometry = useMemo(() => {
        const b = a * Math.sqrt(1 - e * e)  // semi-minor axis
        const c = a * e                      // focus offset from ellipse center

        // Precompute trig for the three Keplerian rotations
        const cosO = Math.cos(Omega * DEG)  // ascending node
        const sinO = Math.sin(Omega * DEG)
        const cosI = Math.cos(i * DEG)      // inclination
        const sinI = Math.sin(i * DEG)
        const cosW = Math.cos(omega * DEG)  // argument of perihelion
        const sinW = Math.sin(omega * DEG)

        const points = []

        for (let s = 0; s <= segments; s++) {
            const theta = (s / segments) * Math.PI * 2

            // 1. Point on ellipse in perifocal frame (sun at focus)
            const xPerifocal = a * Math.cos(theta) - c
            const yPerifocal = b * Math.sin(theta)

            // 2. Rotate by argument of perihelion (ω) around Z
            const x1 = cosW * xPerifocal - sinW * yPerifocal
            const y1 = sinW * xPerifocal + cosW * yPerifocal
            const z1 = 0

            // 3. Rotate by inclination (i) around X
            const x2 = x1
            const y2 = cosI * y1 - sinI * z1
            const z2 = sinI * y1 + cosI * z1

            // 4. Rotate by longitude of ascending node (Ω) around Z
            const xEcl = cosO * x2 - sinO * y2
            const yEcl = sinO * x2 + cosO * y2
            const zEcl = z2

            // 5. Pass through scalePosition — same transform your planets use
            const scaled = scalePosition({ x: xEcl, y: yEcl, z: zEcl })
            points.push(new THREE.Vector3(scaled.x, scaled.y, scaled.z))
        }

        return new THREE.BufferGeometry().setFromPoints(points)
    }, [a, e, i, omega, Omega, segments])

    useEffect(() => {
        return () => geometry.dispose()
    }, [geometry])

    return (
        <lineLoop geometry={geometry}>
            <lineBasicMaterial
                color={color}
                transparent
                opacity={opacity}
                depthWrite={false}
            />
        </lineLoop>
    )
}