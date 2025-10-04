function getSuffleCharMap(): Map<string, number> {
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const numbers = Array.from({ length: 26 }, (_, i) => i + 1);

  // Shuffle letters array
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }

  const map = new Map<string, number>();
  numbers.forEach((num, index) => {
    map.set(letters[index], num);
  });

  return map;
}

export { getSuffleCharMap };
