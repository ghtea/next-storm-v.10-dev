const alocal = {
	// auth-local 에서 res.json으로 보내는 것들
	
	
	"alocal01": { // 
		situation: "error"
		, message: {
			en: `This email address is already registered`
			,ko: `이미 등록된 이메일 주소입니다`
			,ja: `登録済みのメールアドレスです`
		}
	}
	, "alocal02": { // 
		situation: "error"
		, message: {
			en: `This battletag is already registered`
			,ko: `이미 등록된 배틀태그입니다`
			,ja: `登録済みのバトルタグです`
		}
	}
	
	
	
	// 
	, "alocal03": { // 
		situation: "error"
		, message: {
			en: `This battletag has not been approved yet`
			,ko: `이 배틀태그는 아직 승인되지 않았습니다`
			,ja: `このバトルタグはまだ承認されていません`
		}
	}
	, "alocal04": { // 
		situation: "error"
		, message: {
			en: `No user using this email address or battletag exists`
			,ko: `해당 이메일 주소 또는 배틀태그를 이용중인 유저가 존재하지 않습니다`
			,ja: `このメールアドレスまたはバトルタグを利用中のユーザーが存在しません`
		}
	}
	, "alocal05": { // 
		situation: "error"
		, message: {
			en: `The password is incorrect`
			,ko: `비밀번호가 틀립니다`
			,ja: `パスワードが間違っています`
		}
	}
	, "alocal06": { // 
		situation: "error"
		, message: {
			en: `Token is invalid, please log in again`
			,ko: `토큰이 잘못되엇습니다, 다시 로그인해주세요`
			,ja: `トークンが正しくありません。もう一度ログインしてください`
		}
	}


	, "aloca201": { // 
		situation: "error"
		, message: {
			en: `No user using this id exists`
			,ko: `해당 아이디의 유저가 존재하지 않습니다`
			,ja: `このアイディのユーザーが存在しません`
		}
	}
	, "aloca202": { // 
		situation: "error"
		, message: {
			en: `Current password is incorrect`
			,ko: `현재의 비밀번호가 틀립니다`
			,ja: `現在のパスワードが間違っています`
		}
	}
	
	
	
}


export default alocal;