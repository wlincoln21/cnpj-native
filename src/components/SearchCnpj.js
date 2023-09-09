import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios';


const SearchCnpj = () => {
    const [cnpj, setCnpj] = useState('');
    const [result, setResult] = useState();
    const [error, setError] = useState(false);



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
                    setError(false)
                })
                .catch((error) => {
                    console.error('Erro ao consultar CNPJ:', error);
                    setResult(null);
                    setError(true);
                })
            : setError(true);
    };

    const handleClear = () => {
        setResult()
        setCnpj('')
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ display: result ? 'none' : 'flex', marginTop: 300 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o CNPJ..."
                        value={cnpj}
                        onChangeText={handleInputChange}
                        maxLength={14}
                        keyboardType="numeric"
                    />
                    <Button title="Consultar CNPJ" onPress={handleSearch} />

                </View>
                <View>
                    {error &&
                        <Text style={styles.error}>🚫 CNPJ Inválido!!!</Text>
                    }
                </View>
                {result && (
                    <>
                        <View style={styles.situacao}>
                            <Text style={{ color: result.situacao === 'ATIVA' ? 'green' : 'red', fontWeight: 900, backgroundColor: '#fff' }}>
                                Situação: {result.situacao}</Text>
                        </View>
                        <View >
                            <Text style={styles.title}>{result.nome}</Text>
                            <View style={styles.modelo}>
                                <Text style={{ backgroundColor: '#fff' }}>Fantasia: {result.fantasia}</Text>
                            </View>
                            <View style={styles.status}>
                                <Text style={{ fontWeight: 900, color: 'rgba(0,0,0,0.8)' }}>
                                    Abertura: {result.abertura}</Text>
                                <Text style={{ fontWeight: 900, color: 'rgba(0,0,0,0.8)', fontSize: 14 }}>{parseFloat(result.capital_social).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                            </View>
                            <View style={styles.primaria}>
                                <Text style={{ fontWeight: 900, color: 'rgba(0,0,0,0.8)', fontSize: 16 }}>ATIVIDADE PRIMÁRIA:</Text>
                                <Text>Cód: {result.atividade_principal[0].code.replace('.', '').replaceAll('-', '')}</Text>
                                <Text>{result.atividade_principal[0].text}</Text>

                            </View>
                            <View style={styles.secundaria}>
                                <Text style={{ fontWeight: 900, color: 'rgba(0,0,0,0.8)', fontSize: 16 }}>ATIVIDADES SECUNDÁRIAS:</Text>
                                {result.atividades_secundarias.map((atividade, index) => (
                                    <React.Fragment key={index}>
                                        <Text>Cód:  {atividade.code.replace('.', '').replaceAll('-', '')}</Text>
                                        <Text>{`(${index + 1}) - `}{atividade.text}</Text>
                                    </React.Fragment>
                                ))}

                            </View>
                            <View style={styles.endereco}>
                                <Text style={{ fontWeight: 900, color: 'rgba(0,0,0,0.8)' }}>ENDEREÇO:</Text>
                                <Text>📍{result.logradouro}, N°{result.numero}</Text>
                                <Text>{result.complemento}  {result.bairro}</Text>
                                <Text>{result.municipio}/{result.uf}</Text>
                                <Text>CEP: {result.cep.replace('.', '')}</Text>
                            </View>
                            <View style={styles.contato}>
                                <Text>📧{result.email}</Text>
                                <Text>☎{result.telefone}</Text>
                            </View>
                            <View style={styles.qsa}>
                                {result.qsa.map((qsa, index) => (
                                    <React.Fragment key={index}>
                                        {qsa.nome && <Text style={{ fontWeight: 900, color: 'rgba(0,0,0,0.8)' }}>{qsa.nome}</Text>}
                                        {qsa.qual && <Text style={{ marginBottom: 10 }}>{qsa.qual.slice(3)}</Text>}
                                        {qsa.pais_origem && <Text style={{ marginBottom: 5 }}>{qsa.pais_origem}</Text>}
                                        {qsa.nome_rep_legal && <Text style={{ fontWeight: 900, color: 'rgba(0,0,0,0.8)' }}>{qsa.nome_rep_legal}</Text>}
                                        {qsa.qual_rep_legal && <Text style={{ marginBottom: 10 }}>{qsa.qual_rep_legal}</Text>}
                                    </React.Fragment>
                                ))}


                            </View>
                            <View style={{ marginBottom: 20 }}>
                                <Button style={{ borderRadius: 55 }} title="Nova Busca" onPress={handleClear} />
                            </View>
                        </View>



                    </>
                )}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: '100vw',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(103, 26, 153, 1)'


    },
    input: {
        width: 250,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#fff'
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 14,
        fontFamily: 'Arial',


    },
    situacao: {
        flexDirection: 'row-reverse',
        marginBottom: 3,


    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
        letterSpacing: 1,
        backgroundColor: '#fff',
        padding: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Cor da sombra
        textShadowOffset: { width: 2, height: 2 }, // Deslocamento da sombra (x, y)
        textShadowRadius: 3, // Raio da sombra

    },
    h1: {
        fontSize: 16,
    },
    status: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,


    },
    modelo: {
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 10,

    },
    primaria: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 10,
    },
    secundaria: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 10,
    },
    endereco: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 10,
    },
    contato: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
    },
    qsa: {

        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 10,
    }
});

export default SearchCnpj;
