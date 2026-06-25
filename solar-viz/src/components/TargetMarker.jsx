import { useRef } from 'react'
import { useFrame } from "@react-three/fiber"



export default function TargetMarker({ controlsRef }) {
    const markerRef = useRef();

    useFrame(() => {
        // Copy orbit controlls panning target vector to the marker mesh position
        if (controlsRef.current && markerRef.current) {
            markerRef.current.position.copy(controlsRef.current.target);
        }
    });

    return (
        <mesh ref={markerRef}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshBasicMaterial color="cyan" wireframe />
        </mesh>
    );
}