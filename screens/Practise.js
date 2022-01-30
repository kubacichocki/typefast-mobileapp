import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { auth, firestore } from "../Firebase";

const Practise = ({navigation}) => {

    const scoresRef = firestore.collection("scores"); 
    const text ="While docking with the Endurance.";
    const [bgcolor, setBackGroundColor] = useState("red")
    const [seconds, setSeconds] = useState(0)
    const [wpm, setWpm] = useState(0)

    const saveScore = () => {
        console.log()
        const data = {
            uid: auth.currentUser.uid,
            score: wpm,
        };
        scoresRef
            .add(data)
            .catch((error) => {
                alert(error);
            })
    }

    const showAlert = () => {
        Alert.alert("Success!","\nYou completed the challenge in "+seconds+"s⏱  \n Your score is: "+wpm+"wpm🚀",
        [
            {
              text: "Try again",
              onPress: () => Alert.alert("Cancel Pressed"),
              style: "default",
            },
            {
                text: "Menu",
                onPress: () => navigation.goBack(),
                style: "default",
            }
        ],
        {
            cancelable: true,
            onDismiss: () =>
              Alert.alert(
                "This alert was dismissed by tapping outside of the alert dialog."
              ),
          }
        );
    }

    const validateText = (item) =>{
        len = item.length;
        if(item===text.slice(0,len)){
            setBackGroundColor("green")
            if(len==text.length){
                saveScore()
                showAlert()
            }
        }else{
            setBackGroundColor("red")
        }
        setWpm(Math.round(len/5/(seconds/60)))
    }

    useEffect(() => {
        const interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
      }, []);
  
  return (
    <View style={styles.center}>

      <Text style={styles.score}>Time: {seconds}⏱ {wpm}wpm🔥</Text>
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
            style={{ color: bgcolor, width: 300, margin: 5, backgroundColor: '#fff', height: 50, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10, borderColor: '#333333',
                shadowColor: '#000000', 
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                backgroundColor: '#FFFFFF',}}
            // inputStyle = {{color: 'red'}}
            placeholder="Type here..."
            placeholderTextColor="#aaaaaa"
            onChangeText={text => validateText(text)}
            //   onChangeText={(text) => setMessage(text)}
            //   value={message}
            autoCapitalize="none"
          />
          {/* <Button text="Send" style={{ width: 100 }} onPress={setIsStopwatchStart}/>
          <Button text="Stop" style={{ width: 100 }} onPress={setResetStopwatch}/> */}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  score: {
    marginTop: 40,
    fontWeight: "bold",
    fontSize: 18
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
