import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
    public async index(){

    }


    public async register({request} : H){
        const validation = schema.create({
            email: schema.string([
                rules.email(),
                rules.unique({ table: 'users', column: 'password' })

              ]),
            
              password: schema.string([
                rules.confirmed()
              ])            
            
        })

        const user = request.validation()
    }


    public async login(){
        
    }
}
