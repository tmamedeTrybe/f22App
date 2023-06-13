/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import WeddingsByHd from '../components/WeddingsByHd';
import HdContext from '../context/HdContext';
import styles from '../modules/HdDetails.module.css';

function HdDetails() {
  const [hd, setHd] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const { hdsFounded } = useContext(HdContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const hdFilter = hdsFounded.filter((hdItem) => hdItem.id === Number(id));
    setHd(hdFilter[0]);
  }, []);

  const deleteHd = async () => {
    const hdDeleted = await fetch(`http://localhost:3001/hds/details/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await hdDeleted.json();
    setDeleteMessage(data.message);
  };

  return (
    <div className={ styles.container }>
      <HeaderLogo title="HD Details" />
      {
        deleteMessage ? <p>{ deleteMessage }</p>
          : <main className={ styles.main }>
            <section className={ styles.infos }>
              <h2>{`HD ${hd.name} - ${hd.label}`}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Capacidade</th>
                    <th>Usados</th>
                    <th>Disponível</th>
                  </tr>
                </thead>
                <tbody>
                  <td>{`${hd.capacity}GB`}</td>
                  <td>{`${hd.used}GB`}</td>
                  <td>{`${hd.available}GB`}</td>
                </tbody>
              </table>
            </section>
            <WeddingsByHd hd={ hd } />
            <section className={ styles.changesButtons }>
              <button
                onClick={ () => navigate(`/hds/details/${id}/update`) }
              >
                Editar HD
              </button>
              <button
                onClick={ deleteHd }
              >
                Deletar HD
              </button>
            </section>
          </main>
      }
      <Link className={ styles.hdsLink } to="/hds">Back to HDs</Link>
    </div>
  );
}

export default HdDetails;
