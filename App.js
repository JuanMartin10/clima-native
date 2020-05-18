import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Formulario from './components/Formulario'
import Clima from './components/Clima'

const App = () => {

  const [search, setSearch] = useState({
    city: '',
    country: ''
  })

  const [consult, setConsult] = useState(false)
  const [result, setResult] = useState({})
  const [bgcolor, setBgcolor] = useState('rgb(71,149,212)')

  const { city, country } = search

  useEffect(() => {
    const getWeather = async () => {
      if (consult) {
        const appId = '9930707b832088e53c1ea9183a006ca5'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`
        try {
          const response = await fetch(url)
          const result = await response.json()
          setResult(result)
          setConsult(false)

          // Modificar los colores basado en la temperatura

          const kelvin = 273.15
          const { main } = result
          const actual = main.temp - kelvin

          if (actual < 10) {
            setBgcolor('rgb(105,108,149)')
          } else if (actual >= 10 && actual < 25) {
            setBgcolor('rgb(71,149,212)')

          } else {
            setBgcolor('rgb(178,28,61)')

          }

        } catch (error) {
          showAlert()
        }
      }
    }
    getWeather()
  }, [consult])
  const showAlert = () => {
    Alert.alert(
      'Error',
      'No hay resultados, intenta con otra ciudad o país',
      [{ text: 'Ok' }]
    )
  }
  const hideKeyboard = () => {
    Keyboard.dismiss()
  }

  const bgColorApp = {
    backgroundColor: bgcolor
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contain}>
            <Clima
              result={result}
            />
            <Formulario
              search={search}
              setSearch={setSearch}
              setConsult={setConsult}
            />

          </View>

        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contain: {
    marginHorizontal: '2.5%'
  }
});

export default App;
