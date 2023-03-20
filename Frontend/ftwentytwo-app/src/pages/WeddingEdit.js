/* eslint-disable max-lines */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import MyContext from '../context/myContext';
import styles from '../modules/WeddingEdit.module.css';

function WeddingEdit() {
  const { jobsFounded } = useContext(MyContext);
  const { id } = useParams();

  const [data, setData] = useState('');
  const [cidade, setCidade] = useState('');
  const [noiva, setNoiva] = useState('');
  const [noivo, setNoivo] = useState('');
  const [imagem, setImagem] = useState('');
  const [localCerimonia, setLocalCerimonia] = useState('');
  const [localRecepcao, setLocalRecepcao] = useState('');
  const [primeiroBackupBruto, setPrimeiroBackupBruto] = useState('');
  const [primeiroBackupBrutoTamanho, setPrimeiroBackupBrutoTamanho] = useState('');
  const [segundoBackupBruto, setSegundoBackupBruto] = useState('');
  const [segundoBackupBrutoTamanho, setSegundoBackupBrutoTamanho] = useState('');
  const [primeiroBackup, setPrimeiroBackup] = useState('');
  const [primeiroBackupTamanho, setPrimeiroBackupTamanho] = useState('');
  const [segundoBackup, setSegundoBackup] = useState('');
  const [segundoBackupTamanho, setSegundoBackupTamanho] = useState('');
  const [erro, setErro] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const wedding = jobsFounded.filter((job) => job.id === Number(id))[0];
    setData(wedding.data);
    setCidade(wedding.cidade);
    setNoiva(wedding.noiva);
    setNoivo(wedding.noivo);
    setImagem(wedding.imagem);
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
    const weddingEdited = { data,
      cidade,
      noiva,
      noivo,
      imagem,
      localCerimonia,
      localRecepcao,
      primeiroBackupBruto,
      primeiroBackupBrutoTamanho,
      segundoBackupBruto,
      segundoBackupBrutoTamanho,
      primeiroBackup,
      primeiroBackupTamanho,
      segundoBackup,
      segundoBackupTamanho,
    };
    event.preventDefault();
    const response = await fetch(`http://localhost:3001/casamentos/detalhe/${id}/editar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
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

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Editar casamento" />
      <section className={ styles.main }>
        <form onSubmit={ submitForm } className={ styles.form }>
          <h3>
            { `${noiva} & ${noivo}` }
          </h3>
          <label htmlFor="data">
            <input
              placeholder="Data"
              onChange={ (event) => setData(event.target.value) }
              type="text"
              id="data"
              value={ data }
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
          <label htmlFor="noiva">
            <input
              placeholder="Noiva"
              onChange={ (event) => setNoiva(event.target.value) }
              type="text"
              id="noiva"
              value={ noiva }
            />
          </label>
          <label htmlFor="noivo">
            <input
              placeholder="Noivo"
              onChange={ (event) => setNoivo(event.target.value) }
              type="text"
              id="noivo"
              value={ noivo }
            />
          </label>
          <label htmlFor="imagem">
            <input
              placeholder="Imagem"
              onChange={ (event) => setImagem(event.target.value) }
              type="upload"
              id="imagem"
              value={ imagem }
            />
          </label>
          <label htmlFor="localCerimonia">
            <input
              placeholder="Local da Cerimônia"
              onChange={ (event) => setLocalCerimonia(event.target.value) }
              type="text"
              id="localCerimonia"
              value={ localCerimonia }
            />
          </label>
          <label htmlFor="localRecepcao">
            <input
              placeholder="Local da Recepção"
              onChange={ (event) => setLocalRecepcao(event.target.value) }
              type="text"
              id="localRecepcao"
              value={ localRecepcao }
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
          >
            Cadastrar
          </button>
        </form>
      </section>
      {
        erro && <p>{ erro }</p>
      }
      {
        message && <p>{ message }</p>
      }
      <Link to="/casamentos"> Retornar para Casamentos</Link>
    </div>
  );
}

export default WeddingEdit;
