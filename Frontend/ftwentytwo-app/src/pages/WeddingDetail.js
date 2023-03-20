/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyContext from '../context/myContext';
import HeaderLogo from '../components/HeaderLogo';
import image from '../assets/images/casamentos/Ana_Mateus.jpg';
import styles from '../modules/WeddingDetail.module.css';

function WeddingDetail() {
  const [wedding, setWedding] = useState('');
  const { jobsFounded } = useContext(MyContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const weddingFilter = jobsFounded.filter((job) => job.id === Number(id));
    setWedding(weddingFilter[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Informações" />
      {
        message ? <p>{ message }</p>
          : <main className={ styles.main }>
            <section>
              <h1>{`${wedding.noiva} & ${wedding.noivo}`}</h1>
              <img alt="foto do casamento" src={ image } width="200px" />
            </section>
            <section className={ styles.infos }>
              <p>{ `Data = ${wedding.data}` }</p>
              <p>{ `Cidade = ${wedding.cidade}` }</p>
              <p>{ `Cerimônia = ${wedding.localCerimonia}` }</p>
              <p>{ `Recepção = ${wedding.localRecepcao}` }</p>
              <p>{ `Primeiro backup Bruto = ${wedding.primeiroBackupBruto} - ${wedding.primeiroBackupBrutoTamanho}GB` }</p>
              <p>{ `Primeiro backup Bruto = ${wedding.segundoBackupBruto} - ${wedding.segundoBackupBrutoTamanho}GB` }</p>
              <p>{ `Primeiro backup = HD${wedding.primeiroBackup} - ${wedding.primeiroBackupTamanho}GB` }</p>
              <p>{ `Segundo backup = HD${wedding.segundoBackup} - ${wedding.segundoBackupTamanho}GB` }</p>
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

    </div>
  );
}

export default WeddingDetail;
