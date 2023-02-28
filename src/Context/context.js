import React, { createContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _URL from "../Config/index";
// Cria o contexto
export const GlobalContext = createContext();

// Cria um componente que fornece o contexto
export const GlobalProvider = ({ children }) => {
  const [logado, setLogado] = useState(false);
  const navigation = useNavigation();
  const [idAssociado, setIdAssociado] = useState({});
  const [nomeAssociado, setNomeAssociado] = useState({});

  useEffect(() => {
    idAssociado;
  }, [setIdAssociado]);
//faz o login e guarda o nome e cpf para usar em sessão
  const login = (cpf) => {
    let dados = {
      cpf,
    };
    fetch(`${_URL}/associados/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })
      .then((response) => response.json())
      .then((response) => {

        if (response.statusCode == "404") {
          return alert(response.mensagem);
        }
        setIdAssociado(response.id);
        setNomeAssociado(response.nome);
        navigation.navigate("Pautas");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <GlobalContext.Provider
      value={{ login, setLogado, logado, idAssociado, nomeAssociado }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
