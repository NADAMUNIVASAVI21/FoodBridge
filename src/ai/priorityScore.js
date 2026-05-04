export function calculatePriority(food, ngoLocation) {
  let score = 0;

  if (food.aiUrgency === "High") score += 50;
  else if (food.aiUrgency === "Medium") score += 30;

  const qty = parseInt(food.quantity) || 0;
  score += Math.min(qty, 30);

  if (food.coordinates && ngoLocation) {
    const toRad = deg => deg * (Math.PI / 180);

    const R = 6371;
    const dLat = toRad(ngoLocation.lat - food.coordinates.lat);
    const dLng = toRad(ngoLocation.lng - food.coordinates.lng);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(food.coordinates.lat)) *
        Math.cos(toRad(ngoLocation.lat)) *
        Math.sin(dLng / 2) ** 2;

    const dist = 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    score += Math.max(0, 30 - dist * 5);
  }

  return score;
}
