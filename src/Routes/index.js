import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalProvider } from "../Context/context";
import Pautas from "../Screens/pautas";
import Login from "../Screens/login";
import CadastroAssociado from "../Screens/cadastro-associado";
import CadastroPauta from "../Screens/cadastro-pauta";
import Votacao from "../Screens/votacao";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <GlobalProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Pautas"
          component={Pautas}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CadastroAssociado"
          component={CadastroAssociado}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CadastroPauta"
          component={CadastroPauta}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Votacao"
          component={Votacao}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </GlobalProvider>
  );
}
