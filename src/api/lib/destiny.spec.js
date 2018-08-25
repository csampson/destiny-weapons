/* eslint-env jest */

const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const mockAxios = new MockAdapter(axios)

const Destiny = require('./destiny')

function mock (url) {
  mockAxios.onGet(RegExp(url)).reply(config => {
    expect(config.headers['X-Api-Key']).toMatchSnapshot()
    expect(config.baseURL).toMatchSnapshot()
    expect(config.url).toMatchSnapshot()

    return [200, {}]
  })
}

describe('Destiny', () => {
  afterEach(() => {
    mockAxios.reset()
  })

  describe('Armory', () => {
    describe('::search', () => {
      beforeEach(() => {
        mock('Armory/Search/.*')
      })

      it('should search for armory items', () => (
        Destiny.Armory.search('<type>', '<query>')
      ))
    })
  })

  describe('Manifest', () => {
    describe('::fetch', () => {
      beforeEach(() => {
        mock('Manifest/.*')
      })

      it('should fetch the manifest for a given entity', () => (
        Destiny.Manifest.fetch('<type>', '<id>')
      ))
    })
  })
})
