const abnet = {
		// auth-bnet 에서 res.redirect & query로 보내는 것들

	"abnet01": { // auth-bnet 에서, 신청한 battletag 를 이미 사용중인 이용자가 있을 때
		situation: "error"
		, message: {
			en: `This battletag is already used by someone`
			,ko: `해당 배틀태그를 이용중인 사용자가 존재합니다`
			,ja: `このバトルタグを利用中のユーザーが存在します`
		}
	}
	
	,"abnet02": { // 전에 해당 배틀태그를 신청하고, 제한 시간이 지나버렸을 때
		situation: "error"
		, message: {
			en: `More than 3 mins passed since user applied this battletag`
			,ko: `해당 배틀태그를 신청한 후 3분 이상 지났습니다`
			,ja: `このバトルタグを申請してから3分以上経過しました`
		}
	}
	
	,"abnet03": { // 해당 배틀태그를 신청한 유저가 없을 때
		situation: "error"
		, message: {
			en: `No user applied this battletag before`
			,ko: `해당 배틀태그를 사전에 신청한 유저가 없습니다`
			,ja: `このバトルタグを事前に申し込んだユーザーがいません`
		}
	}
	
	,"abnet04": { // 알수없는 에러가 bnet 쪽에서 발생
		situation: "error"
		, message: {
			en: `Unknown error has occurred in battle net`
			,ko: `배틀넷에서 알수 없는 에러가 발생했습니다`
			,ja: `バトルネットで不明なエラーが発生しました`
		}
	}
	
}


export default abnet;