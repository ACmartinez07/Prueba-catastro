/* eslint-disable react-hooks/rules-of-hooks */
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';
import React, { useState } from "react";
import Layout from '../../components/layout';
import { Button } from 'antd';
import 'antd/dist/antd.css';
const axios_ = require('axios');

export default function crearConstruccion() {
  const router = useRouter();

  const [idTerreno, setidTerreno] = useState('');
  const [idPredio, setidPredio] = useState('');
  const [codTipoTerreno, setcodTipoTerreno] = useState('');
  const [area, setarea] = useState('');
  const [construccion, setconstruccion] = useState('');
  const [cercaniaAgua, setcercaniaAgua] = useState('');
  const [valorComercial, setvalorComercial] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()

    let terreno = {
      idTerreno,
      codTipoTerreno,
      area,
      construccion,
      valorComercial,
      idPredio,
      cercaniaAgua
    }
    console.log('este es el terreno', terreno);
    var isTrue = new Boolean(true);
    var isFalse = new Boolean(false);
    var bandera1, bandera2;

    if (cercaniaAgua === 'true') {
      bandera1 = true
    } else {
      bandera1 = false
    }

    if (construccion === 'true') {
      bandera2 = true
    } else {
      bandera2 = false
    }

    console.log("cercania agua", bandera1)
    console.log("construccion", bandera2)

    terreno.idTerreno = parseInt(terreno.idTerreno, 10);
    terreno.area = parseInt(terreno.area, 10);
    terreno.valorComercial = parseInt(terreno.valorComercial, 10);
    terreno.idPredio = parseInt(terreno.idPredio, 10);
    terreno.codTipoTerreno = parseInt(terreno.codTipoTerreno, 10);
    terreno.cercaniaAgua = bandera1;
    terreno.construccion = bandera2;
    console.log('terreno 2', terreno);
    axios_.post("http://localhost:3200/graphql", {
      query: `mutation MyMutation{
             createTerreno(
                input: {terreno: {
                    idTerreno: ${terreno.idTerreno}, 
                    idPredio: ${terreno.idPredio}, 
                    codTipoTerreno: ${terreno.codTipoTerreno}, 
                    area: ${terreno.area}, 
                    valorComercial: ${terreno.valorComercial},
                    cercaniaAgua: ${terreno.cercaniaAgua} , 
                    construccion: ${terreno.construccion}}}
              ) {
                terreno {
                  idPredio
                }
              }
            }`
    }).catch((error) => {
      console.log('error', terreno)
      console.log(error);
    })
    router.push(`/predio/${terreno.idPredio}`)
  }
  return ( <
    div >
    <
    Layout > < /Layout> <
    h2 className = { styles.title } > Formulario para creacion de terreno < /h2> <
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
    label > Tipo terreno < /label> <
    input onChange = {
      (e) => { setcodTipoTerreno(e.target.value) } }
    /> <
    /div>

    <
    div className = { styles.inputGroup } >
    <
    label > Identificacion terreno < /label> <
    input onChange = {
      (e) => { setidTerreno(e.target.value) } }
    /> <
    /div>

    <
    div className = { styles.inputGroup } >
    <
    label > Area < /label> <
    input onChange = {
      (e) => { setarea(e.target.value) } }
    /> <
    /div>

    <
    div className = { styles.inputGroup } >
    <
    label > Valor comercial < /label> <
    input onChange = {
      (e) => { setvalorComercial(e.target.value) } }
    /> <
    /div>

    <
    div className = { styles.inputGroup } >
    <
    label > ¿Tiene construccion ? < /label> <
    input onChange = {
      (e) => { setconstruccion(e.target.value) } }
    /> <
    /div>

    <
    div className = { styles.inputGroup } >
    <
    label > ¿Se encuentra cerca a una fuente de agua ? < /label> <
    input onChange = {
      (e) => { setcercaniaAgua(e.target.value) } }
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
    href = { `/` }
    size = "large" > Regresar < /Button>

    <
    /form> <
    /div> <
    /div>
  )
}