import * as UserService from '../services/user.service.js'



export async function createUser(req, res){
    try {
        const {body} = req;
        const response = await UserService.createUser(body)
       
    } catch (error) {
        res.status(400).json(error.message);
    }
}