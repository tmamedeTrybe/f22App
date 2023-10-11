import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import styles from '../modules/WeddingImage.module.css';

function WeddingImage() {
  const [wedding, setWedding] = useState('');
  const [image, setImage] = useState({ preview: '', data: '' });
  const [status, setStatus] = useState('');

  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    setWedding(state.job);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const disableButton = !image.preview;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', image.data);

    const response = await fetch(`http://localhost:3001/casamentos/imagem/${id}`, {
      method: 'POST',
      body: formData,
    });

    if (response) setStatus(response.statusText);
  };

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Foto do casamento" />
      <main className={ styles.main }>
        <h1>
          {`${wedding.noiva} & ${wedding.noivo}`}
        </h1>
        <form className={ styles.form } onSubmit={ handleSubmit }>
          <span>
            <input type="file" name="file" onChange={ handleFileChange } />
          </span>
          {image.preview && <img
            alt="Imagem do casamento"
            src={ image.preview }
            width="240"
            height="160"
          />}
          <button type="submit" disabled={ disableButton }>Enviar foto</button>
        </form>
        {status && <h4>{status}</h4>}
      </main>
      <Link className={ styles.WeddingsLink } to="/casamentos"> Casamentos </Link>
    </div>
  );
}

export default WeddingImage;
