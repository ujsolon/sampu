// In your auth.js or wherever you handle signup
import { supabase } from './supabase'

export const signUp = async (email, password, name) => {
    // First, sign up the user with Supabase
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) throw error

    // If signup is successful, create a player record
    if (data.user) {
        const { error: playerError } = await supabase
            .from('players')
            .insert([
                {
                    user_id: data.user.id,
                    name: name,
                    email: email,
                    status: 'active'
                }
            ])

        if (playerError) {
            console.error('Error creating player record:', playerError)
            // You might want to delete the auth user if player creation fails
            // await supabase.auth.api.deleteUser(data.user.id)
            throw playerError
        }
    }

    return data
}

export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) throw error
    return data
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
}