from ephemera_etl import fetch_system_ephemera
from ephemera_prune import prune_ephemera

if __name__ == "__main__":
    fetch_system_ephemera()

    prune_ephemera()