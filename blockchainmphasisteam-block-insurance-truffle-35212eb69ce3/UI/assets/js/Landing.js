
$.get("/getCoinBase", function(data, status){
	insAdd = data.coinBase
	bankAddress = data.bankcoinBase

		localStorage.setItem("insAdd",insAdd)
		localStorage.setItem("getBankAddress",bankAddress)

    });

// Set Insurance address here
//localStorage.setItem("insAdd", "0xb0180044bac78afae027c017d6d250e3f2c73f12");
//localStorage.setItem("getBankAddress","0x4802c1b6ab728e28d462005481d2472e523d886d")
