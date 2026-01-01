export async function analyzeFood(text) {
  const lower = text.toLowerCase();

  let category = "General Food";
  let urgency = "Medium";
  let estimated_people = 5;

  if (lower.includes("rice") || lower.includes("biryani")) {
    category = "Cooked Food";
    urgency = "High";
    estimated_people = 15;
  }

  if (lower.includes("bread") || lower.includes("packets")) {
    category = "Packed Food";
    urgency = "Low";
    estimated_people = 10;
  }

  if (lower.includes("vegetable") || lower.includes("fruit")) {
    category = "Fresh Produce";
    urgency = "Medium";
    estimated_people = 8;
  }

  if (lower.includes("box") || lower.includes("boxes")) {
    estimated_people += 10;
  }

  return {
    category,
    urgency,
    estimated_people
  };
}
