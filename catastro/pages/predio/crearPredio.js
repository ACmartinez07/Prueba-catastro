/* eslint-disable react-hooks/rules-of-hooks */
import styles from '../../styles/Home.module.css'
import React, { useState } from "react";
import Layout from '../../components/layout';
import swal from 'sweetalert';
import { Button } from 'antd';
import 'antd/dist/antd.css';
const axios_ = require('axios');

export default function crearPredio() {

  const [idPredio, setidPredio] = useState('');
  const [avaluo, setavaluo] = useState('');
  const [nombre, setnombre] = useState('');
  const [departamento, setdepartamento] = useState('');
  const [municipio, setmunicipio] = useState('');

  const alert = () => {
    swal({
      title: "Desea crear un propietario con el predio",
      icon: "info",
      allowOutsideClick: false,
      allowEscapeKey: false,
      buttons: ["No", "Si"]
    }).then(result => {
      if (result == "Si") {
        console.log("Si sirve la opcioooooon");
      }
    })
  }


  const handleSubmit = (event) => {

    console.log("Enviando...");

    event.preventDefault()
    let predio = {
      idPredio,
      nombre,
      departamento,
      municipio,
      avaluo
    }
    predio.idPredio = parseInt(predio.idPredio, 10);
    axios_.post("http://localhost:3200/graphql", {
      query: `mutation mutate{
                createPredio(
                    input: {
                        predio: {
                            idPredio: ${predio.idPredio}, 
                            avaluo: "${predio.avaluo}", 
                            nombre: "${predio.nombre}", 
                            municipio: "${predio.municipio}", 
                            departamento: "${predio.departamento}"
                        }
                    }
                ){
                    predio{
                      idPredio
                    }
                  }
            }`
    }).then((res) => {
      Router.push('/');
    }).catch((error) => {
      console.log(predio);
      console.log(error);
    })
    alert();
  }
  return ( <
    div >
    <
    Layout > < /Layout> <
    h2 className = { styles.title } > Formulario para creacion del predio < /h2> <
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
    label > nombre < /label> <
    input onChange = {
      (e) => { setnombre(e.target.value) } }
    id = "GETnombre"
    name = "nombre" / >
    <
    /div>

    <
    div className = { styles.inputGroup } >
    <
    label > Avaluo < /label> <
    input onChange = {
      (e) => { setavaluo(e.target.value) } }
    id = "GETavaluo"
    name = "avaluo" / >
    <
    /div>

    <
    div className = { styles.inputGroup } >
    <
    label > Departamento < /label> <
    input onChange = {
      (e) => { setdepartamento(e.target.value) } }
    id = "GETdepartamento"
    name = "departamento" / >
    <
    /div>

    <
    div className = { styles.inputGroup } >
    <
    label > Municipio < /label> <
    input onChange = {
      (e) => { setmunicipio(e.target.value) } }
    id = "GETmunicipio"
    name = "municipio" / >
    <
    /div>

    <
    Button type = "primary"
    shape = "round"
    onClick = {
      (e) => { handleSubmit(e) } }
    size = "large" > Crear < /Button> <
    Button type = "danger"
    shape = "round"
    href = "/"
    size = "large" > Regresar < /Button>

    <
    /form> <
    /div> <
    /div>
  )

}