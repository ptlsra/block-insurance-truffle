#!/bin/bash
ipAddress=$SYSTEM_IP
node getContractConfig.js $ipAddress
echo "ContractConfig.js updated"


node updateConfig $ipAddress 5001 $ipAddress 27017 5051 $ipAddress 23002 
 
echo "config.js updated"



echo "starting syncQuotes.js with forever"
#node chainInsuranceAPI.js 


#nohup node syncQuotes.js > syncQuotes.log &

forever start syncQuotes.js


echo "starting blockInsuranceAPI.js with forever"

node blockInsuranceAPI.js


#nohup node blockInsuranceAPI.js  > blockInsuranceAPI.log &


#node blockInsuranceAPI.js 
