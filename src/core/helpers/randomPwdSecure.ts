export  function generateSecurePassword(length = 12): string {
  if (length < 4) {
    throw new Error("Password length must be at least 4 to meet all character requirements.");
  }

  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?";

  const getRandom = (chars: string) => chars[Math.floor(Math.random() * chars.length)];

  // Garantizamos al menos un carácter de cada tipo
  const requiredChars = [
    getRandom(lowercase),
    getRandom(uppercase),
    getRandom(numbers),
    getRandom(symbols),
  ];

  // Rellenamos el resto al azar con mezcla de todo
  const allChars = lowercase + uppercase + numbers + symbols;
  const remainingLength = length - requiredChars.length;
  const remainingChars = Array.from({ length: remainingLength }, () => getRandom(allChars));

  // Mezclamos todo
  const passwordArray = [...requiredChars, ...remainingChars];
  const shuffledPassword = passwordArray.sort(() => Math.random() - 0.5);

  return shuffledPassword.join('');
}