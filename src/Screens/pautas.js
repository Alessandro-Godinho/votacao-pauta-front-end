import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import _URL from "../Config/index";
import { useNavigation } from "@react-navigation/native";
import { Buton, Icone, Texto, Titulo } from "../Componentes";
import { GlobalContext } from "../Context/context";

const Pautas = () => {
  const [dados, setDados] = useState("");
  const navigation = useNavigation();
  const { nomeAssociado } = useContext(GlobalContext);

  useEffect(() => {
    fetch(`${_URL}/pautas`)
    .then((response) => response.json())
    .then((response) => {
      if (response.statusCode == "404") {
        return alert(response.mensagem);
      }
      setDados(response)

    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }, [dados]);

  const handleNavigate = () => {
    navigation.navigate("CadastroPauta");
  };

  const styles = StyleSheet.create({
    item: {
      flexDirection: "row",
      marginTop: 20,
      paddingTop: 5,
    },
    title: {
      fontSize: 20,
    },
  });

  return (
    <SafeAreaView style={{ alignSelf: "flex-end", marginTop: 50 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{flex:1, alignSelf: "flex-start",top:15 }}>
          <Texto text={`Bem Vindo(a) ${nomeAssociado}!`} />
        </View>
        <View style={{ alignSelf: "flex-end" }}>
          <Buton
            text={"Sair"}
            size={70}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>

      <View style={{ alignSelf: "flex-start" }}>
        <TextInput style={{ fontSize: 30 }}>Pautas para votação</TextInput>
      </View>
      <View style={{ marginTop: 15 }}>
        <Buton
          text={"Criar Nova Pauta"}
          colorButton={"red"}
          size={280}
          onPress={handleNavigate}
        />
      </View>

      <FlatList
        data={dados}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Votacao", { id: item.id });
              }}
            >
              <Text style={styles.title}>{item.titulo}</Text>
              <View style={{ position: "absolute", left: 275 }}>
                <Icone
                  nameIcone={"chevron-forward"}
                  tamanhoIcon={25}
                  corIcone={"#53ac59"}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};
export default Pautas;
