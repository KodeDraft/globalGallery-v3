import React, { useEffect, useState } from "react";
// NATIVE IMPORTS
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
// IMPORT SAFE AREA VIEW
import { SafeAreaView } from "react-native-safe-area-context";

// CARD PACKAGE
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-cards";

// FIREBASE IMPORTS
// import { collection, getDocs } from "firebase/firestore/lite";
// import { getFirestore } from "firebase/firestore/lite";
import firebaseConfig from "../config/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
// FIREBASE
// import { onSnapshot, query, orderBy } from "firebase/firestore";
// FIREBASE
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

initializeApp(firebaseConfig);

export default function ViewPost({ navigation }) {
  // #MAIN
  const [posts, setPosts] = useState([]);
  // FIREBASE
  const db = getFirestore();
  const storage = getStorage();

  // GETTING POSTS FROM FIREBASE FIRESTORE
  useEffect(() => {
    // getPosts();
    getRealtimePosts();
  }, []);

  // GETTING DATA FROM FIREBASE FIRESTORE
  const getPosts = async () => {
    const taskCol = collection(db, "posts");
    const taskSnapshot = await getDocs(taskCol);
    const taskList = taskSnapshot.docs.map((doc) => doc.data());
    setPosts(taskList);
    console.log(taskList);
  };

  const getRealtimePosts = () => {
    const colRef = collection(db, "posts");

    const q = query(colRef, orderBy("postDate", "desc"));

    onSnapshot(q, (snapshot) => {
      let resievedPost = [];
      snapshot.docs.forEach((doc) => {
        resievedPost.push({
          ...doc.data(),
        });
      });

      setPosts(resievedPost);
    });
  };

  return (
    <>
      <SafeAreaView>
        {posts?.[0] ? (
          <>
            <View style={styles.container}>
              <Text style={styles.title}>Other's Post</Text>
              <TouchableOpacity style={styles.btn} onPress={getPosts}>
                <Text style={styles.btnText}>LOAD MORE..</Text>
              </TouchableOpacity>
              <View style={styles.card}>
                <FlatList
                  data={posts}
                  keyExtractor={(item) => item.key}
                  ListFooterComponent={<View style={{ height: 310 }} />}
                  renderItem={({ item }) => (
                    <ScrollView>
                      <Card
                        style={{ marginTop: 30 }}
                        onPress={() => console.log("Clicked")}
                      >
                        <CardImage source={{ uri: item.image }} />
                        <CardTitle subtitle={item.title} />
                        <CardContent text={item.desc} />
                        <CardContent text={item.artist} />
                        <CardContent text={item.postDate} />
                        <CardAction separator={true} inColumn={false}>
                          <CardButton
                            onPress={() => {}}
                            title="Share"
                            color="#FEB557"
                          />
                        </CardAction>
                      </Card>
                    </ScrollView>
                  )}
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <Text
              style={{
                color: "#30a145",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "50%",
                fontSize: 20,
              }}
            >
              No Posts. Let Your Post Be The First
            </Text>
          </>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  title: {
    color: "#30a145",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#30a145",
    padding: 10,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
