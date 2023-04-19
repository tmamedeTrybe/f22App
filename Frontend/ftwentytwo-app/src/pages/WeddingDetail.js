/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable max-len */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MyContext from '../context/myContext';
import HeaderLogo from '../components/HeaderLogo';
import styles from '../modules/WeddingDetail.module.css';

function WeddingDetail() {
  const [wedding, setWedding] = useState('');
  const { jobsFounded } = useContext(MyContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const weddingFilter = jobsFounded.find((job) => job.id === Number(id));
    setWedding(weddingFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(async () => {
    const img = await require(`../assets/images/casamentos/${wedding.imagem}`);
    setImage(img);
  }, [wedding]);

  const deleteWedding = async () => {
    const response = await fetch(`http://localhost:3001/casamentos/detalhe/${id}/editar`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setMessage(data.message);
  };

  // eslint-disable-next-line import/no-dynamic-require
  // const img = require(`../assets/images/casamentos/${wedding.noiva}_${wedding.noivo}.jpg`);

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Informações" />
      {
        message ? <p>{ message }</p>
          : <main className={ styles.main }>
            <section>
              <h1>{`${wedding.noiva} & ${wedding.noivo}`}</h1>
              <img alt="foto do casamento" src={ image } width="200px" />
              <button
                onClick={ () => navigate(`/casamentos/imagem/${id}`) }
              >
                Incluir foto
              </button>
            </section>
            <section className={ styles.infos }>
              <p>{ `Data = ${wedding.data}` }</p>
              <p>{ `Cidade = ${wedding.cidade}` }</p>
              <p>{ `Cerimônia = ${wedding.localCerimonia}` }</p>
              <p>{ `Recepção = ${wedding.localRecepcao}` }</p>
              <p>{ wedding.primeiroBackupBruto == null ? 'Sem Primeiro Backup Bruto' : `Primeiro Backup Bruto = HD${wedding.primeiroBackupBruto} - ${wedding.primeiroBackupBrutoTamanho}GB`}</p>
              <p>{ wedding.segundoBackupBruto == null ? 'Sem Segundo Backup Bruto' : `Segundo Backup Bruto = HD${wedding.segundoBackupBruto} - ${wedding.segundoBackupBrutoTamanho}GB`}</p>
              <p>{ wedding.primeiroBackup == null ? 'Sem Primeiro Backup Editado' : `Primeiro Backup Editado = HD${wedding.primeiroBackup} - ${wedding.primeiroBackupTamanho}GB`}</p>
              <p>{ wedding.segundoBackup == null ? 'Sem Segundo Backup Editado' : `Segundo Backup Editado = HD${wedding.segundoBackup} - ${wedding.segundoBackupTamanho}GB`}</p>
            </section>
            <section>
              <button
                onClick={ () => navigate(`/casamentos/detalhe/${id}/editar`) }
              >
                Editar casamento
              </button>
              <button
                onClick={ deleteWedding }
              >
                Deletar casamento
              </button>
            </section>
          </main>
      }
      <Link to="/casamentos"> Weddings</Link>

    </div>
  );
}

export default WeddingDetail;
