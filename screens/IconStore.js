import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text, ScrollView, Pressable, Alert } from "react-native";
import {auth, firestore} from "../Firebase";
import Button from "../components/Button";

//Icon store screen
const IconStore = () => {
  //Use states and properties
  const [fastPoints, setFastPoints] = useState(0)
  const prices = [100, 500, 1000]
  const [activeAvatar, setActiveAvatar] = useState(0)
  const [docRef, setDocRef] = useState("")
  const emojis = ["👦","👩","🧑🏾","👩🏾","🕵️","🕵️‍♀️","👨🏼‍🚀","👩🏼‍🚀"]

//Alert functions
notEnoughAlert = () => {
  Alert.alert("Sorry", "\nYou don't have enough FastPoints",
  [
    {
      text: "Back",
      style: "cancel",
  }
  ],
  );
}
  
chooseAlert = (par) => {
  Alert.alert("Inventory!","\nWould you set this Icon?",
  [
      {
        text: "Yes",
        onPress: () => {
          const ref = firestore.collection('avatars').doc(docRef)
          ref.update({active: par}) 
          Alert.alert("Done!")
        },
        style: "default",
      },
      {
          text: "No",
          onPress: () => Alert.alert("Not done!"),
          style: "Cancel",
      }
  ],
  );
}

  //useEffect to get data from firestore
  useEffect(() => {
    firestore.collection("fastpoints").where("uid", "==", auth.currentUser.uid)
    .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            let id = doc.id
            setFastPoints(doc.data().points)                        
        });
    })
  }, [])

  useEffect(() => {
    (async function() {
        try {
          const response = await firestore
          .collection("avatars")
          .where("uid", "==", auth.currentUser.uid)
          .get()
          .then((querySnapshot) => {
            if(querySnapshot.empty)
            {
              createDoc()
            }else{
              querySnapshot.forEach(function (doc) {
                setDocRef(doc.id)
              });
            }

          });
        } catch (e) {
            console.error(e);
        }
    })();
}, []);

  //Create user avatars document
  const createDoc = () => {
    const data = {
      uid: auth.currentUser.uid,
      active: 8,
    };
    firestore
      .collection("avatars")
      .add(data)
      .then(() => {
        getRef()
      })
      .catch((error) => {
        alert(error);
      });
  };

    //Get user avatars document id
    const getRef = () => {
      firestore.collection("avatars")
      .where("uid", "==", auth.currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc){
          setDocRef(doc.id)
        })
      })
    }


    //Render screen
  return (
    <View style={styles.center}>
      <View style={styles.header}><Text style={{fontSize: 25, fontWeight: "200"}}>FastPoints {fastPoints}💰</Text></View>    
      <ScrollView>
      <View style={styles.row}>
        <View style={styles.container}><Text style={styles.emoji}>{emojis[0]}</Text>{fastPoints>=100? 
        <Pressable onPress={() => this.chooseAlert(0)}><Text>Owned</Text></Pressable>  : <Pressable onPress={() => this.notEnoughAlert()}><Text>{prices[0]}💲</Text></Pressable>}
        </View>
        <View style={styles.container}><Text style={styles.emoji}>{emojis[1]}</Text>{fastPoints>=100?
        <Pressable onPress={() => this.chooseAlert(1)}><Text>Owned</Text></Pressable>  : <Pressable onPress={() => this.notEnoughAlert()}><Text>{prices[0]}💲</Text></Pressable>}
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.container}><Text style={styles.emoji}>{emojis[2]}</Text>{fastPoints>=100? 
        <Pressable onPress={() => this.chooseAlert(2)}><Text>Owned</Text></Pressable>  : <Pressable onPress={() => this.notEnoughAlert()}><Text>{prices[0]}💲</Text></Pressable>}
        </View>
        <View style={styles.container}><Text style={styles.emoji}>{emojis[3]}</Text>{fastPoints>=100?
        <Pressable onPress={() => this.chooseAlert(3)}><Text>Owned</Text></Pressable>  : <Pressable onPress={() => this.notEnoughAlert()}><Text>{prices[0]}💲</Text></Pressable>}
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.container}><Text style={styles.emoji}>{emojis[4]}</Text>{fastPoints>=500? 
        <Pressable onPress={() => this.chooseAlert(4)}><Text>Owned</Text></Pressable> : <Pressable onPress={() => this.notEnoughAlert()}><Text>{prices[1]}💲</Text></Pressable>}
        </View>
        <View style={styles.container}><Text style={styles.emoji}>{emojis[5]}</Text>{fastPoints>=500?
        <Pressable onPress={() => this.chooseAlert(5)}><Text>Owned</Text></Pressable>  : <Pressable onPress={() => this.notEnoughAlert()}><Text>{prices[1]}💲</Text></Pressable>}
        </View>
      </View>
      <View style={styles.row}>
      <View style={styles.container}><Text style={styles.emoji}>{emojis[6]}</Text>{fastPoints>=1000? 
        <Pressable onPress={() => this.chooseAlert(6)}><Text>Owned</Text></Pressable>  : <Pressable onPress={() => this.notEnoughAlert()}><Text>{prices[2]}💲</Text></Pressable>}
        </View>
        <View style={styles.container}><Text style={styles.emoji}>{emojis[7]}</Text>{fastPoints>=1000?
        <Pressable onPress={() => this.chooseAlert(7)}><Text>Owned</Text></Pressable>  : <Pressable onPress={() => this.notEnoughAlert()}><Text>{prices[2]}💲</Text></Pressable>}
        </View>
      </View>
      </ScrollView>
      
    </View>
  );
};

//Styling
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: '#ffffff',
  },
  header:{
    justifyContent: "center",
    alignItems: "center",
    margin: 10, 
    marginTop: 50,
    borderRadius: 8,
    borderColor: '#333333',
    shadowColor: '#000000', 
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.23,
    backgroundColor: '#FFFFFF',
    width: 290,
  },
  row: {
    flex: 0.3, flexDirection: "row", justifyContent: "center",
  },
  container: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    width: 120,
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
  emoji: {
    fontSize: 40,
  },
});


export default IconStore;