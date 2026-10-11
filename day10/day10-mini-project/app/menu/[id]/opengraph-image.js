import { ImageResponse } from "next/og";
import { getDishes } from "@/lib/dishes";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({ params }) {
  const { id } = await params;
  const dishes = await getDishes();
  const dish = dishes.find((item) => String(item.id) === String(id));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "70px",
          background: "#f4efe7",
          color: "#243018",
        }}
      >
        <div style={{ fontSize: 34, marginBottom: 20 }}>
          Addis Eats
        </div>
        <div style={{ fontSize: 64, fontWeight: 700 }}>
          {dish?.name || "Dish"}
        </div>
        <div style={{ fontSize: 30, marginTop: 20 }}>
          {dish?.price ? `${dish.price} ETB` : "Ethiopian food"}
        </div>
      </div>
    ),
    size
  );
}
