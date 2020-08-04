const tplan = {
	
	"tplan01": { // 관리자가 아니라서 수정을 못함을 알린다
		situation: "error"
		, message: {
			en: `You are not administrator`
			,ko: `관리자의 권한이 필요합니다`
			,ja: `管理者の権限が必要です`
		}
	}
	
	, "tplan02": { // 클릭으로 배틀태그 복사돼었을 때
		situation: "success"
		, message: {
			en: `'BATTLETAG' has been copied`
			,ko: `'BATTLETAG'가 복사되었습니다`
			,ja: `'BATTLETAG'がコピーされました`
		}
	}
	
	, "tplan03": { // confirmed 에 대해 설명할 때
		situation: "tip"
		, message: {
			en: `Only confirmed players can join teams`
			,ko: `오직 확정된 플레이어만이 팀에 참가할 수 있습니다`
			,ja: `確定したプレイヤーだけがチームに参加できます`
		}
	}
	
	, "tplan04": { // Pending 에 대해 설명할 때
		situation: "tip"
		, message: {
			en: `Pending players can't join teams`
			,ko: `미확정의 플레이어는 팀에 참가할 수 없습니다`
			,ja: `保留中のプレイヤーはチームに参加できません`
		}
	}
	
	, "tplan05": { // leader 에 대해 설명할 때
		situation: "tip"
		, message: {
			en: `Leaders join teams first, being separated into different teams`
			,ko: `리더들은 우선적으로 팀에 참가시키고, 각자 다른 팀으로 분리됩니다`
			,ja: `リーダーは優先的にチームに参加させ、各自違うチームに分かれます`
		}
	}
	
	, "tplan11": { // url 의 plan id 가 틀렸을 때 
		situation: "error"
		, message: {
			en: `Plan for this id does not exist`
			,ko: `해당 id의 플랜이 존재하지 않습니다`
			,ja: `そのidのプランが存在しません`
		}
	}
	
	
	/*
		, "tplan12": { // url 로 접속시
		situation: "success"
		, message: {
			en: `Welcome viewer!`
			,ko: ``
			,ja: ``
		}
	}
	*/
	
	, "tplan13": { // url 로 접속시
		situation: "success"
		, message: {
			en: `Welcome administrator!`
			,ko: `어서오세요, 관리자님`
			,ja: `いらっしゃいませ、管理者様`
		}
	}
	
	, "tplan14": { // url 의 plan id 가 틀렸을 때 
		situation: "error"
		, message: {
			en: `Password is wrong`
			,ko: `비밀번호가 틀립니다`
			,ja: `パスワードが間違っています`
		}
	}
	
	, "tplan15": { // url 의 plan id 가 틀렸을 때 
		situation: "error"
		, message: {
			en: `Failed to read plan`
			,ko: `플랜을 읽어오는데 실패했습니다`
			,ja: `プランを読んでくるのに失敗しました`
		}
	}
	
	
	
	, "tplan21": { // url 의 plan id 가 틀렸을 때 
		situation: "success"
		, message: {
			en: `'BATTLETAG' has been added!`
			,ko: `'BATTLETAG'님이 추가되었습니다!`
			,ja: `'BATTLETAG'様が追加されました`
		}
	}
	, "tplan22": { // 
		situation: "error"
		, message: {
			en: `Adding player has failed`
			,ko: `플레이어를 추가하지 못했습니다`
			,ja: `プレイヤーを追加できませんでした`
		}
	}
	, "tplan23": { //  
		situation: "error"
		, message: {
			en: `Type battletag first`
			,ko: `먼저 배틀태그를 입력해주세요`
			,ja: `まずバトルタグを入力してください`
		}
	}
	
	, "tplan24": { // 
		situation: "success"
		, message: {
			en: `Link for players has been copied`
			,ko: `플레이어용 링크가 복사되었습니다`
			,ja: `プレイヤー用リンクがコピーされました`
		}
	}
	, "tplan25": { // 
		situation: "success"
		, message: {
			en: `Link for administrator link has been copied`
			,ko: `관리자용 링크가 복사되었습니다`
			,ja: `管理者用リンクがコピーされました`
		}
	}
	
	
	
	, "tplan31": { //  
		situation: "success"
		, message: {
			en: `New plan has been created!`
			,ko: `새 플랜이 생성되었습니다`
			,ja: `新しいプランが作成されました`
		}
	}
	, "tplan32": { // 
		situation: "error"
		, message: {
			en: `Failed in creating plan`
			,ko: `플랜을 생성하지 못했습니다`
			,ja: `プランを作成できませんでした`
		}
	}
	, "tplan33": { //
		situation: "error"
		, message: {
			en: `Type titile of plan first`
			,ko: `먼저 플랜의 제목을 입력해주세요`
			,ja: `まずプランのタイトルを入力してください`
		}
	}
	
	
	
	, "tplan41": { //
		situation: "error"
		, message: {
			en: `The number of team which you have set was adjusted`
			,ko: `설정한 팀 수가 조정되었습니다`
			,ja: `設定したチーム数が調整されました`
		}
	}
	, "tplan42": { //
		situation: "error"
		, message: {
			en: `We need at least 5 confirmed players`
			,ko: `적어도 5명의 확정된 플레이어가 필요합니다`
			,ja: `確定したプレイヤーが少なくとも5名必要です`
		}
	}
	, "tplan43": { //
		situation: "success"
		, message: {
			en: `The result has been saved`
			,ko: `결과가 성공적으로 저장되었습니다!`
			,ja: `結果を保存しました！`
		}
	}
	, "tplan44": { //
		situation: "error"
		, message: {
			en: `Failed to save result`
			,ko: `결과를 저장하지 못했습니다`
			,ja: `結果の保存に失敗しました`
		}
	}
	, "tplan45": { //
		situation: "error"
		, message: {
			en: `The results have not been made yet`
			,ko: `아직 결과가 만들어지지 않았습니다`
			,ja: `まだ結果が作られていません`
		}
	}
	, "tplan46": { //
		situation: "error"
		, message: {
			en: `Generate another result to replace the local one`
			,ko: `다른 결과를 생성해서 로컬 결과를 대체하세요`
			,ja: `別の結果を作成してローカル結果を代替してください`
		}
	}
	, "tplan47": { //
		situation: "error"
		, message: {
			en: `Failed to delete result`
			,ko: `결과를 삭제하지 못했습니다`
			,ja: `結果の削除に失敗しました`
		}
	}
	, "tplan48": { //
		situation: "error"
		, message: {
			en: `Please select the results to delete first`
			,ko: `먼저 삭제할 결과를 선택해 주세요`
			,ja: `まず削除したい結果を選択してください`
		}
	}
	
	
	
}


/*

success    s
error      e
warning    w
info       i

*/

export default tplan;