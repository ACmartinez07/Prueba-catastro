/* eslint-disable react-hooks/rules-of-hooks */
import styles from '../../styles/Home.module.css'
import React, { useState } from "react";
import Layout from '../../components/layout';
import { Button } from 'antd';
import 'antd/dist/antd.css';
const axios_ = require('axios');

export default function crearConstruccion() {

  const [idConstruccion, setidConstruccion] = useState('');
  const [idPredio, setidPredio] = useState('');
  const [codTipoConstruccion, setcodTipoConstruccion] = useState('');
  const [numPisos, setnumPisos] = useState('');
  const [areaTotal, setareaTotal] = useState('');
  const [direccion, setdireccion] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()

    let construccion = {
      idConstruccion,
      codTipoConstruccion,
      numPisos,
      areaTotal,
      idPredio,
      direccion
    }
    construccion.idConstruccion = parseInt(construccion.idConstruccion, 10);
    axios_.post("http://localhost:3200/graphql", {
      query: `mutation mutate{
                createConstruccion(
                    input: {construccion: {
                        idConstruccion: ${construccion.idConstruccion}, 
                        idPredio: ${construccion.idPredio}, 
                        codTipoConstruccion: ${construccion.codTipoConstruccion}, 
                        numPisos: ${construccion.numPisos}, 
                        areaTotal: ${construccion.areaTotal}, 
                        direccion: "${construccion.d}"}}
                  ) {
                    construccion {
                      idPredio
                    }
                  }
            }`
    }).catch((error) => {
      console.log(error);
    })
  }
  return ( <
    div >
    <
    Layout > < /Layout> <
    h2 className = { styles.title } > Formulario para creacion de construccion < /h2> <
    p className = { styles.description } >
    Por favor diligenciar el siguiente formulario <
    /p> <
    div className = { styles.main2 } >

    <
    form >
    <
    div className = { styles.inputGroup } >
    <
    label > Numero predial < /label> <
    input onChange = {
      (e) => { setidPredio(e.target.value) } }
    /> <
    /div>

    <
    div className = { styles.inputGroup } >
    <
    label > Tipo construccion < /label> <
    input onChange = {
      (e) => { setcodTipoConstruccion(e.target.value) } }
    /> <
    /div>

    <
    div className = { styles.inputGroup } >
    <
    label > Identificacion construccion < /label> <
    input onChange = {
      (e) => { setidConstruccion(e.target.value) } }
    /> <
    /div>

    <
    div className = { styles.inputGroup } >
    <
    label > Numero de pisos < /label> <
    input onChange = {
      (e) => { setnumPisos(e.target.value) } }
    /> <
    /div>

    <
    div className = { styles.inputGroup } >
    <
    label > Area total < /label> <
    input onChange = {
      (e) => { setareaTotal(e.target.value) } }
    /> <
    /div>

    <
    div className = { styles.inputGroup } >
    <
    label > Direccion < /label> <
    input onChange = {
      (e) => { setdireccion(e.target.value) } }
    /> <
    /div>

    <
    Button type = "primary"
    shape = "round"
    onClick = {
      (e) => { handleSubmit(e) } }
    size = "large" > Crear < /Button> <
    Button type = "danger"
    shape = "round"
    href = { `../predio/${idPredio}` }
    size = "large" > Regresar < /Button>

    <
    /form> <
    /div> <
    /div>
  )
}