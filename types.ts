
export type Modalidade = 'CRÉDITO' | 'DÉBITO' | 'EMPRÉSTIMO';
export type TipoTransacao = 'ENTRADA' | 'SAÍDA' | 'EMPRÉSTIMO';

export interface Transacao {
  id: number;
  created_at: string;
  nome: string;
  tipo: TipoTransacao;
  valor: number;
  competência: string; // yyyy/mm
  data: string; // yyyy-mm-dd
  local: string; // Representa o banco utilizado
  descrição: string;
  status: boolean; // true = Efetivado/Pago, false = Pendente
  modalidade: Modalidade;
  pessoa: string; // Filtro mestre: BRUNO ou FERNANDA
  recorrente: boolean; // Indica se a despesa se repete mensalmente
  parcela_quantidades?: number;
  parcela_atual?: number;
}

export interface Summary {
  totalEntradas: number;
  totalSaidas: number;
  saldo: number;
  totalEmprestimos: number;
  totalSaidasPendentes: number;
  totalSaidasEfetivadas: number;
}
