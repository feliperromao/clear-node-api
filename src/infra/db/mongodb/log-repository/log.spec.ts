import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { LogMongoRepository } from './log'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('Log Mongo Repository', () => {
  let logErrorsCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  // ? Este etapa do teste tem como objetivo limpar a tabela(collection) do banco de dados entre cada teste
  beforeEach(async () => {
    logErrorsCollection = await MongoHelper.getCollection('log_errors')
    await logErrorsCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await logErrorsCollection.countDocuments()
    expect(count).toBe(1)
  })
})
