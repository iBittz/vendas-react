import React from 'react';
import style from './Titulo.module.css';

const Titulo = ({ titulo }) => {
  return <h1 className={style.titulo}>{titulo}</h1>;
};

export default Titulo;
