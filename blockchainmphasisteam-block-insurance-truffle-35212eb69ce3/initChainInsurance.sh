#!/bin/bash
ipAddress=$SYSTEM_IP
node getContractConfig.js $ipAddress
echo "ContractConfig.js updated"


node updateConfig $ipAddress 5001 $ipAddress 27017 5051 $ipAddress 23002 
 
echo "config.js updated"

echo "starting app.js"
node blockInsuranceAPI.js 
