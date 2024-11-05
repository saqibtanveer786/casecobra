import { z } from "zod"

export const customizeOptionsSchema = z.object({
    name: z.string().max(100, {message: "Name have to be less than 100 chars"}).min(3).optional(),
    date: z.string().optional()
})