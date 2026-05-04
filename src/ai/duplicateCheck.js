export function isDuplicateFood(newText, oldFoods) {
  const words = newText
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter(Boolean);

  for (let food of oldFoods) {
    const existingWords = food.name
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(" ");

    let matchCount = words.filter(w => existingWords.includes(w)).length;

    if (matchCount >= Math.ceil(words.length / 2)) {
      return true;
    }
  }

  return false;
}
