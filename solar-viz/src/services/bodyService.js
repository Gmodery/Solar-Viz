import { supabase } from "../lib/supabase"

export async function fetchEphemeris() {
    const now = new Date()
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    const { data, error } = await supabase
        .from('onedayprojection')
        .select('*')

    if (error) throw error
    return data
}