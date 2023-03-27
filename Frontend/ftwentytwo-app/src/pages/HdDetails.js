/* eslint-disable max-len */
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
  console.log(hd);

  return (
    <div className={ styles.container }>
      <HeaderLogo title="HD Details" />
      {
        deleteMessage ? <p>{ deleteMessage }</p>
          : <main className={ styles.main }>
            <section className={ styles.infos }>
              <h2>{`HD ${hd.name} - ${hd.label}`}</h2>
              <p>{`Capacidade - ${hd.capacity}GB`}</p>
              <p>{`Usados - ${hd.used}GB`}</p>
              <p>{`Espaço disponível - ${hd.available}GB`}</p>
            </section>
            <WeddingsByHd hd={ hd } />
            <section>
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
      <Link to="/hds">Back to HDs</Link>
    </div>
  );
}

export default HdDetails;
