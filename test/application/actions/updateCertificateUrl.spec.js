import { configureStore } from '../../../src/store';
import updateCertificateUrl from '../../../src/actions/updateCertificateUrl';
import { getCertificateUrl, getUrlIsValid } from '../../../src/selectors/input';
import { getJSONCertificate } from '../../../src/selectors/certificate';
import validCertificateFixture from '../../fixtures/valid-certificate-example';
import invalidCertificateFixture from '../../fixtures/invalid-certificate-example';

const INVALID_URL = 'invalid url';
const MOCK_SERVER_VALID_URL = 'http://localhost:3001/to/certificate';
const MOCK_SERVER_INVALID_URL = 'http://localhost:3001/to/certificate/invalid';
const NOT_CERTIFICATE_URL = 'http://www.learningmachine.com';
const VALID_LOCAL_PATH = '../../fixtures/valid-certificate-example.json';

describe('updateCertificateUrl action creator test suite', function () {
  describe('given the url inputted is an invalid url', function () {
    let store;
    let output;

    beforeEach(async function () {
      store = configureStore();
      // prepare state the correct way
      output = await store.dispatch(updateCertificateUrl(INVALID_URL));
    });

    afterEach(function () {
      store = null;
      output = null;
    });

    it('should update the state input isValid property to false', function () {
      const state = store.getState();
      expect(getUrlIsValid(state)).toBe(false);
    });

    it('should do nothing', function () {
      expect(output).toBe(null);
    });
  });

  describe('given it is dispatched with a valid url', function () {
    let store;

    beforeEach(function () {
      store = configureStore();
    });

    afterEach(function () {
      store = null;
    });

    it('should update the state with the url', async function () {
      await store.dispatch(updateCertificateUrl(MOCK_SERVER_VALID_URL));
      const state = store.getState();
      expect(getCertificateUrl(state)).toBe(MOCK_SERVER_VALID_URL);
    });

    describe('and it is of a valid certificate', function () {
      it('should update the state with the valid certificate definition', async function () {
        await store.dispatch(updateCertificateUrl(MOCK_SERVER_VALID_URL));
        const state = store.getState();
        expect(getJSONCertificate(state)).toEqual(validCertificateFixture);
      });
    });

    describe('and it is of an invalid certificate', function () {
      it('should update the state with the invalid certificate definition', async function () {
        await store.dispatch(updateCertificateUrl(MOCK_SERVER_INVALID_URL));

        const state = store.getState();
        expect(getJSONCertificate(state)).toEqual(invalidCertificateFixture);
      });
    });

    describe('and the url is not of a certificate', function () {
      it('should not set the certificate json in the state', async function () {
        await store.dispatch(updateCertificateUrl(NOT_CERTIFICATE_URL));
        const state = store.getState();

        expect(getJSONCertificate(state)).toEqual(undefined);
      });
    });
  });

  // failing, issue opened:
  // https://github.com/bitinn/node-fetch/issues/481
  // https://github.com/matthew-andrews/isomorphic-fetch/issues/76#issuecomment-402784514
  xdescribe('given it is dispatched with a valid local path', function () {
    let store;

    beforeEach(async function () {
      store = configureStore();
      await store.dispatch(updateCertificateUrl(VALID_LOCAL_PATH));
    });

    afterEach(function () {
      store = null;
    });

    it('should update the state with the local path', function () {
      const state = store.getState();
      expect(getCertificateUrl(state)).toBe(VALID_LOCAL_PATH);
    });

    it('should update the state with the valid certificate definition', function () {
      const state = store.getState();
      expect(getJSONCertificate(state)).toEqual(validCertificateFixture);
    });
  });
});