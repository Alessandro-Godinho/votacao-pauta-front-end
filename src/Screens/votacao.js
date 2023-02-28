import React, { useEffect, useState, useContext } from "react";
import { View, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { GlobalContext } from "../Context/context";
import _URL from "../Config/index";
import { Buton, Espacamento, Texto, Titulo } from "../Componentes";

const Votacao = ({ route }) => {
  const idPauta = route?.params.id;
  const [dados, setDados] = useState({});
  const [voto, setVoto] = useState(false);
  const [tempoRestante, setTempoRestante] = useState({});
  const { idAssociado } = useContext(GlobalContext);
  const [resultadoVotacao, setResultadoVotacao] = useState({});
  const [counter, setCounter] = useState(0);

  const navigation = useNavigation();
//fazendo chamadas a cada 10 segundos para verificar a expiração da pauta
//e encerrar a votação
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter + 1);
      verificaTempoRestante();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async () => {
      buscarPauta();
      verificaTempoRestante();
      if(tempoRestante.tempoExpirado)
      {
        resultado()
      }
    })();
  }, [tempoRestante.tempoExpirado]);
//busca a pauta da votação 
  const buscarPauta = () => {
    fetch(`${_URL}/pautas/${idPauta}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode == "404") {
          return alert(response.mensagem);
        }
        setDados(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
//faz a votação
  const handleSubmit = () => {
  //verifica se o tempo expirou
    verificaTempoRestante();
    if (!tempoRestante.tempoExpirado) {
      const dados = {
        idAssociado,
        idPauta,
        voto: voto,
      };
      fetch(`${_URL}/votacao`, {
        method: "POST", // or 'PUT'
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
          alert("Obrigado por votar!");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    //se o tempo expirou, ver o resultado
    if (tempoRestante.tempoExpirado) {
      resultado();
    }
  };
//tempo restante da votação
  const verificaTempoRestante = () => {
    const dataAtual = moment().format("YYYY-MM-DD HH:mm:ss");

    fetch(`${_URL}/pautas/${idPauta}/expiracao?data=${dataAtual}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode == "404") {
          return alert(response.mensagem);
        }
        setTempoRestante(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // mensagem de tempo na tela
  const mensagem = () => {
    if (!tempoRestante.tempoExpirado) {
      return tempoRestante.minutosRestante == 0
        ? "Restam alguns segundos"
        : `Restam ${tempoRestante.minutosRestante} Minutos`;
    }
    return "Votação Encerrada";
  };
  //mensagem na tela resultado(apuração de votos)
  const resultadoMensagem = () => {
    return `\n Votos: ${resultadoVotacao.totalVotos}\n Sim: ${resultadoVotacao.totalSim}\n Não: ${resultadoVotacao.totalNao}`;
  };
//faz a apuração de votos
  const resultado = () => {
    fetch(`${_URL}/votacao/pauta/${idPauta}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode == "404") {
          return alert(response.mensagem);
        }
        setResultadoVotacao(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
//reseta states
  const resetStates = () => {
    setDados({});
    setVoto(false);
    setTempoRestante({});
    setResultadoVotacao({});
    setCounter(0);
    navigation.navigate("Pautas")
  }
//laout
  return (
    <View
      style={{
        top: 100,
        flex: 1,
        alignItems: "center",
      }}
    >
      <Titulo text={dados.titulo} style={{ alignSelf: "center" }} />
      <Espacamento space={30} />
      <View>
        <Texto tamanho={15} text={dados.descricao} />
      </View>
      <Espacamento space={30} />
      <View>
        <Texto
          tamanho={15}
          text={"Data criação da pauta: " + dados.dataInicio}
        />
      </View>
      <Espacamento space={30} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Texto right={10} size={25} text={"Não"} />
        <Switch
          value={voto}
          onValueChange={setVoto}
          thumbColor={"red"}
          trackColor={{ true: "lightblue", false: "gray" }}
          style={{ transform: [{ scale: 1.5 }] }}
        />
        <Texto right={-10} size={25} text={"Sim"} />
      </View>
      <Espacamento space={30} />
      <View style={{ alignItems: "center" }}>
        <Texto right={-10} size={25} text={mensagem()} />
      </View>

      <Espacamento space={30} />
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        {tempoRestante.tempoExpirado == false && (
          <Buton
            text={"Votar"}
            colorButton={"red"}
            size={200}
            onPress={() => handleSubmit()}
          />
        )}

        <Espacamento space={10} />
        <Buton
          text={"Cancelar"}
          colorButton={"blue"}
          size={200}
          onPress={() => resetStates()}
        />
        <Espacamento space={20} />
        {tempoRestante.tempoExpirado && (
          <View style={{ alignItems: "center" }}>
            <Texto right={-10} size={25} text={"Resultado da votação:"} />
            <Texto right={-10} size={25} text={resultadoMensagem()} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Votacao;
