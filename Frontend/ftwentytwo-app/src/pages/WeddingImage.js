// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import MyContext from '../context/myContext';

// function WeddingImage() {
//   const [wedding, setWedding] = useState('');
//   const [message, setMessage] = useState('');
//   // const [image, setImage] = useState('');
//   const { jobsFounded } = useContext(MyContext);
//   const { id } = useParams();

//   useEffect(() => {
//     const weddingFilter = jobsFounded.find((job) => job.id === Number(id));
//     setWedding(weddingFilter);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const sendFile = async () => {
//     setMessage('Imagem incluída com sucesso!');
//   };

//   return (
//     <div>
//       <main>
//         <h1>{`${wedding.noiva} & ${wedding.noivo}`}</h1>
//         <form
//           action={ `http://localhost:3001/casamentos/imagem/${id}` }
//           method="post"
//           encType="multipart/form-data"
//         >
//           <input
//             type="file"
//             name="imagem"
//           />
//           <button onClick={ sendFile } type="submit">Salvar Imagem</button>
//         </form>
//         {
//           message && <p>{ message }</p>
//         }
//       </main>
//       <Link to="/casamentos"> Weddings</Link>
//     </div>
//   );
// }

// export default WeddingImage;

import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MyContext from '../context/myContext';

// const IMAGE_SIZE = 150;
// const IMAGE_QUALITY = 60;

function WeddingImage() {
  const [wedding, setWedding] = useState('');
  // const [image, setImage] = useState('');
  // const [urlImage, setUrlImage] = useState('');
  // const [erro, setErro] = useState('');
  // const [message, setMessage] = useState('');
  const { filterJob } = useContext(MyContext);
  const { id } = useParams();

  useEffect(() => {
    setWedding(filterJob(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const resize = async (url) => {
  //   const imageResized = await Jimp.read(url, (err, photo) => {
  //     if (err) throw err;

  //     photo
  //       .resize(IMAGE_SIZE, IMAGE_SIZE)
  //       .quality(IMAGE_QUALITY)
  //       .write(`${wedding.id}.jpg`);
  //   });
  //   // const imageResized = img.getBase64(Jimp.MIME_JPEG);
  //   // console.log(imageResized, 'xxxxxx');
  //   // imageResized.writeAsync(`${wedding.id}.jpg`);
  //   setImage(imageResized);
  // };

  // const saveImage = async () => {
  //   // setImage(urlImage);

  //   resize('../assets/images/casamentos/wedding-icon.jpg');

  //   console.log(image, 'AO SALVAR IMAGEM');

  //   const response = await fetch(`http://localhost:3001/casamentos/imagem/${id}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ image }),
  //   });
  //   const imageData = await response.json();

  //   if (imageData.erro) {
  //     setErro(imageData.erro);
  //   } else {
  //     setErro('');
  //     setMessage(imageData.message);
  //   }
  // };

  return (
    <div>
      <h1>
        {`${wedding.noiva} & ${wedding.noivo}`}
      </h1>
      <form
        action={ `http://localhost:3001/casamentos/imagem/${id}` }
        method="post"
        encType="multipart/form-data"
      >
        <input
          type="file"
          name="imagem"
        />
        <button type="submit">Salvar Imagem</button>
      </form>
      {/* {
        erro && <p>{ erro }</p>
      } */}
      {/* {
        message && <p>{ message }</p>
      } */}
      <Link to="/casamentos"> Weddings</Link>
    </div>
  );
}

export default WeddingImage;
