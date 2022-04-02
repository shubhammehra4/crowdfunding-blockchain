require("dotenv").config();

const express = require("express");
const {Company, sequelize } = require("./db");
const utility = require('./util');

const CreateCompany = require('./createCompany');
const GetCompanies = require('./getCompanies');

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server up and running machaenge");
});

app.post('/company', async (req, res) => {

    const createCompany = new CreateCompany(utility, Company);
    let {company_name, ceo, description, contract_address, owner_address, website, goal, minimum_contribution, deadline} = req.body;
    let [err, result] = await utility.invoker(createCompany.register(company_name,description, owner_address, contract_address, ceo, website, goal, minimum_contribution, deadline));
    if(err)
    {
        return res.status(500).send(err.message);
    }
    res.status(200).send(result);
});


app.get("/company", async (req, res)=> {

    const getCompanies = new GetCompanies(utility,Company);
    let {owner_address} = req.query;
    let [err, result] = await utility.invoker(getCompanies.getCompany(owner_address));
    if(err) {
        return res.status(500).send(err.message);
    }

    return res.status(200).json(result);
});

async function main() {
  await sequelize.sync();

  app.listen(3000, function () {
    console.log("Server started on port 3000");
  });
}
main();

module.exports = main;