import { Router } from 'express'
import { signUpControllerFactory } from '../factories/signup'
import { adapterRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  const signupController = signUpControllerFactory()
  router.post('/signup', adapterRoute(signupController))
}
