import { useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  function salvar() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Informe o nome.');
      return;
    }

    console.log({
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
    });

    setNome('');
    setEmail('');
    setTelefone('');

    Alert.alert('Etapa 1', 'Dados capturados. Ainda não existe persistência.');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Cadastro de Pessoas</Text>
      <Text style={styles.description}>
        Nesta etapa, o formulário apenas captura os dados.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <Button title="Salvar" onPress={salvar} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    marginBottom: 24,
    color: '#555',
  },
  form: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
  },
});
