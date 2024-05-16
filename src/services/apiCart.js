import supabase, { supabaseUrl } from "./supabase";

export async function addCart({ item }) {

    if (item !== undefined) {
        const { data, error } = await supabase.auth.updateUser({


        })
    }
}