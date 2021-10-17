/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import React, { useState } from "react";
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

export async function getServerSideProps({ params }) {
  const client = new ApolloClient({
    uri: "http://localhost:3200/graphql",
    cache: new InMemoryCache()
  });
  const { data } = await client.query({
    query: gql `
            query MyQuery {
                predioByIdPredio(idPredio: ${params.editarPredio}) {
                    avaluo
                    departamento
                    idPredio
                    municipio
                    nombre
                }
            }
        `,
  });
  console.log(data)
  return {
    props: {
      predio: data.predioByIdPredio,
    },
  };
};



export default function editarPredio({ predio }) {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFill = () => {
    form.setFieldsValue({
      idPredial: predio.idPredio,
      nombre: predio.nombre,
      avaluo: predio.avaluo,
      departamento: predio.departamento,
      municipio: predio.municipio,
    });
  }

  const onFinish = (values) => {
    console.log(values.nombre)

    values.idPredio = parseInt(values.idPredio, 10);

    axios_.post("http://localhost:3200/graphql", {
      query: `mutation MyQuery {
				updatePredioByIdPredio(
				  	input: {
						predioPatch: {
					  		avaluo: "${values.avaluo}", 
					  		departamento: "${values.departamento}", 
					  		municipio: "${values.municipio}", 
					  		nombre: "${values.nombre}"}, 
						idPredio: ${predio.idPredio}
					}
				) {
				  predio {
					idPredio
				  }
				}
			  }`
    })
    router.push(`/predio/${predio.idPredio}`)
  };

  const onReset = () => {
    form.resetFields();
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
    name = "control-hooks"
    onFinish = { onFinish } >
    <
    Form.Item name = "nombre"
    label = "Nombre"
    rules = {
      [{ required: true, }, ] } >
    <
    Input / >
    <
    /Form.Item> <
    Form.Item name = "avaluo"
    label = "Avaluo"
    rules = {
      [{ required: true, }, ] } >
    <
    Input / >
    <
    /Form.Item> <
    Form.Item name = "departamento"
    label = "Departamento"
    rules = {
      [{ required: true, }, ] } >
    <
    Input / >
    <
    /Form.Item> <
    Form.Item name = "municipio"
    label = "Municipio"
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