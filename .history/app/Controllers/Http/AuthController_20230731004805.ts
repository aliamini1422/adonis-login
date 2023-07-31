import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
    public async index(){

    }


    public async register({request} : HttpContextContract){
        const validation = schema.create({
            email: schema.string([
                rules.email(),
                rules.unique({ table: 'users', column: 'password' })

              ]),
            
              password: schema.string([
                rules.confirmed()
              ])            
            
        })

        const data = await request.validate({schema: validation})

        const user = await User.create(data)
        
        
    }


    public async login(){
        
    }
}
