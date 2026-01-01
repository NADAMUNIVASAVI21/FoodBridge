export function isDuplicateFood(newText, oldFoods) {
  const text = newText.toLowerCase();

  for (let food of oldFoods) {
    const existing = food.name.toLowerCase();

    let matchCount = 0;
    text.split(" ").forEach(word => {
      if (existing.includes(word)) matchCount++;
    });

    if (matchCount >= 2) return true;
  }

  return false;
}
