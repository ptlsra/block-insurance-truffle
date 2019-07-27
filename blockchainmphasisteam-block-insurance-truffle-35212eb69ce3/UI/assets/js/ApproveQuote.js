$('#approve').click(function () {
        

        var loanId = $("#loanId").val();
	var bankAddress =  localStorage.getItem("bankAddress");
        var policyId = $("#policyId").val();
        var insAdd  = localStorage.getItem("insAdd");
        


        $.ajax({

                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                url: "/updatePortfolioStatus?sharedOwnerAddress="+bankAddress+"&loanId="+loanId+"&status=insurance_quote_approved&message=accept_quote",
                type: "POST",
                global: false,
                async: false,
                success: function (result) {

			


			$.ajax({

					dataType: "json",
					contentType: 'application/json; charset=UTF-8',
					url: "/updatePolicyStatus?policyId="+policyId+"&insuranceAddress="+insAdd+"&status=quote_approved_ins",
					type: "POST",
					global: false,
					async: false,
					success: function (response) {

				        document.getElementById("txWaiting").style.display = "none";
				        document.getElementById("txIdData").innerHTML = response.txId;
				        document.getElementById("txMessageForm").style.display = "block";
				        setTimeout(function () {
				                window.location.href = "AdminHome.html";
				        }, 2000);
			


					}
				});


                }
        });

});



