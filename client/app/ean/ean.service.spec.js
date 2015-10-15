'use strict';

describe('Service: ean', function () {

  // load the service's module
  beforeEach(module('triviziApp'));

  // instantiate service
  var ean;
  beforeEach(inject(function (_ean_) {
    ean = _ean_;
  }));

  it('should do something', function () {
    expect(!!ean).toBe(true);
  });

});
