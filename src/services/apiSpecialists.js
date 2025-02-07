import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import { isNotAdmin } from "./apiAuth";
import supabase, { supabaseUrl } from "./supabase";

export async function getSpecialists({ filter, sortBy, page }) {
    // const { data, error } = supabase
    //     .from("specialists")
    //     .select("*", { count: "exact" });
    let query = supabase.from("specialists").select("*", { count: "exact" });

    // FILTER
    if (filter)
        query = query[filter.method || "eq"](filter.field, filter.value);

    // SORT
    if (sortBy)
        query = query.order(sortBy.field, {
            ascending: sortBy.direction === "asc",
        });

    if (page) {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error(error);
        throw new Error("Specialists could not be loaded");
    }

    return { data, count };
}

export async function createEditSpecialist(newSpecialist, id) {
    // for production purpose, no user except for admin can perform this operation
    await isNotAdmin();

    const hasImagePath = newSpecialist.imageUrl?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${
        newSpecialist.imageUrl.name
    }`.replaceAll("/", "");
    const imagePath = hasImagePath
        ? newSpecialist.imageUrl
        : `${supabaseUrl}/storage/v1/object/public/specialists-images/${imageName}`;

    // // 1. Create/edit cabin
    let query = supabase.from("specialists");

    // // A) CREATE
    if (!id) query = query.insert([{ ...newSpecialist, imageUrl: imagePath }]);

    // // B) EDIT
    if (id)
        query = query
            .update({ ...newSpecialist, imageUrl: imagePath })
            .eq("id", id);

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Specialist could not be created");
    }

    // // 2. Upload image
    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
        .from("specialists-images")
        .upload(imageName, newSpecialist.imageUrl);

    // 3. Delete the cabin IF there was an error uplaoding image
    if (storageError) {
        await supabase.from("specialists").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Specilaist image could not be uploaded and the specialist was not created"
        );
    }

    return data;
}

export async function deleteSpecialist(id) {
    // for production purpose, no user except for admin can perform this operation
    await isNotAdmin();

    const { data, error } = await supabase
        .from("specialists")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Specialist could not be deleted");
    }

    return data;
}

//fetches less data for dashboard
export async function getStatsSpecialists() {
    const { data, error } = await supabase
        .from("specialists")
        .select("created_at");
    // .gte("created_at", date)
    // .lte("created_at", getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error("Specialists could not get loaded");
    }

    return data;
}
