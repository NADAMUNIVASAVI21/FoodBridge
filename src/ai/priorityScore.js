export function calculatePriority(food, ngoLocation) {
  let score = 0;

  // urgency
  if (food.aiUrgency === "High") score += 50;
  if (food.aiUrgency === "Medium") score += 30;

  // quantity
  const qty = parseInt(food.quantity) || 0;
  score += Math.min(qty, 30);

  // distance (approx)
  if (food.coordinates && ngoLocation) {
    const dx = food.coordinates.lat - ngoLocation.lat;
    const dy = food.coordinates.lng - ngoLocation.lng;
    const dist = Math.sqrt(dx * dx + dy * dy);
    score += Math.max(0, 30 - dist * 100);
  }

  return score;
}
