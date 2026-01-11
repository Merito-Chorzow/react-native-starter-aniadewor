import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Note = {
  id: string;
  title: string;
  image?: string | null;
};

export default function HomeScreen() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadNotes = async () => {
        const stored = await AsyncStorage.getItem("notes");
        if (stored) {
          setNotes(JSON.parse(stored));
        } else {
          setNotes([]);
        }
      };

      loadNotes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push("/add")}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>+ Dodaj notatkę</Text>
      </Pressable>

      {notes.length === 0 ? (
        <Text style={styles.emptyText}>
          Brak zapisanych notatek
        </Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/details/${item.id}`)}
              style={styles.noteItem}
            >
              <Text style={styles.noteTitle}>{item.title}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  addButton: {
    backgroundColor: "#1e90ff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  noteItem: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 8,
  },
  noteTitle: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 40,
  },
});
