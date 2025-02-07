import { endOfDay, startOfDay } from "date-fns";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";
import { isNotAdmin } from "./apiAuth";

function getTodayRange() {
    const today = new Date();
    return {
        start: startOfDay(today).toISOString(),
        end: endOfDay(today).toISOString(),
    };
}

export async function getBookings({ filter, sortBy, page }) {
    let query = supabase
        .from("bookings")
        .select(
            "id, created_at, fullName, status, appointmentDate, timeSlot, specialists(fullName, specialization)",
            { count: "exact" }
        );

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
        throw new Error("Bookings could not be loaded");
    }

    return { data, count };
}

export async function getBooking(id) {
    const { data, error } = await supabase
        .from("bookings")
        .select(
            "*, patients(users(fullName, email, imageUrl)), specialists(fullName, price)"
        )
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking not found");
    }

    return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISOString
export async function getBookingsAfterDate(date) {
    const { data, error } = await supabase
        .from("bookings")
        .select("created_at, status")
        .gte("created_at", date)
        .lte("created_at", getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, guests(fullName)")
        .gte("startDate", date)
        .lte("startDate", getToday());

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    return data;
}

// Activity means that there is a booking today
export async function getTodaysActivity() {
    const { start, end } = getTodayRange();

    const { data, error } = await supabase
        .from("bookings")
        .select(
            "*, patients(gender, dateOfBirth, users(fullName)), specialists(fullName)"
        )
        .or(`status.eq.pending,status.eq.confirmed`)
        .gte("created_at", start)
        .lte("created_at", end)
        .order("created_at", { ascending: true });

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }
    return data;
}

export async function updateBooking(id, obj) {
    // for production purpose, no user except for admin can perform this operation
    await isNotAdmin();

    const { data, error } = await supabase
        .from("bookings")
        .update(obj)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not be updated");
    }
    return data;
}

export async function deleteBooking(id) {
    // for production purpose, no user except for admin can perform this operation
    await isNotAdmin();

    // REMEMBER RLS POLICIES
    const { data, error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }
    return data;
}
