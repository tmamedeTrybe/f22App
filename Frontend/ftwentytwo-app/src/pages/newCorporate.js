import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import styles from '../modules/NewJob.module.css';

function NewCorporate() {
  const [data, setData] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [evento, setEvento] = useState('');
  const [contratante, setContratante] = useState('');
  const [local, setLocal] = useState('');
  const [cidade, setCidade] = useState('');
  const [primeiroBackupBruto, setPrimeiroBackupBruto] = useState(null);
  const [primeiroBackupBrutoTamanho, setPrimeiroBackupBrutoTamanho] = useState(0);
  const [segundoBackupBruto, setSegundoBackupBruto] = useState(null);
  const [segundoBackupBrutoTamanho, setSegundoBackupBrutoTamanho] = useState(0);
  const [primeiroBackup, setPrimeiroBackup] = useState(null);
  const [primeiroBackupTamanho, setPrimeiroBackupTamanho] = useState(0);
  const [segundoBackup, setSegundoBackup] = useState(null);
  const [segundoBackupTamanho, setSegundoBackupTamanho] = useState(0);
  const [erro, setErro] = useState('');
  const [message, setMessage] = useState('');

  const disabledButton = !data || !empresa;

  const submitForm = async (event) => {
    event.preventDefault();

    const newCorporate = {
      data,
      empresa,
      evento,
      contratante,
      local,
      cidade,
      imagem: null,
      primeiroBackupBruto,
      primeiroBackupBrutoTamanho,
      segundoBackupBruto,
      segundoBackupBrutoTamanho,
      primeiroBackup,
      primeiroBackupTamanho,
      segundoBackup,
      segundoBackupTamanho,
    };

    const response = await fetch('http://localhost:3001/corporate/novo', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newCorporate),
    });
    const corporateData = await response.json();

    if (corporateData.erro) {
      setErro(corporateData.erro);
    } else {
      setMessage(corporateData.message);
      setErro('');
    }
  };

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Novo evento Corporativo" />
      <Link className={ styles.jobLink } to="/corporativo"> Corporativo </Link>
      <section className={ styles.main }>
        <form
          className={ styles.form }
          onSubmit={ submitForm }
        >
          <label htmlFor="data">
            <input
              placeholder="Data - YYYYMMDD"
              onChange={ (event) => setData(event.target.value) }
              type="text"
              id="data"
              value={ data }
            />
          </label>
          <label htmlFor="empresa">
            <input
              placeholder="Empresa"
              onChange={ (event) => setEmpresa(event.target.value) }
              type="text"
              id="empresa"
              value={ empresa }
            />
          </label>
          <label htmlFor="evento">
            <input
              placeholder="Evento"
              onChange={ (event) => setEvento(event.target.value) }
              type="text"
              id="evento"
              value={ evento }
            />
          </label>
          <label htmlFor="contratante">
            <input
              placeholder="Contratante"
              onChange={ (event) => setContratante(event.target.value) }
              type="text"
              id="contratante"
              value={ contratante }
            />
          </label>
          <label htmlFor="local">
            <input
              placeholder="Local"
              onChange={ (event) => setLocal(event.target.value) }
              type="text"
              id="local"
              value={ local }
            />
          </label>
          <label htmlFor="cidade">
            <input
              placeholder="Cidade"
              onChange={ (event) => setCidade(event.target.value) }
              type="text"
              id="cidade"
              value={ cidade }
            />
          </label>
          <label htmlFor="primeiroBackupBruto">
            <input
              placeholder="Primeiro Backup Bruto"
              onChange={ (event) => setPrimeiroBackupBruto(event.target.value) }
              type="number"
              id="primeiroBackupBruto"
              value={ primeiroBackupBruto }
            />
          </label>
          <label htmlFor="primeiroBackupBrutoTamanho">
            <input
              placeholder="Tamanho"
              onChange={ (event) => setPrimeiroBackupBrutoTamanho(event.target.value) }
              type="number"
              id="primeiroBackupBrutoTamanho"
              value={ primeiroBackupBrutoTamanho }
            />
          </label>
          <label htmlFor="segundoBackupBruto">
            <input
              placeholder="Segundo Backup Bruto"
              onChange={ (event) => setSegundoBackupBruto(event.target.value) }
              type="number"
              id="segundoBackupBruto"
              value={ segundoBackupBruto }
            />
          </label>
          <label htmlFor="segundoBackupBrutoTamanho">
            <input
              placeholder="Tamanho"
              onChange={ (event) => setSegundoBackupBrutoTamanho(event.target.value) }
              type="number"
              id="segundoBackupBrutoTamanho"
              value={ segundoBackupBrutoTamanho }
            />
          </label>
          <label htmlFor="primeiroBackup">
            <input
              placeholder="Primeiro Backup"
              onChange={ (event) => setPrimeiroBackup(event.target.value) }
              type="number"
              id="primeiroBackup"
              value={ primeiroBackup }
            />
          </label>
          <label htmlFor="primeiroBackupTamanho">
            <input
              placeholder="Tamanho"
              onChange={ (event) => setPrimeiroBackupTamanho(event.target.value) }
              type="number"
              id="primeiroBackupTamanho"
              value={ primeiroBackupTamanho }
            />
          </label>
          <label htmlFor="segundoBackup">
            <input
              placeholder="Segundo Backup"
              onChange={ (event) => setSegundoBackup(event.target.value) }
              type="number"
              id="segundoBackup"
              value={ segundoBackup }
            />
          </label>
          <label htmlFor="segundoBackupTamanho">
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
            disabled={ disabledButton }
          >
            Cadastrar
          </button>

        </form>
      </section>
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

export default NewCorporate;
