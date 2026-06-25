<h1 align=center>Solar System Visualization</h1>

## [Live Demo](https://solar-viz-six.vercel.app/)

## Overview
This project visualizes the solar system as it exists in real time. It uses data from [NASA's JPL Horizons System](https://ssd.jpl.nasa.gov/horizons/) to accurately place planets. Planets are additionally given accurate axial tilts and are placed on mathematically correct orbital paths. The system is shown at its regular scale, though planets are upscaled for visibility.

Data is periodically fetched from the system and stored in Supabase, enabling the application to retrieve the most up-to-date location data for each body.


## Demo

![](static/demo/demo_stationary_gif.gif)


![](static/demo/demo_moving_gif.gif)




## Platforms Used
- *Supabase* is used for storing data pertaining to system bodies, including planets and spacecraft. TLE data is designated for satellite positioning, whereas vectors with reference to the sun are used for planetary bodies.
- *GitHub Actions* is used for scheduling API executions to retrieve up-to-date data from each source. Python logic is set to run once a day to both retrieve new data as well as prune outdated data.
- *Next.js / R3F* are used for front-end structuring, rendering, and display of visuals.
- *Vercel* is the deployment platform that is currently hosting the application.


## Upcoming
This project is currently a work in progress and does not represent the final product. As it exists currently, it is a MVP. As a result, several other features are yet to be implemented, including:

- Snap-to motions to selected bodies
- Additional planetary bodies and spacecraft
- Satellite data for each planet