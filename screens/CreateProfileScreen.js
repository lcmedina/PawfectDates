import * as React from "react";
import { KeyboardAvoidingView, Text, TextInput, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import { db, auth } from "../firebase";
import { Formik } from "formik";
import { collection, addDoc } from "firebase/firestore";


const CreateProfileScreen = () => {
    return (
      <View style={styles.container}>
      <Formik
  initialValues={{ 
      dogName: "",
      personName: "",
      city: "",
      about: "",
      likes: "",
      dislikes: ""
       }}
  onSubmit={ async (values) => await db.collection("users").doc(auth.currentUser.uid).set(values)}>
  {({ handleChange, handleBlur, handleSubmit, values }) => (
  <View style={styles.inputContainer}>
   <TextInput
    placeholder="My Name"
    onChangeText={handleChange('dogName')}
    onBlur={handleBlur('dogName')}
    value={values.dogName}
    style={styles.input}
   />
   <TextInput
    placeholder="My Person's Name"
    onChangeText={handleChange('personName')}
    onBlur={handleBlur('personName')}
    value={values.personName}
    style={styles.input}
   />
   <TextInput
    placeholder="Location"
    onChangeText={handleChange('city')}
    onBlur={handleBlur('city')}
    value={values.city}
    style={styles.input}
   />
   <TextInput
    placeholder="About Me"
    onChangeText={handleChange('about')}
    onBlur={handleBlur('about')}
    value={values.about}
    style={styles.input}
   />
   <TextInput
    placeholder="Things I Like"
    onChangeText={handleChange('likes')}
    onBlur={handleBlur('likes')}
    value={values.likes}
    style={styles.input}
   />
   <TextInput
    placeholder="Things I Don't Like"
    onChangeText={handleChange('dislikes')}
    onBlur={handleBlur('dislikes')}
    value={values.dislikes}
    style={styles.input}
   />
   <TouchableOpacity style={styles.button} onPress={handleSubmit} title="Submit">
       <Text style={styles.buttonText}>Register</Text>
   </TouchableOpacity>
  </View>
  )}
  </Formik>
  </View> 
     );
  }
   
 
export default CreateProfileScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  inputContainer: {
      width: "80%",
  },
  input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
  },
  buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
  },
  button: {
      backgroundColor: "salmon",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center"
  },
  buttonOutline: {
      backgroundColor: "white",
      marginTop: 5,
      borderColor: "salmon",
      borderWidth: 2,
  },
  buttonText: {
      color: "white",
      fontWeight: "700",
      fontSize: 16
  },
  buttonOutlineText: {
      color: "salmon",
      fontWeight: "700",
      fontSize: 16
  },
  
})
