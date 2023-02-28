import React, {} from "react";
import {
  View,
  Text,
  TextInput,
  Button
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Descricao({ value, onChangeText, placeholder, text }) {
  return (
    <View>
      <Text style={{ marginTop: 20 }}>{text}</Text>
      <TextInput
        multiline
        numberOfLines={3}
        scrollEnabled
        style={{
          height: 60,
          borderColor: "gray",
          borderWidth: 1,
          marginTop: 15,
          fontWeight:'bolder',
        }}
        value={value}
        onChangeText={onChangeText}
        textAlignVertical="top"
        placeholder={placeholder}
      />
    </View>
  );
}

export function Titulo({ text }) {
  return (
    <View>
      <Text style={{ fontSize: 25 }}>{text}</Text>
    </View>
  );
}

export function Texto({ text, size, right }) {
  return (
    <View>
      <Text style={{ fontSize: size, right: right }}>{text}</Text>
    </View>
  );
}

export function Input({ placeholder, text, onChangeText, value }) {
  return (
    <View>
      <Text style={{ marginTop: 20 }}>{text}</Text>
      <TextInput
        onChangeText={onChangeText}
        style={{
          paddingVertical: 0,
          outline: "none",
          borderBottomWidth: 1,
          width: 400,
          marginTop: 10,
        }}
        placeholder={placeholder}
        placeholderTextColor={"black"}
        value={value}
      ></TextInput>
    </View>
  );
}

export function CampoNumerico({ placeholder, text, onChangeText, value }) {
  return (
    <View>
      <Text style={{ marginTop: 20 }}>{text}</Text>
      <TextInput
        onChangeText={onChangeText}
        style={{
          paddingVertical: 0,
          outline: "none",
          borderBottomWidth: 1,
          width: 400,
          marginTop: 10,
        }}
        placeholder={placeholder}
        placeholderTextColor={"black"}
        value={value}
        keyboardType="numeric"
      ></TextInput>
    </View>
  );
}

export function Buton({ text, color, colorButton, size, onPress }) {
  return (
    <View
      style={{
        marginRight: 45,
        marginLeft: 0,
        paddingTop: 8,
        backgroundColor: color,
        borderRadius: 20,
        borderWidth: 0,
        borderColor: "#53ac59",
        width: size,
        height: 60,
      }}
    >
      <Button onPress={onPress} color={colorButton} title={text}></Button>
    </View>
  );
}

export function Espacamento({ space }) {
  return <View style={{ paddingTop: space }}></View>;
}

export function Icone({ nameIcone, tamanhoIcon, corIcone, ...rest }) {
  return (
    <Ionicons name={nameIcone} size={tamanhoIcon} color={corIcone} {...rest} />
  );
}


