/* eslint-disable max-lines */
import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import styles from '../modules/FamilyEdit.module.css';

function FamilyEdit() {
  const { id } = useParams();
  const { state } = useLocation();

  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');
  const [nome, setNome] = useState('');
  const [contratante, setContratante] = useState('');
  const [local, setLocal] = useState('');
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
    const family = state.job;
    setData(family.data);
    setCategoria(family.categoria);
    setNome(family.nome);
    setContratante(family.contratante);
    setLocal(family.local);
    setPrimeiroBackupBruto(family.primeiroBackupBruto);
    setPrimeiroBackupBrutoTamanho(family.primeiroBackupBrutoTamanho);
    setSegundoBackupBruto(family.segundoBackupBruto);
    setSegundoBackupBrutoTamanho(family.segundoBackupBrutoTamanho);
    setPrimeiroBackup(family.primeiroBackup);
    setPrimeiroBackupTamanho(family.primeiroBackupTamanho);
    setSegundoBackup(family.segundoBackup);
    setSegundoBackupTamanho(family.segundoBackupTamanho);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = async (event) => {
    const familyEdited = {
      data,
      categoria,
      nome,
      contratante,
      local,
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
    const response = await fetch(`http://localhost:3001/familia/detalhe/${id}/editar`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(familyEdited),
    });
    const familyData = await response.json();

    if (familyData.erro) {
      setErro(familyData.erro);
    } else {
      setMessage(familyData.message);
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
      <HeaderLogo title="Editar evento Família" />
      <Link className={ styles.weddings } to="/familia"> Família</Link>
      <main className={ styles.main }>
        <h3>{ nome }</h3>
        <h2>{ categoria }</h2>
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
          <label htmlFor="categoria">
            Categoria
            <input
              onFocus={ () => setCategoria('') }
              placeholder="categoria"
              onChange={ (event) => setCategoria(event.target.value) }
              type="text"
              id="categoria"
              value={ categoria }
            />
          </label>
          <label htmlFor="nome">
            Nome
            <input
              onFocus={ () => setNome('') }
              placeholder="nome"
              onChange={ (event) => setNome(event.target.value) }
              type="text"
              id="nome"
              value={ nome }
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

export default FamilyEdit;
