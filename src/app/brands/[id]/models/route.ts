import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import db from "../../../../../lib/db";
import { decimal_regex } from "../../../../../lib/validators";
const NewError = (message: string, error?: string) => NextResponse.json({ message, error }, { status: 400 })
export async function GET(request: Request) {

    const id = Number(request.url.split("/")[4])
    const isValidId = Number.isInteger(id)
    if (isValidId === false) {
        return NewError("No se pudo procesar la petición", "Parametros inválidos",)
    }

    try {
        const data = await db.$queryRaw(
            Prisma.sql`SELECT  Brands.id, Brands.name,AVG(average_price) as average_price FROM Brands left join Cars ON Cars.brand_id = Brands.id where Brands.id=${id} GROUP BY Brands.name`
        )
        return NextResponse.json(data)
    } catch (error: unknown) {

        if(typeof error === "string"){
            return NewError("Error de Servidor.", error.toString())
        }
        return NewError("Error.", "Unknown server error")
    }
}


export async function POST(request: Request) {
    const { name, average_price } = await request.json()
    const id = Number(request.url.split("/")[4])
    const isValidId = Number.isInteger(id)

    if (isValidId === false) {
        return NewError("No se pudo procesar la petición", "Parametros inválidos",)
    }

    if (typeof name !== "string") {
        return NewError("Invalid Request", "Parameter 'name' is invalid.")
    }

    const avg_price = Number(average_price)
    if (decimal_regex.test(average_price) === false || Number(average_price) < 100000) {
        return NewError("Invalid Request", "Parameter 'average_price' must be a natural number greater than 100,000 with maximum two decimals.")
    }
    try {
        const entry = { model: name, average_price: avg_price, brand_id: id }
        const data = await db.cars.create({ data: entry})
        return NextResponse.json({ name: data.model, average_price: data.average_price })
    } catch (error: unknown) {

        if(typeof error === "string"){
            return NewError("Error de Servidor.", error.toString())
        }
        return NewError("Error.", "Unknown server error")
    }
}

