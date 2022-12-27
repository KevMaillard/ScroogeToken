const path = require('path');
const fs = require('fs');
const solc = require('solc');
const { dirname } = require('path');

const scroogeTokenPath = path.resolve(__dirname, 'contract', 'ScroogeToken.sol');
const source = fs.readFileSync(scroogeTokenPath, 'utf-8');

var input = {
    language: 'Solidity',
    sources: {
        'ScroogeToken.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
var contract = output.contracts['ScroogeToken.sol']['ScroogeToken'];

var dirName = 'bin';
const contractByCodePath = path.join(dirName, 'ScroogeToken.bin');
fs.writeFileSync(contractByCodePath, contract.evm.bytecode.object);

const contractAbiPath = path.join(dirName, 'ScroogeToken.abi');
fs.writeFileSync(contractAbiPath, JSON.stringify(contract.abi));
