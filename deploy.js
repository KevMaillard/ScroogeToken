const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const path = require('path');
const fs = require('fs');
const { exit } = require('process');

const provider = new HDWalletProvider(
    'diesel master machine move bring differ host axis into cotton urban wash',
    'https://goerli.infura.io/v3/d9787853d156452ab96d78d2a85a9c31'
);

const web3 = new Web3(provider);

const abiPath = path.resolve(__dirname, 'bin', 'ScroogeToken.abi');
const abi = fs.readFileSync(abiPath, 'utf-8');

const byteCodePath = path.resolve(__dirname, 'bin', 'ScroogeToken.bin');
const bytecode = fs.readFileSync(byteCodePath, 'utf-8');

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account ", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(abi))
        .deploy({data: bytecode})
        .send({from: accounts[0], gas: '1000000'});
    console.log("Contract deployed to ", result.options.address);
    exit(0);
}

deploy();