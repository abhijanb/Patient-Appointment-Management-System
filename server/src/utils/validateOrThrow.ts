import z, { ZodType, type ZodSchema } from "zod";
import { ValidationError } from "./error";


function validateOrThrow<TSchema extends ZodSchema>(value: unknown, schema: TSchema): z.infer<TSchema> {
    const validated = schema.safeParse(value);
    if (!validated.success) {
        const error = validated.error.issues.map(issue => ({
            path: issue.path,
            message: issue.message,
            code: issue.code
        }));
        throw new ValidationError(error);
    }
    return validated.data;
}

export default validateOrThrow;