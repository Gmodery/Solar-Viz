const planets = [
    {
        id: 199,
        name: "Mercury",
        radius: 1,
        color: "#8d8d8d",
        orbit: {
            a: 0.444,      // semi-major axis (AU)
            e: 0.2056,     // eccentricity
            i: 7.005,      // inclination (degrees)
            omega: 77.457, // argument of perihelion (degrees)
            Omega: 48.33, // longitude of ascending node (degrees)
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
            omega: 131.602, 
            Omega: 76.679, 
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
            a: 1,      
            e: 0.0167,
            i: -0.000015,      
            omega: 102.937, 
            Omega: 0, 
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
            a: 1.59,      
            e: 0.0933,     
            i: 1.8496,
            omega: -23.943, 
            Omega: 49.559, 
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
            a: 5.55,      
            e: 0.0483,
            i: 1.3043,      
            omega: 14.728, 
            Omega: 100.474, 
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
            a: 9.01,      
            e: 0.0538,
            i: 2.4859,      
            omega: 92.598, 
            Omega: 113.622, 
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
            a: 18.5891,      
            e: 0.04725,
            i: 0.77263,      
            omega: 170.954, 
            Omega: 74.0169, 
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
            a: 29.64,      
            e: 0.00859,
            i: 1.77,      
            omega: 44.964, 
            Omega: 131.784, 
        },
        axialTilt: 28.3,
        texturePath: "/textures/Neptune.jpg"
    },
]

export default planets