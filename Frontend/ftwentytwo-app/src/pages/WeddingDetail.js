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
  console.log(jobsFounded, 'array que vem do context');
  const navigate = useNavigate();

  useEffect(() => {
    const weddingFilter = jobsFounded.filter((job) => job.id === Number(id));
    setWedding(weddingFilter[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Informações" />
      <main className={ styles.main }>
        <section>
          <h1>{`${wedding.noiva} & ${wedding.noivo}`}</h1>
          <img alt="foto do casamento" src={ image } width="200px" />
        </section>
        <section className={ styles.infos }>
          <p>{ `Cidade = ${wedding.cidade}` }</p>
          <p>{ `Data = ${wedding.data}` }</p>
          <p>{ `Primeiro backup = HD${wedding.primeiroBackup} - ${wedding.primeiroBackupTamanho}GB` }</p>
          <p>{ `Segundo backup = HD${wedding.segundoBackup}- ${wedding.segundoBackupTamanho}GB` }</p>
          <p>{ `Cerimônia = ${wedding.localCerimonia}` }</p>
          <p>{ `Recepção = ${wedding.localRecepcao}` }</p>
        </section>
        <section>
          <button
            onClick={ () => navigate(`/casamentos/detalhe/${id}/editar`) }
          >
            Editar casamento
          </button>
        </section>
      </main>
    </div>
  );
}

export default WeddingDetail;
