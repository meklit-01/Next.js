import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrderByIdForUser } from "@/lib/orders";
import { etb, when } from "@/lib/format";
import TrackingMap from "../components/TrackingMap";
import TrackingLive from "./TrackingLive";

export const dynamic = "force-dynamic";
export const metadata = { title: "Track delivery", description: "Track your Addis Eats delivery." };

export default async function TrackingPage({ params }) {
  const session = await getSession();
  if (!session) redirect(`/login?next=/tracking/${(await params).id}`);
  const { id } = await params;
  const order = getOrderByIdForUser(id, session.id);
  if (!order) notFound();

  const rawTotal = order.total ?? order.amount;
  const total = rawTotal == null || rawTotal === "" ? null : Number(rawTotal);
  return (
    <article className="tracking-page">
      <p><Link href="/orders">← Back to my orders</Link></p>
      <h1>Track order #{order.id}</h1>
      <p>Follow your courier and check the latest delivery status.</p>
      <TrackingLive orderId={order.id} initialStatus={order.status} initialUpdatedAt={order.updatedAt || order.createdAt} />
      <div className="tracking-layout">
        <section>
          <h2>Delivery map</h2>
          <TrackingMap area={order.area} />
          <p className="map-note">The map uses a demo courier position and an approximate neighbourhood location.</p>
        </section>
        <section className="tracking-details">
          <h2>Delivery details</h2>
          <dl>
            <dt>Order number</dt><dd>#{order.id}</dd>
            <dt>Customer</dt><dd>{order.name || "Customer"}</dd>
            <dt>Delivery address / neighbourhood</dt><dd>{order.area || "Address not provided"}</dd>
            <dt>Courier location</dt><dd>Near {order.area || "Addis Ababa"} (approximate demo location)</dd>
            <dt>Order placed</dt><dd>{when(order.createdAt)}</dd>
            <dt>Order total</dt><dd>{total == null || !Number.isFinite(total) ? "Not recorded" : etb(total)}</dd>
          </dl>
        </section>
      </div>
    </article>
  );
}
