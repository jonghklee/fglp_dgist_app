import { useState } from 'react';
import { StyleSheet, View, Text, Animated, TextInput } from 'react-native';

export default function TipScene() {
    const [size, setSize] = useState(new Animated.Value(24));
    return(
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Animated.Text
                style={{
                    fontSize: size,
                    fontWeight: '700',
                    marginTop: 100,
                }}
            >
                팁씬
            </Animated.Text>
            <TextInput
                style={{
                    padding: 20,
                    marginTop: 100,
                    borderWidth: 2,
                    borderRadius: 20,
                    borderColor: 'black',
                    height: 60,
                    width: '90%',
                    backgroundColor: 'white',
                }}
                onChangeText={(text) => setSize(new Animated.Value(parseInt(text)?parseInt(text):1))}
            />
        </View>
    );
}