import { err } from "inngest/types"

export const protect = async (req, res, next) => {
    // Authentication logic here
    try {
        const userId = await req.auth()
        if(!userId){
            return res.json({success : false, message : "Not Authenticated"})
        }
        next()
    } catch (error) {
        res.json({success : false, message : error.message})
    }
}