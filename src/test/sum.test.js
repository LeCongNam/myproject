const Obj_test = require('./sum');

test('adds 1 + 2 to equal 3', () => {
    const data = { one: 1 };
    data['two'] = 2;
    expect(data).toEqual({ one: 1, two: 2 })
});