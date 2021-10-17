/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'
import Layout from '../../components/layout';
import { Button, Card } from 'antd';
import 'antd/dist/antd.css';
const axios_ = require('axios');
import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";

export async function getServerSideProps({ params }) {
  const client = new ApolloClient({
    uri: "http://localhost:3200/graphql",
    cache: new InMemoryCache()
  });
  const { data } = await client.query({
    query: gql `
            query MyQuery {
                propietarioByIdPropietario(idPropietario: ${params.idPropietario}) {
                  idPredio
                  direccion
                  correo
                  idPropietario
                  nombre
                  telefono
                  tipoDocumentoByCodTipoId {
                    tipoId
                  }
                }
            }
        `,
  });
  console.log("data", data);

  return {
    props: {
      propietario: data.propietarioByIdPropietario,
    },
  };

};



export default function propietario({ propietario }) {
  const router = useRouter();

  const deletePropietario = (event) => {
    event.preventDefault()

    axios_.post("http://localhost:3200/graphql", {
      query: `mutation MyMutation {
                    deletePropietarioByIdPropietario(input: {idPropietario: ${propietario.idPropietario}}) {
                        propietario {
                            idPropietario
                        }
                    }
                }`
    }).catch((error) => {
      console.log(error);
    })
    router.push(`../predio/${propietario.idPredio}`)
  }
  return ( <
    div >
    <
    Layout > < /Layout> <
    div className = { styles.main } >
    <
    h2 > Informacion Propietario del predio < /h2> <
    p className = { styles.code } >
    <
    code className = { styles.color } > numero predial: { propietario.idPredio } < /code> <
    /p> <
    /div>


    <
    Card title = "Informacion del Propietario"
    style = {
      { width: 500 } } >
    <
    p > Nombre: { propietario.nombre } < /p> <
    p > Telefono: { propietario.telefono } < /p> <
    p > Direccion: { propietario.direccion } < /p> <
    p > Correo: { propietario.correo } < /p> <
    p > Num Documento: { propietario.idPropietario } < /p> <
    p > Id predio: { propietario.idPredio } < /p> <
    p > Tipo de documento: { propietario.tipoDocumentoByCodTipoId.tipoId } < /p> <
    /Card>

    <
    Button type = "primary"
    shape = "round"
    href = { `/propietario/editar/${propietario.idPropietario}` }
    size = "large" > Editar propietario < /Button> <
    Button type = "danger"
    shape = "round"
    onClick = {
      (e) => { deletePropietario(e) } }
    size = "large" > Eliminar propietario < /Button>

    <
    div className = { styles.description } >
    <
    Button type = "danger"
    shape = "round"
    href = { `../predio/${propietario.idPredio}` }
    size = "large" > Regresar < /Button> <
    /div> <
    /div>
  )
}

export async function getServerSidePaths() {
  const paths = params
  return {
    paths,
    fallback: true
  }
}