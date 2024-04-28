import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, Pressable,Modal  } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const DetalleProducto = ({ route }) => {
  const { producto } = route.params;
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio.toString());
  const [ingredientes, setIngredientes] = useState(producto.ingredientes);
  const [categoria, setCategoria] = useState(producto.categoria);
  const [imagen, setImagen] = useState(producto.imagen);
  const [modalVisible, setModalVisible] = useState(false);

  const handleGuardarCambios = async () => {
    // Actualizar los datos en Firebase Firestore
    await firestore().collection('productos').doc(producto.id).update({
      nombre,
      precio: parseFloat(precio),
      ingredientes,
      categoria,
      imagen,
    });
    // Mostrar el modal
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalles del Producto:</Text>
      <Text style={styles.text2}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <Text style={styles.text2}>Precio:</Text>
      <TextInput
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />
      <Text style={styles.text2}>Ingredientes:</Text>
      <TextInput
        style={styles.input}
        value={ingredientes}
        onChangeText={setIngredientes}
      />
      <Text style={styles.text2}>Categoría:</Text>
      <TextInput
        style={styles.input}
        value={categoria}
        onChangeText={setCategoria}
      />
      <Text style={styles.text2}>Imagen:</Text>
      <TextInput
        style={styles.input}
        value={imagen}
        onChangeText={setImagen}
      />
      {imagen && (
        <Image
          source={{ uri: imagen }}
          style={{ width: 200, height: 200, resizeMode: 'cover' }}
        />
      )}
      <Pressable onPress={handleGuardarCambios}>
            <View style={styles.boton}>
              <Text style={styles.buttonText}>Guardar cambios</Text>
            </View>
          </Pressable>
          {/* Modal para mostrar el mensaje de éxito */}
  <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalText}>¡Cambios guardados con éxito!</Text>
      <Pressable
        style={styles.modalButton}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.modalButtonText}>Cerrar</Text>
      </Pressable>
    </View>
  </View>
</Modal>
    </View>
    
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor:'white'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#E1017B',
  },
  text2: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'#E1017B',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  boton: {
    width: '80%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1017B',
    alignSelf: 'center',
    marginTop:20,
    
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    
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
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#E1017B',
    borderRadius: 8,
    padding: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DetalleProducto;
