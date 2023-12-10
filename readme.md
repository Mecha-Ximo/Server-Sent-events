# Server-Sent events

This repo contains a basic example to test Server-Sent events.

## Server side

Create endpoint that respond with a server-sent events streaming.
To set up the streaming set the proper headers:

```
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
```

Then write to the response.
When writing to the response stream it has to be done in a specific format -> `data: ...content \n\n`

Then the event source constructor will extract the content from the message and expose it in the data property of the 'message' event.

```
    const message = `data: ${JSON.stringify(user)} \n\n`;
    res.write(message);

```

When done, end the response to close the stream.
res.end();

## Client side

Create a new EventSource that points to the endpoint set up in the server.

Add an event listener to the event source so messages received from the stream can be read.

The message content can be read from the 'data' property.

Stream consumer can decide to close the stream at any point and don't wait for it to end through `eventSource.close()`.
