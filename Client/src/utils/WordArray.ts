export const arrayOfWords: string[] = ["carl", "test", "lina", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10"];

export const test = (setKeyPressed: React.Dispatch<React.SetStateAction<string>>, e: KeyboardEvent) => {
  e.preventDefault();
  setKeyPressed(e.key);
};
