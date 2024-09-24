import { NextResponse } from "next/server";
import db from "../../../lib/db";
import { Prisma } from "@prisma/client";

const NewError = (message: string, error?: string) => NextResponse.json({ message, error }, { status: 400 })
export async function GET() {
    try {
        const data = await db.$queryRaw(
            Prisma.sql`SELECT  Brands.id, Brands.name,AVG(average_price) as average_price FROM Brands left join Cars ON Cars.brand_id = Brands.id GROUP BY Brands.name`
        )
        return NextResponse.json(data)
    } catch (error: unknown) {

        if (typeof error === "string") {
            return NewError("Error de Servidor.", error.toString())
        }
        return NewError("Error.", "Unknown server error")
    }
}

export async function POST(request: Request) {
    const { name } = await request.json()

    if (typeof name !== "string") {
        return NewError("Error en la petición", "El parámetro name no es válido.")
    }
    try {
        const data = await db.brands.create({ data: { name } })
        return NextResponse.json(data)
    } catch (error: unknown) {

        if (typeof error === "string") {
            return NewError("Server error.", error.toString())
        }
 
        return NewError("Error.", "Check data is correct, and not duplicated.")
    }
}