import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Alert, StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [textInputValue, setTextInputValue] = useState('')
  const [fetchedData, setFetchedData] = useState({})

  const handleInput = (value) => {
    setTextInputValue(value)
  }

  const fetchData = async () => {
    const url = 'https://2kerr-api-staging.crio-server.com/api/v1/auth/login/user'
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ 'login_code': 76970301 })
    }).then((res) => res.json())
      .then((res) => setFetchedData(res.user))
      .catch((err) => {
        Alert.alert('Error', `${err}`, [{text: 'Close'}])
      })
  }

  return (
    <SafeAreaView style={styles.container}>

      <TextInput
        placeholder='Enter text'
        style={styles.inputText}
        onChangeText={handleInput}
      />

      <Button
        title='Submit'
        onPress={fetchData}
        disabled={!textInputValue}
      />

      {Object.keys(fetchedData).length > 0 ? (
        <View style={styles.data}>
          <Text>Created date: {fetchedData.created_at}</Text>
          <Text>Full name: {fetchedData.name}</Text>
          <Text>Email: {fetchedData.email}</Text>
          <Text>Login: {fetchedData.login_code}</Text>
          <Text>Id: {fetchedData.id}</Text>
          <Text>Phone number: {fetchedData.phone_number}</Text>
          <Text>Purchase data: {fetchedData.purchase_date}</Text>
          <Text>Wheelchair:</Text>
          <View style={styles.wheelchair}>
            <Text>Id: {fetchedData.wheelchair.id}</Text>
            <Text>Description: {fetchedData.wheelchair.description}</Text>
            <Text>Name: {fetchedData.wheelchair.name}</Text>
          </View>
        </View>
      ) : null
      }

      <StatusBar style="auto" />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputText: {
    width: '80%',
    padding: 15,
    marginBottom: 15,
    marginTop: 60,
    borderWidth: 1,
  },
  data: {
    marginTop: 15
  },
  wheelchair: {
    marginLeft: 15
  }
});
