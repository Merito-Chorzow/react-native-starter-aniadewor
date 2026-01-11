import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import AddNoteScreen from "./src/screens/AddNoteScreen";
import NoteDetailsScreen from "./src/screens/NoteDetailsScreen";
import NotesListScreen from "./src/screens/NotesListScreen";
import { Note } from "./src/types/Note";

export type RootStackParamList = {
  NotesList: undefined;
  NoteDetails: { id: string };
  AddNote: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="NotesList" options={{ title: "Field Notes" }}>
          {(props) => (
            <NotesListScreen {...props} notes={notes} />
          )}
        </Stack.Screen>

        <Stack.Screen name="NoteDetails" options={{ title: "Szczegóły" }}>
          {(props) => (
            <NoteDetailsScreen {...props} notes={notes} />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddNote" options={{ title: "Dodaj notatkę" }}>
          {(props) => (
            <AddNoteScreen
              {...props}
              addNote={(note: Note) =>
                setNotes((prev) => [note, ...prev])
              }
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
