$(document).ready(function(){

	 var tempLists=[];
	 var tempLists2=[];
	 var dataSets=[];
	 var localArrayFor=[];
	 var insuranceAddress2=contract();
	// alert(insuranceAddress2);

     var insAdd2=localStorage.getItem("insAdd");
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
     var flag="unset";
    
     
     //alert(insAdd2);
    
      $.get("/getCustomerQuoteRequest?insuranceAddress="+insAdd2, function(response){
  //  	 alert(JSON.stringify(response.message));
    //	 setTimeout(function(){ 
    	 $.each(response.message, function(i, item) {
    		 
    		 
    		 
    		 if(item.portfolioStatus=="insurance_approval_pending"){
    			 tempLists.push(i+1,item.loanId,item.name,'Approve Customer Request','<a  href=ViewCustomerRequest.html?loanId='+item.loanId+'&walletAddress='+item.customerAddress+'> View and Approve');
        		  dataSets.push(tempLists);
    			  tempLists=[];
	 				}
    		 
    		 if(item.portfolioStatus=="insurance_quote_approved"){
    			 
    			 if(item.quoteStatus=="pending"){
    			 
    				 tempLists.push(i+1,item.loanId,item.name,'Approve Customer Request','<a  href=ViewCustomerRequest.html?loanId='+item.loanId+'&walletAddress='+item.customerAddress+'> View and Approve');
           		  dataSets.push(tempLists);
       			  tempLists=[];
    		
	 				}
    			 else{
    					var n = item.quoteStatus.length; 
 						var substr=item.quoteStatus.substr(19, n); 
 						substr = substr.split('%').join('_');
    				 
        			 tempLists.push(i+1,item.loanId,item.name,'<a  href=ViewApprovedCustomerRequest.html?loanId='+item.loanId+'&walletAddress='+item.customerAddress+'&status=Pending_Customer_Approval&quote='+substr+'> Pending Customer Approval','');
            		  dataSets.push(tempLists);
        			  tempLists=[];
    				 
    			 }
    		 }
    		

    		 if(item.portfolioStatus=="Insurance_approved"){
    				var n = item.quoteStatus.length; 
    				var substr=item.quoteStatus.substr(19, n); 
    				substr = substr.split('%').join('_');
    		    			 
    	
    				 	
    		            	if(item.approvedBy==insAdd2){
        						tempLists2.push("yes");
    			    			 tempLists.push(i+1,item.loanId,item.name,'<a  href=ViewApprovedCustomerRequest.html?loanId='+item.loanId+'&walletAddress='+item.customerAddress+'&status=Policy_Issued&quote='+substr+'> Policy Issued','');
    			        		 dataSets.push(tempLists);
    			        		 tempLists=[];
    			       
    			    			 
        					}
    		            	else{
        						tempLists2.push("no");
        					/*	alert("yes");
        						alert(item.loanId);
        						alert(item.name);*/
        						//alert("yes");
        					tempLists.push(i+1,item.loanId,item.name,'<a  href=ViewApprovedCustomerRequest.html?loanId='+item.loanId+'&walletAddress='+item.customerAddress+'&status=Policy_Rejected&quote='+substr+'> Proposal Rejected','');
        		        		dataSets.push(tempLists);
        		        		tempLists=[];
        		        		
        		        	//	alert(dataSets);
        					}
    		            	
    		            }
    		      
    			
    		 
    		 
    		
    		 
    		 if(item.portfolioStatus=="Loan_Approved"){
 				var n = item.quoteStatus.length; 
 				var substr=item.quoteStatus.substr(19, n); 
 				substr = substr.split('%').join('_');
 		    			 
 			 
 			
 				 
 				
 		            	if(item.approvedBy==insAdd2){
     						tempLists2.push("yes");
 			    			 tempLists.push(i+1,item.loanId,item.name,'<a  href=ViewApprovedCustomerRequest.html?loanId='+item.loanId+'&walletAddress='+item.customerAddress+'&status=Policy_Issued&quote='+substr+'> Policy Issued','');
 			        		 dataSets.push(tempLists);
 			        		 tempLists=[];
 			       
 			    			 
     					}
 		            	else{
     						tempLists2.push("no");
     					/*	alert("yes");
     						alert(item.loanId);
     						alert(item.name);*/
     						//alert("yes");
     				tempLists.push(i+1,item.loanId,item.name,'<a  href=ViewApprovedCustomerRequest.html?loanId='+item.loanId+'&walletAddress='+item.customerAddress+'&status=Policy_Rejected&quote='+substr+'> Proposal Rejected','');
     		        		dataSets.push(tempLists);
     		        		tempLists=[];
     		        		
     		        	//	alert(dataSets);
     					}
 		            	
 		            
 		       
 			
 		 }
    		 
    		 
    		 
    		 // alert(JSON.stringify(response));
     //  $.get("http://"+ipAdd+":"+port+"/getInsuranceCompanyPolicies?insuranceAddress="+insAdd2, function(response){
    // alert(JSON.stringify(response));
 			/*$.each(response.message, function(i, item) {
 				
 				 var Name3=item.name;
 				 var Name4=Name3.charAt(0).toUpperCase() + Name3.slice(1);
 				 var replaced = Name4.split('_').join(' ');
 				//alert(JSON.stringify(item));
 				//alert(JSON.stringify(response.message[0]));
 				
				//tempLists.push(i,item.requestId,item.requestBy,item.status,'<a  href=LoanRequestApproval?'+item.requestId+'> View Details',"");
 				
 				//tempLists.push(i,item.,item.craft,item.name,'<a  href=LoanRequestApproval?'+item.craft+'> View Details',"");
 				if(item.status=="pending_ins_approval"){
 				tempLists.push(i+1,replaced,item.policyId,'Approve Request','<a  href=QuoteDetail.html?insuranceAddress='+insAdd2+'&policyId='+item.policyId+'&name='+Name4+'> View ');

				dataSets.push(tempLists);
				tempLists=[];
 				}
 				
 				
 				if(item.status=="quote_approved_ins"){
 	 				tempLists.push(i+1,replaced,item.policyId,'Request Approved','<a  href=QuoteDetailApproved.html?insuranceAddress='+insAdd2+'&policyId='+item.policyId+'&name='+Name4+'> View ');

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
 	 				tempLists.push(i+1,replaced,item.policyId,'Verify Property Details','<a  href=PropertyQuote.html?insuranceAddress='+insAdd2+'&policyId='+item.policyId+'&name='+Name4+'> View ');

 					dataSets.push(tempLists);
 					tempLists=[];
 	 				}
				//alert(dataSet);		               
				 			        	
 				if(item.status=="ins_completed"){
 	 				tempLists.push(i+1,replaced,item.policyId,'Insurance Approved','<a  href=PropertyQuoteVerifed.html?insuranceAddress='+insAdd2+'&policyId='+item.policyId+'&name='+Name4+'> View ');

 					dataSets.push(tempLists);
 					tempLists=[];
 	 				}
 				
		        	
 				if(item.status=="quote_approved_customer"){
 	 				tempLists.push(i+1,replaced,item.policyId,'Wait For Property Docs','<a  href=QuoteDetailApproved.html?insuranceAddress='+insAdd2+'&policyId='+item.policyId+'&name='+Name4+'> View ');

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
    		*/
    	 } );
				$('#pendingRequest3').DataTable( {
					data: dataSets,
					 //paging: false,
					  //  searching: false,
					columns: [
						 { title: "SNo" },
						 { title: "Loan Id" },
					    { title: "Name" },
					    {title :"Status"},
					    {title :"Action "}
					    
					    
					    

					  
					]
		    		} );
    	//  }, 1000);
    	 
        });
        });
