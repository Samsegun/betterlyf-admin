import supabase, { supabaseUrl } from "./supabase";
import { createClient } from "@supabase/supabase-js";

export async function adminCreateUser({ fullName, email, password }) {
    const serviceRoleSupabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );

    const { data, error: signUpError } = await serviceRoleSupabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
                // Optional: Add metadata to indicate admin-created account
                created_by: "admin",
            },
            // Prevent email confirmations if desired
            emailRedirectTo: null,
        },
    });

    if (signUpError) throw new Error(signUpError.message);

    const { data: confirmData, error: confirmError } =
        await serviceRoleSupabase.auth.admin.updateUserById(data.user.id, {
            email_confirm: true,
        });

    if (confirmError) {
        // If confirmation fails, we should log it and possibly handle cleanup
        console.error("Failed to confirm email:", confirmError);
        throw new Error(
            "Failed to confirm user email: " + confirmError.message
        );
    }

    return data;
}

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
    // 1. Update password OR fullName
    let updateData;
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName } };

    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) throw new Error(error.message);
    if (!avatar) return data;

    // 2. Upload the avatar image
    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    // 3. Update avatar in the user
    const { data: updatedUser, error: error2 } = await supabase.auth.updateUser(
        {
            data: {
                avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
            },
        }
    );

    if (error2) throw new Error(error2.message);
    return updatedUser;
}

export async function checkAdminStatus() {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return false;

    // console.log(user);

    const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id) // Using id from auth.users
        .single();

    return data?.role === "admin";
}

export async function makeUserAdmin(userId) {
    const { error } = await supabase
        .from("profiles")
        .update({ role: "admin" })
        .eq("id", userId);

    if (error) {
        console.error("Failed to assign admin role", error);
        return;
    }

    console.log("User is now an admin!");
}
