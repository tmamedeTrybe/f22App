/* eslint-disable no-magic-numbers */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import HeaderLogo from '../components/HeaderLogo';
import styles from '../modules/JobDetail.module.css';
import icon from '../assets/images/casamentos/wedding-icon.jpg';
import BackupCard from '../components/BackupCard';
import Loading from '../components/Loading';

function WeddingDetail() {
  const [wedding, setWedding] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const { state } = useLocation();

  useEffect(() => {
    setWedding(state.job);
    setLoading(false);
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
      <Link className={ styles.jobLink } to="/casamentos"> Casamentos </Link>
      {
        message ? <section className={ styles.message }>
          <p>{ message }</p>
        </section>
          : loading ? <Loading /> : <main className={ styles.main }>
            <section className={ styles.headerDetails }>
              <h1>{`${wedding.noiva} & ${wedding.noivo}`}</h1>
              <p>
                { wedding.data }
              </p>
              <img
                alt="foto do casamento"
                src={ wedding.imagem === null || wedding.imagem === undefined
                  ? icon
                  : require(`../assets/images/casamentos/${id}.jpg`) }
                width="200px"
              />
              <button
                onClick={ () => navigate(`/casamentos/imagem/${id}`) }
                width="10px"
              >
                <FaCamera className={ styles.cameraIcon } size="20px" color="rgba(252, 255, 252, 0.6)" />
              </button>
            </section>
            <section className={ styles.infos }>
              <section className={ styles.venues }>
                <h3>{wedding.cidade}</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Cerimônia</th>
                      <th>Recepção</th>
                    </tr>
                  </thead>
                  <tbody>
                    <td>{wedding.localCerimonia}</td>
                    <td>{wedding.localRecepcao}</td>
                  </tbody>
                </table>
              </section>
              <section className={ styles.backupCards }>
                <BackupCard
                  hdNumber={ wedding.primeiroBackupBruto }
                  backupSize={ wedding.primeiroBackupBrutoTamanho }
                  backup="Primeiro Backup Bruto"
                />
                <BackupCard
                  hdNumber={ wedding.segundoBackupBruto }
                  backupSize={ wedding.segundoBackupBrutoTamanho }
                  backup="Segundo Backup Bruto"
                />
                <BackupCard
                  hdNumber={ wedding.primeiroBackup }
                  backupSize={ wedding.primeiroBackupTamanho }
                  backup="Primeiro Backup Editado"
                />
                <BackupCard
                  hdNumber={ wedding.segundoBackup }
                  backupSize={ wedding.segundoBackupTamanho }
                  backup="Segundo Backup Editado"
                />
              </section>

            </section>
            <section className={ styles.buttons }>
              <button
                onClick={ () => navigate(`/casamentos/detalhe/${id}/editar`, { state: { job: wedding } }) }
              >
                Editar
              </button>
              <button
                onClick={ deleteWedding }
              >
                Deletar
              </button>
            </section>
          </main>
      }
    </div>
  );
}

export default WeddingDetail;
