import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../modules/NewFamily.module.css';
import HeaderLogo from '../components/HeaderLogo';

function NewFamily() {
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');
  const [nome, setNome] = useState('');
  const [contratante, setContratante] = useState('');
  const [local, setLocal] = useState('');
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

  const disabledButton = !data || !categoria || !categoria;

  const submitForm = async (event) => {
    event.preventDefault();

    const newFamily = {
      data,
      categoria,
      nome,
      contratante,
      local,
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

    const response = await fetch('http://localhost:3001/familia/novo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFamily),
    });
    const familyData = await response.json();

    if (familyData.erro) {
      setErro(familyData.erro);
    } else {
      setMessage(familyData.message);
      setErro('');
    }
  };

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Novo evento Família" />
      <Link className={ styles.familyLink } to="/familia"> Família </Link>
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
          <label htmlFor="categoria">
            <input
              placeholder="Categoria"
              onChange={ (event) => setCategoria(event.target.value) }
              type="text"
              id="categoria"
              value={ categoria }
            />
          </label>
          <label htmlFor="nome">
            <input
              placeholder="Nome"
              onChange={ (event) => setNome(event.target.value) }
              type="text"
              id="nome"
              value={ nome }
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

export default NewFamily;
