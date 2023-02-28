import React, { useState } from "react";
import { View } from "react-native";
import Descricao, {
  Buton,
  Espacamento,
  Input,
  Titulo,
  CampoNumerico,
} from "../Componentes";
import _URL from "../Config/index";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import CalendarPicker from "react-native-calendar-picker";

export default function CadastroPauta() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [minuto, setMinuto] = useState("1");

  const navigation = useNavigation();
  //cadastro da pauta
  const handleSubmit = () => {
    if (!validateDate(dataInicio)) {
      return alert("Data invalida");
    }

    if (!titulo || !descricao) {
      return alert("Título e descrição são obrigatórios");
    }
    
    //adiciono as horas, minutos e segundos atuais a dataFormatada
    const dataInicioComHorasATuais = addTempoAtual(dataInicio);
    //adicono os minutos para expiração de tempo da pauta
    const dataFim = addMinutes(dataInicioComHorasATuais, minuto);
    //envio dos dados
    const dados = {
      titulo,
      descricao,
      dataInicio: dataInicioComHorasATuais,
      dataFim: dataFim,
    };

    fetch(`${_URL}/pautas`, {
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
    navigation.navigate("Pautas");
  };

  const clears = () => {
    setDescricao("");
    setDataInicio("");
    setTitulo("");
  };

  const addTempoAtual = (date) => {
    var currentTime = moment()
      .hour(moment().hour())
      .minute(moment().minute())
      .second(moment().second());
    var combinedDateTime = moment(date)
      .hour(currentTime.hour())
      .minute(currentTime.minute())
      .second(currentTime.second());
    return combinedDateTime.format("YYYY-MM-DD HH:mm:ss");
  };

  const validateDate = (date) => {
    const dateFormat = "DD/MM/YYYY";
    return moment(date, dateFormat, true).isValid();
  };

  const addMinutes = (date, minutes) => {
    return moment(date).add(minutes, "minutes").format("YYYY-MM-DD HH:mm:ss");
  };

  const formatDate = (date) => {
    return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss");
  };
  //layou
  return (
    <View style={{ marginTop: 50, left: 7 }}>
      <Espacamento space={10} />
      <Titulo text={"Cadastro de pauta para votação"} />
      <Espacamento space={10} />
      <Descricao
        placeholder={"Descreva mais sobre o assunto a ser votado"}
        text={"Descrição"}
        onChangeText={(text) => setDescricao(text)}
        value={descricao}
      />
      <Espacamento space={10} />
      <Input
        placeholder={"Titulo da pauta"}
        text={"Titulo"}
        onChangeText={(text) => setTitulo(text)}
        value={titulo}
      />
      <Espacamento space={25} />

      <CalendarPicker
        width={350}
        nextTitle={"Proximo"}
        previousTitle={"Anterior"}
        onDateChange={(date) => {
          setDataInicio(date);
        }}
      />

      <CampoNumerico
        placeholder={"Tempo em minutos para o encerramento da votação"}
        text={"campo numerico"}
        value={minuto}
        onChangeText={(text) => setMinuto(text)}
      />
      <Espacamento space={20} />
      <Buton text={"Cadastrar"} colorButton={"red"} onPress={handleSubmit} />
      <Buton
        text={"Cancelar"}
        colorButton={"blue"}
        onPress={() => navigation.navigate("Pautas")}
      />
    </View>
  );
}
