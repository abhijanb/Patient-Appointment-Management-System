import type { Response } from "express";


function successResponse<T>(res: Response, data: T, statusCode: number, message: string) {
    return res.status(statusCode).json({ data, message });
}

function errorResponse(res: Response, message: string, statusCode: number, error: string) {
    return res.status(statusCode).json({ message, error })
}

interface PaginationMetadata {
    total: number,
    page: number,
    limit: number,
    totalPages: number
}

function paginationResponse<T>(
    res: Response, data: T, metadata: PaginationMetadata, statusCode: number, message: string
) {
    return res.status(statusCode).json({
        data,
        meta: metadata,
        message,
        success: true,
    });
}


export { successResponse, errorResponse, paginationResponse }