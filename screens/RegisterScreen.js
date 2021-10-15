import * as React from "react";
import { KeyboardAvoidingView, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import {auth, db} from '../firebase'
import { useState } from "react";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if (pickerResult.cancelled === true) {
            return;
          }
      
          setImage({ localUri: pickerResult.uri });
        };
      
        if (image !== null) {
          console.log("img selected")
        }
      

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        >
          <View style={styles.inputContainer}>
              <TextInput
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
              />
              <TextInput
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry
              />
              <Formik
                initialValues={{ 
                dogName: "",
                personName: "",
                city: "",
                about: "",
                likes: "",
                dislikes: ""
                }}
            onSubmit={ (values) => {
                auth
                .createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                db.collection("users").doc(userCredential.user.uid).set(values)
                })
            }}>
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
            <TouchableOpacity style={styles.buttonOutline} onPress={openImagePickerAsync}><Text style={styles.buttonOutlineText}>Add Picture</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit} title="Submit">
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            </View>
            )}
  </Formik>
          </View>
        </KeyboardAvoidingView>
     );
}
 
export default RegisterScreen;



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
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        borderColor: "salmon",
        margin: 5,
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