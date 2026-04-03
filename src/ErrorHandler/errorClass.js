export class AppError extends Error{
    constructor(message,statusCode,internalCode)
    {
        super(message);
        this.statusCode=statusCode;
        this.internalCode=internalCode
    }
}