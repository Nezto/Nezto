import { Request, Response, NextFunction } from "express";


/**Middleware to inject the Nezto instance's response handler into the response object.*/
export async function injector(req: Request, res: Response, next: NextFunction) {
    try {
        // Inject Nezto instance into the request object
        res.handler = req.app.nezto.response;
        res.ctx = req.app.nezto;
        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        // Handle any errors that occur during injection
        console.error('Error in injector middleware:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}