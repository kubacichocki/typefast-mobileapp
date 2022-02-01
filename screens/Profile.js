import React, { useState, useEffect}from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import {auth, firestore} from "../Firebase";
import Button from "../components/Button";

//Needed references to firestore collections
const scoresRef = firestore.collection("scores");
const docRef = firestore.collection('fastpoints').doc('bTBHhs2CcEbkcWMd389c')

//Profile component
const Profile = ( {navigation} ) => {
 
  //Use states and properties
  const email = auth.currentUser.email
  const uid = auth.currentUser.uid
  const [highestScore, setHighestScore] = useState(0)
  const [fastPoints, setFastPoints] = useState(0)

  //Sign out
  const handleSignOut = () => {
    auth
    .signOut()
    .then(()=>{
        navigation.replace("Login", {screen: "Login"})    
    })
    .catch(error => alert(error.messsage))
  }

  //Get fastpoints from firestore
  useEffect(() => {
    firestore.collection("fastpoints").where("uid", "==", auth.currentUser.uid)
    .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            let id = doc.id
            setFastPoints(doc.data().points)                        
        });
    })
  }, [])

  //Get highest score from firestore
  useEffect(() => {
    scoresRef
    .where('uid','==',auth.currentUser.uid)
    .orderBy('score')
    .onSnapshot(
        querySnapshot => {
            const scores = []
            querySnapshot.forEach(doc => {
                const data = doc.data()
                scores.push(data.score)
            })
            setHighestScore(scores[scores.length-1])
        },
        error => {
            console.error(error);
        }
    )
    //set Fastpoints
    firestore.collection("fastpoints").where("uid", "==", uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            setFastPoints(doc.data().points)
            
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }, []);

  //render profile screen
  return (
    <View style={styles.center}>
      <View style={styles.container}>
      <Image source={require("../assets/profile2.png")} style={{height: 260, width: 260}}></Image>
      <Text style={{fontSize: 19, color: "#333333", fontWeight:"400", marginBottom: 15}}>{email}</Text>
      <View style={styles.nestedContainer}>
        <Text style={{fontSize: 20}}>FastPoints: {fastPoints}💰</Text>
        <Text style={{fontSize: 20}}>Highest score: {highestScore}wpm 🚀‍</Text>
      </View>
      <Button onPress={handleSignOut} text={"Log out"} style={{ margin: 10, width: 290 }} />
      </View>
      
    </View>
  );
};

//styling
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