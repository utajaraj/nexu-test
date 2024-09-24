import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { decimal_regex } from "../../../../lib/validators";
const NewError = (message: string, error?: string) => NextResponse.json({ message, error }, { status: 400 })

export async function PUT(request: Request) {
    const { average_price } = await request.json()
    const id = Number(request.url.split("/")[4])
    const isValidId = Number.isInteger(id)

    if (isValidId === false) {
        return NewError("No se pudo procesar la petición", "Parametros inválidos",)
    }

    const avg_price = Number(average_price)
    if (decimal_regex.test(average_price) === false || Number(average_price) < 100000) {
        return NewError("Invalid Request", "Parameter 'average_price' must be a natural number greater than 100,000 with maximum two decimals.")
    }
    try {
        const entry = { average_price: avg_price }
        const data = await db.cars.update({ data: entry, select: { id: true, model: true, average_price: true }, where: { id } })
        return NextResponse.json({ id: data.id, name: data.model, average_price: data.average_price })
    }  catch (error: unknown) {

        if (typeof error === "string") {
            return NewError("Server error.", error.toString())
        }
 
        return NewError("Error.", "Check data is correct, and not duplicated.")
    }
}