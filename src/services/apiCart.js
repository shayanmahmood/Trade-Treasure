import supabase, { supabaseUrl } from "./supabase";

export async function addCart(cart) {

    if (cart !== undefined) {
        const { data, error } = await supabase.auth.updateUser({
            data: {
                cart: cart
            }

        })

        if (error) {
            console.log(error)
        }

        console.log(data)
        return { data }
    }
}