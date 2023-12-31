/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
// import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

Route.group(()=>{

  Route.post('/', 'AuthController.index')

  Route.post('/login', 'AuthController.login')

  Route.post('/register', 'AuthController.register')

  Route.post('/logout', 'AuthController.logout')

  Route.put('/password-reset', 'AuthController.passwordReset')

  Route.delete('/delete/:id', 'AuthController.delete')

  Route.get('/google/redirect', async ({ ally }) => {
    return ally.use('google').redirect()
  })

}).prefix('/api')


Route.get('/google/callback', 'AuthController.signupWithGoogle')


