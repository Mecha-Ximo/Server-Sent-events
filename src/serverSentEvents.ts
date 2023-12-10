import express, { Request, Response } from 'express';
import { User } from './types/index.js';

const router = express.Router();

const users = ['user1', 'user2', 'user3', 'user4'];

router.get('/', (req: Request, res: Response) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Encoding': 'none',
  };
  res.writeHead(200, headers);

  console.log('consuming stream');

  res.write('Server-Sent Events streaming starts\n\n');

  let userIndex = 0;
  const intervalId = setInterval(() => {
    /**
     * Important!
     * Message has to have this format `data: ...content \n\n`
     * Otherwise 'message' event does not fire on EventSource client
     */
    // const message = `data: ${new Date().toLocaleTimeString()}\n\n`;

    const user: User = {
      id: crypto.randomUUID(),
      name: users[userIndex],
    };

    const message = `data: ${JSON.stringify(user)} \n\n`;

    res.write(message);

    userIndex++;
    if (userIndex === users.length) {
      closeEventsStream();
    }
  }, 1000);

  req.on('close', () => {
    closeEventsStream();
  });

  function closeEventsStream() {
    clearInterval(intervalId);
    res.end();
  }
});

export default router;
