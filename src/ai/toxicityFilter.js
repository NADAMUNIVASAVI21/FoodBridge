const bannedWords = ["idiot", "stupid", "abuse", "hate", "spam", "fake"];

export function isToxic(message) {
  const text = message.toLowerCase();

  return bannedWords.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, "i");
    return regex.test(text);
  });
}
