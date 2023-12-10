/**
 * Return the value of the port flag from process arguments vector if any
 * @param argv - the process argument vector
 * @returns the port number if it is found
 */
export function getPortFromArgv(argv: string[]): number | null {
  const portFlags = ['--port', '-p'];

  for (const flag of portFlags) {
    const flagIndex = argv.findIndex((f) => f === flag);
    if (flagIndex === -1) {
      continue;
    }

    const port = parseInt(argv[flagIndex + 1]);
    if (isNaN(port)) {
      return null;
    }

    return port;
  }

  return null;
}
