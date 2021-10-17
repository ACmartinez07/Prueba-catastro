/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import { Form, Input, Button, Select } from 'antd';
import styles from '../../../styles/Home.module.css'
import 'antd/dist/antd.css';
const axios_ = require('axios');
import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";



const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const { Option } = Select;

export async function getServerSideProps({ params }) {
  const client = new ApolloClient({
    uri: "http://localhost:3200/graphql",
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql `
            query MyQuery {
                terrenoByIdTerreno(idTerreno: ${params.editarTerreno}) {
                  area
                  cercaniaAgua
                  codTipoTerreno
                  construccion
                  idPredio
                  idTerreno
                  valorComercial
                }
            }
        `,
  });
  return {
    props: {
      terreno: data.terrenoByIdTerreno
    },
  };
};



export default function editarPredio({ terreno }) {
  const router = useRouter();
  const [form] = Form.useForm();

  var codTipoTer = 0;
  const onFill = () => {
    form.setFieldsValue({
      area: terreno.area,
      cercaniaAgua: terreno.cercaniaAgua,
      construccion: terreno.construccion,
      valorComercial: terreno.valorComercial,
    });
  }
  const onGenderChange = (value) => {

    if (value === 'rural') {
      codTipoTer = 1
    } else if (value === 'urbano') {
      codTipoTer = 2
    }
  };

  const onFinish = (values) => {
    values.idPredio = parseInt(values.idPredio, 10);

    axios_.post("http://localhost:3200/graphql", {
      query: `mutation MyQuery {
                updateTerrenoByIdTerreno(
                  input: {
                      terrenoPatch: {
                          area: ${terreno.area}, 
                          cercaniaAgua: ${terreno.cercaniaAgua}, 
                          codTipoTerreno: ${codTipoTer}, 
                          construccion: ${terreno.construccion}, 
                          valorComercial: ${terreno.valorComercial}}, 
                          idTerreno: ${terreno.idTerreno}}
                ) {
                  terreno {
                    idTerreno
                  }
                }
              }`
    })
    router.push(`/predio/${terreno.idPredio}`)
  };
  onFill()

  return ( <
    div >
    <
    Layout > < /Layout> <
    div className = { styles.main } >
    <
    Form {...layout }
    form = { form }
    onFinish = { onFinish } >
    <
    Form.Item name = "tipoTerreno"
    label = "Tipo de terreno"
    rules = {
      [{
        required: true,
      }, ]
    } >
    <
    Select placeholder = "Seleccione el tipo de terreno"
    onChange = { onGenderChange }
    allowClear >
    <
    Option value = "urbano" > Urbano < /Option> <
    Option value = "rural" > Rural < /Option> <
    /Select> <
    /Form.Item> <
    Form.Item name = "area"
    label = "Area"
    rules = {
      [{ required: true, }, ] } >
    <
    Input / >
    <
    /Form.Item> <
    Form.Item name = "valorComercial"
    label = "Valor comercial" >
    <
    Input / >
    <
    /Form.Item> <
    Form.Item name = "cercaniaAgua"
    label = "¿Se encuentra cerca a una fuente de agua?"
    rules = {
      [{ required: true, }, ] } >
    <
    Input / >
    <
    /Form.Item> <
    Form.Item name = "construccion"
    label = "¿Tiene alguna construccion?"
    rules = {
      [{ required: true, }, ] } >
    <
    Input / >
    <
    /Form.Item> <
    Form.Item {...tailLayout } >
    <
    Button type = "primary"
    htmlType = "submit" >
    Aceptar <
    /Button> <
    /Form.Item> <
    /Form>		 <
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