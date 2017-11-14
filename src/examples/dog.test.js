const Dog = require('./dog');

describe('Dog', () => {
  it('is a function', () => {
    expect(Dog).toBeInstanceOf(Function);
  });

  describe('#bark', () => {
    let dog;

    beforeEach(() => {
      dog = new Dog();
    });

    it('is a function', () => {
      expect(dog.bark).toBeInstanceOf(Function);
    });

    it('returns woof!', () => {
      expect(dog.bark()).toBe('woof!');
    });
  });
});
