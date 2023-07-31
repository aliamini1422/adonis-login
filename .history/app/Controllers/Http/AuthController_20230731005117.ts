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
                rules.unique({ table: 'users', column: 'email' })

              ]),
            
              password: schema.string([
                rules.unique({ table: 'users', column: 'password' })
              ])            
            
        })

        const data = await request.validate({schema: validation})

        const user = await User.create(data)
        
        return user
    }


    public async login({request} : HttpContextContract){
        
    }
}
