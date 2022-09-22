export const getDiceRoll = () => {
  let dicesArray = [];
  for (let i = 0; i < 5; i++) {
    let random = Math.ceil(Math.random() * 6);
    dicesArray.push(random);
  }
  return dicesArray;
};

export const getDicesOccurrences = (dices) => {
  let occurrencesArray = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };
  for (const occ in occurrencesArray) {
    dices.map((dice) => {
      if (+dice === +occ) {
        occurrencesArray[occ] = occurrencesArray[occ] + 1;
      }
    });
  }
  return occurrencesArray;
};
