# Prunes expired ephemeris data from supabase
from datetime import datetime, timedelta
from db import supabase_prune

def prune_ephemera():
    now = datetime.now() - timedelta(days=2)

    response = (
        supabase_prune(
            table="system_ephemeris_data",
            column="timestamp",
            where=now
        )
    )

    return True