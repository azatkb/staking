import Web3 from 'web3';
import config from './config';
import { ContractAby, ContractAddress } from "./erc20";

const Tx = require('ethereumjs-tx').Transaction;

export const Transfer =(account, quantity)=>{
    return new Promise((resolve, reject)=>{

        const provider = new Web3.providers.HttpProvider(config.infura);
        let web3 = new Web3(provider);
        const ownerAddress = config.ownerAddress;
    
        const privateKey = Buffer.from(config.privateKey, 'hex');
        const contract = new web3.eth.Contract(ContractAby, ContractAddress, { from: ownerAddress });
        const amount = web3.utils.toHex(web3.utils.toWei(quantity.toString(), "ether"));
        
        web3.eth.getTransactionCount(ownerAddress).then((count) => {
        
            let rawTransaction = {
                'from': ownerAddress,
                'gasPrice': web3.utils.toHex(20 * 1e9),
                'gasLimit': web3.utils.toHex(210000),
                'to': ContractAddress,
                'value': 0x0,
                'data': contract.methods.transfer(account, amount).encodeABI(),
                'nonce': web3.utils.toHex(count)
            };
        
            let transaction = new Tx(rawTransaction, { chain: config.chain });
            transaction.sign(privateKey);
            web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
            .on('receipt', function(receipt){
                 resolve(receipt)           
            }).on('error', function(error){
                 reject(error);          
            });

        });
    });
}

export const TransferERC20 =(account, web3, quantity, erc20Address)=>{
    return new Promise((resolve, reject)=>{
        
        const ownerAddress = config.ownerAddress;
        const contract = new web3.eth.Contract(ContractAby, erc20Address, { from: account });
        const amount = web3.utils.toHex(web3.utils.toWei(quantity.toString(), "ether"));
        
        web3.eth.getTransactionCount(account).then((count) => {
        
            let rawTransaction = {
                'from': account,
                'gasPrice': web3.utils.toHex(20 * 1e9),
                'gasLimit': web3.utils.toHex(210000),
                'to': erc20Address,
                'value': 0x0,
                'data': contract.methods.transfer(ownerAddress, amount).encodeABI()
            };
    
            web3.eth.sendTransaction(rawTransaction)
            .on('receipt', function(receipt){
                 resolve(receipt)           
            }).on('error', function(error){
                 reject(error);          
            });
        });
    });
}

export default Transfer;