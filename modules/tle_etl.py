import requests

def fetch_tle():
    # Request TLE data

    response = requests.get(f"https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle")

    res = str(response.content)[2:].split("\\r\\n")


    # Process into db row entries

    res = []
    i = 0

    while i < len(res) - 2:
        id = res[i].strip()
        l1 = res[i+1].strip()
        l2 = res[i+2].strip()

        res.append({
                "id": id, 
                "tle1": l1,
                "tle2": l2
            })

        i += 3



    # drop duplicates

    ids = set([x['id'] for x in res])

    out = []

    for element in res:
        if element['id'] in ids:
            out.append(element)
            ids.remove(element['id'])


    # Upsert to supabase

    from modules.db import supabase_upsert

    supabase_upsert("earth_satellites", out)

    return True