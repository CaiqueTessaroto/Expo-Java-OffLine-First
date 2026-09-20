import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Crypto from 'expo-crypto';

import {
  initDatabase,
  inserirPessoa,
  listarPessoas,
  Pessoa,
} from './src/database';

export default function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [pronto, setPronto] = useState(false);

  async function carregarPessoas() {
    const dados = await listarPessoas();
    setPessoas(dados);
  }

  useEffect(() => {
    async function iniciar() {
      await initDatabase();
      await carregarPessoas();
      setPronto(true);
    }

    void iniciar();
  }, []);

  async function salvar() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Informe o nome.');
      return;
    }

    await inserirPessoa(
      Crypto.randomUUID(),
      nome.trim(),
      email.trim(),
      telefone.trim()
    );

    setNome('');
    setEmail('');
    setTelefone('');

    await carregarPessoas();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Cadastro Offline First</Text>

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

        <Button
          title="Salvar localmente"
          onPress={salvar}
          disabled={!pronto}
        />
      </View>

      <Text style={styles.subtitle}>Pessoas cadastradas</Text>

      <FlatList
        data={pessoas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum cadastro local.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>{item.email}</Text>
            <Text>{item.telefone}</Text>
            <Text style={styles.status}>
              {item.sincronizado === 1
                ? '✓ Sincronizado'
                : '⟳ Pendente'}
            </Text>
          </View>
        )}
      />
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
    marginBottom: 20,
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '700',
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
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  nome: {
    fontSize: 16,
    fontWeight: '700',
  },
  status: {
    marginTop: 4,
  },
  empty: {
    color: '#666',
  },
});
