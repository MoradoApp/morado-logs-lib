import * as Utils from '../src/utils';

describe('Utils', () => {
  it(`Given a value property in Winston Log,
    When value exists and is object
    Then the function should transform data to string
    `, () => {
    const expected = { error: 'Unexpected error' };
    const response = Utils.validateValueProperty(
      { value: expected } as any,
      '',
    );
    expect(response).toBe(JSON.stringify(expected, null, 2));
  });

  it(`Given a stack property in Winston Log,
    When stack exists and is object
    Then the function should transform data to string
    `, () => {
    const expected = [{ message: 'Stack error' }];
    const response = Utils.validateStackProperty(
      { stack: expected } as any,
      '',
    );
    expect(response).toBe(JSON.stringify(expected, null, 2));
  });

  it(`Given a context property in Winston Log,
    When context exists and is object
    Then the function should transform data to string
    `, () => {
    const expected = { message: 'Context Info' };
    const response = Utils.validateContextProperty(
      { context: expected } as any,
      '',
    );
    expect(response).toBe(JSON.stringify(expected, null, 2));
  });

  it(`Given a message property in Winston Log,
    When message exists and is object
    Then the function should transform data to string
    `, () => {
    const expected = { message: 'Message Info' };
    const response = Utils.validateMessageProperty(
      { message: expected } as any,
      '',
    );
    expect(response).toBe(JSON.stringify(expected, null, 2));
  });

  it(`Given a message property in Winston Log,
    When message is undefined
    Then the function should return ''
    `, () => {
    const response = Utils.validateMessageProperty(
      { message: '\tundefined' } as any,
      '',
    );
    expect(response).toBe('');
  });

  it(`Given a request to get Winston Log,
    When a winston is called
    Then the function should return all logs in order
    `, () => {
    const request = {
      timestamp: '1234',
      level: 'debug',
      message: 'Hola mundo',
    };
    const response = Utils.getLog(request as any);
    expect(response).toBe('[1234] [debug] :Hola mundo');
  });
});
