import { NextResponse } from "next/server";

const validAreas = [
  "Bole",
  "Kazanchis",
  "Megenagna",
  "Piassa",
];

function validateOrder(body) {
  const fieldErrors = {};

  if (!body.name || body.name.trim() === "") {
    fieldErrors.name = "Name is required.";
  }

  if (!body.phone || body.phone.trim() === "") {
    fieldErrors.phone = "Phone number is required.";
  } else if (
    !/^(\+2519|09)\d{8}$/.test(body.phone)
  ) {
    fieldErrors.phone = "Enter a valid Ethiopian phone number.";
  }

  if (!body.area || !validAreas.includes(body.area)) {
    fieldErrors.area = "Please select a valid delivery area.";
  }

  return fieldErrors;
}

export async function POST(request) {
  const body = await request.json();

  const fieldErrors = validateOrder(body);

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Please correct the errors.",
        },
        fieldErrors,
      },
      { status: 422 }
    );
  }

  const order = {
    id: Date.now().toString(),
    name: body.name,
    phone: body.phone,
    area: body.area,
    notes: body.notes || "",
  };

  return NextResponse.json(
    {
      message: "Order created successfully.",
      order,
    },
    { status: 201 }
  );
}