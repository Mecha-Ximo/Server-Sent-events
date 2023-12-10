import { startApp } from './app.js';
import { getPortFromArgv } from './utils/getPort.js';

const port = getPortFromArgv(process.argv);

startApp(port ?? 3004);
