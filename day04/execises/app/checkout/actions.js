export async function CreateOrder(formData) {
    const name = formData.get("name");
    const phone = formData.get("phone");
    const area = formData.get("area");
    const notes = formData.get("notes");


    const fieldErrors = {};

    if(!name || name.trim() === ""){
        fieldErrors.name = "Name is required.";
    }
    if(!phone || phone.trim() === ""){
        fieldErrors.phone = "Phone number is required.";
    }
    if(!["Bole", "Kazanchis", "Megenagna", "Piassa"].includes(area)){
        fieldErrors.area = "Please select a valid area.";
    }
    if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      fieldErrors,
    };
  }

  return {
    success: true,
    message: "Order created successfully!",
  };
}