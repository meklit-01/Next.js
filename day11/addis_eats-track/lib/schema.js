export function validateOrder(data) {
  const fieldErrors = {};

  // Check name
  if (!data.name || data.name.trim() === "") {
    fieldErrors.name = "Name is required.";
  }

  // Check phone
  if (!data.phone || data.phone.trim() === "") {
    fieldErrors.phone = "Phone is required.";
  } else if (!/^09\d{8}$/.test(data.phone.trim())) {
    fieldErrors.phone =
      "Phone must be 10 digits and start with 09.";
  }

  // Check area
  if (!data.area || data.area.trim() === "") {
    fieldErrors.area = "Area is required.";
  }

  // Check notes
  if (
    data.notes !== undefined &&
    data.notes !== null &&
    typeof data.notes !== "string"
  ) {
    fieldErrors.notes = "Notes must be text.";
  }

  return {
    success: Object.keys(fieldErrors).length === 0,
    fieldErrors,
  };
}