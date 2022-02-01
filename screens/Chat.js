import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, FlatList, KeyboardAvoidingView } from "react-native";
import { auth, firestore } from "../Firebase";
import Input from "../components/Input";
import Button from "../components/Button";

//Chat screen
const Chat = () => {
  const messagesRef = firestore.collection("messages"); 

  //Use states
  const [message, setMessage] = useState(""); 
  const [messages, setMessages] = useState([]); 
  const [avatar, setAvatar] = useState(8)
  const emojis = ["👦","👩","🧑🏾","👩🏾","🕵️","🕵️‍♀️","👨🏼‍🚀","👩🏼‍🚀","👶"]
  const { uid } = auth.currentUser;
  const flatListRef = useRef()
  
  //UseEffects to get data from firestore
  useEffect(() => {
    console.log(auth.currentUser.uid)
    firestore.collection("avatars").where("uid", "==", uid)
    .onSnapshot(querySnapshot => {
      const array = []
      let i = 0;
        querySnapshot.forEach(doc => {   
            setAvatar(doc.data().active)         
        });
      })
    }, [])


  useEffect(() => {
    messagesRef
      // order by time of creating
      .orderBy("date", "asc")
      // fetch todos in realtime
      .limitToLast(15)
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

  //Add message
  const addMessage = () => {
    if (message && message.length > 0) {
      const data = {
        text: message,
        date: new Date(),
        uid,
        uemail : auth.currentUser.email,
        avatar: emojis[avatar].toString(),
      };
      messagesRef
        .add(data)
        .then(() => {
          setMessage("");
          flatListRef.current.scrollToEnd({behavior: 'smooth'});
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  //Render message
  const renderMessages = ({ item }) => {
    return (
      <View>
        <Text style={styles.messageAuthor}>{item.uemail}{item.avatar}</Text>
        <View style={styles.messageContainer}>
        <Text style={styles.item}>{item.text}</Text>
        </View>
      </View>
    );
  };

  //Render screen
  return (
    <View style={styles.center}>
      <View style={styles.chatBox}>
        <FlatList
          data={messages}
          renderItem={renderMessages}
          keyExtractor={(message) => message.id}
          removeClippedSubviews={true}
          ref={flatListRef}
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

//Styling
const styles = StyleSheet.create({
  center: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  chatBox: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 10,
  },
  messageContainer:{
    padding: 7,
    margin: 5,
    justifyContent: "center",

    minHeight: 30,
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
    borderRadius: 7,
  },
  messageAuthor: {
    fontWeight: "100"
  }
});
export default Chat;
