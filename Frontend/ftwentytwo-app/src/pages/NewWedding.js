import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../modules/NewJob.module.css';
import HeaderLogo from '../components/HeaderLogo';

function NewWedding() {
  const [formInfo, setFormInfo] = useState({
    data: '',
    cidade: '',
    noiva: '',
    noivo: '',
    localCerimonia: '',
    localRecepcao: '',
    primeiroBackupBruto: null,
    primeiroBackupBrutoTamanho: 0,
    segundoBackupBruto: null,
    segundoBackupBrutoTamanho: 0,
    primeiroBackup: null,
    primeiroBackupTamanho: 0,
    segundoBackup: null,
    segundoBackupTamanho: 0,
  });
  const [erro, setErro] = useState('');
  const [message, setMessage] = useState('');

  const disabledButton = !formInfo.data || !formInfo.noiva || !formInfo.noivo;

  const handleChange = (event) => {
    setFormInfo({
      ...formInfo,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const newWedding = {
      data: formInfo.data,
      cidade: formInfo.cidade,
      noiva: formInfo.noiva,
      noivo: formInfo.noivo,
      imagem: null,
      localCerimonia: formInfo.localCerimonia,
      localRecepcao: formInfo.localRecepcao,
      primeiroBackupBruto: formInfo.primeiroBackupBruto,
      primeiroBackupBrutoTamanho: formInfo.primeiroBackupBrutoTamanho,
      segundoBackupBruto: formInfo.segundoBackupBruto,
      segundoBackupBrutoTamanho: formInfo.segundoBackupBrutoTamanho,
      primeiroBackup: formInfo.primeiroBackup,
      primeiroBackupTamanho: formInfo.primeiroBackupTamanho,
      segundoBackup: formInfo.segundoBackup,
      segundoBackupTamanho: formInfo.segundoBackupTamanho,
    };

    const response = await fetch('http://localhost:3001/casamentos/novo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWedding),
    });
    const weddingData = await response.json();

    if (weddingData.erro) {
      setErro(weddingData.erro);
    } else {
      setMessage(weddingData.message);
      setErro('');
    }
  };

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Novo casamento" />
      <Link className={ styles.jobLink } to="/casamentos"> Casamentos </Link>
      <section className={ styles.main }>
        <form
          onSubmit={ submitForm }
          className={ styles.form }
        >
          <label htmlFor="data">
            <input
              placeholder="Data - YYYYMMDD"
              type="text"
              id="data"
              value={ formInfo.data }
              name="data"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="cidade">
            <input
              placeholder="Cidade"
              onChange={ handleChange }
              type="text"
              id="cidade"
              value={ formInfo.cidade }
              name="cidade"
            />
          </label>
          <label htmlFor="noiva">
            <input
              placeholder="Noiva"
              onChange={ handleChange }
              type="text"
              id="noiva"
              value={ formInfo.noiva }
              name="noiva"
            />
          </label>
          <label htmlFor="noivo">
            <input
              placeholder="Noivo"
              onChange={ handleChange }
              type="text"
              id="noivo"
              value={ formInfo.noivo }
              name="noivo"
            />
          </label>
          <label htmlFor="localCerimonia">
            <input
              placeholder="Local da Cerimônia"
              onChange={ handleChange }
              type="text"
              id="localCerimonia"
              value={ formInfo.localCerimonia }
              name="localCerimonia"
            />
          </label>
          <label htmlFor="localRecepcao">
            <input
              placeholder="Local da Recepção"
              onChange={ handleChange }
              type="text"
              id="localRecepcao"
              value={ formInfo.localRecepcao }
              name="localRecepcao"
            />
          </label>
          <label htmlFor="primeiroBackupBruto">
            <input
              placeholder="Primeiro Backup Bruto"
              onChange={ handleChange }
              type="number"
              id="primeiroBackupBruto"
              value={ formInfo.primeiroBackupBruto }
              name="primeiroBackupBruto"
            />
          </label>
          <label htmlFor="primeiroBackupBrutoTamanho">
            <input
              placeholder="Tamanho"
              onChange={ handleChange }
              type="number"
              id="primeiroBackupBrutoTamanho"
              value={ formInfo.primeiroBackupBrutoTamanho }
              name="primeiroBackupBrutoTamanho"
            />
          </label>
          <label htmlFor="segundoBackupBruto">
            <input
              placeholder="Segundo Backup Bruto"
              onChange={ handleChange }
              type="number"
              id="segundoBackupBruto"
              value={ formInfo.segundoBackupBruto }
              name="segundoBackupBruto"
            />
          </label>
          <label htmlFor="segundoBackupBrutoTamanho">
            <input
              placeholder="Tamanho"
              onChange={ handleChange }
              type="number"
              id="segundoBackupBrutoTamanho"
              value={ formInfo.segundoBackupBrutoTamanho }
              name="segundoBackupBrutoTamanho"
            />
          </label>
          <label htmlFor="primeiroBackup">
            <input
              placeholder="Primeiro Backup"
              onChange={ handleChange }
              type="number"
              id="primeiroBackup"
              value={ formInfo.primeiroBackup }
              name="primeiroBackup"
            />
          </label>
          <label htmlFor="primeiroBackupTamanho">
            <input
              placeholder="Tamanho"
              onChange={ handleChange }
              type="number"
              id="primeiroBackupTamanho"
              value={ formInfo.primeiroBackupTamanho }
              name="primeiroBackupTamanho"
            />
          </label>
          <label htmlFor="segundoBackup">
            <input
              placeholder="Segundo Backup"
              onChange={ handleChange }
              type="number"
              id="segundoBackup"
              value={ formInfo.segundoBackup }
              name="segundoBackup"
            />
          </label>
          <label htmlFor="segundoBackupTamanho">
            <input
              placeholder="Tamanho"
              onChange={ handleChange }
              type="number"
              id="segundoBackupTamanho"
              value={ formInfo.segundoBackupTamanho }
              name="segundoBackupTamanho"
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

export default NewWedding;
