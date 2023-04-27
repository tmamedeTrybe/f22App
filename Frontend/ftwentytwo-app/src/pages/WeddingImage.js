import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MyContext from '../context/myContext';

function WeddingImage() {
  const [wedding, setWedding] = useState('');
  const [message, setMessage] = useState('');
  // const [image, setImage] = useState('');
  const { jobsFounded } = useContext(MyContext);
  const { id } = useParams();

  useEffect(() => {
    const weddingFilter = jobsFounded.find((job) => job.id === Number(id));
    setWedding(weddingFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendFile = async () => {
    setMessage('Imagem incluída com sucesso!');
  };

  return (
    <div>
      <main>
        <h1>{`${wedding.noiva} & ${wedding.noivo}`}</h1>
        <form
          action={ `http://localhost:3001/casamentos/imagem/${id}` }
          method="post"
          encType="multipart/form-data"
        >
          <input
            type="file"
            name="imagem"
          />
          <button onClick={ sendFile } type="submit">Salvar Imagem</button>
        </form>
        {
          message && <p>{ message }</p>
        }
      </main>
      <Link to="/casamentos"> Weddings</Link>
    </div>
  );
}

export default WeddingImage;
