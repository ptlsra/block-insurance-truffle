$(document).ready(function(){

	 var tempLists=[];
	 var dataSets=[];
	 //localStorage.setItem("insuranceAddress1", "0x145cbdf9150d3df5ed9f1314bec978800949b7a5");
     var insAdd=localStorage.getItem("insuranceAddress2");
    /*
     var ipAdd=localStorage.getItem("ipAdd");
     var port=localStorage.getItem("port");
     */
     
     var insuranceAddress2=contract();
		// alert(insuranceAddress2);
		 localStorage.setItem("insuranceAddress2", insuranceAddress2);
	     var insAdd2=localStorage.getItem("insuranceAddress2");
	     //var ipAdd="54.214.155.180";
	     var ipAdd=ipAddress();
	     //var ipAdd="52.53.156.228";
	   //  var port="5000";
	     var port=portNo();
	     
	     //var ipAddIpfs="54.213.12.204";
	     //var ipAddIpfs="52.52.172.203";
	     var ipAddIpfs=ipfsIpAddress();
	    // var ipAdd="172.21.80.81";
	    // var port="5010";
	     //var ipAddIpfs="172.21.80.81";
	     localStorage.setItem("ipAdd", ipAdd);
	     localStorage.setItem("ipAddIpfs", ipAddIpfs);
	     localStorage.setItem("port", port);
     
     
     $.get("/getTransactionsForInsurance?insuranceAddress="+insAdd, function(response){
    	// alert(JSON.stringify(response));
    	 $.each(response, function(i, item) {
    		 
    		 	var timeValue=item.dateTime.toString().slice(0,-9);
    			
				 var unixtimestamp = timeValue;

				 // Months array
				 var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

				 // Convert timestamp to milliseconds
				 var date = new Date(unixtimestamp*1000);

				 // Year
				 var year = date.getFullYear();

				 // Month
				 var month = months_arr[date.getMonth()];

				 // Day
				 var day = date.getDate();

				 // Hours
				 var hours = date.getHours();

				 // Minutes
				 var minutes = "0" + date.getMinutes();

				 // Seconds
				 var seconds = "0" + date.getSeconds();

				 // Display date time in MM-dd-yyyy h:m:s format
				 var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
				 
				// document.getElementById('datetime').innerHTML = convdataTime;
				var desc=item.description;
				 var replacedDesc = desc.split('_').join(' ');
				
				 
				tempLists.push(i+1,'<a title="'+ item.transactionId+'"href=#?'+item.transactionId+ '>'+item.transactionId.substr(0, 20)+'....',convdataTime,item.customerName,replacedDesc);
				
			dataSets.push(tempLists);
			tempLists=[];
				
			//alert(dataSet);		               
			 			        	
		});
			//$('#res').dataTable();

	//alert(dataSet);
	$('#pendingRequestTx').DataTable( {
		data: dataSets,
		columns: [
			 { title: "SNo" },
		    { title: "Transcation Id" },
		    {title: "TimeStamp "},
		    {title:"Customer"},
		    {title: "Description"}
		    
		    
		    
		    
		    

		  
		]
		} );
    } );
    
    
    });
