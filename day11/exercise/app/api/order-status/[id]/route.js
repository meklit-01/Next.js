export async function GET() {
  const statuses = [
    "Preparing",
    "On the way",
    "Delivered",
  ];

  const encoder = new TextEncoder();

  let index = 0;
  let timer;
  let closed = false;
  let controllerRef;

  function stop() {
    closed = true;
    clearInterval(timer);
  }

  const stream = new ReadableStream({
    start(controller) {
      controllerRef = controller;

      function sendStatus() {
        if (closed) return;

        const status = statuses[index];

        controller.enqueue(
          encoder.encode(
            `event: status\ndata: ${JSON.stringify({ status })}\n\n`
          )
        );

        index += 1;

        if (status === "Delivered") {
          stop();
          controller.close();
        }
      }

      sendStatus();

      timer = setInterval(() => {
        if (index >= statuses.length) {
          stop();
          return;
        }

        sendStatus();
      }, 5000);
    },

    cancel() {
      stop();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
