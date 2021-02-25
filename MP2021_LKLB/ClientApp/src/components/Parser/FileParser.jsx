var RE_L = /^L.*(?=R1)R1=(.*)km,A1.*$/;

var str = 'LNAVOZN=0,Style=3,R1=0.500km,A1=45,R2=0.000km,A2=0,A12=51.8';
var result = str.match(RE_L);
console.log(result);
// returns true
