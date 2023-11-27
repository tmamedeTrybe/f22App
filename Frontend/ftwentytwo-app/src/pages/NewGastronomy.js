import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../modules/NewJob.module.css';
import HeaderLogo from '../components/HeaderLogo';

function NewGastronomy() {
  const [data, setData] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [evento, setEvento] = useState('');
  const [contato, setContato] = useState('');
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

  const disableButton = !data || !empresa;

  const submitForm = async (event) => {
    event.preventDefault();

    const newGastronomy = {
      date: data,
      company: empresa,
      event: evento,
      contact: contato,
      venue: local,
      city: cidade,
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

    console.log(newGastronomy, 'xxxxx');

    const response = await fetch('http://localhost:3001/gastronomy/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGastronomy),
    });
    const gastronomyData = await response.json();

    console.log(gastronomyData, 'yyyyy');

    if (gastronomyData.erro) {
      setErro(gastronomyData.erro);
    } else {
      setMessage(gastronomyData.message);
      setErro('');
    }
  };

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Novo evento Gastronomia" />
      <Link className={ styles.jobLink } to="/gastronomia"> Gastronomia </Link>
      <section className={ styles.main }>
        <form
          className={ styles.form }
          onSubmit={ submitForm }
        >
          <label htmlFor="data">
            <input
              placeholder="Data - YYYYMMDD"
              type="text"
              id="data"
              value={ data }
              onChange={ (event) => setData(event.target.value) }
            />
          </label>
          <label htmlFor="empresa">
            <input
              placeholder="Empresa"
              type="text"
              id="empresa"
              value={ empresa }
              onChange={ (event) => setEmpresa(event.target.value) }
            />
          </label>
          <label htmlFor="evento">
            <input
              placeholder="Evento"
              type="text"
              id="evento"
              value={ evento }
              onChange={ (event) => setEvento(event.target.value) }
            />
          </label>
          <label htmlFor="empresa">
            <input
              placeholder="Contato"
              type="text"
              id="contato"
              value={ contato }
              onChange={ (event) => setContato(event.target.value) }
            />
          </label>
          <label htmlFor="local">
            <input
              placeholder="Local"
              type="text"
              id="local"
              value={ local }
              onChange={ (event) => setLocal(event.target.value) }
            />
          </label>
          <label htmlFor="cidade">
            <input
              placeholder="Cidade"
              type="text"
              id="cidade"
              value={ cidade }
              onChange={ (event) => setCidade(event.target.value) }
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
            disabled={ disableButton }
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

export default NewGastronomy;
