import { ImageResponse } from "next/og";
import dishes from "@/lib/dishes";

export const runtime = "edge";

export const alt = "Addis Eats dish";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;

  const dish = dishes.find((dish) => dish.id === id);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#839958",
          color: "white",
        }}
      >
        <div style={{ fontSize: 70 }}>
          {dish?.name || "Addis Eats"}
        </div>

        <div style={{ fontSize: 40 }}>
          {dish ? `${dish.price} ETB` : ""}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}