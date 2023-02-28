import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import _URL from "../Config/index";
import { Buton, CampoNumerico, Espacamento, Input, Titulo } from "../Componentes";

const CadastrarAssociado = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  const navigation = useNavigation();

  //gravação dos dados
  const handleSubmit = () => {
    const dados = {
      nome,
      cpf,
    };

    if (!nome || !cpf) {
      return alert("Nome e CPF são obrigatórios");
    }
    if (cpf.length != 11) {
      return alert("CPF não tem 11 digitos");
    }
    fetch(`${_URL}/associados`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })
      .then((response) => response.json())
      .then((response) => {
        if (
          response.statusCode !== undefined &&
          (response.statusCode == "404") | "409"
        ) {
          return alert(response.mensagem);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    clears();
    navigation.navigate("Login");
  };

  const clears = () => {
    setCpf("");
    setNome("");
  };

//layout
  return (
    <View style={{ marginTop: 50, left: 15 }}>
      <Espacamento space={20} />
      <Titulo text={"Cadastro de associado"} />
      <Espacamento space={20} />
      <Input
        placeholder={"digite o seu nome"}
        text={"Nome"}
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <Espacamento space={5} />
      <CampoNumerico
        placeholder={"digite o CPF (apenas numeros)"}
        text={"CPF"}
        value={cpf}
        onChangeText={(text) => setCpf(text)}
      />
      <Espacamento space={20} />
      <Buton text={"Cadastrar"} colorButton={"red"} onPress={handleSubmit} />
      <Buton
        text={"Cancelar"}
        colorButton={"blue"}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default CadastrarAssociado;
