import React, { useState } from 'react';
import { View, Text, Button, Image, ImageBackground, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

// Caminho para a imagem de fundo no seu projeto
const backgroundImage = require('./assets/Champions2.jpg');

const TelaSimples = () => {
  const [info, setInfo] = useState('Clique no botão para pesquisar');
  const [playerName, setPlayerName] = useState('');
  const [playerDetails, setPlayerDetails] = useState(null); // Para armazenar os detalhes do jogador

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://apiv3.apifootball.com/?action=get_players&player_name=${playerName}&APIkey=73dfd9fe47fea905a22286fb8e3b45b2fcc9c30686927ff8463083e4dbb36f3c`
      );

      if (response.data && response.data.length > 0) {
        const player = response.data[0]; // Primeiro resultado
        setPlayerDetails({
          teamName: player.team_name,
          playerImage: player.player_image,
          playerAge: player.player_age,
          playerType: player.player_type,
          playerPosition: player.player_type,
        });

        setInfo(`Jogador pesquisado: ${playerName}`);
      } else {
        setPlayerDetails(null);
        setInfo('Jogador não encontrado');
      }
    } catch (error) {
      console.error(error);
      setPlayerDetails(null);
      setInfo('Erro ao buscar jogador');
    }
  };

  const handleClear = () => {
    setPlayerName(''); // Limpa o campo de entrada
    setPlayerDetails(null); // Remove os detalhes do jogador
    setInfo('Clique no botão para pesquisar'); // Restaura o texto de info
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do jogador"
          value={playerName}
          onChangeText={setPlayerName}
        />
        
        <View style={styles.buttonContainer}>
          <Button title="Pesquisar" onPress={handleSearch} />
          <Button title="Limpar" onPress={handleClear} />
        </View>

        {playerDetails ? (
          <View style={styles.playerDetails}>
            <Image source={{ uri: playerDetails.playerImage }} style={styles.playerImage} />
            <Text>Time: {playerDetails.teamName}</Text>
            <Text>Idade: {playerDetails.playerAge}</Text>
            <Text>Posição: {playerDetails.playerPosition}</Text>
          </View>
        ) : (
          <Text style={styles.label}>{info}</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 40,
    borderRadius: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Para separar os botões
    marginBottom: 10,
  },
  playerDetails: {
    alignItems: 'center', // Centraliza os detalhes do jogador
  },
  playerImage: {
    width: 200, // Largura da imagem do jogador
    height: 200, // Altura da imagem do jogador
    borderRadius: 20, // Deixa a imagem redonda
    marginVertical: 10, // Espaço entre elementos verticais
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
});

export default TelaSimples;
