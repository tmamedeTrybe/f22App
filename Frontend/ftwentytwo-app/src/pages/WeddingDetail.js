/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-tag-location */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import MyContext from '../context/myContext';
import HeaderLogo from '../components/HeaderLogo';
import styles from '../modules/WeddingDetail.module.css';
import icon from '../assets/images/casamentos/wedding-icon.jpg';
import BackupCard from '../components/BackupCard';

function WeddingDetail() {
  const [wedding, setWedding] = useState('');
  const { filterJob } = useContext(MyContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    setWedding(filterJob(id));
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
      <Link className={ styles.WeddingsLink } to="/casamentos"> Casamentos </Link>
      {
        message ? <p>{ message }</p>
          : <main className={ styles.main }>
            <section className={ styles.headerDetails }>
              <h1>{`${wedding.noiva} & ${wedding.noivo}`}</h1>
              <p>
                { wedding.data }
              </p>
              <img alt="foto do casamento" src={ icon } width="200px" />
              <button
                onClick={ () => navigate(`/casamentos/imagem/${id}`) }
                width="10px"
              >
                <FaCamera size="20px" color="rgba(0, 0, 0, 0.6)" />
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
              <section>
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
                onClick={ () => navigate(`/casamentos/detalhe/${id}/editar`) }
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
