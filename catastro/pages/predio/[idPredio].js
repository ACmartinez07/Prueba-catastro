/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'
import Layout from '../../components/layout';
import swal from 'sweetalert';
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
                predioByIdPredio(idPredio: ${params.idPredio}) {
                    avaluo
                    departamento
                    idPredio
                    municipio
                    nombre
                    propietariosByIdPredio {
                        nodes {
                          nombre
                          idPropietario
                          telefono
                          direccion
                          correo
                          tipoDocumentoByCodTipoId {
                            tipoId
                          }
                        }
                    }
                    construccionsByIdPredio {
                        nodes {
                          idConstruccion
                          numPisos
                          areaTotal
                          direccion
                          tipoConstruccionByCodTipoConstruccion {
                            tipoConstruccion
                          }
                        }
                    }
                    terrenosByIdPredio {
                        nodes {
                          tipoTerrenoByCodTipoTerreno {
                            tipoTerreno
                          }
                          area
                          cercaniaAgua
                          construccion
                          idTerreno
                        }
                    }
                }
            }
        `,
  });

  return {
    props: {
      predio: data.predioByIdPredio,
      propietario: data.predioByIdPredio.propietariosByIdPredio.nodes,
      terreno: data.predioByIdPredio.terrenosByIdPredio.nodes,
      construccion: data.predioByIdPredio.construccionsByIdPredio.nodes
    },
  };

};

export default function predio({ predio, propietario, terreno, construccion }) {
  const router = useRouter();
  console.log(router);
  let idProp = 0,
    idTer = 0,
    idCons = 0;

  {
    propietario.map(({ idPropietario }) => (
      idProp = idPropietario
    ))
  } {
    terreno.map(({ idTerreno }) => (
      idTer = idTerreno
    ))
  } {
    construccion.map(({ idConstruccion }) => (
      idCons = idConstruccion
    ))
  }

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

  console.log(idTer)

  const solicitudTerreno = (event) => {
    event.preventDefault()
    console.log(idTer);
    if (idTer != 0) {
      swal({
        title: "Ya existe un terreno, no puede agrrgar mas",
        icon: "warning",
        timer: 2000
      })
    } else {
      router.push('../terreno/crearTerreno')
    }

  }

  const deletePredio = (event) => {
    event.preventDefault()
    axios_.post("http://localhost:3200/graphql", {
      query: `mutation MyMutation {
                deletePropietarioByIdPropietario(input: {idPropietario: ${idProp}}) {
                  propietario {
                    idPropietario
                  }
                }
                deleteTerrenoByIdTerreno(input: {idTerreno: ${idTer}}) {
                  terreno {
                    idTerreno
                  }
                }
                deleteConstruccionByIdConstruccion(input: {idConstruccion: ${idCons}}) {
                  construccion {
                    idConstruccion
                  }
                }
                deletePredioByIdPredio(input: {idPredio: ${predio.idPredio}}) {
                  predio {
                    idPredio
                  }
                }
              }`
    }).catch((error) => {
      console.log(error);
    })
    router.push('/')
  }

  const deleteConstruccion = (event) => {
    event.preventDefault()
    console.log(idCons);
    if (idCons === 0) {
      swal({
        title: "No existe ningun terreno, no hay nada por eliminar",
        icon: "warning",
        timer: 2000
      })
    } else {
      console.log(construccion.idConstruccion);
      axios_.post("http://localhost:3200/graphql", {
        query: `mutation MyMutation {
                deleteConstruccionByIdConstruccion(input: {idConstruccion: ${idCons}}) {
                  construccion {
                    idConstruccion
                  }
                }
              }`
      }).catch((error) => {
        console.log(error);
      })

      router.push(`/predio/${predio.idPredio}`)
    }
  }

  return ( <
      div >
      <
      Layout > < /Layout> <
      div className = { styles.main } >
      <
      h2 className = { styles.title } > Detalles del predio < /h2> <
      div className = { styles.description } >
      <
      Button type = "primary"
      shape = "round"
      href = { `/predio/editar/${predio.idPredio}` }
      size = "large" > Editar predio < /Button> <
      Button type = "primary"
      shape = "round"
      href = "/propietario/crearPropietario"
      size = "large" > Añadir propietario < /Button> <
      Button type = "primary"
      shape = "round"
      href = "/construccion/crearConstruccion"
      size = "large" > Añadir construccion < /Button> <
      Button type = "primary"
      shape = "round"
      onClick = {
        (e) => solicitudTerreno(e) }
      size = "large" > Añadir terreno < /Button> <
      /div> <
      div className = { styles.description } >
      <
      Button type = "danger"
      shape = "round"
      onClick = {
        (e) => { deletePredio(e) } }
      size = "large" > Eliminar predio < /Button> <
      Button type = "danger"
      shape = "round"
      onClick = {
        (e) => { deleteConstruccion(e) } }
      size = "large" > Eliminar construccion < /Button> <
      /div> <
      div className = { styles.grid } >
      <
      Card title = "Informacion del propietario"
      style = {
        { width: 300 } } >
      <
      h2 > { predio.nombre } < /h2> <
      p > < strong > Id predio: < /strong>{predio.idPredio}</p >
      <
      p > < strong > Departamento: < /strong>{predio.departamento}</p >
      <
      p > < strong > Municipio: < /strong>{predio.municipio}</p >
      <
      p > < strong > Avaluo: < /strong>{predio.avaluo}</p >
      <
      /Card>    

      {
        predio.propietariosByIdPredio.nodes.map(({
            nombre,
            idPropietario,
            telefono,
            direccion,
            correo,
            tipoDocumentoByCodTipoId
          }) => ( <
            Card title = "Informacion del propietario"
            extra = { < a href = { `../propietario/${idPropietario}` } > Mas < /a>}style={{ width: 300 }}> <
              h2 > { nombre } < /h2> <
              p > < strong > { tipoDocumentoByCodTipoId.tipoId }: < /strong>{idPropietario}</p >
                <
                p > < strong > Telefono: < /strong>{telefono}</p >
                <
                p > < strong > Direccion: < /strong>{direccion}</p >
                <
                p > < strong > Correo: < /strong>{correo}</p >
                <
                /Card>    
            )
          )
        }

        {
          predio.construccionsByIdPredio.nodes.map(({
              idConstruccion,
              numPisos,
              areaTotal,
              direccionC,
              tipoConstruccionByCodTipoConstruccion
            }) => ( <
              Card title = "Informacion de la Construccion"
              extra = { < a href = { `../construccion/${idConstruccion}` } > Mas < /a>}style={{ width: 300 }}> <
                h2 > { tipoConstruccionByCodTipoConstruccion.tipoConstruccion } < /h2> <
                p > < strong > Id construccion: < /strong>{idConstruccion}</p >
                  <
                  p > < strong > Numero de pisos: < /strong>{numPisos}</p >
                  <
                  p > < strong > Area total: < /strong>{areaTotal}</p >
                  <
                  p > < strong > Direccion: < /strong>{direccionC}</p >
                  <
                  /Card>         
              )
            )
          }

          {
            predio.terrenosByIdPredio.nodes.map(({
                  idTerreno,
                  area,
                  cercaniaAgua,
                  construccion,
                  tipoTerrenoByCodTipoTerreno
                }) => ( <
                  Card title = "Informacion del terreno"
                  extra = { < a href = { `../terreno/${idTerreno}` } > Mas < /a>}style={{ width: 300 }}> <
                    h2 > { tipoTerrenoByCodTipoTerreno.tipoTerreno } < /h2> <
                    p > < strong > Id terreno: < /strong>{idTerreno}</p >
                      <
                      p > < strong > Hay construccion: < /strong>{bandera2}</p >
                      <
                      p > < strong > Area: < /strong>{area}</p >
                      <
                      p > < strong > Se escuentra cerca a una fuente de agua: < /strong>{bandera1}</p >
                      <
                      /Card>               
                  )
                )
              } <
              /div> <
              div className = { styles.description } >
              <
              Button type = "danger"
            shape = "round"
            href = "/"
            size = "large" > Regresar < /Button> <
              /div> <
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