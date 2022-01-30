import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function DetailedPost({ navigation, route }) {
  const data = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: data.imageUri }} />
      <Text>{data.title}</Text>
      <Text>{data.desc}</Text>
      <Text>{data.name}</Text>
      <Text>{data.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
