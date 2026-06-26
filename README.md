<h1 align=center>Solar System Visualization</h1>

A real-time, interactive 3D solar system visualizaer built with Next.js and Three.js. Currently tracks planets with planned support for moons, dwarf planets, asteroids, and satellites using live ephemeris data from [JPL Horizons](https://ssd.jpl.nasa.gov/horizons/) and TLE propagation via satellite.js.

## [Live Demo](https://solar-viz-six.vercel.app/)

## Features
- 3D Solar System View - Heliocentric visualization of all major planets with accurate orbital paths derived from Keplerian data. The system is shown at its regular scale, though all bodies are upscaled for visibility.

- Real Planet Textures - High resolution surface maps

- Accurate Orbit Rings - Elliptical orbit paths computed from true orbital elements (inclination, eccentricity, argument of perihelion, ascending node)

- Live Planet Positions - Interpolated planet positions from pre-fetched JPL Horizons ephemeris data updated daily

- Automated ETL Pipeline - GitHub Actions cron job fetches fresh ephemeris and TLE data and writes to Supabase

- Earth Satellite Tracking (*in progress*) - TLE-based SGP4 propagation for Earth-orbiting spacecraft using Celestrak data

- Click to Zoom (*in progress*) - Clicking a planetary body will zoom in and view physical and orbital data such as current position and moons



## Demo

![](static/demo/demo_stationary_gif.gif)


![](static/demo/demo_moving_gif.gif)




## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js (App Router) |
| 3D Rendering | Three.js via React Three Fiber |
| 3D Helpers | @react-three/drei |
| Satellite Propagation | satellite.js (SGP4/TLE) |
| Database | Supabase (Postgres) |
| ETL Language | Python |
| Ephemeris Source | JPL Horizons REST API |
| TLE Source | Celestrak |
| ETL Scheduling | GitHub Actions (cron) |
| Hosting | Vercel |


### Description
- *Supabase* is used for storing data pertaining to system bodies, including planets and spacecraft. TLE data is designated for satellite positioning, whereas vectors with reference to the sun are used for planetary bodies.
- *GitHub Actions* is used for scheduling API executions to retrieve up-to-date data from each source. Python logic is set to run once a day to both retrieve new data as well as prune outdated data.
- *Next.js / R3F* are used for front-end structuring, rendering, and display of visuals.
- *Vercel* is the deployment platform that is currently hosting the application.


## Project Structure
 
```
solar-viz/src/
│
├── app/
│   └── page.jsx                  # Loads root scene
├── components/
│   ├── Planet.jsx                # Textured planet mesh, per-frame position update
│   ├── OrbitRing.jsx             # Calculated ellipse orbit ring
│   ├── SolarSystemScene.jsx      # Root scene
│   └── TargetMarker.jsx          # Visual marker of camera orbit point 
├── hooks/
│   └── useEphemeris.js           # Fetches and interpolates ephemeris data
├── lib/
│   ├── supabase.js               # Supabase client singleton
│   └── coordinates.js            # AU→scene unit scaling (currently unused), axis remapping
├── services/
│   └── bodyService.js            # Supabase query functions
├── data/
│   └── bodies.js                 # Planet catalog: orbital elements, physical stats, textures paths
├── public/
│   └── textures/                 # Planet surface maps (Solar System Scope CC license)

modules/
    ├── main.py                   # Orchestrates both ETL tracks (currently only JPL Horizons)
    ├── ephemera_etl.py           # Queries JPL Horizons API
    ├── ephemera_prune.py         # Prunes expired Supabase ephemeris entries
    ├── tle_etl.py                # Fetches and parses Celestrak TLE files
    ├── horizons_api.py           # JPL Horizons helper class
    └── db.py                     # Supabase upsert/prune helpers
```


## Planned Features
This project is currently a work in progress and does not represent the final product. As it exists currently, it is a MVP. As a result, several other features are yet to be implemented, including:

- Snap-to motions to selected bodies
- Additional planetary bodies and spacecraft
- Satellite data for each planet