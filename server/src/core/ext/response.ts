import { Response } from "express";

class ResponseHandler{

    async unAuthorised(res: Response, content: any = { message: "Unauthorized" }, ...args: any[]) {
        res.status(401).json({
            status: 401,
            message: content,
            ...args
        });
    }

    async forbidden(res: Response, content: any = { message: "Forbidden" }, ...args: any[]) {
        res.status(403).json({
            status: 403,
            message: content,
            ...args
        });
    }


    async notFound(res: Response, content: any = { message: "Not Found" }, ...args: any[]) {
        res.status(404).json({
            status: 404,
            message: content,
            ...args
        });
    }

    async internalServerError(res: Response, content: any = { message: "Internal Server Error" }, ...args: any[]) {
        res.status(500).json({
            status: 500,
            message: content,
            ...args
        });
    }

    async success(res: Response, content: any = { message: "Success" }, ...args: any[]) {
        res.status(200).json({
            status: 200,
            message: content
        });
    }

    async created(res: Response, content: any = { message: "Created" }) {
        res.status(201).json({
            status: 201,
            message: content
        });
    }

    async noContent(res: Response, content: any = { message: "No Content" }) {
        res.status(204).json({
            status: 204,
            message: content
        });
    }

    async notModified(res: Response, content: any = { message: "Not Modified" }) {
        res.status(304).json({
            status: 304,
            message: content
        });
    }

    async badRequest(res: Response, content: any = { message: "Bad Request" }) {
        res.status(400).json({
            status: 400,
            message: content
        });
    }

    async unAuthorized(res: Response, content: any = { message: "Unauthorized" }) {
        res.status(401).json({
            status: 401,
            message: content
        });
    }


}

export {
    ResponseHandler
}