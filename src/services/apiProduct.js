import supabase from "./supabase";

export async function getProduct() {
    let { data, error } = await supabase
        .from('Products')
        .select('*')

    if (error) {
        console.log(error)
    }

    return data

}