/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import styles from '../modules/EditJob.module.css';

function CorporateEdit() {
  const { id } = useParams();
  const { state } = useLocation();

  const [data, setData] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [evento, setEvento] = useState('');
  const [contratante, setContratante] = useState('');
  const [local, setLocal] = useState('');
  const [cidade, setCidade] = useState('');
  const [primeiroBackupBruto, setPrimeiroBackupBruto] = useState(0);
  const [primeiroBackupBrutoTamanho, setPrimeiroBackupBrutoTamanho] = useState(0);
  const [segundoBackupBruto, setSegundoBackupBruto] = useState(0);
  const [segundoBackupBrutoTamanho, setSegundoBackupBrutoTamanho] = useState(0);
  const [primeiroBackup, setPrimeiroBackup] = useState(0);
  const [primeiroBackupTamanho, setPrimeiroBackupTamanho] = useState(0);
  const [segundoBackup, setSegundoBackup] = useState(0);
  const [segundoBackupTamanho, setSegundoBackupTamanho] = useState(0);

  const [erro, setErro] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const corporate = state.job;
    setData(corporate.data);
    setEmpresa(corporate.empresa);
    setEvento(corporate.evento);
    setContratante(corporate.contratante);
    setLocal(corporate.local);
    setCidade(corporate.cidade);
    setPrimeiroBackupBruto(corporate.primeiroBackupBruto);
    setPrimeiroBackupBrutoTamanho(corporate.primeiroBackupBrutoTamanho);
    setSegundoBackupBruto(corporate.segundoBackupBruto);
    setSegundoBackupBrutoTamanho(corporate.segundoBackupBrutoTamanho);
    setPrimeiroBackup(corporate.primeiroBackup);
    setPrimeiroBackupTamanho(corporate.primeiroBackupTamanho);
    setSegundoBackup(corporate.segundoBackup);
    setSegundoBackupTamanho(corporate.segundoBackupTamanho);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();
    const corporateEdited = {
      data,
      empresa,
      evento,
      contratante,
      local,
      cidade,
      primeiroBackupBruto: primeiroBackupBruto || null,
      primeiroBackupBrutoTamanho: primeiroBackupBrutoTamanho || 0,
      segundoBackupBruto: segundoBackupBruto || null,
      segundoBackupBrutoTamanho: segundoBackupBrutoTamanho || 0,
      primeiroBackup: primeiroBackup || null,
      primeiroBackupTamanho: primeiroBackupTamanho || 0,
      segundoBackup: segundoBackup || null,
      segundoBackupTamanho: segundoBackupTamanho || 0,
    };

    const response = await fetch(`http://localhost:3001/corporate/detalhe/${id}/editar`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corporateEdited),
    });
    const corporateData = await response.json();

    if (corporateData.erro) {
      setErro(corporateData.erro);
    } else {
      setMessage(corporateData.message);
      setErro('');
    }
  };

  const deletePrimeiroBackupBruto = () => {
    setPrimeiroBackupBruto(null);
    setPrimeiroBackupBrutoTamanho(0);
  };

  const deleteSegundoBackupBruto = () => {
    setSegundoBackupBruto(null);
    setSegundoBackupBrutoTamanho(0);
  };

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Editar evento Corporativo" />
      <Link className={ styles.jobLink } to="/corporativo"> Corporativo</Link>
      <main className={ styles.main }>
        <h3>{ empresa }</h3>
        <h2>{ evento }</h2>
        <form onSubmit={ submitForm } className={ styles.form }>
          <label htmlFor="data">
            Data
            <input
              onFocus={ () => setData('') }
              placeholder="Data"
              onChange={ (event) => setData(event.target.value) }
              type="text"
              id="data"
              value={ data }
            />
          </label>
          <label htmlFor="empresa">
            Empresa
            <input
              onFocus={ () => setEmpresa('') }
              placeholder="Empresa"
              onChange={ (event) => setEmpresa(event.target.value) }
              type="text"
              id="empresa"
              value={ empresa }
            />
          </label>
          <label htmlFor="evento">
            Evento
            <input
              onFocus={ () => setEvento('') }
              placeholder="Evento"
              onChange={ (event) => setEvento(event.target.value) }
              type="text"
              id="evento"
              value={ evento }
            />
          </label>
          <label htmlFor="contratante">
            Contratante
            <input
              onFocus={ () => setContratante('') }
              placeholder="contratante"
              onChange={ (event) => setContratante(event.target.value) }
              type="text"
              id="contratante"
              value={ contratante }
            />
          </label>
          <label htmlFor="local">
            Local
            <input
              onFocus={ () => setLocal('') }
              placeholder="Local da Cerimônia"
              onChange={ (event) => setLocal(event.target.value) }
              type="text"
              id="local"
              value={ local }
            />
          </label>
          <label htmlFor="cidade">
            Cidade
            <input
              onFocus={ () => setCidade('') }
              placeholder="Cidade da Cerimônia"
              onChange={ (event) => setCidade(event.target.value) }
              type="text"
              id="cidade"
              value={ cidade }
            />
          </label>
          <label htmlFor="primeiroBackupBruto">
            Primeiro Backup Bruto
            <input
              placeholder="Primeiro Backup Bruto"
              onChange={ (event) => setPrimeiroBackupBruto(event.target.value) }
              type="number"
              id="primeiroBackupBruto"
              value={ primeiroBackupBruto }
            />
            <button
              type="button"
              onClick={ deletePrimeiroBackupBruto }
              disabled={ primeiroBackupBruto === null }
            >
              Deletar backup bruto
            </button>
          </label>

          <label htmlFor="primeiroBackupBrutoTamanho">
            Tamanho
            <input
              placeholder="Tamanho"
              onChange={ (event) => setPrimeiroBackupBrutoTamanho(event.target.value) }
              type="number"
              id="primeiroBackupBrutoTamanho"
              value={ primeiroBackupBrutoTamanho }
            />
          </label>
          <label htmlFor="segundoBackupBruto">
            Segundo Backup Bruto
            <input
              placeholder="Segundo Backup Bruto"
              onChange={ (event) => setSegundoBackupBruto(event.target.value) }
              type="number"
              id="segundoBackupBruto"
              value={ segundoBackupBruto }
            />
            <button
              type="button"
              onClick={ deleteSegundoBackupBruto }
            >
              Deletar backup bruto
            </button>
          </label>
          <label htmlFor="segundoBackupBrutoTamanho">
            Tamanho
            <input
              placeholder="Tamanho"
              onChange={ (event) => setSegundoBackupBrutoTamanho(event.target.value) }
              type="number"
              id="segundoBackupBrutoTamanho"
              value={ segundoBackupBrutoTamanho }
            />
          </label>
          <label htmlFor="primeiroBackup">
            Primeiro Backup Editado
            <input
              placeholder="Primeiro Backup"
              onChange={ (event) => setPrimeiroBackup(event.target.value) }
              type="number"
              id="primeiroBackup"
              value={ primeiroBackup }
            />
          </label>
          <label htmlFor="primeiroBackupTamanho">
            Tamanho
            <input
              placeholder="Tamanho"
              onChange={ (event) => setPrimeiroBackupTamanho(event.target.value) }
              type="number"
              id="primeiroBackupTamanho"
              value={ primeiroBackupTamanho }
            />
          </label>
          <label htmlFor="segundoBackup">
            Segundo Backup Editado
            <input
              placeholder="Segundo Backup"
              onChange={ (event) => setSegundoBackup(event.target.value) }
              type="number"
              id="segundoBackup"
              value={ segundoBackup }
            />
          </label>
          <label htmlFor="segundoBackupTamanho">
            Tamanho
            <input
              placeholder="Tamanho"
              onChange={ (event) => setSegundoBackupTamanho(event.target.value) }
              type="number"
              id="segundoBackupTamanho"
              value={ segundoBackupTamanho }
            />
          </label>
          <button
            type="submit"
          >
            Atualizar
          </button>
        </form>
      </main>
      <section className={ styles.message }>
        {
          erro && <p>{ erro }</p>
        }
        {
          message && <p>{ message }</p>
        }
      </section>
    </div>
  );
}

export default CorporateEdit;
