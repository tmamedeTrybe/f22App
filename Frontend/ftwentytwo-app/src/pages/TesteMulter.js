/* eslint-disable no-restricted-syntax */
import { useRef } from 'react';

function TesteMulter() {
  const filesElement = useRef(null);

  const sendFile = async () => {
    const res = await fetch('http://localhost:3001/casamentos/imagem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filesElement.current.files[0]),
    });
    const data = await res.json();
    console.log(data);
    console.log(filesElement.current.files[0], 'files element');
  };

  return (
    <div>
      <input type="file" name="file" multiple ref={ filesElement } />
      <button onClick={ sendFile }>Mandar arquivo</button>
    </div>
  );
}

export default TesteMulter;
