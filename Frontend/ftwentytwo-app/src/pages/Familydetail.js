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
import icon from '../assets/images/familia/family-icon.jpg';
import BackupCard from '../components/BackupCard';
import styles from '../modules/FamilyDetail.module.css';

function FamilyDetail() {
  const [family, setFamily] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    setFamily(state.job);
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteFamily = async () => {
    const response = await fetch(`http://localhost:3001/familia/detalhe/${id}`, {
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
      <Link className={ styles.WeddingsLink } to="/familia">Família</Link>
      {
        message ? <section className={ styles.message }>
          <p>{ message }</p>
                  </section>
          : loading ? <Loading /> : <main className={ styles.main }>
            <section className={ styles.headerDetails }>
              <h1>{family.nome}</h1>
              <h2>{family.categoria}</h2>
              <p>
                { family.data }
              </p>
              <img
                alt="foto do evento"
                src={ family.imagem === null || family.imagem === undefined
                  ? icon
                  // eslint-disable-next-line global-require
                  : require(`../assets/images/familia/${id}.jpg`) }
                width="200px"
              />
              <button
                onClick={ () => navigate(`/familia/imagem/${id}`) }
                width="10px"
              >
                <FaCamera className={ styles.cameraIcon } size="20px" color="rgba(252, 255, 252, 0.6)" />
              </button>
            </section>
            <section className={ styles.infos }>
              <section className={ styles.venues }>
                <h3>{family.local}</h3>
              </section>
              <section className={ styles.backupCards }>
                <BackupCard
                  hdNumber={ family.primeiroBackupBruto }
                  backupSize={ family.primeiroBackupBrutoTamanho }
                  backup="Primeiro Backup Bruto"
                />
                <BackupCard
                  hdNumber={ family.segundoBackupBruto }
                  backupSize={ family.segundoBackupBrutoTamanho }
                  backup="Segundo Backup Bruto"
                />
                <BackupCard
                  hdNumber={ family.primeiroBackup }
                  backupSize={ family.primeiroBackupTamanho }
                  backup="Primeiro Backup Editado"
                />
                <BackupCard
                  hdNumber={ family.segundoBackup }
                  backupSize={ family.segundoBackupTamanho }
                  backup="Segundo Backup Editado"
                />
              </section>
            </section>
            <section className={ styles.buttons }>
              <button
                onClick={ () => navigate(`/familia/detalhe/${id}/editar`, { state: { job: family } }) }
              >
                Editar
              </button>
              <button
                onClick={ deleteFamily }
              >
                Deletar
              </button>
            </section>
                                    </main>
      }

    </div>
  );
}

export default FamilyDetail;
