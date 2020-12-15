const express = require('express');
const ContractMeta = require('./ContractMeta');
const Web3 = require('web3');

const app = express();

// Создаем проект на INFURA
// И устанавливаем соединение в тестовой сети, указав ссылку на созданный проект
const ethNetwork = 'https://rinkeby.infura.io/v3/d9de371c7d034cf49143cc1aee3aa97c';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

// Задаем адрес задеплоенного контракта
const contractAddress = ContractMeta.Address;
const ABI = ContractMeta.ABI;

const token = new web3.eth.Contract(ABI, contractAddress);
const myAddress = '0x277071ADA51DF484D2f87Ee02D559453A39ae5ca';

app.get('/', async (request, response) => {
    response.sendFile(__dirname + '/templates/' + 'index.html');
});

app.get('/get_balance/', async (request, response) => {
    let balance = null;

    await token.methods.balanceOf(myAddress).call((err, res) => {
        if (err) {
            console.log(err);
            response.send(`Failed to get balance.`);
            return;
        }
        balance = res;
    });

    response.send(`The balance is ${balance}.`);
});

app.get('/get_total_supply/', async (request, response) => {
    let totalSupply = null;

    await token.methods.totalSupply().call((err, res) => {
        if (err) {
            console.log(err);
            response.send(`Failed to get total supply.`);
            return;
        }
        totalSupply = res;
    })

    response.send(`The total supply is ${totalSupply}.`);
});

const server = app.listen(5002, () => {
    const port = server.address().port;

    console.log(`Server is running at localhost:${port}`);
});
