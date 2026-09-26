import React, { useState } from 'react';
import { Search, Calendar, BookOpen, Hash } from 'lucide-react';
import estilos from './Questoes.module.css';

export function Questoes() {
  // Estados para os filtros da questão
  const [ano, setAno] = useState('');
  const [assunto, setAssunto] = useState('');
  const [numero, setNumero] = useState('');
  const [buscando, setBuscando] = useState(false);

  const handleBuscar = () => {
    setBuscando(true);
    setTimeout(() => {
      setBuscando(false);
      alert(`Buscando questão...\nAno: ${ano || 'Todos'}\nAssunto: ${assunto || 'Todos'}\nNúmero: ${numero || 'Todos'}`);
    }, 1000);
  };

  return (
    <div className={estilos.conteiner}>

      {/* Cartão Principal de Filtros */}
      <div className={estilos.cartao}>

        {/* Selo */}
        <span className={estilos.selo}>
          Filtro de Questões
        </span>

        <h1 className={estilos.titulo}>
          Encontre a questão ideal
        </h1>

        <p className={estilos.texto}>
          Selecione os filtros abaixo para buscar questões específicas de provas anteriores. 
          Você pode filtrar pelo ano da aplicação, qual o assunto principal, ou buscar diretamente pelo número da questão.
        </p>

        {/* Grid de Filtros */}
        <div className={estilos.gridFiltros}>
          {/* Filtro: Ano da Questão */}
          <div className={estilos.campoFiltro}>
            <div className={estilos.cabecalhoFiltro}>
              <Calendar size={16} className={estilos.iconeFiltro} />
              <label className={estilos.rotuloFiltro}>
                Ano da Questão
              </label>
            </div>
            <select 
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              className={estilos.inputFiltro}
            >
              <option value="" className={estilos.itemOpcaoSelect}>Todos os anos</option>
              <option value="2024" className={estilos.itemOpcaoSelect}>2024</option>
              <option value="2023" className={estilos.itemOpcaoSelect}>2023</option>
              <option value="2022" className={estilos.itemOpcaoSelect}>2022</option>
              <option value="2021" className={estilos.itemOpcaoSelect}>2021</option>
            </select>
          </div>

          {/* Filtro: O que estudar (Assunto) */}
          <div className={estilos.campoFiltro}>
            <div className={estilos.cabecalhoFiltro}>
              <BookOpen size={16} className={estilos.iconeFiltro} />
              <label className={estilos.rotuloFiltro}>
                O que estudar
              </label>
            </div>
            <select 
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              className={estilos.inputFiltro}
            >
              <option value="" className={estilos.itemOpcaoSelect}>Qualquer assunto</option>
              <option value="Astronomia" className={estilos.itemOpcaoSelect}>Astronomia Geral</option>
              <option value="Astronautica" className={estilos.itemOpcaoSelect}>Astronáutica e Foguetes</option>
              <option value="SistemaSolar" className={estilos.itemOpcaoSelect}>Sistema Solar</option>
              <option value="Estrelas" className={estilos.itemOpcaoSelect}>Estrelas e Galáxias</option>
            </select>
          </div>

          {/* Filtro: Qual Questão (Número) */}
          <div className={estilos.campoFiltro}>
            <div className={estilos.cabecalhoFiltro}>
              <Hash size={16} className={estilos.iconeFiltro} />
              <label className={estilos.rotuloFiltro}>
                Qual Questão
              </label>
            </div>
            <input 
              type="number" 
              placeholder="Nº da questão"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              className={estilos.inputFiltro}
            />
          </div>

        </div>

        {/* Botão de Busca */}
        <button 
          onClick={handleBuscar} 
          disabled={buscando}
          className={estilos.botaoBusca}
        >
          <Search size={18} />
          {buscando ? 'Filtrando...' : 'Buscar Questões'}
        </button>

      </div>
    </div>
  );
}

export default Questoes;