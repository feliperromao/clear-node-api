import { LoginController } from './login'
import { HttpRequest, EmailValidator } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../erros'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'felipe@mail.com',
    password: '123456'
  }
})

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new LoginController(emailValidatorStub)
  return { sut, emailValidatorStub }
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

  test('Should calls isValid with correct values', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(makeFakeRequest())

    expect(isValidSpy).toHaveBeenCalledWith('felipe@mail.com')
  })
})
