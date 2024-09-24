
import { PrismaClient } from '@prisma/client'

// const connectionString = `${process.env.DATABASE_URL}`

const db = new PrismaClient()
export default db