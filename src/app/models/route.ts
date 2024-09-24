import { NextResponse } from "next/server";
import db from "../../../lib/db";
import { decimal_regex } from "../../../lib/validators";
const NewError = (message: string, error?: string) => NextResponse.json({ message, error }, { status: 400 })
interface FilterInterface {
    average_price?: object,
}
export async function GET(request: Request) {
    try {
        const urlParams = new URL(request.url).searchParams
        const greater: string | null = urlParams.get("greater")
        const lower: string | null = urlParams.get("lower")
        const filter: FilterInterface[] = []

        if (greater && decimal_regex.test(greater) == false) {
            return NewError("Greater than must be a natural number with at maximum 2 decimals.")
        }
        if (lower && decimal_regex.test(lower) === false) {
            return NewError("Lower than must be a natural number with at maximum 2 decimals.")
        }

        if(greater) filter.push({ average_price: { gt: greater } })
        if(lower) filter.push({ average_price: { lt: lower } })

        const data = await db.cars.findMany({
            where: {
                AND: filter
            }
        })
        return NextResponse.json(data)
    }  catch (error: unknown) {

        if (typeof error === "string") {
            return NewError("Server error.", error.toString())
        }
 
        return NewError("Error.", "Check data is correct, and not duplicated.")
    }
}