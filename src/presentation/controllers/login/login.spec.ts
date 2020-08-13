import { LoginController } from './login'
import { HttpRequest } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../erros'

// const makeFakeRequest = (): HttpRequest => ({
//   body: {
//     email: 'felipe@mail.com',
//     password: '123456'
//   }
// })

interface SutTypes {
  sut: LoginController
}

const makeSut = (): SutTypes => {
  const sut = new LoginController()
  return { sut }
}

describe('Login Controller', () => {
  test('Should return 400 if email is no provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        password: '123456'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if password is no provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        email: 'felipe@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
