export async function uploadToImgBB(file: File): Promise<string> {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  console.log("IMGBB KEY:", key);
  if (!key) throw new Error("ImgBB API key is missing");

  if (!file.type.startsWith("image/")) {
    throw new Error("Please select an image file");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be smaller than 5MB");
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();

  if (!res.ok || !data?.data?.url) {
    throw new Error(data?.error?.message || "Image upload failed");
  }
  return data.data.url as string;
}
