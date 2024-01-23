/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import HeaderLogo from '../components/HeaderLogo';
import Loading from '../components/Loading';
import icon from '../assets/images/gastronomy/gastronomy-icon.jpg';
import BackupCard from '../components/BackupCard';
import styles from '../modules/JobDetail.module.css';

function GastronomyDetail() {
  const [gastronomy, setGastronomy] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    setGastronomy(state.job);
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteGastronomy = async () => {
    const response = await fetch(`http://localhost:3001/gastronomy/detalhe/${id}`, {
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
      <Link className={ styles.jobLink } to="/gastronomia">Gastronomia</Link>
      {
        message ? <section className={ styles.message }>
          <p>{ message }</p>
                  </section>
          : loading ? <Loading /> : <main className={ styles.main }>
            <section className={ styles.headerDetails }>
              <h1>{ gastronomy.empresa }</h1>
              <h2>{ gastronomy.evento }</h2>
              <p>{ gastronomy.data }</p>
              <img
                alt="Foto do evento"
                width="200px"
                src={ gastronomy.imagem === null || gastronomy.imagem === undefined
              ? icon
            : require(`../assets/images/gastronomy/${id}.jpg`) }
              />
              <button
                onClick={ () => navigate(`/gastronomia/imagem/${id}`, { state: { job: gastronomy } }) }
                width="10px"
              >
                <FaCamera className={ styles.cameraIcon } size="20px" color="rgba(252, 255, 252, 0.6)" />
              </button>
            </section>
            <section className={ styles.infos }>
              <section className={ styles.venues }>
                <h3>{ gastronomy.cidade }</h3>
              </section>
              <section className={ styles.backupCards }>
              <BackupCard
                hdNumber={ gastronomy.primeiroBackupBruto }
                backupSize={ gastronomy.primeiroBackupBrutoTamanho }
                backup="Primeiro Backup Bruto"
              />
              <BackupCard
                hdNumber={ gastronomy.segundoBackupBruto }
                backupSize={ gastronomy.segundoBackupBrutoTamanho }
                backup="Segundo Backup Bruto"
              />
              <BackupCard
                hdNumber={ gastronomy.primeiroBackup }
                backupSize={ gastronomy.primeiroBackupTamanho }
                backup="Primeiro Backup Editado"
              />
              <BackupCard
                hdNumber={ gastronomy.segundoBackup }
                backupSize={ gastronomy.segundoBackupTamanho }
                backup="Segundo Backup Editado"
              />
              </section>
            </section>
            <section className={ styles.buttons }>
              <button
                onClick={ () => navigate(`/gastronomia/detalhe/${id}/editar`, { state: { job: gastronomy } }) }
              >
                Editar
              </button>
              <button
                onClick={ deleteGastronomy }
              >
                Deletar
              </button>
            </section>

                                    </main>
      }
    </div>
  );
}

export default GastronomyDetail;
