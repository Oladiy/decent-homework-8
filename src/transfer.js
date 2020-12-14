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

const token = new web3.eth.Contract(ContractMeta.ABI, contractAddress);

const myAddress = "0x277071ADA51DF484D2f87Ee02D559453A39ae5ca";

app.get('/', async (request, response) => {
    let balance;
    let totalSupply;

    await token.methods.balanceOf(myAddress).call((err, res) => {
        if (err) {
            console.log("An error occurred", err);
        } else {
            balance = res;
        }
    });

    await token.methods.totalSupply().call((err, res) => {
        if (err) {
            console.log("An error occurred", err);
        } else {
            totalSupply = res;
        }
    });

    if (totalSupply && balance) {
        response.send(`The balance is ${balance}. The total supply is ${totalSupply}`);
    }
});

const server = app.listen(5002, () => {
    const port = server.address().port;

    console.log(`Server is running at localhost:${port}`);
});
