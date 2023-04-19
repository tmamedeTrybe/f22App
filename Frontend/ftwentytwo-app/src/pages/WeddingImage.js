import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MyContext from '../context/myContext';

function WeddingImage() {
  const [wedding, setWedding] = useState('');
  const [message, setMessage] = useState('');
  const { jobsFounded } = useContext(MyContext);
  const { id } = useParams();

  useEffect(() => {
    const weddingFilter = jobsFounded.find((job) => job.id === Number(id));
    setWedding(weddingFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendFile = async () => {
    // event.preventDefault();

    // const photoName = `${wedding.noiva}_${wedding.noivo}.jpg`;

    // const response = await fetch(`http://localhost:3001/casamentos/imagem/${id}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(photoName),
    // });
    // const data = await response.json();
    // console.log(data);
    setMessage('Sucesso!');
  };

  return (
    <div>
      <main>
        <h1>{`${wedding.noiva} & ${wedding.noivo}`}</h1>
        <form
          action={ `http://localhost:3001/casamentos/imagem/${id}` }
          method="post"
          encType="multipart/form-data"
          // onSubmit={ sendFile }
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
