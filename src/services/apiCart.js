import supabase from "./supabase";

export async function addCart(cart) {

    if (cart !== undefined) {
        const { data, error } = await supabase.auth.updateUser({
            data: {
                cart: cart
            }

        })

        if (error) {
            throw new Error(error)
        }

        return { data }
    }
}

export async function emptyCart() {
    const { data, error } = await supabase.auth.updateUser({
        data: {
            cart: []
        }

    })

    if (error) {
        throw new Error(error)
    }

    return { data }
}