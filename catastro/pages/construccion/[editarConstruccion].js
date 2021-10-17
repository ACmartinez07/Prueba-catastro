/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { Form, Input, Button, Select } from 'antd';
import styles from '../../styles/Home.module.css'
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
                construccionByIdConstruccion(idConstruccion: ${params.editarConstruccion}) {
                  areaTotal
				  codTipoConstruccion
                  direccion
                  idConstruccion
                  idPredio
                  numPisos
                }
            }
        `,
  });
  return {
    props: {
      construccion: data.construccionByIdConstruccion
    },
  };
};



export default function editarPredio({ construccion }) {
  const router = useRouter();
  const [form] = Form.useForm();

  var codTipoCons = 0;
  const onFill = () => {
    form.setFieldsValue({
      numPisos: construccion.numPisos,
      areaTotal: construccion.areaTotal,
      direccion: construccion.direccion,
    });
  }
  const onGenderChange = (value) => {

    if (value === 'industrial') {
      codTipoCons = 1
    } else if (value === 'comercial') {
      codTipoCons = 2
    } else if (value === 'urbano') {
      codTipoCons = 3
    }
  };
  const onFinish = (values) => {
    values.idPredio = parseInt(values.idPredio, 10);

    axios_.post("http://localhost:3200/graphql", {
      query: `mutation MyQuery {
                updateConstruccionByIdConstruccion(
                  input: {
                      construccionPatch: {
                          areaTotal: ${values.areaTotal}, 
                          codTipoConstruccion: ${codTipoCons}, 
                          direccion: "${values.direccion}", 
                          numPisos: ${values.numPisos}}, 
                    idConstruccion: ${construccion.idCostruccion}
                }) {
                  construccion {
                    idConstruccion
                  }
                }
              }`
    })
    router.push(`/predio/${construccion.idPredio}`)
  };

  onFill()
  return ( <
    div >
    <
    Layout / >
    <
    div className = { styles.main } >
    <
    Form {...layout }
    form = { form }
    onFinish = { onFinish } >
    <
    Form.Item name = "tipoId"
    label = "Tipo de documento"
    rules = {
      [{ required: true, }, ] } >
    <
    Select placeholder = "Seleccione el tipo de documento"
    onChange = { onGenderChange } >
    <
    Option value = "industrial" > Industrial < /Option> <
    Option value = "comercial" > Comercial < /Option> <
    Option value = "urbano" > Urbano < /Option> <
    /Select> <
    /Form.Item> <
    Form.Item name = "numPisos"
    label = "Numero de pisos"
    rules = {
      [{ required: true, }, ] } >
    <
    Input / >
    <
    /Form.Item> <
    Form.Item name = "areaTotal"
    label = "Area total"
    rules = {
      [{ required: true, }, ] } >
    <
    Input / >
    <
    /Form.Item> <
    Form.Item name = "direccion"
    label = "Direccion"
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