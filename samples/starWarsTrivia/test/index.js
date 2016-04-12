const Lab = require('lab')
const Code = require('code')

const starWarsTrivia = require('../src')

const lab = exports.lab = Lab.script()
const expect = Code.expect

lab.experiment('starWarsTrivia', () => {
  lab.test('exports handler function', (done) => {
    expect(starWarsTrivia).to.include('handler')
    expect(starWarsTrivia.handler).to.be.a.function()

    done()
  })

  lab.test('fails on bad event', (done) => {
    starWarsTrivia.handler({}, {
      fail: function (err) {
        expect(err).to.be.a.string()
        expect(err).to.startWith('Exception')

        done()
      }
    })
  })

  lab.test('fails on bad applicationId', (done) => {
    starWarsTrivia.handler({
      session: { application: { applicationId: 'wrong' } }
    }, {
      fail: function (err) {
        expect(err).to.be.a.string()
        expect(err).to.equal('Invalid Application ID')

        done()
      }
    })
  })
})
