import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './screens/inicio';
import UserRegistrationScreen from './screens/registrarUsuario';
import Productos from './screens/productos';
import DetalleProducto from './screens/DetalleProducto';
import ProductosComponent from './screens/productos';
const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Inicio'
          component={Inicio}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='RegistrarUsuaio'
          component={UserRegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Productos'
          component={Productos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='DetalleProducto'
          component={DetalleProducto}
          options={{ headerShown: false }
        }
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;
