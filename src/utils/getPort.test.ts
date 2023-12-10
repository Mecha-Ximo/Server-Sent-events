import { describe, expect, it } from 'vitest';
import { getPortFromArgv } from './getPort.js';

describe('getPortFromArgv', () => {
  it('should return null if no port flag is present', () => {
    const argv = ['node', 'script.js'];

    const port = getPortFromArgv(argv);

    expect(port).toBeNull();
  });

  it('should return null if the port value is not a number', () => {
    const argv = ['node', 'script.js', '--port', 'abc'];

    const port = getPortFromArgv(argv);

    expect(port).toBeNull();
  });

  it('should return the port value when using --port flag', () => {
    const argv = ['node', 'script.js', '--port', '8080'];

    const port = getPortFromArgv(argv);

    expect(port).toBe(8080);
  });

  it('should return the port value when using -p flag', () => {
    const argv = ['node', 'script.js', '-p', '3000'];

    const port = getPortFromArgv(argv);

    expect(port).toBe(3000);
  });

  it('should return the port value when using --port flag with other arguments', () => {
    const argv = ['node', 'script.js', 'arg1', '--port', '5000', 'arg2'];

    const port = getPortFromArgv(argv);

    expect(port).toBe(5000);
  });

  it('should return the port value when using -p flag with other arguments', () => {
    const argv = ['node', 'script.js', 'arg1', '-p', '1234', 'arg2'];

    const port = getPortFromArgv(argv);

    expect(port).toBe(1234);
  });
});
