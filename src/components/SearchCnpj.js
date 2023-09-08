import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';


const SearchCnpj = () => {
    const [cnpj, setCnpj] = useState('');
    const [result, setResult] = useState(null);


    const handleInputChange = (text) => {
        // Remove caracteres não numéricos
        const numericValue = text.replace(/[^0-9]/g, '');
        setCnpj(numericValue);
    };

    const handleSearch = () => {
        const apiUrl = 'https://receitaws.com.br/v1/cnpj/' + cnpj;

        cnpj.length === 14 ?
            axios
                .get(apiUrl)
                .then((response) => {
                    setResult(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao consultar CNPJ:', error);
                    setResult(null);
                })
            : console.warn('CNPJ inválido ANIMAL!!!!');
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Digite o CNPJ..."
                value={cnpj}
                onChangeText={handleInputChange}
                maxLength={14}
                keyboardType="numeric"
            />
            <Button title="Consultar CNPJ" onPress={handleSearch} />
            {result && (
                <>
                    <View>
                        <Text>{result.abertura}</Text>
                    </View>
                    <View>
                        <Text>Resultado da consulta:</Text>
                        <Text>{JSON.stringify(result, null, 2)}</Text>

                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        width: 250,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 16,
    },
});

export default SearchCnpj;
