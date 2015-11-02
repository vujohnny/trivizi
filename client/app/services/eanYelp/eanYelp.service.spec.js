'use strict';

describe('Service: eanYelp', function () {

  // load the service's module
  beforeEach(module('triviziApp'));

  // instantiate service
  var eanYelp;
  beforeEach(inject(function (_eanYelp_) {
    eanYelp = _eanYelp_;
  }));

  it('should do something', function () {
    expect(!!eanYelp).toBe(true);
  });

});
