import { AppError } from "../ErrorHandler/errorClass.js"

let authorize = (...allowedRoles)=>{
    return (req,res,next)=>{
        if(!allowedRoles.includes(req.user.role))
        {
            return next(new AppError(`Forbidden`,403,`Access denied`))
        }
        next();
    }
}

export default authorize