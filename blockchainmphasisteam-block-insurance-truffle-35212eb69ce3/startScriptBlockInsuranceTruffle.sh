#!/bin/bash

mongodbIp=$MONGODB_IP
mongodbPort=$MONGODB_PORT
ipfsIp=$IPFS_IP
ipfsPort=$IPFS_PORT
appPort=$APP_PORT
rpcIp=$RPC_IP
rpcPort=$RPC_PORT

node updateConfig.js $ipfsIp $ipfsPort $mongodbIp $mongodbPort $appPort $rpcIp $rpcPort |& tee -a /api-logs/block-insurance-api.log

echo "config.js updated"


if [ -f "/data/contractConfig.json" ]
then
    echo "contractConfig.json found."
        
    echo "copying contractConfig.json to : `${pwd}`"
    cp /data/contractConfig.json .

    echo "Starting API"
    node blockInsuranceAPI.js |& tee -a /api-logs/block-insurance-api.log

else

    echo "contractConfig.json not found."

    echo "Dropping all old databases"
    node deleteDatabase.js

    
    cp contractConfig.json /data/

    echo "Registering "
    node registerBlockIns.js |& tee -a /api-logs/block-insurance-api.log

    echo "Starting api"
    node blockInsuranceAPI.js |& tee -a /api-logs/block-insurance-api.log
fi





