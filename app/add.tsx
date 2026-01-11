import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function AddNoteScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string | null>(null);

  async function takePhoto() {
    const res = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!res.canceled) {
      setImage(res.assets[0].uri);
    }
  }

  async function saveNote() {
    if (!title.trim()) return;

    const newNote = {
      id: Date.now().toString(),
      title,
      image,
    };

    const existing = await AsyncStorage.getItem("notes");
    const notes = existing ? JSON.parse(existing) : [];

    notes.unshift(newNote);
    await AsyncStorage.setItem("notes", JSON.stringify(notes));

    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tytuł</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Wpisz tytuł"
      />

      <Pressable style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Zrób zdjęcie</Text>
      </Pressable>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Pressable
        style={[styles.button, styles.saveButton]}
        onPress={saveNote}
      >
        <Text style={styles.buttonText}>Zapisz</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  label: {
    marginBottom: 4,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#2ecc71",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  image: {
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
});
