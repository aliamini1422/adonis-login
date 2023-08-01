import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async index() {

  }

  public async register({request, response}: HttpContextContract) {
    const validation = schema.create({
      email: schema.string([
        rules.email(),
        rules.unique({table: 'users', column: 'email'})

      ]),
      password: schema.string([
        rules.unique({table: 'users', column: 'password'})
      ]),

      code: schema.string.optional()

    })

    let user

    try {
      const data = await request.validate({schema: validation})
      user = await User.create(data)

    } catch (e) {
      return response.status(403).send("ایمیل قبلا استفاده شده است")
    }

    return response.created(user)
  }


  public async login({ request, auth }: HttpContextContract) {

    const email = request.input('email')
    const password = request.input('password')
    await auth.attempt(email, password)

    return await auth.attempt(email, password)

    // try {
    //   token = await auth.attempt(email, password)
    // } catch (e) {
    //   console.log(e)
    //   if (e.responseText === "E_INVALID_AUTH_PASSWORD: Password mis-match") {
    //     return response.status(401).send("پسورد مطابقت ندارد")
    //   } else if (e.responseText === "E_INVALID_AUTH_UID: User not found") {
    //     return response.status(404).send("کاربری با این مشخصات وجود ندارد")
    //   }
    //   return response.send("مشکلی پیش امده لطفا دوباره امتحان کنید")
    // }

    // return response.ok({
    //   user: auth.user,
    //   token: token.token
    // })
  }

  public async logout({auth}: HttpContextContract) {
    await auth.logout()

    return auth.isLoggedOut
  }


  public async passwordReset({request, response}: HttpContextContract) {
    const email = request.input('email')
    const newPassword = request.input('password')

    const user = await User.findByOrFail('email', email)

    if (!user) {
      return response.notFound("کاربری با این ایمیل یافت نشد")
    }
    user.password = newPassword

    await user.save()

    return user
  }

  public async delete({params, response}: HttpContextContract) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.delete()
    } catch (e) {
      return response.notFound("کاربر یافت نشد")
    }

    return response.status(200).ok("اکانت با موفقیت پاک شد")
  }


  public async signupWithGoogle({ ally }){
    const google = ally.use('google').stateless()

    /**
     * User has explicitly denied the login request
     */
    if (google.accessDenied()) {
      return 'Access was denied'
    }

    /**
     * Unable to verify the CSRF state
     */
    if (google.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    /**
     * There was an unknown error during the redirect
     */
    if (google.hasError()) {
      return google.getError()
    }

    /**
     * Finally, access the user
     */
    const user = await google.user()
      await User.create({
        'email':user.email,
        'password': '123456'
      })

    // return "user Created with password:123456"
  }
}
