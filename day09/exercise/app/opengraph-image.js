import { ImageResponse } from "next/og";

export const alt = "Addis Eats";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#839958",
          color: "white",
          fontSize: 70,
          fontWeight: "bold",
        }}
      >
        Addis Eats
      </div>
    ),
    {
      ...size,
    }
  );
}