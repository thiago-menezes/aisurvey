"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,  ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronRight, ChevronLeft, CheckCircle, BarChart3, Building2, Users, DollarSign, Clock, AlertCircle } from 'lucide-react';


const Dashboard = ({responses, resetSurvey}) => {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  if (responses.length === 0) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 text-lg">Nenhuma resposta coletada ainda</p>
        <button
          onClick={resetSurvey}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Responder Pesquisa
        </button>
      </div>
    );
  }

  // Analytics
  const segmentoData = {};
  const funcionariosData = {};
  const obstaculoIAData = {};
  const investimentoData = {};
  
  responses.forEach(r => {
    segmentoData[r.segmento] = (segmentoData[r.segmento] || 0) + 1;
    funcionariosData[r.numeroFuncionarios] = (funcionariosData[r.numeroFuncionarios] || 0) + 1;
    obstaculoIAData[r.obstaculoIA] = (obstaculoIAData[r.obstaculoIA] || 0) + 1;
    investimentoData[r.investimentoMensal] = (investimentoData[r.investimentoMensal] || 0) + 1;
  });

  const chartData1 = Object.entries(segmentoData).map(([name, value]) => ({ name, value }));
  const chartData2 = Object.entries(funcionariosData).map(([name, value]) => ({ name, value }));
  const chartData3 = Object.entries(obstaculoIAData).map(([name, value]) => ({ name, value }));
  const chartData4 = Object.entries(investimentoData).map(([name, value]) => ({ name, value }));

  const avgRetrabalho = responses.reduce((sum, r) => sum + r.frequenciaRetrabalho, 0) / responses.length;
  const avgOportunidadesPerdidas = responses.reduce((sum, r) => sum + r.oportunidadesPerdidas, 0) / responses.length;
  const interesseCount = responses.filter(r => r.interesseSolucoes).length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard de Análise</h2>
        <div className="flex gap-3">
          <button
            onClick={resetSurvey}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Nova Resposta
          </button>
          <button
            onClick={() => {
              const dataStr = JSON.stringify(responses, null, 2);
              const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
              const exportFileDefaultName = 'respostas-pesquisa.json';
              const linkElement = document.createElement('a');
              linkElement.setAttribute('href', dataUri);
              linkElement.setAttribute('download', exportFileDefaultName);
              linkElement.click();
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Exportar Dados
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="text-sm opacity-90">Total de Respostas</div>
          <div className="text-4xl font-bold mt-2">{responses.length}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="text-sm opacity-90">Interessados em Soluções</div>
          <div className="text-4xl font-bold mt-2">{interesseCount}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="text-sm opacity-90">Média Retrabalho</div>
          <div className="text-4xl font-bold mt-2">{avgRetrabalho.toFixed(1)}/5</div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl text-white">
          <div className="text-sm opacity-90">Oportunidades Perdidas</div>
          <div className="text-4xl font-bold mt-2">{avgOportunidadesPerdidas.toFixed(1)}/5</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Segmentos das Empresas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData1}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Tamanho das Empresas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Principal Obstáculo para AI</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData3}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Investimento Mensal Disposto</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData4}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Principais Problemas Relatados</h3>
        <div className="space-y-3">
          {responses.slice(0, 5).map((r, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold text-blue-600">{r.segmento} - {r.numeroFuncionarios} funcionários</p>
              <p className="text-gray-700 mt-2">{r.problemaPrincipal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SurveyApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState('survey'); // 'survey' or 'dashboard'
  const [responses, setResponses] = useState([]);
  const [currentResponse, setCurrentResponse] = useState({
    // Perfil da Empresa
    segmento: '',
    numeroFuncionarios: '',
    faturamento: '',
    cargo: '',
    
    // Processos e Operações
    processosDemorados: '',
    tarefasRepetitivas: '',
    horasAdministrativas: '',
    frequenciaRetrabalho: 3,
    
    // Dados e Informações
    dificuldadeDados: '',
    tempoProblemas: '',
    baseTomadaDecisao: '',
    
    // Atendimento ao Cliente
    horasAtendimento: '',
    periodosPico: '',
    acompanhamentoFeedback: 3,
    tempoCicloVenda: '',
    
    // RH e Produtividade
    tarefasSemValor: '',
    desequilibrioEquipe: 3,
    tempoReunioes: '',
    dificuldadeContratacao: 3,
    
    // Custos e Desperdícios
    areasDesperdicio: '',
    previsaoDemanda: 3,
    errosFrequentes: '',
    orcamentoIncendios: '',
    
    // Gestão
    acessoKPIs: 3,
    tempoRelatorios: '',
    decisoesRapidas: '',
    oportunidadesPerdidas: 3,
    
    // Marketing e Vendas
    identificacaoClientes: '',
    tempoVendasAdmin: '',
    personalizacao: 3,
    medicaoMarketing: 3,
    
    // Conhecimento IA
    ferramentasIA: '',
    obstaculoIA: '',
    problemaPrincipal: '',
    
    // Priorização
    processoPriorizado: '',
    investimentoMensal: '',
    resultadosEsperados: '',
    
    // Contato
    receberResultados: false,
    interesseSolucoes: false,
    email: ''
  });


  const steps = [
    {
      title: 'Perfil da Empresa',
      icon: Building2,
      questions: [
        {
          id: 'segmento',
          label: 'Qual o segmento de atuação da sua empresa?',
          type: 'select',
          options: ['Varejo', 'Serviços', 'Indústria', 'Tecnologia', 'Saúde', 'Educação', 'Construção', 'Alimentação', 'Outro']
        },
        {
          id: 'numeroFuncionarios',
          label: 'Quantos funcionários a empresa possui?',
          type: 'select',
          options: ['1-10', '11-50', '51-100', '101-250', 'Mais de 250']
        },
        {
          id: 'faturamento',
          label: 'Qual o faturamento anual aproximado?',
          type: 'select',
          options: ['Até R$ 500 mil', 'R$ 500 mil - R$ 2 milhões', 'R$ 2 - R$ 10 milhões', 'R$ 10 - R$ 50 milhões', 'Acima de R$ 50 milhões']
        },
        {
          id: 'cargo',
          label: 'Qual seu cargo/função na empresa?',
          type: 'select',
          options: ['Proprietário/Sócio', 'Diretor', 'Gerente', 'Coordenador', 'Analista', 'Outro']
        }
      ]
    },
    {
      title: 'Processos e Gargalos',
      icon: Clock,
      questions: [
        {
          id: 'processosDemorados',
          label: 'Quais são os 3 processos mais demorados na sua operação diária?',
          type: 'textarea',
          placeholder: 'Descreva os processos que consomem mais tempo...'
        },
        {
          id: 'tarefasRepetitivas',
          label: 'Quais tarefas sua equipe considera repetitivas ou manuais?',
          type: 'textarea',
          placeholder: 'Liste as principais tarefas repetitivas...'
        },
        {
          id: 'horasAdministrativas',
          label: 'Quantas horas por semana sua equipe gasta com tarefas administrativas?',
          type: 'select',
          options: ['Menos de 5h', '5-10h', '10-20h', '20-30h', 'Mais de 30h']
        },
        {
          id: 'frequenciaRetrabalho',
          label: 'Com que frequência ocorre retrabalho?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Raramente', 'Frequentemente']
        }
      ]
    },
    {
      title: 'Dados e Informações',
      icon: BarChart3,
      questions: [
        {
          id: 'dificuldadeDados',
          label: 'Sua empresa enfrenta dificuldades para organizar ou analisar dados? Em quais áreas?',
          type: 'textarea',
          placeholder: 'Descreva as principais dificuldades com dados...'
        },
        {
          id: 'tempoProblemas',
          label: 'Quanto tempo é gasto procurando informações em e-mails, planilhas ou sistemas?',
          type: 'select',
          options: ['Menos de 1h/dia', '1-2h/dia', '2-4h/dia', '4-6h/dia', 'Mais de 6h/dia']
        },
        {
          id: 'baseTomadaDecisao',
          label: 'Como vocês tomam decisões importantes?',
          type: 'select',
          options: ['Baseadas em dados', 'Baseadas em intuição', 'Mix de dados e intuição', 'Não temos processo definido']
        }
      ]
    },
    {
      title: 'Atendimento ao Cliente',
      icon: Users,
      questions: [
        {
          id: 'horasAtendimento',
          label: 'Quantas horas por semana sua equipe gasta respondendo às mesmas perguntas?',
          type: 'select',
          options: ['Menos de 5h', '5-10h', '10-20h', '20-30h', 'Mais de 30h']
        },
        {
          id: 'periodosPico',
          label: 'Existem períodos onde o atendimento fica sobrecarregado?',
          type: 'select',
          options: ['Sim, diariamente', 'Sim, semanalmente', 'Sim, mensalmente', 'Ocasionalmente', 'Não']
        },
        {
          id: 'acompanhamentoFeedback',
          label: 'Vocês conseguem acompanhar e analisar feedback dos clientes eficientemente?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Não conseguimos', 'Muito eficiente']
        },
        {
          id: 'tempoCicloVenda',
          label: 'Quanto tempo leva do primeiro contato ao fechamento de uma venda?',
          type: 'select',
          options: ['Menos de 1 dia', '1-7 dias', '1-4 semanas', '1-3 meses', 'Mais de 3 meses']
        }
      ]
    },
    {
      title: 'Custos e Desperdícios',
      icon: DollarSign,
      questions: [
        {
          id: 'areasDesperdicio',
          label: 'Em quais áreas você identifica maior desperdício de recursos?',
          type: 'textarea',
          placeholder: 'Tempo, dinheiro, materiais...'
        },
        {
          id: 'previsaoDemanda',
          label: 'Vocês conseguem prever com precisão a demanda/estoque/necessidades futuras?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Não conseguimos', 'Muito preciso']
        },
        {
          id: 'errosFrequentes',
          label: 'Existem erros frequentes que geram custos adicionais? Quais?',
          type: 'textarea',
          placeholder: 'Descreva os principais erros...'
        },
        {
          id: 'orcamentoIncendios',
          label: 'Quanto do orçamento (%) é gasto "apagando incêndios"?',
          type: 'select',
          options: ['Menos de 10%', '10-25%', '25-50%', '50-75%', 'Mais de 75%']
        }
      ]
    },
    {
      title: 'Gestão e Decisões',
      icon: BarChart3,
      questions: [
        {
          id: 'acessoKPIs',
          label: 'Você tem acesso rápido aos indicadores-chave (KPIs) do seu negócio?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Sem acesso', 'Acesso imediato']
        },
        {
          id: 'tempoRelatorios',
          label: 'Quanto tempo leva para gerar relatórios gerenciais?',
          type: 'select',
          options: ['Minutos', 'Algumas horas', '1-2 dias', '3-7 dias', 'Mais de uma semana']
        },
        {
          id: 'decisoesRapidas',
          label: 'Quais decisões você gostaria de tomar mais rápido se tivesse as informações corretas?',
          type: 'textarea',
          placeholder: 'Descreva as decisões...'
        },
        {
          id: 'oportunidadesPerdidas',
          label: 'A empresa perde oportunidades por falta de análise ou lentidão?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Nunca', 'Constantemente']
        }
      ]
    },
    {
      title: 'AI e Tecnologia',
      icon: AlertCircle,
      questions: [
        {
          id: 'ferramentasIA',
          label: 'Sua empresa já utiliza alguma ferramenta de AI?',
          type: 'textarea',
          placeholder: 'Quais ferramentas?'
        },
        {
          id: 'obstaculoIA',
          label: 'Qual o principal obstáculo para adotar soluções de AI?',
          type: 'select',
          options: ['Custo', 'Falta de conhecimento técnico', 'Resistência da equipe', 'Não sabemos por onde começar', 'Segurança de dados', 'Outro']
        },
        {
          id: 'problemaPrincipal',
          label: 'Se pudesse resolver UM problema com tecnologia, qual seria?',
          type: 'textarea',
          placeholder: 'Descreva o problema principal...'
        }
      ]
    },
    {
      title: 'Priorização',
      icon: CheckCircle,
      questions: [
        {
          id: 'processoPriorizado',
          label: 'Se pudesse automatizar UM processo amanhã, qual seria e por quê?',
          type: 'textarea',
          placeholder: 'Processo e justificativa...'
        },
        {
          id: 'investimentoMensal',
          label: 'Quanto investiria mensalmente em uma solução que economizasse 10h/semana?',
          type: 'select',
          options: ['Até R$ 500', 'R$ 500 - R$ 1.500', 'R$ 1.500 - R$ 3.000', 'R$ 3.000 - R$ 5.000', 'Acima de R$ 5.000']
        },
        {
          id: 'resultadosEsperados',
          label: 'Quais resultados você esperaria em 3-6 meses após implementar uma solução de AI?',
          type: 'textarea',
          placeholder: 'Descreva os resultados esperados...'
        },
        {
          id: 'email',
          label: 'E-mail para contato (opcional)',
          type: 'email',
          placeholder: 'seu@email.com'
        },
        {
          id: 'receberResultados',
          label: 'Gostaria de receber os resultados desta pesquisa?',
          type: 'checkbox'
        },
        {
          id: 'interesseSolucoes',
          label: 'Tem interesse em conhecer soluções personalizadas?',
          type: 'checkbox'
        }
      ]
    }
  ];

  const handleInputChange = (questionId, value) => {
    setCurrentResponse(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save response
      const newResponse = {
        ...currentResponse,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      setResponses(prev => [...prev, newResponse]);
      
      // Show dashboard
      setViewMode('dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetSurvey = () => {
    setCurrentStep(0);
    setCurrentResponse({
      segmento: '', numeroFuncionarios: '', faturamento: '', cargo: '',
      processosDemorados: '', tarefasRepetitivas: '', horasAdministrativas: '',
      frequenciaRetrabalho: 3, dificuldadeDados: '', tempoProblemas: '',
      baseTomadaDecisao: '', horasAtendimento: '', periodosPico: '',
      acompanhamentoFeedback: 3, tempoCicloVenda: '', tarefasSemValor: '',
      desequilibrioEquipe: 3, tempoReunioes: '', dificuldadeContratacao: 3,
      areasDesperdicio: '', previsaoDemanda: 3, errosFrequentes: '',
      orcamentoIncendios: '', acessoKPIs: 3, tempoRelatorios: '',
      decisoesRapidas: '', oportunidadesPerdidas: 3, ferramentasIA: '',
      obstaculoIA: '', problemaPrincipal: '', processoPriorizado: '',
      investimentoMensal: '', resultadosEsperados: '', receberResultados: false,
      interesseSolucoes: false, email: ''
    });
    setViewMode('survey');
  };

  const renderQuestion = (question) => {
    const value = currentResponse[question.id];

    switch (question.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
          >
            <option value="">Selecione uma opção</option>
            {question.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            rows="4"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
          />
        );
      
      case 'email':
        return (
          <input
            type="email"
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        );
      
      case 'checkbox':
        return (
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleInputChange(question.id, e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Sim</span>
          </label>
        );
      
      case 'scale':
        return (
          <div className="space-y-3">
            <input
              type="range"
              min={question.min}
              max={question.max}
              value={value}
              onChange={(e) => handleInputChange(question.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{question.labels[0]}</span>
              <span className="font-semibold text-blue-600">{value}</span>
              <span>{question.labels[1]}</span>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };



  if (viewMode === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-7xl mx-auto">
          <Dashboard responses={responses} resetSurvey={resetSurvey} />
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Pesquisa de Oportunidades em AI - Artificial Intelligence
          </h1>
          <p className="text-gray-600">
            Ajude-nos a identificar oportunidades de melhoria na sua empresa
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Etapa {currentStep + 1} de {steps.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(progress)}% completo
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Icon className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {currentStepData.title}
            </h2>
          </div>

          <div className="space-y-6">
            {currentStepData.questions.map((question, idx) => (
              <div key={question.id} className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  {idx + 1}. {question.label}
                </label>
                {renderQuestion(question)}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Anterior
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Finalizar
                </>
              ) : (
                <>
                  Próximo
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentStep
                  ? 'bg-blue-600 w-8'
                  : idx < currentStep
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyApp;

