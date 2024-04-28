import { View, Text, Button,ScrollView,StyleSheet,Image, TextInput,TouchableOpacity,ImageBackground  } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import auth, { firebase } from "@react-native-firebase/auth";
import React, {useEffect, useState} from 'react';



const Inicio = ({navigation}) => {
    const [usuario, setUsuario] = useState<FirebaseAuthTypes.User | null>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorText, setErrorText] = useState<string>('');

    const handlePress = () =>{
        navigation.navigate('RegistrarUsuaio')
    };

    const onChangeEmail = (text: string) => {
        setEmail(text);
      };
    
    const onChangePassword = (text: string) => {
        setPassword(text);
      };

    const handleCerrarSesion = () => {
        auth().signOut();
      };
    
    const handleIniciarSesion = () => {
        auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Productos', { email });
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        setErrorText('Error al iniciar sesión. Verifica tus credenciales e intenta nuevamente.');
      });
    };
    
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(setUsuario);
        return subscriber;
      }, []);


    return (
        
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../images/fondo1.png')} style={styles.background}>  
            <ScrollView>
                <Image
                    style={styles.logo}
                    source={require('../images/Isologo-02.png')}
                    resizeMode="contain"
                />   
                <View style={styles.container}>
                    <Text style={styles.seccionHeader}>Ingresar con Correo Electrónico</Text>
                        <View style={styles.inputsContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Correo Electrónico"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholderTextColor={'#f3abd0'}
                                id="email"
                                onChangeText={onChangeEmail}

                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                secureTextEntry={true}
                                autoCapitalize="none"
                                placeholderTextColor={'#f3abd0'}
                                id="password"
                                onChangeText={onChangePassword}

                            />
                            {errorText ? <Text>{errorText}</Text> : null}
                </View>
                <View>
                    <TouchableOpacity onPress={handlePress}>
                        <Text style={styles.text2}>Nuevo? Regístrese Aquí</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={handleIniciarSesion}>
                        <Text style={styles.buttonText}>Ingresar</Text>
                    </TouchableOpacity>
                </View>                   
                </View>
            </ScrollView>
           
            </ImageBackground>   
        </SafeAreaView>
          
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    seccion:{
        textAlign: 'center',
        marginTop: 195,
        color:"#ffffff",
        fontWeight:'bold'
    },
    logo: {
      width: 200,
      height: 200,
      alignSelf: 'center',
    },
    seccionHeader: {
      fontSize: 17,
      textAlign: 'left',
      paddingHorizontal: 40, 
      marginTop: 1,
      color: '#E1017B',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#E1017B',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        alignSelf: 'center',
        borderRadius: 10,
      },
      inputsContainer: {
        alignItems: 'center',
        marginTop: 10, 
      },
      img:{
        height:20,
        width: 20,
        marginTop: 5,
        marginLeft: 40, 
    },
    btn:{
        flexDirection: 'row',
    },
    text: {
        marginLeft: 65, 
        fontSize: 14,
        marginTop: -20,
        marginHorizontal: 15,
        color: '#E1017B',
      },
      text2:{ 
        fontSize: 14,
        marginTop: 15,
        alignSelf: 'center',
        color: '#E1017B',
      },
      button: {
        backgroundColor: '#E1017B', 
        paddingVertical: 10, 
        paddingHorizontal: 128, 
        borderRadius: 50, 
        borderWidth: 1, 
        borderColor: '#FDF8EB', 
      },
      buttonText: {
        color: 'white', 
        fontSize: 16,
      },
      containerButton: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 45,
        paddingVertical: 65, 
      },
      background: {
        flex: 1, 
        resizeMode: 'cover', 
        justifyContent: 'center',
        alignItems: 'center',
        
      },
  });



export default Inicio;

function alert(arg0: string) {
  throw new Error("Function not implemented.");
}
