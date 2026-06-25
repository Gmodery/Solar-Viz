// How many Three.js scene units = 1 AU (before power curve)
const AU_SCALE = 40

// Using real scale
const POWER = 1

export function scalePosition(pos) {
    return {
        x: scaleDistance(pos.x),
        y: scaleDistance(pos.z),
        z: scaleDistance(pos.y)
    }
}

export function scaleDistance(au) {
    if (au === 0) return 0
    const sign = au < 0 ? -1 : 1
    return sign * Math.pow(Math.abs(au), POWER) * AU_SCALE
}