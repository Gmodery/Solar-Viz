import { useState, useEffect, useCallback } from 'react'
import { fetchEphemeris } from '../services/bodyService'

export function useEphemeris() {
    // Holds the raw time-series data, grouped by object ID
    // e.g. { mars: [ {timestamp, x, y, z}, ... ], venus: [ ... ] }
    const [seriesMap, setSeriesMap] = useState({})
    const [loading, setLoading] = useState(true)

    // Fetch once on mount
    useEffect(() => {
        fetchEphemeris()
            .then(rows => {
                // Group the flat array into a map keyed by object_id
                const grouped = {}
                for (const row of rows) {
                    
                    if (!grouped[row.id]) grouped[row.id] = []
                    grouped[row.id].push({
                        t: new Date(row.timestamp).getTime(), // store as ms since epoch
                        x: row.x,
                        y: row.y,
                        z: row.z
                    })
                }
                setSeriesMap(grouped)
                setLoading(false)
            })
            .catch(err => console.error('Ephemeris fetch failed:', err))
    }, [])

    // Take an object ID and the current time, find the two surrounding rows, and interpolate between them
    const getPosition = useCallback((objectId, nowMs) => {
        const series = seriesMap[objectId]

        if (!series || series.length === 0) return null

        // Find the last row where timestamp <= now
        let lo = 0
        for (let i = 0; i < series.length; i++) {
            if (series[i].t <= nowMs) lo = i
            else break
        }

        // If we're past the last point, just return the last known position
        if (lo >= series.length - 1) return series[series.length - 1]

        const a = series[lo]
        const b = series[lo + 1]

        // How far between the two timestamps? (0 to 1)
        const t = (nowMs - a.t) / (b.t - a.t)

        // Linear interpolation for each axis
        return {
            x: a.x + (b.x - a.x) * t,
            y: a.y + (b.y - a.y) * t,
            z: a.z + (b.z - a.z) * t
        }
    }, [seriesMap])

    return { getPosition, loading }
}