import { schemas } from "../schemas/schemas.js";

export async function validatePostTimeline(req, res, next){
    if(!req.body){
        return res.status(201).send("body is required.")
    }

    try{
        const validation = schemas.timelineSchema.validate( req.body, {abortEarly: false});
        if(validation.error){
            const err = validation.error.details.map((detail) => detail.message);
            return res.status(400).send(err)
        }

    }catch(err){
        return res.status(500).send(err.message);
    }

    next()
}