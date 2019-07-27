$(document).ready(function(){

	 var tempLists=[];
	 var dataSets=[];
	// localStorage.setItem("insuranceAddress2", "0x6dbda41ae36bac602a147a34b6889705e6ed12be");
	 /*
	 localStorage.setItem("insuranceAddress2", "0xef7a4febcb6e2b6d5b7141c40f4192fb692deffc");
	 
     var insAdd=localStorage.getItem("insuranceAddress2");
    // var ipAdd="54.214.155.180";
     var ipAdd="52.53.156.228";
     var port="5000";
     localStorage.setItem("ipAdd", ipAdd);
     localStorage.setItem("port", port);
     
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
       $.get("/getInsuranceCompanyPolicies?insuranceAddress="+insAdd, function(response){
    // alert(JSON.stringify(response));
 			$.each(response.message, function(i, item) {
 				
 				 var Name3=item.name;
 				 var Name4=Name3.charAt(0).toUpperCase() + Name3.slice(1);
 				 var replaced = Name4.split('_').join(' ');
 				//alert(JSON.stringify(item));
 				//alert(JSON.stringify(response.message[0]));
 				
				//tempLists.push(i,item.requestId,item.requestBy,item.status,'<a  href=LoanRequestApproval?'+item.requestId+'> View Details',"");
 				
 				//tempLists.push(i,item.,item.craft,item.name,'<a  href=LoanRequestApproval?'+item.craft+'> View Details',"");
 				if(item.status=="pending_ins_approval"){
 				tempLists.push(i+1,replaced,item.policyId,'Approve Request','<a  href=QuoteDetail.html?insuranceAddress='+insAdd+'&policyId='+item.policyId+'&name='+Name4+'> View ');

				dataSets.push(tempLists);
				tempLists=[];
 				}
 				
 				
 				if(item.status=="quote_approved_ins"){
 	 				tempLists.push(i+1,replaced,item.policyId,'Request Approved','<a  href=QuoteDetailApproved.html?insuranceAddress='+insAdd+'&policyId='+item.policyId+'&name='+Name4+'> View ');

 					dataSets.push(tempLists);
 					tempLists=[];
 	 				}
 				
 				if(item.portfolioStatus=="customer_quote_approved"){
 	 	 			//	tempLists.push(i,item.loanId,'Bank Verification Pending','Tax docs Uploaded ','Please Wait');
 	 	 				tempLists.push(i+1,replaced,item.loanId,'Request Approved','Property Details Pending','Please Wait');
 	 					dataSets.push(tempLists);
 	 					tempLists=[];
 	 	 				}
 				
 				
 				if(item.status=="property_details_uploaded"){
 	 				tempLists.push(i+1,replaced,item.policyId,'Verify Property Details','<a  href=PropertyQuote.html?insuranceAddress='+insAdd+'&policyId='+item.policyId+'&name='+Name4+'> View ');

 					dataSets.push(tempLists);
 					tempLists=[];
 	 				}
				//alert(dataSet);		               
				 			        	
 				if(item.status=="ins_completed"){
 	 				tempLists.push(i+1,replaced,item.policyId,'Insurance Approved','<a  href=PropertyQuoteVerifed.html?insuranceAddress='+insAdd+'&policyId='+item.policyId+'&name='+Name4+'> View ');

 					dataSets.push(tempLists);
 					tempLists=[];
 	 				}
 				
		        	
 				if(item.status=="quote_approved_customer"){
 	 				tempLists.push(i+1,replaced,item.policyId,'Wait For Property Docs','<a  href=QuoteDetailApproved.html?insuranceAddress='+insAdd+'&policyId='+item.policyId+'&name='+Name4+'> View ');

 					dataSets.push(tempLists);
 					tempLists=[];
 	 				}
 				
 				
 				
			});
				//$('#res').dataTable();

		//alert(dataSet);
		$('#pendingRequest3').DataTable( {
			data: dataSets,
			columns: [
				 { title: "SNo" },
				 { title: "Name" },
			    { title: "Request Id" },
			    {title :"Status"},
			    {title :"Action "}
			    
			    
			    
			    

			  
			]
    		} );
        } );
        
        
        });
