import React from "react";
// NATIVE IMPORTS
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// SAFE AREA VIEW
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnBoarding({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleArea}>
          <Text
            style={{
              color: "orange",
              fontSize: 45,
              textAlign: "center",
              paddingTop: 40,
              fontFamily: "extraBold-special-title",
            }}
          >
            GLOBAL GALLERY
          </Text>
        </View>
        <View style={styles.imgArea}>
          <Image
            source={require("../assets/icon.png")}
            style={{
              width: "90%",
              height: 220,
              alignSelf: "center",
              marginTop: "5%",
            }}
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            padding: 15,
            width: "90%",
            alignSelf: "center",
            borderRadius: 5,
            marginTop: 20,
          }}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            START
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: "100%",
    width: "100%",
  },
});
