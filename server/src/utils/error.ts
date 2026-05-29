export class ValidationError extends Error {
    error: any
    statusCode: number
    constructor(error: any) {
        super("Validation error");
        this.error = error;
        this.statusCode = 400;
    }
}


export class ApiError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}