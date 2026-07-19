import { File } from "expo-file-system";
import { supabase } from "./supabase";

/**
 * @description this function checks the
 * image format, modifies the URL path,
 * allows you to change the image, and
 * sends the file to supabase
 * @param userId 
 * @param imageUrl 
 * @returns {string}
 */
export const uploadProfileImage = async (userId: string, imageUrl: string) => {
  try {
    // need get image extension
    const fileExtension = imageUrl.split(".").pop() || "jpg";

    // create name for file
    const fileName = `${userId}/profile.${fileExtension}`;

    const file = new File(imageUrl);
    // create defined format img file
    const bytes = await file.bytes();

    // upload file
    const { error } = await supabase.storage
      .from("avatar_user")
      .upload(fileName, bytes, {
        contentType: `image/${fileExtension}`,
        // if user wont a new avatar image
        upsert: true,
      });

    if (error) {
      throw error;
    }

    /*
      this will give a legal
      address for public use
    */
    const { data: urlData } = supabase.storage
      .from("avatar_user")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploadProfileBackground = async (userId: string, imageUrl: string) => {
  try {
    const fileExtension = imageUrl.split(".").pop() || "jpg";
    const fileName = `${userId}/profile.${fileExtension}`;
    const file = new File(imageUrl);
    const bytes = await file.bytes();

    const { error } = await supabase.storage
        .from("background")
        .upload(fileName, bytes, {
          contentType: `image/${fileExtension}`,
          // if user wont a new avatar image
          upsert: true,
        });

    if (error) {
      throw error;
    }

    const { data: urlData } = supabase.storage
      .from("background")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    throw error;
  }
}

export const uploadPostImage = async (userId: string, imageUrl: string) => {
  try {
    // need get image extension
    const fileExtension = imageUrl.split(".").pop() || "jpg";

    // create name for file
    const fileName = `${userId}/${Date.now()}.${fileExtension}`;

    const file = new File(imageUrl);
    // create defined format img file
    const bytes = await file.bytes();

    // upload file
    const { error } = await supabase.storage
      .from("coverPost")
      .upload(fileName, bytes, {
        contentType: `image/${fileExtension}`,
        // if user wont a new post image
        upsert: true,
      });

    if (error) {
      throw error;
    }

    /*
      this will give a legal
      address for public use
    */
    const { data: urlData } = supabase.storage
      .from("coverPost")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
