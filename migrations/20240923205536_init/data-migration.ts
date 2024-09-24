import { PrismaClient } from '@prisma/client'
import { Brand, Car } from "../../lib/interfaces"
import { brands_data, cars_data } from "../../lib/dbData"
const prisma = new PrismaClient()

async function main() {
    await prisma.$transaction(async (tx) => {
        const brands: Brand[] = brands_data
        const cars: Car[] = cars_data
        const brand_data = await tx.brands.createMany({
            data: brands
        })
        const db_brands = await tx.brands.findMany()
        const brand_ids_by_name: any = {}
        for (let i = 0; i < db_brands.length; i++) {
            const brand = db_brands[i];
            brand_ids_by_name[brand.name] = brand.id
        }
        for (let j = 0; j < cars.length; j++) {
            const car = cars[j];
            if (car.brand_name) {
                car.brand_id = brand_ids_by_name[car.brand_name]
                delete car.brand_name
            }
        }
        const car_data = await tx.cars.createMany({
            data: cars
        })
        console.log(car_data)
    })
}

main()
    .catch(async (e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => await prisma.$disconnect())