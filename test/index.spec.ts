import {
  wikiApp
} from './../src/index';
import {
  expect
} from 'chai';

describe('wikiApp', () => {

  it('Returns `hello universe`', () => {
    expect(wikiApp()).to.equal('hello universe');
  });

});
