import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MyContext from '../context/myContext';

function WeddingImage() {
  const [wedding, setWedding] = useState('');
  const [image, setImage] = useState({ preview: '', data: '' });
  const [status, setStatus] = useState('');

  const { filterJob } = useContext(MyContext);
  const { id } = useParams();

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

    const response = await fetch(`http://localhost:3001/casamentos/imagem/${id}`, {
      method: 'POST',
      body: formData,
    });

    if (response) setStatus(response.statusText);
  };

  useEffect(() => {
    setWedding(filterJob(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>
        {`${wedding.noiva} & ${wedding.noivo}`}
      </h1>
      {image.preview && <img
        alt="Imagem do casamento"
        src={ image.preview }
        width="120"
        height="90"
      />}
      <hr />
      <form onSubmit={ handleSubmit }>
        <input type="file" name="file" onChange={ handleFileChange } />
        <button type="submit">Submit</button>
      </form>
      {status && <h4>{status}</h4>}
      <Link to="/casamentos"> Casamentos</Link>
    </div>
  );
}

export default WeddingImage;
