import { Request, Response, NextFunction } from "express";


export async function injector(req: Request, res: Response, next: NextFunction) {
    try {
        // Inject Nezto instance into the request object
        res.handler = req.app.nezto.response;

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        // Handle any errors that occur during injection
        console.error('Error in injector middleware:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}