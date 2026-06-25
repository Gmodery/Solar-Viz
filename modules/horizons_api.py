import requests, re
from datetime import datetime, timedelta

class Horizons():
    def __init__(self):
        self.endpoint = "https://ssd.jpl.nasa.gov/api/horizons.api"

        start_date = datetime.strftime(datetime.now(), "%Y-%m-%d")
        end_date = datetime.strftime(datetime.now() + timedelta(days=5), "%Y-%m-%d")

        # static params that won't change between calls
        self.params = {
            "format": "text",
            "OBJ_DATA": "NO",
            "MAKE_EPHEM": "YES", 
            "EPHEM_TYPE": "VECTOR",
            "VEC_TABLE": "1",
            "CENTER": "500@10",
            "OUT_UNITS": "AU-D",
            "START_TIME": start_date,
            "STOP_TIME": end_date
        }


    def get_ephemeris(self, id, step_size):
        params = self.params.copy()

        params.update({
            "COMMAND": id,
            "STEP_SIZE": step_size
        })

        response = requests.get(self.endpoint, params=params)

        ephemera = []

        s_response = str(response.content)
        s_response = s_response[s_response.find("$SOE")+6:s_response.rfind("$EOE")-3].split("\\n")
        s_response = [s.strip() for s in s_response]

        try:
            for i, line in enumerate(s_response):
                if i % 2 == 0:
                    # is date  
                    timestamp = re.findall(r"([0-9]{4}-[a-zA-Z]+-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{4})", line)[0]

                    ephemeris = {
                        "id": id,
                        "timestamp": timestamp
                    }
                    
                else:
                    # is ephemeris
                    x, y, z = re.findall(r"X =[ ]*(-*\d*\.\d+E[+|-]\d*) Y =[ ]*(-*\d*\.\d+E[+|-]\d*) Z =[ ]*(-*\d*\.\d+E[+|-]\d*)", line)[0]

                    ephemeris.update({
                        "x": x,
                        "y": y,
                        "z": z
                    })

                    ephemera.append(ephemeris)

        except Exception:
            return None

        return ephemera