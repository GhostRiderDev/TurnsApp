import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://nbianssyswyaxgoqmroy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaWFuc3N5c3d5YXhnb3Ftcm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMTcxMTUsImV4cCI6MjAyNDc5MzExNX0.JHZm57nAm5rMgAziItJQWhqnaKwivmPfYRk9ThRaFFM"
);

export const uploadFile = async (file: File) => {
  const uuid = crypto.randomUUID().toString();
  const extentionImage = file.type.split("/")[1];
  const { data, error } = await supabase.storage
    .from("Profile_images")
    .upload("public/" + uuid + "." + extentionImage, file);

  if (data) {
    const imageUrl = `https://nbianssyswyaxgoqmroy.supabase.co/storage/v1/object/public/Profile_images/public/${
      uuid + "." + extentionImage
    }`;
    return imageUrl;
  } else {
    console.log(error);
  }
};
