import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HdContext from '../context/HdContext';
import HeaderLogo from '../components/HeaderLogo';

function HdUpdate() {
  const { hdsFounded } = useContext(HdContext);
  const { id } = useParams();

  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [capacity, setCapacity] = useState('');
  const [used, setUsed] = useState('');
  const [available, setAvailable] = useState('');
  const [erro, setErro] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const hd = hdsFounded.find((hdItem) => hdItem.id === Number(id));
    setName(hd.name);
    setLabel(hd.label);
    setCapacity(hd.capacity);
    setUsed(hd.used);
    setAvailable(hd.available);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = async (event) => {
    const hdUpdate = {
      name,
      label,
      capacity,
      used,
      available,
    };

    event.PreventDefault();
    const response = await fetch(`http://localhost:3001/hds/details/${id}/update`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hdUpdate),
    });
    const hdData = await response.json();
    console.log(hdData, 'resposta do fetch');

    if (hdData.erro) {
      setErro(hdData.erro);
    } else {
      setMessage(hdData.message);
      setErro('');
    }
  };

  return (
    <div>
      <HeaderLogo title="HD update" />
      <main>
        <form onSubmit={ submitForm }>
          <h3>
            { `HD${name}` }
          </h3>
          <label htmlFor="name">
            <input
              type="text"
              placeholder="Name"
              value={ name }
              id="name"
              onChange={ (event) => setName(event.target.value) }
            />
          </label>
          <label htmlFor="label">
            <input
              type="text"
              placeholder="Label"
              value={ label }
              id="label"
              onChange={ (event) => setLabel(event.target.value) }
            />
          </label>
          <label htmlFor="capacity">
            <input
              type="number"
              placeholder="Capacity"
              value={ capacity }
              id="capacity"
              onChange={ (event) => setCapacity(event.target.value) }
            />
          </label>
          <label htmlFor="used">
            <input
              type="number"
              placeholder="Used"
              value={ used }
              id="used"
              onChange={ (event) => setUsed(event.target.value) }
            />
          </label>
          <label htmlFor="available">
            <input
              type="number"
              placeholder="Available"
              value={ available }
              id="available"
              onChange={ (event) => setAvailable(event.target.value) }
            />
          </label>
          <button
            type="submit"
          >
            Update HD
          </button>
        </form>
      </main>
      {
        erro && <p>{ erro }</p>
      }
      {
        message && <p>{ message }</p>
      }
      <Link to="/hds"> Retornar para HDs</Link>
    </div>
  );
}

export default HdUpdate;
