import type { Response } from 'express';
import express from 'express';
import { Server } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import SSERouter from './serverSentEvents.js';

export function startApp(port: number, hostname = '127.0.0.1'): Server {
  const app = express();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  app.use(express.static(join(__dirname, 'public')));

  app.get('/', (_, res: Response) => {
    res.json({ server: 'Ready' });
  });

  app.use('/sse', SSERouter);

  const server = app.listen(port, hostname, () => {
    console.log(`Server listening on: http://${hostname}:${port}`);
  });

  return server;
}
