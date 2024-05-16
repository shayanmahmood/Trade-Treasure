
import supabase, { supabaseUrl } from "./supabase";
export async function SignUp({ fullName, email, password }) {

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
        , options: {
            data: {
                fullName,
                avatar: "",
                cart: []
            }
        }
    })


    if (error) {
        console.log(error)
    }

    return data
}

export async function LogIn({ email, password }) {

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })


    if (error) {
        console.log("canot login")
    }

    return data
}

export async function CurrentUser() {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) return null

    const { data, error } = await supabase.auth.getUser()

    if (error) {
        throw new Error("Unable to fetch current user")
    }

    return data?.user

}


export async function UpdateUser({ fullName, password, avatar }) {
    const { data, error } = await supabase.auth.updateUser({
        password: password,
        data: {
            fullName: fullName
        }
    })

    if (error) {
        console.log(error)
    }

    if (!avatar) return data

    let fileName = `avatar-${data.user.id}-${crypto.randomUUID()}`

    const { error: UploadError } = supabase.storage.from('Avatars').upload(fileName, avatar)

    if (UploadError) {
        throw new Error(UploadError.message)
    }

    const { data: ReUser, error: UpdateError } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/Avatars/${fileName}`
        }
    })

    if (UpdateError) {
        throw new Error(UpdateError.message)
    }

    return ReUser


    // if (password && fullName) {
    //     const { data, error } = await supabase.auth.updateUser({
    //         fullName: fullName,
    //         password: password,
    //     })
    //     if (error) {
    //         throw new Error("unable to update")
    //     }

    //     if (!avatar) return { data }


    //     let fileName = `avatar-${data.user.id}-${crypto.randomUUID()}`

    //     const { error: UploadError } = supabase.storage.from('Avatars').upload(fileName, avatar)

    //     if (UploadError) {
    //         throw new Error(UploadError.message)
    //     }

    //     const { data: ReUser, error: UpdateError } = await supabase.auth.updateUser({
    //         data: {
    //             avatar: `${supabaseUrl}/storage/v1/object/public/Avatars/${fileName}`
    //         }
    //     })

    //     if (UpdateError) {
    //         throw new Error(UpdateError.message)
    //     }

    //     return ReUser
    // }

    // return Error("INvalid")
}