import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Clima = ({ result }) => {

    const { name, main } = result

    if (!name) return null

    const kelvin = 273.15

    console.log(result)
    return (
        <View style={styles.weather}>
            <Text style={[styles.text, styles.actual]}>
                {parseInt(main.temp - kelvin)}
                <Text style={styles.temp}>
                    &#x2103;
                </Text>
                <Image
                    style={{ width: 66, height: 58 }}
                    source={{ uri: `http://openweathermap.org/img/w/${result.weather[0].icon}.png` }}
                />
            </Text>

            <View style={styles.temps}>
                <Text style={styles.text}> Min {' '}
                    <Text style={styles.temp}>
                        {parseInt(main.temp_min - kelvin)} &#x2103;
                    </Text>
                </Text>

                <Text style={styles.text}> Max {' '}
                    <Text style={styles.temp}>
                        {parseInt(main.temp_max - kelvin)} &#x2103;
                    </Text>
                </Text>
            </View>
        </View>
    )
}

export default Clima

const styles = StyleSheet.create({
    weather: {
        marginBottom: 20
    },
    text: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginRight: 20
    },
    actual: {
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold'
    },
    temp: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    temps: {
        flexDirection: 'row',
        justifyContent: 'center'
    }

})
