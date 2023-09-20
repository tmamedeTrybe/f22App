/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import HeaderLogo from '../components/HeaderLogo';
import Loading from '../components/Loading';
import icon from '../assets/images/corporativo/corporate-icon.jpg';
import BackupCard from '../components/BackupCard';
import styles from '../modules/JobDetail.module.css';

function CorporateDetail() {
  const [corporate, setCorporate] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    setCorporate(state.job);
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteCorporate = async () => {
    const response = await fetch(`http://localhost:3001/corporativo/detalhe/${id}`, {
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
      <Link className={ styles.jobLink } to="/corporativo">Corporativo</Link>
      {
        message ? <section className={ styles.message }>
          <p>{ message }</p>
                  </section>
          : loading ? <Loading /> : <main className={ styles.main }>
            <section className={ styles.headerDetails }>
              <h1>{corporate.empresa}</h1>
              <h2>{corporate.evento}</h2>
              <p>
                { corporate.data }
              </p>
              <img
                alt="foto do evento"
                src={ corporate.imagem === null || corporate.imagem === undefined
                  ? icon
                  // eslint-disable-next-line global-require
                  : require(`../assets/images/corporativo/${id}.jpg`) }
                width="200px"
              />
              <button
                onClick={ () => navigate(`/corporativo/imagem/${id}`) }
                width="10px"
              >
                <FaCamera className={ styles.cameraIcon } size="20px" color="rgba(252, 255, 252, 0.6)" />
              </button>
            </section>
            <section className={ styles.infos }>
              <section className={ styles.venues }>
                <h3>{corporate.cidade}</h3>
              </section>
              <section className={ styles.backupCards }>
                <BackupCard
                  hdNumber={ corporate.primeiroBackupBruto }
                  backupSize={ corporate.primeiroBackupBrutoTamanho }
                  backup="Primeiro Backup Bruto"
                />
                <BackupCard
                  hdNumber={ corporate.segundoBackupBruto }
                  backupSize={ corporate.segundoBackupBrutoTamanho }
                  backup="Segundo Backup Bruto"
                />
                <BackupCard
                  hdNumber={ corporate.primeiroBackup }
                  backupSize={ corporate.primeiroBackupTamanho }
                  backup="Primeiro Backup Editado"
                />
                <BackupCard
                  hdNumber={ corporate.segundoBackup }
                  backupSize={ corporate.segundoBackupTamanho }
                  backup="Segundo Backup Editado"
                />
              </section>
            </section>
            <section className={ styles.buttons }>
              <button
                onClick={ () => navigate(`/corporativo/detalhe/${id}/editar`, { state: { job: corporate } }) }
              >
                Editar
              </button>
              <button
                onClick={ deleteCorporate }
              >
                Deletar
              </button>
            </section>
                                    </main>
      }

    </div>
  );
}

export default CorporateDetail;
