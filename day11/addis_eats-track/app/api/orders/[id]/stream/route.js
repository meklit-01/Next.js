import { getSession } from "@/lib/session";
import { getOrderByIdForUser } from "@/lib/orders";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  const order = getOrderByIdForUser(id, session.id);
  if (!order) return Response.json({ error: "Order not found." }, { status: 404 });

  const encoder = new TextEncoder();
  let timer;
  let timeout;
  let closed = false;
  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        if (closed) return;
        const payload = JSON.stringify({ status: order.status, updatedAt: order.updatedAt || order.createdAt });
        try { controller.enqueue(encoder.encode(`data: ${payload}\n\n`)); } catch { close(); }
      };
      const close = () => {
        if (closed) return;
        closed = true;
        clearInterval(timer);
        clearTimeout(timeout);
        try { controller.close(); } catch {}
      };
      send();
      timer = setInterval(send, 5000);
      // Short-lived streams work with serverless hosts; EventSource reconnects automatically.
      timeout = setTimeout(close, 55000);
    },
    cancel() {
      closed = true;
      clearInterval(timer);
      clearTimeout(timeout);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
