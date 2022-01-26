-- BASE DE DATOS DESACTUALIZADA, NO FUNCIONAL CON RESTO DEL PROYECTO

create table predio(
    id_predio INTEGER NOT NULL UNIQUE,
    propietario INTEGER NOT NULL,
    terreno INTEGER,
    construccion INTEGER NOT NULL,
    PRIMARY KEY (id_predio)
);

CREATE TABLE propietario(
    id_predio INTEGER NOT NULL UNIQUE,
    id_propietario INTEGER NOT NULL UNIQUE,
    cod_tipo_id INTEGER NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    telefono INTEGER NOT NULL,
    direccion VARCHAR(20) NOT NULL,
    correo VARCHAR(20),
    PRIMARY KEY (id_propietario),
    FOREIGN KEY (cod_tipo_id) REFERENCES tipo_documento(cod_tipo_id)
);

CREATE TABLE terreno(
    cod_terreno INTEGER NOT NULL,
    id_predio INTEGER NOT NULL UNIQUE,
    cod_tipo_terreno INTEGER NOT NULL,
    area integer NOT NULL,
    construccion BOOLEAN,
    valor_comercial INTEGER NOT NULL,
    cercanias BOOLEAN, 
    PRIMARY KEY (cod_terreno),
    FOREIGN KEY (cod_tipo_terreno) REFERENCES tipo_terreno(cod_tipo_terreno)
);

CREATE TABLE construccion(
    cod_construccion INTEGER NOT NULL,
    id_predio INTEGER NOT NULL UNIQUE,
    cod_tipo_construccion INTEGER NOT NULL,
    num_pisos INTEGER NOT NULL,
    area_total INTEGER NOT NULL,
    direccion VARCHAR(20) NOT NULL,
    PRIMARY KEY (cod_construccion),
    FOREIGN KEY (cod_tipo_construccion) REFERENCES tipo_construccion(cod_tipo_construccion)
);

CREATE TABLE tipo_documento(
    cod_tipo_id INTEGER NOT NULL,
    tipo_id VARCHAR(10) NOT NULL,
    PRIMARY KEY (cod_tipo_id)
);

CREATE TABLE tipo_terreno(
    cod_tipo_terreno INTEGER NOT NULL,
    tipo_terreno VARCHAR(10) NOT NULL,
    PRIMARY KEY (cod_tipo_terreno)
);

CREATE TABLE tipo_construccion(
    cod_tipo_construccion  INTEGER NOT NULL,
    tipo_iconstruccion VARCHAR(10) NOT NULL,
    PRIMARY KEY (cod_tipo_construccion)
);

