import React, { useState, useEffect } from "react";
// NATIVE IMPORTS
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
// FIREBASE IMPORTS
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";
// FANCEY ALERT
import { FancyAlert } from "react-native-expo-fancy-alerts";
// ICONS
import { Ionicons } from "@expo/vector-icons";

// INITIALIZING FIREBASE CONFIG
initializeApp(firebaseConfig);

//#region
export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ALERT USES
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [errAlertVisible, setErrAlertVisible] = useState(false);
  const [errText, setErrText] = useState("");

  const toggleAlert = React.useCallback(() => {
    setAlertVisible(!alertVisible);
  }, [alertVisible]);

  // GETTING THE CURRENT USER
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("bottomTab");
      } else {
        // User is signed out
      }
    });
  });

  // FIREBASE
  const auth = getAuth();
  // SIGN IN
  const signInFirebase = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("bottomTab");
        setErrorMessage(null);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode == "auth/wrong-password") {
          setErrorMessage("Wrong Password");
        } else if (errorCode == "auth/user-not-found") {
          setErrorMessage("No Account Found. Sign Up");
        } else {
          setErrorMessage(errorCode);
        }
      });
  };
  // VALIDATION
  const submitSignIn = () => {
    if (email.length < 5) {
      setErrorMessage("Enter A Valid Email Adress");
    } else if (password.length < 2) {
      setErrorMessage("Enter A Valid Password");
    } else {
      signInFirebase();
    }
  };

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setAlertVisible(true);
      })
      .catch((error) => {
        setErrAlertVisible(true);
        const errorCode = error.code;
        if (errorCode == "auth/missing-email") {
          setErrText("Enter Email");
        } else if ("auth/invalid-email") {
          setErrText("Invalid Email");
        }
      });
  };

  return (
    <>
      <View style={styles.leftCircle}></View>
      <View style={styles.rightCircle}></View>
      <View style={styles.container}>
        <Text style={styles.title}>WELCOME BACK !</Text>
        <View style={styles.formContainer}>
          <View style={styles.emailInput}>
            <Text style={styles.formLabel}>EMAIL ADRESS</Text>
            <TextInput
              style={styles.formField}
              onChangeText={(email) => setEmail(email)}
              value={email}
              autoCapitalize={false}
            />
          </View>

          <View style={styles.passwordInput}>
            <Text style={{ ...styles.formLabel, paddingTop: 10 }}>
              PASSWORD
            </Text>
            <TextInput
              style={styles.formField}
              onChangeText={(password) => setPassword(password)}
              value={password}
              secureTextEntry
              autoCapitalize={false}
            />
          </View>

          <TouchableOpacity style={styles.signInBtn} onPress={submitSignIn}>
            <Text style={styles.signInBtnText}>SIGN IN</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={resetPassword} style={styles.forgotMsgBtn}>
            <Text style={styles.forgotMsg}>Forgot Password ?</Text>
          </TouchableOpacity>

          {/* CHECKING IF ERROR MESSAGE IS THERE */}
          {errorMessage ? (
            <View style={styles.errorArea}>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          ) : (
            <Text /> // SIMPLY NOTHING
          )}

          {/* SIGN UP REDIRECTION */}
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpText}>
              New To Global Gallery App{" "}
              <Text style={{ color: "#23A6D5" }}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SUCESS ALERT */}
      <FancyAlert
        visible={alertVisible}
        icon={
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#26C281",
              borderRadius: 50,
              width: "100%",
            }}
          >
            <Ionicons name="checkmark-done-circle" size={34} />
          </View>
        }
        style={{
          backgroundColor: "#000",
        }}
      >
        <Text
          style={{
            marginTop: -16,
            marginBottom: 12,
            color: "#fff",
          }}
        >
          Check Out <Text style={{ color: "#26C281" }}>{email}</Text> & Reset
          Your Password
        </Text>

        <TouchableOpacity
          style={{
            borderRadius: 32,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: 8,
            alignSelf: "stretch",
            backgroundColor: "#26C281",
            minWidth: "50%",
            paddingHorizontal: 16,
            marginBottom: 20,
          }}
          onPress={() => setAlertVisible(false)}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Ok!</Text>
        </TouchableOpacity>
      </FancyAlert>

      <FancyAlert
        visible={errAlertVisible}
        icon={
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#C3262A",
              borderRadius: 50,
              width: "100%",
            }}
          >
            <Ionicons name="close-outline" size={34} color="#fff" />
          </View>
        }
        style={{
          backgroundColor: "#000",
        }}
      >
        <Text
          style={{
            marginTop: -16,
            marginBottom: 12,
            color: "#fff",
          }}
        >
          {errText}
        </Text>

        <TouchableOpacity
          style={{
            borderRadius: 32,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: 8,
            alignSelf: "stretch",
            backgroundColor: "#C3262A",
            minWidth: "50%",
            paddingHorizontal: 16,
            marginBottom: 20,
          }}
          onPress={() => setErrAlertVisible(false)}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Ok</Text>
        </TouchableOpacity>
      </FancyAlert>
    </>
  );
}

const styles = StyleSheet.create({
  leftCircle: {
    backgroundColor: "#9729ff",
    width: 230,
    height: 230,
    borderRadius: 150,
    position: "absolute",
    top: -50,
    left: -50,
  },
  rightCircle: {
    backgroundColor: "#23A6D5",
    width: 330,
    height: 330,
    borderRadius: 250,
    position: "absolute",
    top: -150,
    right: -50,
  },
  container: {
    marginTop: 220,
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    color: "#9729ff",
    fontFamily: "extraBold-special-title",
    marginBottom: 20,
  },
  forgotMsg: {
    color: "#9729ff",
    paddingTop: 5,
    marginBottom: -20,
    fontWeight: "bold",
  },
  forgotMsgBtn: {
    padding: 10,
  },
  formContainer: {
    marginLeft: 64,
    marginTop: 10,
    marginRight: 32,
  },
  formLabel: {
    color: "#8e93a1",
    fontFamily: "semiBold-special-description",
    fontSize: 20,
  },
  formField: {
    borderBottomWidth: 1,
    borderBottomColor: "#8e93a1",
    marginTop: 0,
    paddingBottom: 5,
    color: "#9729ff",
    fontFamily: "semiBold-special-description",
    fontSize: 20,
  },
  signInBtn: {
    backgroundColor: "#9729ff",
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
    color: "#9729ff",
    fontWeight: "bold",

    paddingLeft: 10,
  },
  errorArea: {
    backgroundColor: "#FA2A55",
    paddingTop: 25,
    paddingBottom: 25,
    borderRadius: 3,
    marginTop: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  errorMessage: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 2,
  },
  btn: {
    borderRadius: 32,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: "stretch",
    backgroundColor: "#4CB748",
    marginTop: 16,
    minWidth: "50%",
    paddingHorizontal: 16,
  },
  btnText: {
    color: "#FFFFFF",
  },
});

//#endregion
