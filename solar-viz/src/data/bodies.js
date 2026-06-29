const planets = [
    {
        id: 199,
        name: "Mercury",
        radius: 1,
        color: "#8d8d8d",
        orbit: {
            a: 0.387,      // semi-major axis (AU)
            e: 0.2056,     // eccentricity
            i: 7.005,      // inclination (degrees)
            omega: 29.124, // argument of perihelion (degrees)
            Omega: 48.331, // longitude of ascending node (degrees)
        },
        axialTilt: 0,
        texturePath: "/textures/Mercury.jpg"
    },
    {
        id: 299,
        name: "Venus",
        radius: 1.5,
        color: "#e9c551",
        orbit: {
            a: 0.723,
            e: 0.0067,
            i: 3.394,
            omega: 54.884,
            Omega: 76.680,
        },
        axialTilt: 177.3,
        texturePath: "/textures/Venus.jpg"
    },
    {
        id: 399,
        name: "Earth",
        radius: 1.6,
        color: "#1191fa",
        orbit: {
            a: 1.000,
            e: 0.0167,
            i: 0.000,
            omega: 102.937,
            Omega: 0.000,
        },
        axialTilt: 23.4,
        texturePath: "/textures/Earth.jpg"
    },
    {
        id: 499,
        name: "Mars",
        radius: 1.2,
        color: "#ca1616",
        orbit: {
            a: 1.524,
            e: 0.0934,
            i: 1.850,
            omega: 286.502,
            Omega: 49.558,
        },
        axialTilt: 25.2,
        texturePath: "/textures/Mars.jpg"
    },
    {
        id: 599,
        name: "Jupiter",
        radius: 4,
        color: "#ce9700",
        orbit: {
            a: 5.203,
            e: 0.0489,
            i: 1.303,
            omega: 273.867,
            Omega: 100.464,
        },
        axialTilt: 3.1,
        texturePath: "/textures/Jupiter.jpg"
    },
    {
        id: 699,
        name: "Saturn",
        radius: 3.5,
        color: "#ddb812",
        orbit: {
            a: 9.537,
            e: 0.0565,
            i: 2.485,
            omega: 339.392,
            Omega: 113.665,
        },
        axialTilt: 26.7,
        texturePath: "/textures/Saturn.jpg"
    },
    {
        id: 799,
        name: "Uranus",
        radius: 2.5,
        color: "#0083c0",
        orbit: {
            a: 19.191,
            e: 0.0463,
            i: 0.773,
            omega: 99.000,
            Omega: 74.006,
        },
        axialTilt: 97.8,
        texturePath: "/textures/Uranus.jpg"
    },
    {
        id: 899,
        name: "Neptune",
        radius: 1.2,
        color: "#0d59cc",
        orbit: {
            a: 30.069,
            e: 0.0100,
            i: 1.770,
            omega: 276.340,
            Omega: 131.784,
        },
        axialTilt: 28.3,
        texturePath: "/textures/Neptune.jpg"
    },
]

export default planets