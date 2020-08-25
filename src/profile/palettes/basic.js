
// https://webaim.org/resources/contrastchecker/

const basic ={
	// colorMain, colorBack
	Default: {colorMain:'#eee', colorBack:'#999'}
	
	, "001a": {colorMain:'#BB252A', colorBack:'#FFF0A3'}
	, "001b": {colorMain:'#FFF0A3', colorBack:'#BB252A'}
	
	, "002a": {colorMain:'#f9d342', colorBack:'#292826'}
	, "002b": {colorMain:'#292826', colorBack:'#f9d342'}
	
	, "003a": {colorMain:'#F382A5', colorBack:'#421B64'}
	, "003b": {colorMain:'#421B64', colorBack:'#F382A5'}
	
	, "004a": {colorMain:'#ccf381', colorBack:'#4831d4'}
	, "004b": {colorMain:'#4831d4', colorBack:'#ccf381'}
	
	, "005a": {colorMain:'#6A01A2', colorBack:'#F6AF8E'}
	, "005b": {colorMain:'#F6AF8E', colorBack:'#6A01A2'}
	
	, "006a": {colorMain:'#fff748', colorBack:'#3c1a5b'}
	, "006b": {colorMain:'#3c1a5b', colorBack:'#fff748'}
	
	, "007a": {colorMain:'#2f3c7e', colorBack:'#fbeaeb'}
	, "007b": {colorMain:'#fbeaeb', colorBack:'#2f3c7e'}
	
	, "008a": {colorMain:'#ec4d37', colorBack:'#1d1b1b'}
	, "008b": {colorMain:'#1d1b1b', colorBack:'#ec4d37'}
	
	, "009a": {colorMain:'#8bd8bd', colorBack:'#243665'}
	, "009b": {colorMain:'#243665', colorBack:'#8bd8bd'}
	
	//, "010a": {colorMain:'#141a46', colorBack:'#ec8b5e'}
	//, "010b": {colorMain:'#ec8b5e', colorBack:'#141a46'}
	
	, "011a": {colorMain:'#ffffff', colorBack:'#8aaae5'}
	, "011b": {colorMain:'#8aaae5', colorBack:'#ffffff'}
	
	, "012a": {colorMain:'#18631D', colorBack:'#FFE985'}
	, "012b": {colorMain:'#FFE985', colorBack:'#18631D'}
	
	, "013a": {colorMain:'#FFCD8F', colorBack:'#161b21'}
	, "013b": {colorMain:'#161b21', colorBack:'#FFCD8F'}
	
	, "014a": {colorMain:'#FB41A1', colorBack:'#080a52'}
	, "014b": {colorMain:'#080a52', colorBack:'#FB41A1'}
	
	//, "015a": {colorMain:'#4a171e', colorBack:'#e2v144'}
	//, "015b": {colorMain:'#e2v144', colorBack:'#4a171e'}
	
	, "016a": {colorMain:'#d2302c', colorBack:'#f7f7f9'}
	, "016b": {colorMain:'#f7f7f9', colorBack:'#d2302c'}
	
	, "017a": {colorMain:'#006B99', colorBack:'#FFD2C7'}
	, "017b": {colorMain:'#FFD2C7', colorBack:'#006B99'}
	
	, "018a": {colorMain:'#FFEE8F', colorBack:'#7B3CBE'}
	, "018b": {colorMain:'#7B3CBE', colorBack:'#FFEE8F'}
	
	, "019a": {colorMain:'#262223', colorBack:'#ddc6b6'}
	, "019b": {colorMain:'#ddc6b6', colorBack:'#262223'}
	
	, "020a": {colorMain:'#C12532', colorBack:'#FFE0E5'}
	, "020b": {colorMain:'#FFE0E5', colorBack:'#C12532'}
	
	, "021a": {colorMain:'#ECDBFF', colorBack:'#141EA3'}
	, "021b": {colorMain:'#141EA3', colorBack:'#ECDBFF'}
	
	//, "022a": {colorMain:'#99f443', colorBack:'#ec449b'}
	//, "022b": {colorMain:'#ec449b', colorBack:'#99f443'}
	
	, "023a": {colorMain:'#D62105', colorBack:'#FCEDDA'}
	, "023b": {colorMain:'#FCEDDA', colorBack:'#D62105'}
	
	//, "024a": {colorMain:'#96351b', colorBack:'#dbb98f'}
	//, "024b": {colorMain:'#dbb98f', colorBack:'#96351b'}
	
	, "025a": {colorMain:'#e2d1f9', colorBack:'#1F5B58'}
	, "025b": {colorMain:'#1F5B58', colorBack:'#e2d1f9'}
	
	, "026a": {colorMain:'#2a2927', colorBack:'#fccf0d'}
	, "026b": {colorMain:'#fccf0d', colorBack:'#2a2927'}
	
	//, "027a": {colorMain:'#721c47', colorBack:'#d1a377'}
	//, "027b": {colorMain:'#d1a377', colorBack:'#721c47'}
	
	//, "028a": {colorMain:'#060709', colorBack:'#dea527'}
	//, "028b": {colorMain:'#dea527', colorBack:'#060709'}
	
	, "029a": {colorMain:'#065646', colorBack:'#FFADC6'}
	, "029b": {colorMain:'#FFADC6', colorBack:'#065646'}
	
	, "030a": {colorMain:'#322514', colorBack:'#FF8AA1'}
	, "030b": {colorMain:'#FF8AA1', colorBack:'#322514'}
	
	, "031a": {colorMain:'#be1558', colorBack:'#fbcbc9'}
	, "031b": {colorMain:'#fbcbc9', colorBack:'#be1558'}
	
	, "032a": {colorMain:'#f5f0e1', colorBack:'#044C8B'}
	, "032b": {colorMain:'#044C8B', colorBack:'#f5f0e1'}
	
	, "033a": {colorMain:'#eae84e', colorBack:'#101928'}
	, "033b": {colorMain:'#101928', colorBack:'#eae84e'}
	
	, "034a": {colorMain:'#FFDBE6', colorBack:'#3a3b78'}
	, "034b": {colorMain:'#3a3b78', colorBack:'#FFDBE6'}
	
	, "035a": {colorMain:'#2673b8', colorBack:'#fefefe'}
	, "035b": {colorMain:'#fefefe', colorBack:'#2673b8'}
	
	, "036a": {colorMain:'#D1105D', colorBack:'#A5F3FD'}
	, "036b": {colorMain:'#A5F3FD', colorBack:'#D1105D'}
	
	, "037a": {colorMain:'#05141A', colorBack:'#4BB6FF'}
	, "037b": {colorMain:'#4BB6FF', colorBack:'#05141A'}
}

export default basic;