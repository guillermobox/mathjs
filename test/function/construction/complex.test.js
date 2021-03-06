var assert = require('assert'),
    math = require('../../../index.js'),
    complex = math.complex;

describe('complex', function() {

  it('should return 0 + 0i if called with no argument', function() {
    assert.deepEqual(complex(), new math.type.Complex(0, 0));
    assert.ok(complex() instanceof math.type.Complex);
  });

  it('should parse a valid string and create the complex number accordingly', function() {
    assert.deepEqual(complex('2+3i'), new math.type.Complex(2, 3));
    assert.deepEqual(complex('2-3i'), new math.type.Complex(2, -3));
    assert.ok(complex('2+3i') instanceof math.type.Complex);
  });

  it('should convert a real number into a complex value', function() {
    assert.deepEqual(complex(123), new math.type.Complex(123, 0));
  });

  it('should clone a complex value', function() {
    var b = complex(complex(2,3));
    assert.deepEqual(b, new math.type.Complex(2,3));
  });

  it('should convert the elements of a matrix or array to complex values', function() {
    var result = [
      new math.type.Complex(2, 0),
      new math.type.Complex(1, 0),
      new math.type.Complex(2, 3)
    ];
    assert.deepEqual(complex(math.matrix([2, true, complex(2, 3)])), new math.type.Matrix(result));
    assert.deepEqual(complex([2, true, complex(2, 3)]), result);
  });

  it('should throw an error if called with a string', function() {
    assert.throws(function () {complex('no valid complex number')}, SyntaxError);
  });

  it('should throw an error if called with a unit', function() {
    assert.throws(function () {complex(math.unit('5cm'))}, TypeError);
  });

  it('should accept two numbers as arguments', function() {
    assert.deepEqual(complex(2, 3), new math.type.Complex(2, 3));
    assert.deepEqual(complex(2, -3), new math.type.Complex(2, -3));
    assert.deepEqual(complex(-2, 3), new math.type.Complex(-2, 3));
    assert.ok(complex(2, 3) instanceof math.type.Complex);
  });

  it('should throw an error if passed two argument, one is invalid', function() {
    assert.throws(function () {complex('string', 2)}, TypeError);
    assert.throws(function () {complex(2, 'string')}, TypeError);
  });

  it('should throw an error if called with more than 2 arguments', function() {
    assert.throws(function () {complex(2,3,4)}, SyntaxError);
  });
});