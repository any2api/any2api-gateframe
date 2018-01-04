import { LazyMessageAccesor } from './lazy-message-accessor';

let typeMock;
let encodeMock: jest.Mock;
let decodeMock: jest.Mock;
const mockMessage = { some: 'message' };
const mockBuffer = new Buffer('fooBuffer');

beforeEach(() => {
    encodeMock = jest.fn();
    decodeMock = jest.fn();

    typeMock = {
        decode: decodeMock,
        encode: () => ({
            finish: encodeMock
        })
    };

    encodeMock.mockReturnValue(mockBuffer);
    decodeMock.mockReturnValue(mockMessage);
});

test('lazy accessor constructor test with buffer', () => {
    const buffer = new Buffer(0);
    const accessor = new LazyMessageAccesor(typeMock as any, buffer);

    const returned = accessor.getBinary();
    expect(returned).toBe(buffer);
    expect(encodeMock.mock.calls.length).toBe(0);

    const message = accessor.getMessage();
    expect(message).toBe(mockMessage);
    expect(encodeMock.mock.calls.length).toBe(0);
});

test('lazy accessor constructor test with object', () => {
    const message = {};
    const accessor = new LazyMessageAccesor(typeMock as any, message);

    const returned = accessor.getMessage();
    expect(returned).toBe(message);
    expect(encodeMock.mock.calls.length).toBe(0);

    const buffer = accessor.getBinary();
    expect(buffer).toBe(mockBuffer);
    expect(decodeMock.mock.calls.length).toBe(0);
});

test('lazy accessor set message test', () => {
    const buffer = new Buffer(0);
    const message = {};
    const accessor = new LazyMessageAccesor(typeMock as any, buffer);

    accessor.setMessage(message);
    const returned = accessor.getMessage();
    expect(returned).toBe(message);
    expect(decodeMock.mock.calls.length).toBe(0);

    expect(accessor.getBinary()).toBe(mockBuffer);
});

test('lazy accessor set binary test', () => {
    const buffer = new Buffer(0);
    const message = {};
    const accessor = new LazyMessageAccesor(typeMock as any, message);

    accessor.setBinary(buffer);
    const returned = accessor.getBinary();
    expect(returned).toBe(buffer);
    expect(encodeMock.mock.calls.length).toBe(0);

    expect(accessor.getMessage()).toBe(mockMessage);
});

test('lazy accessor only single encode call', () => {
    const message = {};
    const accessor = new LazyMessageAccesor(typeMock as any, message);

    accessor.getBinary();
    accessor.getBinary();

    expect(encodeMock.mock.calls.length).toBe(1);
});

test('lazy accessor only single decode call', () => {
    const buffer = new Buffer(0);
    const accessor = new LazyMessageAccesor(typeMock as any, buffer);

    accessor.getMessage();
    accessor.getMessage();

    expect(decodeMock.mock.calls.length).toBe(1);
});
