import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, TouchableOpacity, GestureResponderEvent } from 'react-native';
import ProductosType from '../models/Productos';
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import Productos from '../models/Productos';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ProductosProps {
  route: {
      params: {
          email: string; 
      };
  };
}
const ProductosComponent: React.FC<ProductosProps> = ({ route ,navigation}) => {
  const { email } = route.params;

  const [nombre, setNombre] = useState<string>('');
  const [precio, setPrecio] = useState<number>(0);
  const [ingredientes, setIngredientes] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');
  const [imagen, setImagen] = useState<string>('');

  const [productos, setProductos] = useState<ProductosType[]>([]);

  const handleCrearProducto=async()=>{
  console.log('Se guardo');
  await firestore().collection('productos').add({
    nombre,
    precio,
    ingredientes,
    categoria,
    imagen,
  });
  setNombre(''),
  setPrecio(0),
  setIngredientes(''),
  setCategoria(''),
  setImagen('')
};
const handleVerDetalleProducto = (producto: ProductosType) => {
  navigation.navigate('DetalleProducto', { producto });
};
const onChangeNombre=(text:string)=>{
  setNombre(text);
};
const onChangePrecio=(text:string)=>{
  setPrecio(parseFloat(text));
};
const onChangeIngredientes=(text:string)=>{
  setIngredientes(text);
};
const onChangeCategoria=(text:string)=>{
  setCategoria(text);
};
const onChangeImagen=(text:string)=>{
  setImagen(text);
};
useEffect(()=>{
  const subscriber=firestore()
  .collection('productos')
  .onSnapshot(querySnapshot=>{
    const productos:Productos[]=[];
    querySnapshot.forEach(documentSnapshot=>{
      const producto=documentSnapshot.data() as Productos;
      producto.id=documentSnapshot.id;
      productos.push(producto);
    });
    setProductos(productos);
  });
  return subscriber;
  
},[]);

const handleCerrarSesion = () => {
  auth()
    .signOut()
    .then(() => {
      navigation.navigate('Inicio');
    })
    .catch(error => {
      console.error('Error al cerrar sesión:', error);
      // Manejar errores si es necesario
    });
};;

  return (
    <ScrollView style={{backgroundColor: 'white' }}>
    <View style={styles.container}>
        <Text style={styles.title}>Agregar Pan</Text>
        <Text style={styles.email}>Email del usuario: {email}</Text>
        
        <TouchableOpacity style={styles.buttonCerrarSesion} onPress={handleCerrarSesion}>
        <Text style={styles.buttonTextCerrarSesion}>Cerrar Sesión</Text>
      </TouchableOpacity>
        <View>
          <TextInput style={styles.input} placeholder='Nombre' onChangeText={onChangeNombre}/>
          <TextInput style={styles.input} placeholder='Precio' onChangeText={onChangePrecio} keyboardType="numeric"/>
          <TextInput style={styles.input} placeholder='Ingredientes' onChangeText={onChangeIngredientes}/>
          <TextInput style={styles.input} placeholder='Categoria' onChangeText={onChangeCategoria}/>
          <TextInput style={styles.input} placeholder='Imagen' onChangeText={onChangeImagen}/>
          <Pressable style={styles.cursor} onPress={handleCrearProducto}>
            <View style={styles.boton}>
              <Text style={styles.buttonText}>+</Text>
            </View>
          </Pressable>
        </View>
    </View>
    <View style={styles.productos}>
      <Text>Productos agregados</Text>
      <View style={styles.contenedorP}>
        {productos.map((productos)=>(
          <TouchableOpacity style={styles.touchable} key={productos.id} onPress={() => handleVerDetalleProducto(productos)}>
            <View style={styles.containerProducto}>
            <View style={styles.containerAtributo}>
              <Text style={styles.atributo}>Nombre: </Text>
              <Text>{productos.nombre}</Text>
          </View>
              
            <View style={styles.containerAtributo}>
            <Text style={styles.atributo}>Precio: </Text>
              <Text>{productos.precio}</Text>
            </View>
            
            <View>
            <Text style={styles.atributo}>Ingredientes: </Text>
              <Text>{productos.ingredientes}</Text>
            </View>
            
            <View style={styles.containerAtributo}>
            <Text style={styles.atributo}>Categoria: </Text>
              <Text>{productos.categoria}</Text>
            </View>
            
            <View>
            <Text style={styles.atributo}>Imagen: </Text>
              {productos.imagen &&(
                <Image
                  source={{uri:productos.imagen}}
                  style={{width:85, height:85}}
                />
              )
              }
            </View>
            
          </View>
          </TouchableOpacity>
          
        ))}
      </View>
      
    </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
  container:{
    display:'flex',
  },
  contenedorP:{
    flexDirection:'row', // Establece la dirección de los elementos en fila
    flexWrap: 'wrap',
    gap:10,
    
  },
  productos:{
    marginTop:30,
    padding:20,
    display:'flex',
    alignItems:'center',
  },
  boton: {
    width: '80%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1017B',
    alignSelf: 'center',
    
  },
  cursor:{
    cursor:'pointer'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    
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
    textAlign:'center'
  },
  title:{
    fontSize:24,
    textAlign:'center',
    padding:20,
  },
  email:{
    fontSize:18,
    textAlign:'center',
    padding:10,
  },
  touchable:{
    width:'48%'
  },
  containerProducto:{
    borderColor: '#E1017B',
    borderWidth: 1,
    borderRadius:10,
    padding:10,
    marginTop:5,
    overflow:'hidden',
    width:'100%',
    height:300
    
  },
  containerAtributo:{
    display:'flex',
    flexDirection:'row',
    padding:5,
  },
  atributo:{
    fontSize:16,
    fontWeight:'bold',
  },
  buttonCerrarSesion: {
    width: '80%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1017B',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextCerrarSesion: {
    color: 'white',
    fontWeight: 'bold',
  },
})
export default ProductosComponent;