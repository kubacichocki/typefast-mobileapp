import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { auth, firestore } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Input from "../components/Input";
import Button from "../components/Button";

// function ChatMessage(props) {
//   const {text, uid} = props.message;
//   return <Text>{text}</Text>
// }

const Chat = () => {
  const messagesRef = firestore.collection("messages"); // todos collection reference

  const [message, setMessage] = useState(""); // todo
  const [messages, setMessages] = useState([]); // todos
  const { uid } = auth.currentUser;
  useEffect(() => {
    messagesRef
      // order by time of creating
      .orderBy("date", "asc")
      // fetch todos in realtime
      .onSnapshot(
        (querySnapshot) => {
          const newMessages = [];
          // loop through the saved todos
          querySnapshot.forEach((doc) => {
            const message = doc.data();
            message.id = doc.id;
            newMessages.push(message);
          });
          setMessages(newMessages);
          // set the todos to the state
        },
        (error) => {
          // log any error
          console.error(error);
        }
      );
  }, []);

  // add a todo
  const addMessage = () => {
    // check if we have a todo.
    if (message && message.length > 0) {
      // get the timestamp
      // structure the data  to save
      const data = {
        text: message,
        date: new Date(),
        uid,
      };
      // add the data to firestore db
      messagesRef
        .add(data)
        .then(() => {
          // release todo state
          setMessage("");
          // release keyboard
          Keyboard.dismiss();
        })
        .catch((error) => {
          // show an alert in case of error
          alert(error);
        });
    }
  };

  const renderMessages = ({ item }) => {
    return (
      <View>
        <Text style={styles.item}>{item.text}</Text>
      </View>
    );
  };

  // const messagesRef = firestore.collection('messages');
  // const query = messagesRef.orderBy('date').limit(25);

  // const [messages] = useCollectionData(query, {idField: 'id'});
  return (
    <View style={styles.center}>
      <View style={styles.center}>
        <FlatList
          data={messages}
          renderItem={renderMessages}
          keyExtractor={(message) => message.id}
          removeClippedSubviews={true}
        />
      </View>
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{flexDirection: "row", alignItems: "center",justifyContent: "center", marginBottom:20}}>
        <Input
          title= ""
          style={{width: 250, margin: 5 }}
          placeholder="Your message..."
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setMessage(text)}
          value={message}
          autoCapitalize="none"
        />
        <Button text="Send" style={{width: 100 }} onPress={addMessage}/>
      </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  center: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  item: {
    padding: 7,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    borderRadius: 2,
    borderColor: "#333333",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    width: 300,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "#FFFFFF",
  },
});
export default Chat;
