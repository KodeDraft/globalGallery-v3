import React, { useState, useEffect } from "react";
// NATIVE IMPORTS
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// ICONS
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// FIREBASE IMPORTS
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";

// INITIALIZING FIREBASE CONFIG
initializeApp(firebaseConfig);

// //#region
export default function SignUp({ navigation }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // FIREBASE
  const auth = getAuth();

  // SIGN UP
  // SIGN UP
  const storeLocal = async () => {
    try {
      await AsyncStorage.setItem("USER-NAME", userName);
      await AsyncStorage.setItem("EMAIL-ADRESS", email);
      await AsyncStorage.setItem("PASSWORD", password);
    } catch (error) {}
  };
  const signUpFirebase = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("bottomTab");
        setErrorMessage(null);
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(errorCode);
      });
  };
  // VALIDATION
  function signUpHandler() {
    if (userName.length < 1) {
      setErrorMessage("Enter Your Name");
    } else if (email.length < 5) {
      setErrorMessage("Enter Valid Email Adress");
    } else if (password.length < 8) {
      setErrorMessage("Password Should Be Greater Than 8 Charecters");
    } else if (passwordAgain !== password) {
      setErrorMessage("Password Not Matching");
    } else {
      storeLocal();
      signUpFirebase();
    }
  }

  return (
    <>
      <ScrollView>
        <View style={styles.leftCircle} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-undo-circle-outline"
              color="#8022d9"
              size={40}
              style={{ lineHeight: 50, marginLeft: 20 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rightCircle} />
        <View style={styles.container}>
          <Text style={styles.title}>SIGN UP TO GET STARTED</Text>
          <View style={styles.formContainer}>
            <View style={{ ...styles.userNameInput, paddingTop: 10 }}>
              <Text style={styles.formLabel}>NAME</Text>
              <TextInput
                style={styles.formField}
                onChangeText={(name) => setUserName(name)}
                value={userName}
                autoCorrect={false}
              />
            </View>

            <View style={{ ...styles.emailInput, paddingTop: 10 }}>
              <Text style={styles.formLabel}>EMAIL ADRESS</Text>
              <TextInput
                style={styles.formField}
                onChangeText={(email) => setEmail(email)}
                value={email}
                autoCorrect={false}
                autoCapitalize={false}
              />
            </View>

            <View style={{ ...styles.passwordInput, paddingTop: 10 }}>
              <Text style={styles.formLabel}>PASSWORD</Text>
              <TextInput
                style={styles.formField}
                onChangeText={(password) => setPassword(password)}
                value={password}
                secureTextEntry
                autoCorrect={false}
                autoCapitalize={false}
              />
            </View>

            <View style={{ ...styles.passwordAgainInput, paddingTop: 10 }}>
              <Text style={styles.formLabel}>CONFIRM PASSWORD</Text>
              <TextInput
                style={styles.formField}
                onChangeText={(password) => setPasswordAgain(password)}
                value={passwordAgain}
                secureTextEntry
                autoCorrect={false}
                autoCapitalize={false}
              />
            </View>

            <TouchableOpacity style={styles.signInBtn} onPress={signUpHandler}>
              <Text style={styles.signInBtnText}>SIGN UP</Text>
            </TouchableOpacity>

            {/* CHECKING IF ERROR MESSAGE IS THERE */}
            {errorMessage ? (
              <View style={styles.errorArea}>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              </View>
            ) : (
              <Text /> // SIMPLY NOTHING
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  leftCircle: {
    backgroundColor: "#23A6D5",
    width: 230,
    height: 230,
    borderRadius: 150,
    position: "absolute",
    top: -50,
    left: -50,
  },
  rightCircle: {
    backgroundColor: "#8022d9",
    width: 330,
    height: 330,
    borderRadius: 250,
    position: "absolute",
    top: -150,
    right: -50,
    zIndex: 1,
  },
  header: {
    width: "100%",
    marginTop: 50,
    height: 50,
  },
  container: {
    marginTop: 120,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    color: "#23A6D5",
    fontFamily: "extraBold-special-title",
  },
  formContainer: {
    marginLeft: 64,
    marginRight: 32,
  },
  formLabel: {
    color: "#8e93a1",
    fontSize: 15,
    fontFamily: "semiBold-special-description",
  },
  formField: {
    borderBottomWidth: 1,
    borderBottomColor: "#8e93a1",
    color: "#23A6D5",
    fontWeight: "bold",
  },
  signInBtn: {
    backgroundColor: "#23A6D5",
    padding: 15,
    borderRadius: 5,
    marginTop: 40,
  },
  signInBtnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  signUpText: {
    color: "#8022d9",
    fontWeight: "bold",
    paddingTop: 15,
    textAlign: "center",
  },
  errorArea: {
    backgroundColor: "#FA2A55",
    paddingTop: 25,
    paddingBottom: 25,
    borderRadius: 3,
    marginTop: 10,
  },
  errorMessage: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 2,
  },
});
// //#endregion
