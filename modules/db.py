from dotenv import load_dotenv
from supabase import create_client, Client
from os import environ

load_dotenv("./.env")

db_url = environ.get("DB_URL")
db_key = environ.get("DB_KEY")

supabase = Client(db_url, db_key)

def supabase_upsert(table, data):
    response = (
        supabase.table(table).upsert(data).execute()
    )

    return response


def supabase_select(table, columns):
    response = (
        supabase.table(table).select(columns).execute()
    )

    return response.data

def supabase_prune(table, column, where):
    response = (
        supabase.table(table)
        .delete()
        .lt(column, where)
        .execute()
    )

    return response