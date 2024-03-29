/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import styles from '../modules/WeddingEdit.module.css';

function WeddingEdit() {
  const { id } = useParams();
  const { state } = useLocation();

  const [data, setData] = useState('');
  const [cidade, setCidade] = useState('');
  const [noiva, setNoiva] = useState('');
  const [noivo, setNoivo] = useState('');
  const [localCerimonia, setLocalCerimonia] = useState('');
  const [localRecepcao, setLocalRecepcao] = useState('');
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
    const wedding = state.job;
    setData(wedding.data);
    setCidade(wedding.cidade);
    setNoiva(wedding.noiva);
    setNoivo(wedding.noivo);
    setLocalCerimonia(wedding.localCerimonia);
    setLocalRecepcao(wedding.localRecepcao);
    setPrimeiroBackupBruto(wedding.primeiroBackupBruto);
    setPrimeiroBackupBrutoTamanho(wedding.primeiroBackupBrutoTamanho);
    setSegundoBackupBruto(wedding.segundoBackupBruto);
    setSegundoBackupBrutoTamanho(wedding.segundoBackupBrutoTamanho);
    setPrimeiroBackup(wedding.primeiroBackup);
    setPrimeiroBackupTamanho(wedding.primeiroBackupTamanho);
    setSegundoBackup(wedding.segundoBackup);
    setSegundoBackupTamanho(wedding.segundoBackupTamanho);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = async (event) => {
    const weddingEdited = {
      data,
      cidade,
      noiva,
      noivo,
      localCerimonia,
      localRecepcao,
      primeiroBackupBruto: primeiroBackupBruto || null,
      primeiroBackupBrutoTamanho: primeiroBackupBrutoTamanho || 0,
      segundoBackupBruto: segundoBackupBruto || null,
      segundoBackupBrutoTamanho: segundoBackupBrutoTamanho || 0,
      primeiroBackup: primeiroBackup || null,
      primeiroBackupTamanho: primeiroBackupTamanho || 0,
      segundoBackup: segundoBackup || null,
      segundoBackupTamanho: segundoBackupTamanho || 0,
    };
    event.preventDefault();
    const response = await fetch(`http://localhost:3001/casamentos/detalhe/${id}/editar`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(weddingEdited),
    });
    const weddingData = await response.json();

    if (weddingData.erro) {
      setErro(weddingData.erro);
    } else {
      setMessage(weddingData.message);
      setErro('');
    }
  };

  const deletePrimeiroBackupBruto = () => {
    setPrimeiroBackupBruto(0);
    setPrimeiroBackupBrutoTamanho(0);
  };

  const deleteSegundoBackupBruto = () => {
    setSegundoBackupBruto(null);
    setSegundoBackupBrutoTamanho(0);
  };

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Editar casamento" />
      <Link className={ styles.weddings } to="/casamentos"> Casamentos</Link>
      <main className={ styles.main }>
        <form onSubmit={ submitForm } className={ styles.form }>
          <h3>
            { `${noiva} & ${noivo}` }
          </h3>
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
          <label htmlFor="cidade">
            Cidade
            <input
              onFocus={ () => setCidade('') }
              placeholder="Cidade"
              onChange={ (event) => setCidade(event.target.value) }
              type="text"
              id="cidade"
              value={ cidade }
            />
          </label>
          <label htmlFor="noiva">
            Noiva
            <input
              onFocus={ () => setNoiva('') }
              placeholder="Noiva"
              onChange={ (event) => setNoiva(event.target.value) }
              type="text"
              id="noiva"
              value={ noiva }
            />
          </label>
          <label htmlFor="noivo">
            Noivo
            <input
              onFocus={ () => setNoivo('') }
              placeholder="Noivo"
              onChange={ (event) => setNoivo(event.target.value) }
              type="text"
              id="noivo"
              value={ noivo }
            />
          </label>
          <label htmlFor="localCerimonia">
            Cerimônia
            <input
              onFocus={ () => setLocalCerimonia('') }
              placeholder="Local da Cerimônia"
              onChange={ (event) => setLocalCerimonia(event.target.value) }
              type="text"
              id="localCerimonia"
              value={ localCerimonia }
            />
          </label>
          <label htmlFor="localRecepcao">
            Recepção
            <input
              onFocus={ () => setLocalRecepcao('') }
              placeholder="Local da Recepção"
              onChange={ (event) => setLocalRecepcao(event.target.value) }
              type="text"
              id="localRecepcao"
              value={ localRecepcao }
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
              // onFocus={ () => setPrimeiroBackupBrutoTamanho(0) }
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
              // onFocus={ () => setSegundoBackupBruto('') }
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
              // onFocus={ () => setSegundoBackupBrutoTamanho('') }
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
              // onFocus={ () => setPrimeiroBackup('') }
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
              // onFocus={ () => setPrimeiroBackupTamanho('') }
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
              // onFocus={ () => setSegundoBackup('') }
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
              // onFocus={ () => setSegundoBackupTamanho('') }
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

export default WeddingEdit;
