import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SearchIcon } from "lucide-react-native";

interface SearchProps {
  value: string;
  onChangeText: (text: string) => void;
}

/**
 * @description
 * search input component used in the Library screen
 * displays a styled text input with a search icon,
 * intended for searching books or verses.
 *
 * Note:
 * currently UI-only component
 * search logic/filtering is not yet implemented
 * @component Search
 * @returns {JSX.Element} Search input UI
 */
export default function Search({ value, onChangeText }: SearchProps) {
  return (
    <View style={styles.searchSection}>
      <View style={styles.searchContainer}>
        <SearchIcon size={26} style={styles.searchIcon} color={"#c4c4c4ff"} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search books, verse..."
          // now user can print text and type value, onChangeText know about user write
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#c4c4c4ff",
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000ff",
  },
});
