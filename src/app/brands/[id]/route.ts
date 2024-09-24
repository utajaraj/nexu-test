import { NextResponse } from "next/server";
import db from "../../../../lib/db";
const NewError = (message: string, error?: string) => NextResponse.json({ message, error }, { status: 400 })
export async function GET() {
    try {
        const data = await db.brands.findMany()
        return NextResponse.json(data)
    } catch (error: unknown) {

        if(typeof error === "string"){
            return NewError("Error de Servidor.", error.toString())
        }
        return NewError("Error.", "Unknown server error")
    }
}
