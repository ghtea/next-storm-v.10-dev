const auth = {
	
	"auth01": { // 
		situation: "error"
		, message: {
			en: `Please enter both email addresses`
			,ko: `두 이메일 주소를모두 입력하세요`
			,ja: `両方のメールアドレスを入力してください`
		}
	}
	, "auth02": { // 
		situation: "error"
		, message: {
			en: `Two email addresses are different`
			,ko: `두 이메일 주소가 서로 다릅니다`
			,ja: `二つのメールアドレスが違います`
		}
	}
	
	, "auth03": { // 
		situation: "error"
		, message: {
			en: `Please enter both passwords`
			,ko: `두 비밀번호를모두 입력하세요`
			,ja: `両方のパスワードを入力してください`
		}
	}
	, "auth04": { // 
		situation: "error"
		, message: {
			en: `Two passwords are different`
			,ko: `두 비밀번호가 서로 다릅니다`
			,ja: `二つのパスワードが違います`
		}
	}
	
	, "auth05": { // 
		situation: "error"
		, message: {
			en: `Please enter both battletags`
			,ko: `두 배틀태그를모두 입력하세요`
			,ja: `両方のバトルタグを入力してください`
		}
	}
	, "auth06": { // 
		situation: "error"
		, message: {
			en: `Two battletags are different`
			,ko: `두 배틀태그가 서로 다릅니다`
			,ja: `二つのバトルタグが違います`
		}
	}
	, "auth07": { // 
		situation: "error"
		, message: {
			en: `Add '# and numbers' to battletag`
			,ko: `배틀태그에 #과 숫자를 추가해주세요`
			,ja: `バトルタグに#と数字を追加してください`
		}
	}
	, "auth08": { // 
		situation: "success"
		, message: {
			en: `You have signed up (email address and password)`
			,ko: `성공적으로 회원가입했습니다 (이메일 주소, 비밀번호)`
			,ja: `会員加入に成功しました(メールアドレスとパスワード)`
		}
	}
	, "auth09": { // 
		situation: "error"
		, message: {
			en: `You failed to sign up`
			,ko: `회원가입에 실패하였습니다`
			,ja: `会員加入に失敗しました`
		}
	}
	
	
	
	
	, "auth11": { // 
		situation: "error"
		, message: {
			en: `Please enter your email address or battletag`
			,ko: `이메일 주소 혹은 배틀태그를 입력해주세요`
			,ja: `メールアドレスもしくはバトルタグを入力してください`
		}
	}
	, "auth12": { // 
		situation: "error"
		, message: {
			en: `Please enter password`
			,ko: `비밀번호를 입력해주세요`
			,ja: `パスワードを入力してください`
		}
	}
	, "auth13": { // 
		situation: "success"
		, message: {
			en: `You've been logged in`
			,ko: `성공적으로 로그인하였습니다`
			,ja: `ログインに成功しました`
		}
	}
	, "auth14": { // 
		situation: "error"
		, message: {
			en: `You failed to log in`
			,ko: `로그인에 실패하였습니다`
			,ja: `ログインに失敗しました`
		}
	}
	
	, "auth21": { // 
		situation: "error"
		, message: {
			en: `Please enter your email address`
			,ko: `이메일 주소를 입력해주세요`
			,ja: `メールアドレスを入力してください`
		}
	}
	, "auth22": { // 
		situation: "error"
		, message: {
			en: `Please enter your battletag`
			,ko: `배틀태그를 입력해주세요`
			,ja: `バトルタグを入力してください`
		}
	}
	, "auth23": { // 
		situation: "error"
		, message: {
			en: `Going to authenticate the battletag`
			,ko: `배틀태그를 인증하기 위해 이동합니다`
			,ja: `バトルタグを認証するために移動します`
		}
	}
	, "auth24": { // 
		situation: "error"
		, message: {
			en: `You failed to apply battletag`
			,ko: `배틀태그 신청에 실패하였습니다`
			,ja: `バトルタグの申し込みに失敗しました`
		}
	}
	
	
	, "auth31": { // 
		situation: "error"
		, message: {
			en: `You must log in first`
			,ko: `먼저 로그인해야 합니다`
			,ja: `先にログインしてください`
		}
	}
	
	
	
	, "alocal41": { // 
		situation: "error"
		, message: {
			en: `You failed to update mmr`
			,ko: `MMR 업데이트에 실패하였습니다`
			,ja: `MMRのアップデートに失敗しました`
		}
	}
	, "alocal42": { // 
		situation: "success"
		, message: {
			en: `You have updated mmr`
			,ko: `성공적으로 MMR 업데이트를 했습니다`
			,ja: `MMRのアップデートに成功しました`
		}
	}
}


/*

success    s
error      e
warning    w
info       i

*/

export default auth;