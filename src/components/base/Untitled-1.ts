const s = "Isaoranay Jehovah Tomponay,\nisaoranay Andriamanitray; fa be fitia\nny Tomponay, ny Tompo tia anay,\nMpanjaka tia, Mpamindra fo. Deraina\nHianao. Isaoranay izao, fa be fiantra\nHianao, Mpanjaka be fitia. Isaoranay\nny Tomponay. Ny tany aty mandray\nfitahiana; ny lanitra ary mamoaka ny\nsoa, ka misy tokoa ny vokatra tsara,\nJehovah Tsitoha manambina anay.\nDeraina ny Anaranao Andriamanitray.\nHe! faly izahay izao manao ny hiranay!\nIsaoranay Andriananaharinay\nMpanjaka be fitia.\nIsaoranay Jehovah Tomponay,\nisaoranay Andriamanitray; fa be fitia\nny Tomponay, ny Tompo tia anay,\nMpanjaka tia, Mpamindra fo. Deraina\nHianao. Isaoranay izao, fa be fiantra\nHianao, Mpanjaka be fitia. Isaoranay\nny Tomponay";

// Split the string into an array of lines
const lines = s.split('\n');

// Group the lines into pairs and create the nested array
const L = [];
for (let i = 0; i < lines.length; i += 3) {
  L.push([lines[i], lines[i + 2]]);
}

console.log(L);

const taille = 5;
const s = "Andriananahary masina indrindra!\nNy anjelinao izay mitoetra Aminao\nMifamaly hoe : Masina indrindra\nAndriananahary, Telo Izay Iray.";

console.log(L);