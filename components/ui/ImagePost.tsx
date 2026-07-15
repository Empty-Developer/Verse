import React, { useEffect, useState } from "react";
import { Image } from "react-native";

export default function PostImage({ uri }: { uri: string }) {
  const [ratio, setRatio] = useState(1);
  /**
   * @description this function also components ui
   * made adjustment position image
   * for various posts
   */
  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      setRatio(width / height);
    });
  }, [uri]);

  return (
    <Image
      source={{ uri }}
      style={{
        width: "100%",
        aspectRatio: ratio,
        borderRadius: 20,
      }}
      resizeMode="cover"
    />
  );
}