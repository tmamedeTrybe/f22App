import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import styles from '../modules/FamilyImage.module.css';

function FamilyImage() {
  const [family, setFamily] = useState('');
  const [image, setImage] = useState({ preview: '', data: '' });
  const [status, setStatus] = useState('');

  const { id } = useParams();

  const { state } = useLocation();

  const disableButton = !image.preview;

  useEffect(() => {
    setFamily(state.job);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', image.data);

    const response = await fetch(`http://localhost:3001/familia/imagem/${id}`, {
      method: 'POST',
      body: formData,
    });

    if (response) setStatus(response.statusText);
  };

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Foto do evento" />
      <main className={ styles.main }>
        <h1>{family.nome}</h1>
        <h2>{family.categoria}</h2>
        <form className={ styles.form } onSubmit={ handleSubmit }>
          <span>
            <input type="file" name="file" onChange={ handleFileChange } />
          </span>
          {image.preview && <img
            alt="Imagem do evento familia"
            src={ image.preview }
            width="240"
            height="160"
          />}
          <button type="submit" disabled={ disableButton }>Enviar foto</button>
        </form>
        {status && <h4>{status}</h4>}
      </main>
      <Link className={ styles.link } to="/familia"> Família </Link>
    </div>
  );
}

export default FamilyImage;
