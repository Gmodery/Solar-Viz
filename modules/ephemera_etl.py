from horizons_api import Horizons
from db import supabase_upsert, supabase_select
import time
from json import dumps

SHORT_STEP = ["Moon"] # all spacecraft
INNER_PLANETS = ["Mercury", "Venus", "Earth", "Mars"]

SHORT_STEP_SIZE = "30m"
INNER_PLANET_STEP_SIZE = "1d"
OTHER_STEP_SIZE = "2d"

# Delay API calls to prevent throttling
DELAY = 4

horizons = Horizons()

def fetch_system_ephemera():
    system_bodies = supabase_select("system_bodies", "id, name, type")
    system_ephemera = []
    failed_ids = []

    for i, body in enumerate(system_bodies):
        print(i, "/", len(system_bodies))

        id = body["id"]
        name = body["name"]
        b_type = body["type"]

        if b_type == "Spacecraft" or name in SHORT_STEP:
            step_size = SHORT_STEP_SIZE

        elif name in INNER_PLANETS:
            step_size = INNER_PLANET_STEP_SIZE

        else:
            step_size = OTHER_STEP_SIZE


        ephemera = horizons.get_ephemeris(id=id, step_size=step_size)

        # If none returned, continue
        if not ephemera:
            print(f"Failure on id {id} ({name}), skipping")
            failed_ids.append(id)
        
        else:
            system_ephemera = system_ephemera + ephemera

        time.sleep(DELAY)

    
    print("Failed to retrieve ephemera for ids: \n", failed_ids)

    supabase_upsert("system_ephemeris_data", system_ephemera)

    return True