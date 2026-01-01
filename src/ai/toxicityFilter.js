const bannedWords = [
  "idiot",
  "stupid",
  "abuse",
  "hate",
  "spam",
  "fake"
];

export function isToxic(message) {
  const text = message.toLowerCase();
  return bannedWords.some(word => text.includes(word));
}
