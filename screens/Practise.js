import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, TextInput, Alert } from "react-native";
import { auth, firestore } from "../Firebase";

//Practise component
const Practise = ({ navigation }) => {
  //UseStates
  const uid = auth.currentUser.uid;
  const scoresRef = firestore.collection("scores");
  const [text, setText] = useState("")
  const [bgcolor, setBackGroundColor] = useState("red");
  const [seconds, setSeconds] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [docRef, setDocRef] = useState("0");

  //Get user fastpoints document id
  const getRef = () => {
    firestore.collection("fastpoints")
    .where("uid", "==", auth.currentUser.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function (doc){
        setDocRef(doc.id)
      })
    })
  }
  //Create user fastpoints document
  const createDoc = () => {
    const data = {
      uid: auth.currentUser.uid,
      points: 0,
    };
    firestore
      .collection("fastpoints")
      .add(data)
      .then(() => {
        getRef()
      })
      .catch((error) => {
        alert(error);
      });
  };

  //Get practise texts from firestore
  useEffect(() => {
    firestore.collection("practiseText")
    .get()
    .then((querySnapshot) => {
      const tab = []
      querySnapshot.forEach(function (doc){
      tab.push(doc.data().text)
      })
      let temp = tab[Math.floor(Math.random() * 6)]
      setText(temp)
  })
  }, [])

  //Get fastpoints from firabase if document exists otherwise create document
  useEffect(() => {
    (async function() {
        try {
          const response = await firestore
          .collection("fastpoints")
          .where("uid", "==", auth.currentUser.uid)
          .get()
          .then((querySnapshot) => {
            if(querySnapshot.empty)
            {
              createDoc()
            }else{
              querySnapshot.forEach(function (doc) {
                setDocRef(doc.id)
                setCurrentPoints(doc.data().points);
              });
            }

          });
        } catch (e) {
            console.error(e);
        }
    })();
}, []);

  //Save score to firestore
  const saveScore = () => {
    const data = {
      uid: uid,
      score: wpm,
    };
    scoresRef.add(data).catch((error) => {
      alert(error);
    });
    const ref = firestore.collection("fastpoints").doc(docRef);
    ref.update({ points: currentPoints + wpm });
  };

  //Alert function
  const showAlert = () => {
    Alert.alert(
      "Success!",
      "\nYou completed the challenge in " +
        seconds +
        "s⏱  \n Your score is: " +
        wpm +
        "wpm🚀",
      [
        {
          text: "Proceed",
          onPress: () => navigation.goBack(),
          style: "default",
        },
      ],
    );
  };

  //Validate user input
  const validateText = (item) => {
    len = item.length;
    console.log(item)
    console.log(text.slice(0, len))
    if (item === text.slice(0, len)) {
      setBackGroundColor("green");
      if (len == text.length) {
        saveScore();
        showAlert();
      }
    } else {
      setBackGroundColor("red");
    }
    setWpm(Math.round(len / 5 / (seconds / 60)));
  };

  //Start stopowatch
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //Render practise screen
  return (
    <View style={styles.center}>
      <Text style={styles.score}>
        Time: {seconds}⏱ {wpm}wpm🔥
      </Text>
      <Text style={styles.txt}>{text}</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <TextInput
            title=""
            style={{
              color: bgcolor,
              width: 300,
              margin: 5,
              backgroundColor: "#fff",
              height: 50,
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 10,
              borderColor: "#333333",
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              backgroundColor: "#FFFFFF",
            }}
            placeholder="Type here..."
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => validateText(text)}
            autoCapitalize="none"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

//Styling
const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: '#ffffff',
  },
  score: {
    marginTop: 40,
    fontWeight: "bold",
    fontSize: 18,
  },
  txt: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "200",
    width: 290,
    textAlign: "justify",
  },
});


export default Practise;
