import {
  listarPendentes,
  marcarComoSincronizada,
} from './database';
import { enviarPessoa } from './api';

export type ResultadoSincronizacao = {
  total: number;
  sincronizados: number;
  erros: number;
};

export async function sincronizarPendentes(): Promise<ResultadoSincronizacao> {
  const pendentes = await listarPendentes();

  let sincronizados = 0;
  let erros = 0;

  for (const pessoa of pendentes) {
    try {
      await enviarPessoa(pessoa);
      await marcarComoSincronizada(pessoa.id);
      sincronizados++;
    } catch (error) {
      console.log(
        `Não foi possível sincronizar ${pessoa.id}`,
        error
      );
      erros++;
    }
  }

  return {
    total: pendentes.length,
    sincronizados,
    erros,
  };
}
