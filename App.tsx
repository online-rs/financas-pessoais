
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from './supabase';
import { Transacao } from './types';
import { 
  Plus, 
  Search, 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  History,
  CheckCircle,
  XCircle,
  Trash2,
  RefreshCw,
  Layers,
  Clock,
  ArrowUpCircle,
  Wallet,
  Scale,
  Repeat,
  Info,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckSquare,
  Square,
  BarChart3,
  PieChart,
  ListFilter,
  Tags,
  LogOut,
  Lock,
  Mail,
  User as UserIcon,
  CreditCard,
  Building2
} from 'lucide-react';

const Card = ({ children, className = "", onClick }: { children?: React.ReactNode, className?: string, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-200 ${onClick ? 'cursor-pointer hover:border-indigo-300 hover:shadow-md active:scale-[0.98]' : ''} ${className}`}
  >
    {children}
  </div>
);

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children?: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden border border-slate-100">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-200 transition-colors">
            <XCircle size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[85vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Cadastro realizado! Verifique seu e-mail para confirmar.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'Erro na autenticação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-600 p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-10">
          <div className="p-4 bg-indigo-600 text-white rounded-3xl shadow-xl mb-6">
            <DollarSign size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">FinancePro</h1>
          <p className="text-slate-500 font-semibold mt-2">Gestão financeira profissional</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase ml-1 mb-2 block tracking-wider">E-mail de acesso</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-300 rounded-2xl text-base font-bold text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase ml-1 mb-2 block tracking-wider">Sua senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-300 rounded-2xl text-base font-bold text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-bold rounded-2xl">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-lg uppercase tracking-widest text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <RefreshCw className="animate-spin" size={20} /> : (isSignUp ? 'Criar minha conta' : 'Entrar na plataforma')}
          </button>
        </form>

        <div className="mt-10 text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-widest border-b-2 border-transparent hover:border-indigo-600 pb-1"
          >
            {isSignUp ? 'Já tem uma conta? Entre aqui' : 'Não tem uma conta? Cadastre-se'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeView, setActiveView] = useState<'DASHBOARD' | 'REPORTS'>('DASHBOARD');
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pessoaAtiva, setPessoaAtiva] = useState<'BRUNO' | 'FERNANDA'>('BRUNO');
  
  const [filterMode, setFilterMode] = useState<'MONTH' | 'RANGE' | 'ALL'>('MONTH');
  const [competenciaInicio, setCompetenciaInicio] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}`;
  });
  const [competenciaFim, setCompetenciaFim] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}`;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPendingOutModalOpen, setIsPendingOutModalOpen] = useState(false);
  const [isExpectationInModalOpen, setIsExpectationInModalOpen] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  
  const [selectedPendingIds, setSelectedPendingIds] = useState<Set<number>>(new Set());
  const [batchLoading, setBatchLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<Transacao>>({
    tipo: 'SAÍDA', modalidade: 'DÉBITO', status: false, recorrente: false,
    data: new Date().toISOString().split('T')[0], pessoa: 'BRUNO',
    parcela_atual: 1, parcela_quantidades: 1, local: '', descrição: ''
  });

  // Listener de Autenticação
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchTransacoes = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('despesas')
        .select('*')
        .eq('pessoa', pessoaAtiva)
        .order('data', { ascending: false })
        .order('id', { ascending: false });

      if (error) throw error;
      setTransacoes(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [pessoaAtiva, session]);

  useEffect(() => { fetchTransacoes(); }, [fetchTransacoes]);

  const moveMonth = (offset: number) => {
    const [y, m] = competenciaInicio.split('/').map(Number);
    const date = new Date(y, m - 1 + offset, 1);
    const newComp = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
    setCompetenciaInicio(newComp);
    if (filterMode === 'MONTH') setCompetenciaFim(newComp);
  };

  const statsAtemporal = useMemo(() => {
    const entradasEfetivadas = transacoes
      .filter(t => t.tipo === 'ENTRADA' && t.status === true)
      .reduce((acc, t) => acc + t.valor, 0);

    const entradasPendentes = transacoes
      .filter(t => t.tipo === 'ENTRADA' && t.status === false)
      .reduce((acc, t) => acc + t.valor, 0);

    const saidasEfetivadas = transacoes
      .filter(t => t.tipo === 'SAÍDA' && t.status === true)
      .reduce((acc, t) => acc + t.valor, 0);
    
    const saidasTotalAtemporal = transacoes
      .filter(t => t.tipo === 'SAÍDA')
      .reduce((acc, t) => acc + t.valor, 0);

    const saldoDisponivel = entradasEfetivadas - saidasEfetivadas;

    return {
      entradasTotal: entradasEfetivadas,
      entradasPendentes,
      saidasTotalAtemporal,
      saldoDisponivel
    };
  }, [transacoes]);

  const filteredData = useMemo(() => {
    let base = transacoes;
    if (filterMode === 'MONTH') {
      base = base.filter(t => t.competência === competenciaInicio);
    } else if (filterMode === 'RANGE') {
      base = base.filter(t => t.competência >= competenciaInicio && t.competência <= competenciaFim);
    }
    if (!searchTerm) return base;
    const lowerSearch = searchTerm.toLowerCase();
    return base.filter(t => 
      t.nome?.toLowerCase().includes(lowerSearch) || 
      t.local?.toLowerCase().includes(lowerSearch) ||
      t.descrição?.toLowerCase().includes(lowerSearch)
    );
  }, [transacoes, competenciaInicio, competenciaFim, filterMode, searchTerm]);

  const statsPeriodo = useMemo(() => {
    const entradasEfetivadas = filteredData
      .filter(t => t.tipo === 'ENTRADA' && t.status === true)
      .reduce((acc, t) => acc + t.valor, 0);
    const saidasTotal = filteredData
      .filter(t => t.tipo === 'SAÍDA')
      .reduce((acc, t) => acc + t.valor, 0);
    const saidasPendentes = filteredData
      .filter(t => t.tipo === 'SAÍDA' && !t.status)
      .reduce((acc, t) => acc + t.valor, 0);
    const emprestimos = filteredData
      .filter(t => t.modalidade === 'EMPRÉSTIMO' && !t.status)
      .reduce((acc, t) => acc + t.valor, 0);
    const saldoPeriodo = entradasEfetivadas - saidasTotal;
    return { entradasPeriodo: entradasEfetivadas, saidasPendentes, emprestimos, saldoPeriodo };
  }, [filteredData]);

  const reportGroups = useMemo(() => {
    const byModalidade = filteredData
      .filter(t => t.tipo === 'SAÍDA')
      .reduce((acc: any, t) => {
        if (!acc[t.modalidade]) acc[t.modalidade] = 0;
        acc[t.modalidade] += t.valor;
        return acc;
      }, {});

    const byStatus = filteredData.reduce((acc: any, t) => {
      const label = t.status ? 'EFETIVADO' : 'PENDENTE';
      if (!acc[label]) acc[label] = 0;
      acc[label] += t.valor;
      return acc;
    }, {});

    const byName = filteredData
      .filter(t => t.tipo === 'SAÍDA')
      .reduce((acc: any, t) => {
        const name = t.nome || 'Sem Nome';
        if (!acc[name]) acc[name] = { total: 0, count: 0, tipo: t.tipo };
        acc[name].total += t.valor;
        acc[name].count += 1;
        return acc;
      }, {});

    const entriesByName = Object.entries(byName)
      .map(([nome, data]: any) => ({ nome, ...data }))
      .sort((a, b) => b.total - a.total);

    const entradas = filteredData.filter(t => t.tipo === 'ENTRADA').reduce((acc, t) => acc + t.valor, 0);
    const saidas = filteredData.filter(t => t.tipo === 'SAÍDA').reduce((acc, t) => acc + t.valor, 0);

    return { byModalidade, byStatus, entriesByName, entradas, saidas };
  }, [filteredData]);

  const handleBatchEfetivar = async () => {
    if (selectedPendingIds.size === 0) return;
    setBatchLoading(true);
    try {
      const { error } = await supabase
        .from('despesas')
        .update({ status: true })
        .in('id', Array.from(selectedPendingIds));
      if (error) throw error;
      setIsPendingOutModalOpen(false);
      setIsExpectationInModalOpen(false);
      setSelectedPendingIds(new Set());
      fetchTransacoes();
    } catch (err) {
      console.error(err);
    } finally {
      setBatchLoading(false);
    }
  };

  const toggleSelect = (id: number) => {
    const next = new Set(selectedPendingIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedPendingIds(next);
  };

  const handleToggleAll = (items: Transacao[]) => {
    const itemIds = items.map(i => i.id);
    const allSelected = itemIds.every(id => selectedPendingIds.has(id));
    const next = new Set(selectedPendingIds);
    if (allSelected) {
      itemIds.forEach(id => next.delete(id));
    } else {
      itemIds.forEach(id => next.add(id));
    }
    setSelectedPendingIds(next);
  };

  const openEdit = (item: Transacao) => {
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const getCompetenciasList = () => {
    const list = [];
    const now = new Date();
    for (let i = -24; i <= 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      list.push(`${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}`);
    }
    return Array.from(new Set(list)).sort().reverse();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, ...payload } = formData;
    const valor = Number(payload.valor || 0);
    const pAtual = Number(payload.parcela_atual || 1);
    const pTotal = Number(payload.parcela_quantidades || 1);
    try {
      if (id) {
        const comp = `${payload.data!.split('-')[0]}/${payload.data!.split('-')[1]}`;
        await supabase.from('despesas').update({ ...payload, valor, competência: comp, parcela_atual: pAtual, parcela_quantidades: pTotal }).eq('id', id);
      } else {
        if (pTotal > 1 && pAtual <= pTotal) {
          const baseDate = new Date(payload.data! + 'T12:00:00');
          const batch = [];
          for (let i = pAtual; i <= pTotal; i++) {
            const currentDate = new Date(baseDate);
            currentDate.setMonth(baseDate.getMonth() + (i - pAtual));
            const dateStr = currentDate.toISOString().split('T')[0];
            const comp = `${dateStr.split('-')[0]}/${dateStr.split('-')[1]}`;
            batch.push({ ...payload, valor, data: dateStr, competência: comp, parcela_atual: i, parcela_quantidades: pTotal, status: i === pAtual ? payload.status : false });
          }
          await supabase.from('despesas').insert(batch);
        } else {
          const comp = `${payload.data!.split('-')[0]}/${payload.data!.split('-')[1]}`;
          await supabase.from('despesas').insert([{ ...payload, valor, competência: comp, parcela_atual: pAtual, parcela_quantidades: pTotal }]);
        }
      }
      setIsModalOpen(false);
      fetchTransacoes();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar lançamento.");
    }
  };

  const handleSignOut = async () => {
    if (confirm('Deseja sair da conta?')) {
      await supabase.auth.signOut();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <RefreshCw size={40} className="text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  const pendingEntradas = transacoes.filter(t => t.tipo === 'ENTRADA' && !t.status);
  const pendingSaidas = filteredData.filter(t => t.tipo === 'SAÍDA' && !t.status);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
      <main className="max-w-7xl mx-auto p-3 md:p-8 space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-indigo-200 shadow-lg shrink-0"><DollarSign size={24} /></div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">FinancePro</h1>
              <div className="flex gap-1.5 mt-1">
                <button 
                  onClick={() => setActiveView('DASHBOARD')} 
                  className={`p-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold ${activeView === 'DASHBOARD' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:text-slate-600 border border-slate-100'}`}
                >
                  <LayoutDashboard size={18} /> <span className="hidden sm:inline">Dashboard</span>
                </button>
                <button 
                  onClick={() => setActiveView('REPORTS')} 
                  className={`p-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold ${activeView === 'REPORTS' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:text-slate-600 border border-slate-100'}`}
                >
                  <History size={18} /> <span className="hidden sm:inline">Histórico</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex bg-slate-100 p-1 rounded-2xl shadow-inner flex-1 md:flex-none">
              <button onClick={() => setPessoaAtiva('BRUNO')} className={`flex-1 px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all ${pessoaAtiva === 'BRUNO' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>BRUNO</button>
              <button onClick={() => setPessoaAtiva('FERNANDA')} className={`flex-1 px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all ${pessoaAtiva === 'FERNANDA' ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-500'}`}>FERNANDA</button>
            </div>
            
            <div className="flex gap-2">
              <button onClick={() => { setFormData({ tipo: 'SAÍDA', modalidade: 'DÉBITO', status: false, recorrente: false, data: new Date().toISOString().split('T')[0], pessoa: pessoaAtiva, local: '', descrição: '', parcela_atual: 1, parcela_quantidades: 1 }); setIsModalOpen(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 md:px-5 md:py-3 rounded-2xl flex items-center gap-2 shadow-lg active:scale-95 transition-all">
                <Plus size={20} strokeWidth={3} /><span className="hidden md:inline font-bold text-xs uppercase tracking-wide">Lançar</span>
              </button>
              <button onClick={handleSignOut} className="bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-100 p-3 rounded-2xl transition-all active:scale-95 shadow-sm" title="Sair">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* CONTROLES DE PERÍODO COMUNS */}
        <div className="bg-white p-3 md:p-4 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 overflow-hidden">
               <button onClick={() => setFilterMode('MONTH')} className={`px-4 py-2 text-[10px] font-bold transition-all rounded-lg ${filterMode === 'MONTH' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>MÊS</button>
               <button onClick={() => setFilterMode('RANGE')} className={`px-4 py-2 text-[10px] font-bold transition-all rounded-lg ${filterMode === 'RANGE' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>INTERVALO</button>
               <button onClick={() => setFilterMode('ALL')} className={`px-4 py-2 text-[10px] font-bold transition-all rounded-lg ${filterMode === 'ALL' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>TUDO</button>
            </div>
            <div className="relative group w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Filtrar lançamentos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
            </div>
          </div>
          {filterMode !== 'ALL' && (
            <div className="flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
              <div className="flex items-center gap-2 bg-indigo-50 p-1.5 rounded-2xl border border-indigo-100 w-full md:w-auto justify-between">
                <button onClick={() => moveMonth(-1)} className="p-2.5 bg-white text-indigo-600 rounded-xl shadow-sm hover:bg-indigo-600 hover:text-white transition-all active:scale-90"><ChevronLeft size={20} /></button>
                <div className="flex flex-col items-center px-4">
                  <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest">{filterMode === 'RANGE' ? 'INÍCIO' : 'PERÍODO'}</span>
                  <select value={competenciaInicio} onChange={(e) => setCompetenciaInicio(e.target.value)} className="bg-transparent text-sm font-black text-indigo-700 outline-none cursor-pointer">
                    {getCompetenciasList().map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <button onClick={() => moveMonth(1)} className="p-2.5 bg-white text-indigo-600 rounded-xl shadow-sm hover:bg-indigo-600 hover:text-white transition-all active:scale-90"><ChevronRight size={20} /></button>
              </div>
              {filterMode === 'RANGE' && (
                <>
                  <div className="hidden md:block text-slate-300 mx-1"><ChevronRight size={16} /></div>
                  <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 w-full md:w-auto justify-center">
                    <div className="flex flex-col items-center px-6">
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">FIM</span>
                      <select value={competenciaFim} onChange={(e) => setCompetenciaFim(e.target.value)} className="bg-transparent text-sm font-black text-slate-600 outline-none cursor-pointer">
                        {getCompetenciasList().map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {activeView === 'DASHBOARD' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4 animate-in fade-in duration-500">
              <Card className="p-4 border-l-4 border-emerald-500">
                <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">Entradas Totais</span>
                <h3 className="text-sm md:text-base font-black text-slate-900 mt-1">R$ {statsAtemporal.entradasTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
              </Card>
              <Card className="p-4 border-l-4 border-rose-500 bg-rose-50/10">
                <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">Saídas Totais</span>
                <h3 className="text-sm md:text-base font-black text-rose-700 mt-1">R$ {statsAtemporal.saidasTotalAtemporal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
              </Card>
              <Card onClick={() => { setSelectedPendingIds(new Set()); setIsExpectationInModalOpen(true); }} className="p-4 border-l-4 border-blue-500 bg-blue-50/20">
                <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">Exp. de Entradas</span>
                <h3 className="text-sm md:text-base font-black text-blue-600 mt-1">R$ {statsAtemporal.entradasPendentes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
              </Card>
              <Card className="p-4 border-l-4 border-teal-400">
                <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">Filtro: Entradas</span>
                <h3 className="text-sm md:text-base font-black text-slate-900 mt-1">R$ {statsPeriodo.entradasPeriodo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
              </Card>
              <Card className="p-4 border-l-4 border-indigo-600 bg-indigo-50/10">
                <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">Filtro: Saldo</span>
                <h3 className={`text-sm md:text-base font-black mt-1 ${statsPeriodo.saldoPeriodo >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>R$ {statsPeriodo.saldoPeriodo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
              </Card>
              <Card onClick={() => { setSelectedPendingIds(new Set()); setIsPendingOutModalOpen(true); }} className="p-4 border-l-4 border-rose-500">
                <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">Filtro: Pendentes</span>
                <h3 className="text-sm md:text-base font-black text-rose-600 mt-1">R$ {statsPeriodo.saidasPendentes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
              </Card>
              <Card onClick={() => setIsBalanceModalOpen(true)} className="p-4 border-l-4 border-indigo-500 bg-indigo-50/30">
                <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">Líquido Real</span>
                <h3 className={`text-sm md:text-base font-black mt-1 ${statsAtemporal.saldoDisponivel >= 0 ? 'text-indigo-700' : 'text-rose-600'}`}>R$ {statsAtemporal.saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
              </Card>
              <Card className="p-4 border-l-4 border-amber-500">
                <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">Empréstimos</span>
                <h3 className="text-sm md:text-base font-black text-amber-600 mt-1">R$ {statsPeriodo.emprestimos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
              </Card>
            </div>

            <div className="grid grid-cols-1">
              <Card>
                <div className="p-3 md:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                  <h4 className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-slate-500">{filterMode === 'ALL' ? 'Todos os Lançamentos' : `Lançamentos: ${competenciaInicio}${filterMode === 'RANGE' ? ' até ' + competenciaFim : ''}`}</h4>
                  <div className="text-[9px] font-bold text-slate-400 uppercase">{filteredData.length} Reg.</div>
                </div>
                <div className="overflow-x-hidden">
                  <table className="w-full text-left table-fixed">
                    <thead className="bg-slate-50 text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b">
                      <tr>
                        <th className="w-[55px] md:w-[120px] px-2 md:px-6 py-4">Data</th>
                        <th className="px-2 md:px-6 py-4">Descrição</th>
                        <th className="w-[75px] md:w-[150px] px-2 md:px-6 py-4 text-right">Valor</th>
                        <th className="w-[70px] md:w-[130px] px-2 md:px-6 py-4 text-center">Sit.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredData.map(item => (
                        <tr key={item.id} onClick={() => openEdit(item)} className="hover:bg-indigo-50/40 transition-colors group cursor-pointer">
                          <td className="px-2 md:px-6 py-3 text-[9px] md:text-sm font-medium text-slate-500 whitespace-nowrap">{new Date(item.data + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</td>
                          <td className="px-2 md:px-6 py-3 overflow-hidden">
                            <p className="text-[9px] md:text-sm font-bold text-slate-800 truncate">{item.nome}</p>
                            <div className="flex flex-wrap gap-1 mt-0.5">
                              {item.local && <span className="inline-flex items-center text-[6px] md:text-[8px] text-slate-500 border border-slate-100 px-1 rounded bg-slate-50 font-bold uppercase"><Building2 size={8} className="mr-0.5" /> {item.local}</span>}
                              {item.recorrente && <span className="inline-flex items-center text-[6px] md:text-[8px] text-indigo-500 border border-indigo-100 px-1 rounded bg-white font-bold uppercase"><Repeat size={6} className="mr-0.5" /> R</span>}
                              {item.parcela_quantidades && item.parcela_quantidades > 1 && (<span className="inline-flex items-center text-[6px] md:text-[8px] text-amber-600 border border-amber-100 px-1 rounded bg-white font-black">{item.parcela_atual}/{item.parcela_quantidades}</span>)}
                            </div>
                          </td>
                          <td className={`px-2 md:px-6 py-3 text-[9px] md:text-sm font-black text-right whitespace-nowrap ${item.tipo === 'ENTRADA' ? 'text-emerald-600' : 'text-rose-600'}`}>{item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                          <td className="px-2 md:px-6 py-3 text-center"><span className={`inline-block w-full max-w-[55px] md:max-w-none py-1 rounded-lg text-[7px] md:text-[10px] font-bold ${item.status ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'} uppercase`}>{item.status ? 'PAGO' : 'PEND'}</span></td>
                        </tr>
                      ))}
                      {filteredData.length === 0 && (<tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium italic">Sem registros.</td></tr>)}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </>
        )}

        {activeView === 'REPORTS' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-white to-slate-50">
                <div className="flex items-center gap-3 mb-6 text-indigo-600">
                  <BarChart3 size={24} strokeWidth={2.5} />
                  <h3 className="text-sm font-black uppercase tracking-widest">Fluxo de Caixa do Período</h3>
                </div>
                <div className="space-y-6">
                   <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Total Entradas</p>
                        <p className="text-2xl font-black text-emerald-600">R$ {reportGroups.entradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Total Saídas</p>
                        <p className="text-2xl font-black text-rose-600">R$ {reportGroups.saidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </div>
                   </div>
                   <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="absolute left-0 h-full bg-emerald-500 transition-all duration-1000" 
                        style={{ width: `${(reportGroups.entradas / (reportGroups.entradas + reportGroups.saidas || 1)) * 100}%` }} 
                      />
                   </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6 text-indigo-600">
                  <PieChart size={24} strokeWidth={2.5} />
                  <h3 className="text-sm font-black uppercase tracking-widest">Gastos por Modalidade</h3>
                </div>
                <div className="space-y-4">
                  {Object.entries(reportGroups.byModalidade).map(([mod, val]: any) => (
                    <div key={mod} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                       <div className="flex flex-col">
                         <span className="text-xs font-bold text-slate-700 uppercase">{mod}</span>
                         <span className="text-[8px] font-bold text-rose-400 uppercase tracking-tighter">Apenas Saídas</span>
                       </div>
                       <span className="text-sm font-black text-slate-900">R$ {val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                  {Object.keys(reportGroups.byModalidade).length === 0 && <p className="text-center text-[10px] font-medium text-slate-400 py-4 italic">Sem gastos registrados no período.</p>}
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6 text-indigo-600">
                <Tags size={24} strokeWidth={2.5} />
                <h3 className="text-sm font-black uppercase tracking-widest">Ranking de Despesas por Nome</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportGroups.entriesByName.slice(0, 12).map((item: any) => (
                  <div key={item.nome} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-black text-slate-800 uppercase truncate pr-2">{item.nome}</span>
                        <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 uppercase">SAÍDA</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{item.count} lançamentos</p>
                    </div>
                    <p className="text-lg font-black mt-3">R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                ))}
                {reportGroups.entriesByName.length === 0 && (
                  <p className="col-span-full text-center text-[10px] font-medium text-slate-400 py-8 italic">Nenhuma despesa encontrada no período.</p>
                )}
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* MODAIS */}
      <PendingBatchModal isOpen={isExpectationInModalOpen} onClose={() => setIsExpectationInModalOpen(false)} title="Efetivar Entradas" items={pendingEntradas} selectedIds={selectedPendingIds} onToggle={toggleSelect} onToggleAll={() => handleToggleAll(pendingEntradas)} onEfetivar={handleBatchEfetivar} loading={batchLoading} />
      <PendingBatchModal isOpen={isPendingOutModalOpen} onClose={() => setIsPendingOutModalOpen(false)} title="Efetivar Saídas" items={pendingSaidas} selectedIds={selectedPendingIds} onToggle={toggleSelect} onToggleAll={() => handleToggleAll(pendingSaidas)} onEfetivar={handleBatchEfetivar} loading={batchLoading} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? "Editar Registro" : "Novo Lançamento"}>
        <form onSubmit={handleSubmit} className="space-y-4 pb-4">
          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Descrição</label>
              <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500" required value={formData.nome || ''} onChange={e => setFormData({...formData, nome: e.target.value})} placeholder="Nome do lançamento" />
            </div>
            
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Local / Banco</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500" value={formData.local || ''} onChange={e => setFormData({...formData, local: e.target.value})} placeholder="Ex: Nubank, Itaú, Mercado..." />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[10px] font-black text-slate-400 uppercase ml-1">Valor (R$)</label><input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-indigo-600 outline-none focus:ring-2 focus:ring-indigo-500" type="number" step="0.01" required value={formData.valor ?? ''} onChange={e => setFormData({...formData, valor: e.target.value === '' ? undefined : Number(e.target.value)})} placeholder="0,00" /></div>
              <div><label className="text-[10px] font-black text-slate-400 uppercase ml-1">Data</label><input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500" type="date" required value={formData.data} onChange={e => setFormData({...formData, data: e.target.value})} /></div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
            <div className="grid grid-cols-2 gap-3">
               <div><label className="text-[10px] font-black text-slate-400 uppercase ml-1">Tipo</label><select className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none" value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value as any})}><option value="SAÍDA">SAÍDA</option><option value="ENTRADA">ENTRADA</option></select></div>
               <div><label className="text-[10px] font-black text-slate-400 uppercase ml-1">Status</label><select className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none" value={formData.status ? 'pago' : 'pendente'} onChange={e => setFormData({...formData, status: e.target.value === 'pago'})}><option value="pago">PAGO</option><option value="pendente">PENDENTE</option></select></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
               <div><label className="text-[10px] font-black text-slate-400 uppercase ml-1">Modalidade</label><select className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none" value={formData.modalidade} onChange={e => setFormData({...formData, modalidade: e.target.value as any})}><option value="DÉBITO">DÉBITO</option><option value="CRÉDITO">CRÉDITO</option><option value="EMPRÉSTIMO">EMPRÉSTIMO</option></select></div>
               <div className="flex items-center gap-2 pt-5 ml-1">
                 <input type="checkbox" id="recorrente" className="w-4 h-4 text-indigo-600 rounded" checked={formData.recorrente || false} onChange={e => setFormData({...formData, recorrente: e.target.checked})} />
                 <label htmlFor="recorrente" className="text-xs font-bold text-slate-600 cursor-pointer flex items-center gap-1"><Repeat size={14} /> Recorrente?</label>
               </div>
            </div>

            {/* Campos de Parcelamento */}
            <div className="pt-2 border-t border-slate-200 mt-2">
              <label className="text-[9px] font-black text-indigo-400 uppercase ml-1 mb-2 block">Informações de Parcelas</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 ml-1">Parc. Atual</label>
                  <input type="number" min="1" className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none" value={formData.parcela_atual || 1} onChange={e => setFormData({...formData, parcela_atual: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 ml-1">Total Parc.</label>
                  <input type="number" min="1" className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none" value={formData.parcela_quantidades || 1} onChange={e => setFormData({...formData, parcela_quantidades: Number(e.target.value)})} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            {formData.id && (<button type="button" onClick={async () => { if(confirm("Excluir?")) { await supabase.from('despesas').delete().eq('id', formData.id); setIsModalOpen(false); fetchTransacoes(); } }} className="p-4 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 transition-colors hover:bg-rose-100"><Trash2 size={24} /></button>)}
            <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg uppercase tracking-widest text-xs hover:bg-indigo-700 transition-colors">{formData.id ? "Atualizar" : "Salvar"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const PendingBatchModal = ({ isOpen, onClose, title, items, selectedIds, onToggle, onToggleAll, onEfetivar, loading }: any) => {
  const total = items.filter((i: any) => selectedIds.has(i.id)).reduce((acc: number, curr: any) => acc + curr.valor, 0);
  const allSelectedInView = items.length > 0 && items.every((i: any) => selectedIds.has(i.id));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-indigo-600 p-4 rounded-2xl text-white shadow-lg">
          <div><p className="text-[10px] font-bold opacity-70 uppercase">Selecionado</p><h4 className="text-xl font-black">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4></div>
          <div className="text-right"><p className="text-[10px] font-bold opacity-70 uppercase">Itens</p><h4 className="text-xl font-black">{selectedIds.size}</h4></div>
        </div>
        
        <button onClick={onToggleAll} className="w-full py-2.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-slate-200 transition-colors">
          {allSelectedInView ? 'Desmarcar Todos' : 'Selecionar Todos'}
        </button>

        <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-1">
          {items.map((t: any) => (
            <div key={t.id} onClick={() => onToggle(t.id)} className={`flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${selectedIds.has(t.id) ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-100'}`}>
              <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center ${selectedIds.has(t.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300'}`}>{selectedIds.has(t.id) && <CheckCircle size={14} />}</div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs font-bold text-slate-800 truncate">{t.nome}</span>
                  <span className="text-xs font-black shrink-0">R$ {t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button onClick={onEfetivar} disabled={selectedIds.size === 0 || loading} className={`w-full py-4 rounded-2xl font-black transition-all shadow-lg flex items-center justify-center gap-2 ${selectedIds.size > 0 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
          {loading ? <RefreshCw className="animate-spin" size={20} /> : 'EFETIVAR SELECIONADOS'}
        </button>
      </div>
    </Modal>
  );
}
