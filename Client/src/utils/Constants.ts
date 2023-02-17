import words from "../assets/Words.json";

export const SHUFFLED_WORD_LIST = () => {
  words
    .filter((word) => word.length > 2 && word.length < 6)
    .sort(() => 0.5 - Math.random())
    .slice(0, 100);
};
