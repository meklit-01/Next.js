  
export async function GET(request, { params }) {
  const { id } = await params;

  const updates = [
    { status: "preparing", message: "Your order is being prepared." },
    { status: "on_the_way", message: "Your courier is on the way." },
    { status: "delivered", message: "Your order has been delivered." },
  ];

  let step = 0;
  let interval;
  let closed = false;
  let controllerRef;

  const stream = new ReadableStream({
    start(controller) {
      controllerRef = controller;
      const encoder = new TextEncoder();

      function closeStream() {
        if (closed) return;
        closed = true;
        clearInterval(interval);

        try {
          controller.close();
        } catch {
          // The client may already have disconnected.
        }
      }

      function send(update) {
        if (closed) return;

        controller.enqueue(
          encoder.encode(
            `event: status\ndata: ${JSON.stringify({
              orderId: id,
              ...update,
            })}\n\n`
          )
        );
      }

      send(updates[0]);
      step = 1;

      interval = setInterval(() => {
        if (step >= updates.length) {
          closeStream();
          return;
        }

        const update = updates[step];
        send(update);
        step += 1;

        if (update.status === "delivered") {
          closeStream();
        }
      }, 5000);

      request.signal.addEventListener("abort", closeStream, {
        once: true,
      });
    },

    cancel() {
      closed = true;
      clearInterval(interval);
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
