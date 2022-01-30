import React, { useState, useEffect}from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import {auth, firestore} from "../Firebase";
import Button from "../components/Button";
const scoresRef = firestore.collection("scores");
const Profile = ( {navigation} ) => {

  const email = auth.currentUser.email
  const uid = auth.currentUser.uid
  const [highestScore, setHighestScore] = useState(0)
  const [fastPoints, setFastPoints] = useState(0)
  const [currentPoints, setCurrentPoints] = useState(0)

  const handleSignOut = () => {
    auth
    .signOut()
    .then(()=>{
        navigation.replace("Login", {screen: "Login"})    
    })
    .catch(error => alert(error.messsage))
  }


  useEffect(() => {
    scoresRef
    // order by time of creating
    // .orderBy('score', 'desc')
    // .limit(1)
    .where('uid','==',auth.currentUser.uid)
    .orderBy('score')
  
    // fetch todos in realtime
    .onSnapshot(
        querySnapshot => {
            const newTodos = []
            // loop through the saved todos
            querySnapshot.forEach(doc => {
                const todo = doc.data()
                newTodos.push(todo.score)
            })
            setHighestScore(newTodos[newTodos.length-1])
            let sum = 0
            for(let i = 0; i<newTodos.length; i++){
              sum += newTodos[i]
            }
            setFastPoints(sum)
        },
        error => {
            // log any error
            console.error(error);
        }
    )
  }, []);

  return (
    <View style={styles.center}>
      <View style={styles.container}>
      <Image source={require("../assets/profile2.png")} style={{height: 260, width: 260}}></Image>
      <Text style={{fontSize: 19, color: "#333333", fontWeight:"400", marginBottom: 15}}>{email}</Text>
      <View style={styles.nestedContainer}>
        <Text style={{fontSize: 20}}>FastPoints: {fastPoints}🏆</Text>
        <Text style={{fontSize: 20}}>Highest score: {highestScore}wpm 🚀‍</Text>
      </View>
      <Button onPress={handleSignOut} text={"Log out"} style={{ margin: 10, width: 290 }} />
      </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    height: 430,
    width: 300,
    borderRadius: 8,
    borderColor: '#333333',
    shadowColor: '#000000', 
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.23,
    backgroundColor: '#FFFFFF'
  },
  nestedContainer: {
    // marginTop: 80,
    height: 135,
    width: 300,
    borderColor: '#cdcdcd',
    borderTopWidth: 1,
    borderBottomWidth: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});
export default Profile;