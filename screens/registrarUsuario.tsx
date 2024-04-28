import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, Pressable } from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import { useEffect } from 'react';

const UserRegistrationScreen = ({navigation}) => {
  const [usuario, setUsuario] = useState<FirebaseAuthTypes.User | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const registrarUsuario = async (email: string, password: string) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      console.log('Usuario registrado con éxito.');
      navigation.navigate('Inicio');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      // Aquí podrías mostrar un mensaje de error al usuario o realizar alguna otra acción
    }
  };

const handleRegistrar = () => {
    registrarUsuario(email, password);
    setShowSuccessModal(true);
  };

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUsuario);
    return subscriber;
  }, []);

  return (
    <View style={styles.container}>
      <Image
                    style={styles.logo}
                    source={require('../images/Isologo-02.png')}
                    resizeMode="contain"
                />   
      <Text style={styles.title}>Registro de Usuario</Text>
      <TextInput
          placeholder="Correo Electronico"
          id="email"
          onChangeText={onChangeEmail}
          style={styles.input}
        />
      <TextInput
          placeholder="Contraseña"
          id="password"
          secureTextEntry={true}
          onChangeText={onChangePassword}
          style={styles.input}
        />
        <Pressable style={styles.button} onPress={handleRegistrar}>
          <View>
            <Text style={styles.buttonText}>Crear Usuario</Text>
          </View>
        </Pressable>
      
        


        {/* <Modal visible={showSuccessModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Usuario creado con éxito</Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#E1017B' }]}
              onPress={() => {
                setShowSuccessModal(false);
                navigation.navigate('Inicio'); // Navigate to the Welcome screen
              } }
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      {/* <Text>
          {!usuario && 'No hay usuario'}
          {usuario && `Bienvenido/a ${usuario.email}`}
        </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'#E1017B',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1017B', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default UserRegistrationScreen;
