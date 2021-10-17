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
  				propietarioByIdPropietario(idPropietario: ${params.editarPropietario}) {
  				  nombre
  				  codTipoId
  				  correo
  				  direccion
  				  idPredio
  				  idPropietario
					telefono
					tipoDocumentoByCodTipoId {
      					tipoId
    				}
  				}
			}
        `,
  });
  return {
    props: {
      propietario: data.propietarioByIdPropietario
    },
  };
};



export default function editarPredio({ propietario }) {
  const router = useRouter();
  const [form] = Form.useForm();

  var codTipoId = 0;
  const onFill = () => {
    form.setFieldsValue({
      tipoId: propietario.tipoDocumentoByCodTipoId.tipoId,
      telefono: propietario.telefono,
      correo: propietario.correo,
      direccion: propietario.direccion
    });
  }
  const onGenderChange = (value) => {

    if (value === 'NIT') {
      codTipoId = 1
    } else if (value === 'CC') {
      codTipoId = 2
    } else if (value === 'TI') {
      codTipoId = 3
    } else if (value === 'registro civil') {
      codTipoId = 4
    }
  };

  const onFinish = (values) => {
    values.idPredio = parseInt(values.idPredio, 10);

    axios_.post("http://localhost:3200/graphql", {
      query: `mutation MyQuery {
				updatePropietarioByIdPropietario(
				  input: {
					propietarioPatch: {
					  codTipoId: ${codTipoId}, 
					  correo: "${values.correo}", 
					  direccion: "${values.direccion}", 
					  telefono: "${values.telefono}"}, 
					  idPropietario: ${propietario.idPropietario}}
				) {
				  propietario {
					idPredio
				  }
				}
			  }`
    })
    router.push(`/propietario/${propietario.idPropietario}`)
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
    Form.Item name = "tipoId"
    label = "Tipo de documento"
    rules = {
      [{
        required: true,
      }, ]
    } >
    <
    Select placeholder = "Seleccione el tipo de documento"
    onChange = { onGenderChange }
    allowClear >
    <
    Option value = "NIT" > NIT < /Option> <
    Option value = "CC" > CC < /Option> <
    Option value = "TI" > TI < /Option> <
    Option value = "registro civil" > Registro civil < /Option> <
    /Select> <
    /Form.Item> <
    Form.Item name = "telefono"
    label = "Telefono"
    rules = {
      [{ required: true, }, ] } >
    <
    Input / >
    <
    /Form.Item> <
    Form.Item name = "correo"
    label = "Correo" >
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
    htmlType = "submit"
    shape = "round"
    size = "large" >
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