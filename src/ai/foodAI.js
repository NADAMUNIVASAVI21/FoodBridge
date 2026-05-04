export function analyzeFood(text) {
  const lower = text.toLowerCase();

  let category = "General Food";
  let urgency = "Medium";
  let estimated_people = 5;

  if (lower.includes("rice") || lower.includes("biryani")) {
    category = "Cooked Food";
    urgency = "High";
    estimated_people = 15;
  } else if (lower.includes("bread") || lower.includes("packet")) {
    category = "Packed Food";
    urgency = "Low";
    estimated_people = 10;
  } else if (lower.includes("vegetable") || lower.includes("fruit")) {
    category = "Fresh Produce";
    estimated_people = 8;
  }

  if (lower.includes("box")) {
    estimated_people += 10;
  }

  return { category, urgency, estimated_people };
}
