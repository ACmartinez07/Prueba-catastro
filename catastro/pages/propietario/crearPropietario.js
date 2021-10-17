/* eslint-disable react-hooks/rules-of-hooks */
import styles from '../../styles/Home.module.css'
import {useRouter} from 'next/router';
import React, { useState } from "react";
import Layout from '../../components/layout';
import swal from 'sweetalert';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import propietario from './[idPropietario]';
const axios_ = require('axios');

export default function crearPropietario() {
    const router = useRouter();

    const [idPropietario, setidPropietario] = useState('');
    const [nombre, setnombre] = useState('');
    const [telefono, settelefono] = useState('');
    const [direccion, setdireccion] = useState('');
    const [correo, setcorreo] = useState('');
    const [codTipoId, setCodTipoId] = useState('');
    const [idPredio, setidPredio] = useState('');
    
    
    //Funcion enviar la peticion a la API de crear el predio
    const handleSubmit = (event) => {
        event.preventDefault()

        let propietario = {
            idPropietario,
            nombre,
            telefono,
            direccion,
            correo,
            codTipoId,
            idPredio
        }
        var tipoID = 0

        if (codTipoId === 'NIT') {
            tipoID = 1
        }else if (codTipoId === 'CC') {
            tipoID = 2
        }else if (codTipoId === 'TI') {
            tipoID = 3
        }else if (codTipoId === 'Registro civil') {
            tipoID = 3
        }

        propietario.idPropietario = parseInt(propietario.idPropietario, 10);
        axios_.post("http://localhost:3200/graphql", {
            query:
             `mutation mutate{
                createPropietario(
                    input: {propietario: {
                        idPredio: ${propietario.idPredio}, 
                        idPropietario: ${propietario.idPropietario}, 
                        codTipoId: ${tipoID}, 
                        nombre: "${propietario.nombre}", 
                        telefono: "${propietario.telefono}", 
                        direccion: "${propietario.direccion}"
                        correo: "${propietario.correo}"}}
                    ){
                    propietario {
                      idPredio
                    }
                  }
            }`
        }).catch((error)=> {
            console.log(propietario);
            console.log(error);
        })
        router.push(`/predio/${propietario.idPredio}` )
    }

    const regresar = (event) => {
        event.preventDefault()
        router.push(`/predio/${propietario.idPredio}` )
    }

    return (
        <div >
            <Layout></Layout>
            <h2 className={styles.title}>Formulario para creacion de propietario</h2>
            <p className={styles.description}>
                Por favor diligenciar el siguiente formulario
            </p>
            <div className={styles.main2}>
            
                <form>
                    <div className={styles.inputGroup}>
                    <label>Numero predial</label>
                    <input onChange={(e)=>{setidPredio(e.target.value)}}/>
                    </div>

                    <div className={styles.inputGroup}>
                    <label>nombre</label>
                    <input onChange={(e)=>{setnombre(e.target.value)}} />
                    </div>

                    <div className={styles.inputGroup}>
                    <label>Tipo de documento</label>
                    <select onChange={(e)=>{setCodTipoId(e.target.value)}}>
                        <option>NIT</option>
                        <option>CC</option>
                        <option>TI</option>
                        <option>Registro civil</option>
                    </select>
                    </div>

                    <div className={styles.inputGroup}>
                    <label>Numero de documento</label>
                    <input onChange={(e)=>{setidPropietario(e.target.value)}} />
                    </div>
                    
                    <div className={styles.inputGroup}>
                    <label>Telefono</label>
                    <input onChange={(e)=>{settelefono(e.target.value)}} />
                    </div>
                    
                    <div className={styles.inputGroup}>
                    <label>Correo</label>
                    <input onChange={(e)=>{setcorreo(e.target.value)}} />
                    </div>
                    
                    <div className={styles.inputGroup}>
                    <label>Direccion</label>
                    <input onChange={(e)=>{setdireccion(e.target.value)}} />
                    </div>
                    
                    <Button type="primary" shape="round" onClick= {(e) => {handleSubmit(e)}} size="large" >Crear</Button>
                    <Button type="danger" shape="round" onClick= {(e) => {regresar(e)}} size="large" >Regresar</Button>
            
                </form>
            </div>
        </div>
    )
}
