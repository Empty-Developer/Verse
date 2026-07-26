import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Button from "@/components/ui/Button";
import { Book } from "@/types/book";
import { getBook, getCoverUrl, getPdfUrl } from "@/lib/books";
import { CornerUpLeft } from "lucide-react-native";

export default function BookScreen() {
  const { id } = useLocalSearchParams();

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    async function loadBook() {
      if (!id) return;

      const data = await getBook(Number(id));
      setBook(data);
    }

    loadBook();
  }, [id]);

  if (!book) return null;

  const handlerBack = () => {
    router.back();
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlerBack}>
          <CornerUpLeft size={26} style={{ pointerEvents: "none" }} />
        </TouchableOpacity>
        <Text style={styles.mainText}>Verse</Text>
      </View>
      <Image source={{ uri: getCoverUrl(book.cover) }} style={styles.cover} />

      <Text style={styles.title}>{book.title}</Text>

      <Text style={styles.description}>{book.description}</Text>

      <Button
        title="Read"
        onPress={() => WebBrowser.openBrowserAsync(getPdfUrl(book.pdf))}
        style={styles.button}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  cover: {
    width: "100%",
    height: 500,
    borderRadius: 24,
    resizeMode: "cover",
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#000000ff",
    marginBottom: 18,
    fontFamily: "SF Compact Rounded",
  },
  description: {
    fontSize: 17,
    lineHeight: 28,
    color: "#7a7a7aff",
    marginBottom: 36,
  },
  button: {
    borderRadius: 18,
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "SF Compact Rounded",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#777",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 26,
    paddingVertical: 12,
    marginTop: 26,
  },
  mainText: {
    fontWeight: "600",
    fontSize: 32,
    fontFamily: "SF Compact Rounded",
  },
});
