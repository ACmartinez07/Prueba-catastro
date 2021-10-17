const express = require("express");
const { postgraphile } = require("postgraphile");
const cors = require('cors');
const app = express();

const options = {
  origin: '*',
};

app.use(cors(options));

app.use(
  postgraphile(
    process.env.DATABASE_URL ||
    "postgres://postgres:canela3108@localhost:5432/Catastro",
    "public", {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
    }
  )
);

app.listen(process.env.PORT || 3200);