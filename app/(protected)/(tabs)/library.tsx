import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/ui/Search";
import { getBooks, getCoverUrl } from "@/lib/books";
import { Book } from "@/types/book";

const screenWidth = Dimensions.get("window").width;
/**
 * @description
 * library screen that displays a grid of books fetched from supabase
 * it loads book data on mount, stores it in local state,
 * and renders a 2-column responsive FlatList with book covers and titles
 * each book item is displayed as a card containing:
 * cover image (from supabase storage or URL)
 * book title
 * @dependencies
 * getBooks() for fetching library data from supabase
 * getCoverUrl() for resolving cover image URLs
 * search component for UI filtering input (UI only, not yet connected)
 *
 * @state
 * @property {Book[]} books - list of books fetched from the backend
 *
 * @returns {JSX.Element} library screen UI
 */
export default function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    async function load() {
      try {
        const data = await getBooks();

        console.log("Books:", data);
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    }

    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Search />
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: getCoverUrl(item.cover) }}
              style={styles.cover}
            />

            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  list: {
    paddingBottom: 20,
    marginTop: 30,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },

  card: {
    width: "46%",
  },

  cover: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 6,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
  },
});
