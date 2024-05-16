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


export async function getSingleProduct({ id }) {

    let { data, error } = await supabase
        .from('Products')
        .select("*")
        .eq("id", id)
        .single();


    if (error) {
        console.log(error)
        throw new Error("Could not get Product")
    }

    return data
}