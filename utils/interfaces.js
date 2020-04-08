const domain = "http://106.13.111.39:40003/";
// const domain = "http://localhost:40003/";
const interfaces = {
	// 获取首页数据
	getMessage: domain + "api/message",
	getHotMessage: domain + "api/message",
	getUserDes: domain + "api/getUserDes",
	addPick: domain + "api/addReplay",
	userAllMess: domain + "api/allMess",
	userIdGetReplayNum: domain + "api/userIdGetReplayNum",
	removeThisMessage: domain + "api/remMess",
	sendMessage: domain + "api/addMess",
	tabIdGetReplay: domain + "api/tabIdGetReplayNum",
	signIn: domain + "api/signIn",
	signUp: domain + "api/signUp",
	tabIdGetMessage: domain + "api/queryMess"
}
module.exports = interfaces;