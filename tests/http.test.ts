import { Server } from 'http'
import request from 'supertest'
import { run } from '../app'

describe('http', () => {
  let server: Server

  beforeAll(() => {
    server = run(9001, () => {
      console.log('start in 9001')
    })
  })

  it('GET /user', async () => {
    const response = await request(server)

    response.get('/api/v1/user').expect('Content-Type', /json/).expect(200)
  })

  afterAll(async () => {
    server.close()
  })
})
