/* eslint-env jest */

'use strict'

const MOCK_CLIENT = {
  send_command: jest.fn()
}

jest.mock('redis', () => ({
  createClient: () => MOCK_CLIENT
}))

const Database = require('./database')

describe('Database', () => {
  let database

  beforeEach(() => {
    database = new Database()
  })

  describe('constructor', () => {
    it('should create and store a redis client instance', () => (
      expect(database.client).toBe(MOCK_CLIENT)
    ))
  })

  describe('#execute', () => {
    let execution

    beforeEach(() => {
      execution = database.execute('get', ['<key>'])
    })

    it('should call the underlying client method', () => (
      expect(database.client.send_command).toHaveBeenCalled()
    ))

    it('should be promisifed', () => (
      expect(execution).toBeInstanceOf(Promise)
    ))
  })
})
