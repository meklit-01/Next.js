import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div style={{ fontSize: 72, fontWeight: 700 }}>
          Addis Eats
        </div>
        <div style={{ fontSize: 34, marginTop: 20 }}>
          Ethiopian food, drinks, and delivery
        </div>
      </div>
    ),
    size
  );
}
