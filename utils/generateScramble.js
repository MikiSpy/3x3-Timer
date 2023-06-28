export function generateScramble() {
  const moves = ["U", "U'", "U2", "R", "R'", "R2", "F", "F'", "F2", "D", "D'", "D2", "L", "L'", "L2", "B", "B'", "B2"];
  let scramble = "";

  for (let i = 0; i < 20; i++) {
    const randomMoveIndex = Math.floor(Math.random() * moves.length);
    const randomMove = moves[randomMoveIndex];
    scramble += randomMove + " ";
  }

  return scramble.trim();
}