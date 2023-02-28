import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState} from 'react';
import { GlobalContext } from "../Context/context";

import { Buton, Espacamento, Titulo,CampoNumerico } from "../Componentes";

export default function Login() {
  const navigation = useNavigation();
  const {login, logado} = useContext(GlobalContext)

  const [cpf, setCpf] = useState("");
  //enviando cpf para logar
  const handleLogin = () => {
    login(cpf)
  };
//layout
  return (
    <View style={{ marginTop: 50, left: 40 }}>
      <Espacamento space={20} />
      <Titulo text={"Associado faça o seu login"} />
      <Espacamento space={20} />
      <CampoNumerico placeholder={"digite o CPF (apenas numeros)"}
       text={"CPF"}
       onChangeText={(text) => setCpf(text)}
       />
      <Espacamento space={20} />
      <View>
        <Buton text={"Entrar"} colorButton={"#53ac59"} size={320} onPress={handleLogin}/>
        <Buton
          text={"Cadastre-se"}
          colorButton={"red"}
          size={320}
          onPress={() => navigation.navigate("CadastroAssociado")}
        />
      </View>
    </View>
  );
}
