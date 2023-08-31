import * as z from "zod";

export const UserValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3, { message: "minimum 3 characters"}).max(30, { message: "maximum 30 characters"}),
    username: z.string().min(3, { message: "minimum 3 characters"}).max(30, { message: "maximum 30 characters"}),
    bio: z.string().min(0).max(300, { message: "maximum 300 characters"})
})