/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'
import Layout from '../../components/layout';
import { Button } from 'antd';
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
                terrenoByIdTerreno(idTerreno: ${params.idTerreno}) {
                  area
                  cercaniaAgua
                  codTipoTerreno
                  construccion
                  idPredio
                  idTerreno
                  valorComercial
                  tipoTerrenoByCodTipoTerreno {
                    tipoTerreno
                  }
                }
            }
        `,
  });
  console.log("data", data);

  return {
    props: {
      terreno: data.terrenoByIdTerreno,
    },
  };

};



export default function propietario({ terreno }) {
  const router = useRouter();
  var bandera1 = "",
    bandera2 = ""
  if (terreno.cercaniaAgua === true) {
    bandera1 = "Si"
  } else {
    bandera1 = "No"
  }

  if (terreno.construccion === true) {
    bandera2 = "Si"
  } else {
    bandera2 = "No"
  }
  console.log(bandera1)

  const deleteTerreno = (event) => {
    event.preventDefault()

    axios_.post("http://localhost:3200/graphql", {
      query: `mutation MyMutation2 {
                    deleteTerrenoByIdTerreno(input: {idTerreno: ${terreno.idTerreno}}) {
                      terreno {
                        idTerreno
                      }
                    }
                  }`
    }).catch((error) => {
      console.log(error);
    })
    router.push(`../predio/${terreno.idPredio}`)
  }
  return ( <
    div >
    <
    Layout > < /Layout> <
    div className = { styles.main } >
    <
    h2 > Informacion terreno del predio < /h2> <
    p className = { styles.code } >
    <
    code className = { styles.color } > numero predial: { terreno.idPredio } < /code> <
    /p> <
    /div> <
    h1 > Identificacion delterreno: { terreno.idTerreno } < /h1> <
    h1 > Id predio: { terreno.idPredio } < /h1> <
    h1 > Tipo terreno: { terreno.tipoTerrenoByCodTipoTerreno.tipoTerreno } < /h1> <
    h1 > Area: { terreno.area } < /h1> <
    h1 > Valor coemrcial: { terreno.valorComercial } < /h1> <
    h1 > ¿Se encuentra cerca a una fuente de agua ? : { bandera1 } < /h1> <
    h1 > ¿Tiene alguna construccion ? : { bandera2 } < /h1>

    <
    Button type = "primary"
    shape = "round"
    href = { `/terreno/editar/${terreno.idTerreno}` }
    size = "large" > Editar terreno < /Button> <
    Button type = "danger"
    shape = "round"
    onClick = {
      (e) => { deleteTerreno(e) } }
    size = "large" > Eliminar terreno < /Button>

    <
    div className = { styles.description } >
    <
    Button type = "danger"
    shape = "round"
    href = { `../predio/${terreno.idPredio}` }
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