'use client'

import dynamic from 'next/dynamic'

const SolarScene = dynamic(
    () => import('../components/SolarSystemScene'),
    { ssr: false }
)

export default function Page() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <SolarScene />
        </div>
    )
}