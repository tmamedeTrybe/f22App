/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import styles from '../modules/FamilyImage.module.css';

function GastronomyImage() {
  const [gastronomy, setGastronomy] = useState('');
  const [image, setImage] = useState({ preview: '', data: '' });
  const [status, setStatus] = useState('');

  const { id } = useParams();
  const { state } = useLocation();

  const disableButton = !image.preview;

  useEffect(() => {
    setGastronomy(state.job);
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

    const response = await fetch(`http://localhost:3001/gastronomy/imagem/${id}`, {
      method: 'POST',
      body: formData,
    });

    if (response) setStatus(response.statusText);
  };

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Foto do evento" />
      <main className={ styles.main }>
        <h1>{gastronomy.empresa}</h1>
        <h2>{gastronomy.evento}</h2>
        <form className={ styles.form } onSubmit={ handleSubmit }>
          <span>
            <input type="file" name="file" onChange={ handleFileChange } />
          </span>
          {image.preview && <img
            alt="Imagem do evento corporativo"
            src={ image.preview }
            width="240"
            height="160"
          />}
          <button type="submit" disabled={ disableButton }>Enviar foto</button>
        </form>
        {status && <h4>{status}</h4>}
      </main>
      <Link className={ styles.link } to="/gastronomia"> Gastronomia </Link>
    </div>
  );
}

export default GastronomyImage;
