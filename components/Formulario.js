import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Animated, Alert } from 'react-native'
import { Picker } from '@react-native-community/picker'

const Formulario = ({ search, setSearch, setConsult }) => {

    const { city, country } = search

    const [animatebutton] = useState(new Animated.Value(1))

    const searchWeather = () => {
        if (country.trim() === '' || city.trim() === '') {
            showAlert()
            return
        }

        setConsult(true)
    }

    const showAlert = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y pais',
            [{ text: 'Entendido' }]
        )
    }

    const animateIn = () => {
        Animated.spring(animatebutton, {
            toValue: .75
        }).start()
    }
    const animateOut = () => {
        Animated.spring(animatebutton, {
            toValue: 1,
            friction: 4,
            tension: 30,
        }).start()
    }

    const styleAnimate = {
        transform: [{ scale: animatebutton }]
    }

    return (
        <>
            <View style={styles.form}>
                <View>
                    <TextInput
                        value={city}
                        style={styles.input}
                        onChangeText={city => setSearch({ ...search, city })}
                        placeholder='Ciudad'
                        placeholderTextColor='#666'
                    />
                </View>
                <View>
                    <Picker
                        selectedValue={country}
                        itemStyle={{ height: 120, backgroundColor: '#FFF' }}
                        onValueChange={country => setSearch({ ...search, country })}
                    >
                        <Picker.Item label="--Selecciona un país" value="" />
                        <Picker.Item label="Estados Unidos" value="US" />
                        <Picker.Item label="México" value="MX" />
                        <Picker.Item label="Argentina" value="AR" />
                        <Picker.Item label="Colombia" value="CO" />
                        <Picker.Item label="Costa Rica" value="CR" />
                        <Picker.Item label="España" value="ES" />
                        <Picker.Item label="Perú" value="PE" />
                    </Picker>
                </View>

                <TouchableWithoutFeedback
                    onPressIn={() => animateIn()}
                    onPressOut={() => animateOut()}
                    onPress={() => searchWeather()}
                >
                    <Animated.View
                        style={[styles.btnSearch, styleAnimate]}
                    >
                        <Text
                            style={styles.txtSearch}
                        >Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

export default Formulario

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    btnSearch: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center',
    },
    txtSearch: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
})
