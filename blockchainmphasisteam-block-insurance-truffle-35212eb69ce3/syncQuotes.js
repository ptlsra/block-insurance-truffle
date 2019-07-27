var fs = require("fs");
var Web3 = require('web3-quorum');
var MongoClient = require('mongodb').MongoClient;
//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:35002"));



let configRawData1 = fs.readFileSync('./config.json');
let configData1 = JSON.parse(configRawData1);
var web3 = new Web3(new Web3.providers.HttpProvider(configData1.web3Provider));


//reading abi from file
var source = fs.readFileSync("Mortgage.json");
var contracts = JSON.parse(source)["contracts"];
var abi = JSON.parse(contracts["Mortgage.sol:Mortgage"].abi);


var insurance_source = fs.readFileSync("MortgageInsurance.json");
var insurance_contract = JSON.parse(insurance_source)["contracts"];
var insurance_abi = JSON.parse(insurance_contract["MortgageInsurance.sol:MortgageInsurance"].abi);


let rawdata = fs.readFileSync('./contractConfig.json');
let contractsData = JSON.parse(rawdata);
console.log(JSON.stringify(contractsData));

var contractAddress = contractsData.mortgageContract;
var insuranceContractAddress = contractsData.mortgageInsuranceContract;


// get deployed contract abi from contract address;
const deployedContract = web3.eth.contract(abi).at(String(contractAddress));
const insuranceContractDeplyed = web3.eth.contract(insurance_abi).at(String(insuranceContractAddress));


let configRawData = fs.readFileSync('config.json');
let configData = JSON.parse(configRawData);


var insuranceAccountAddress = configData.insuranceWalletAddress;
var mortgageQuotesDBUrl = "mongodb://localhost:27017/block_mortgage_quotes";
var mortgageQuoteDB;

MongoClient.connect(mortgageQuotesDBUrl, function (err, mortgageQuoteDBTemp) {
        mortgageQuoteDB = mortgageQuoteDBTemp;
});
/**
*       Sync with blockchain run with setTimeInterval
*/


function syncCustomerQuoteList() {
        console.log("syncing proces started");
        console.log("************************ get customer quote request ***********************");

        var insuranceAddress = insuranceAccountAddress;
        var loanIds = (insuranceContractDeplyed['getCustomerRequest'](insuranceAddress));

        console.log("******************** printing loanIds ************************");
        console.log(loanIds);
        var jsonResponse = [];

        for (var index = 0; index < loanIds.length; index++) {
                var length = (deployedContract['getRequestCompaniesLength'](loanIds[index]));
                //console.log("length of insuranceCompanies list : "+length);
                // loop and get quotes of all insurance companies
                var insuranceQuote;
                for (var i = 0; i < length; i++) {

                        var jsonObject = (deployedContract['getQuote'](loanIds[index], i));
                        if (insuranceAddress == jsonObject[0]) {
                                var quote_message;
                                if (jsonObject[1] == "") {
                                        quote_message = "pending";
                                } else {
                                        quote_message = jsonObject[1];
                                }

                                insuranceQuote = quote_message;
                                break;
                        }
                }

                var portfolioObject = (deployedContract['getPortfolioProperty'](loanIds[index]));
                var customerObject = (deployedContract['getCustomer'](portfolioObject[3]));
                var statusObject = (deployedContract['getPortfolioStatus'](loanIds[index]));
                var quoteStatus = deployedContract['getRequestQuote'](loanIds[index]);
                //make database record and perform upsert operation
                var query = { loanId: (loanIds[index]).toNumber() };
                var obj = { loanId: (loanIds[index]).toNumber(), name: customerObject[1], customerAddress: portfolioObject[3], portfolioStatus: statusObject[1], quoteStatus: insuranceQuote, message: statusObject[2], status: quoteStatus[1], approvedBy: quoteStatus[2], appliedInsurance: quoteStatus[3] };

                mortgageQuoteDB.collection("quotes").update(query, obj, { upsert: true }, function (err, doc) {
                        if (err) throw err;
                        console.log("Record inserted/updated ..");
                })
        }
}


setInterval(function () {
        console.log("******************* Syncing customer quote List ***************************");
        syncCustomerQuoteList();

}, 10000);

