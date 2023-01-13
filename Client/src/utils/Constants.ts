import words from "../assets/Words.json";

export const SHUFFLED_WORD_LIST = words.sort(() => 0.5 - Math.random()).slice(0, 100);
