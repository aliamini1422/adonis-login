// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
    public async index(){

    }


    public async register(){
        const validation = schema.create({
            email: schema.string([
                rules.email()
              ]),
            
            password: schema.string([])
            
        })
    }


    public async login(){
        
    }
}
