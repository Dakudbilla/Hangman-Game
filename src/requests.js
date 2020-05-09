export const getPuzzle = async (wordCount) => {
  const response = await fetch(
    `//puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );

  if (response.status === 200) {
    const data = await response.json();
    getDefinition(data.puzzle);
    return data.puzzle;
  } else {
    throw new Error("Unable to get puzzle");
  }
};

const getDefinition = async (word) => {
  let definition;

  definition = await fetch(
    `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=56caad2f-fb56-4452-9f1f-685daff1ccc6`
  );

  if (definition) {
    const define = await definition.json();
    document.querySelector("#definition").textContent =
      "DEFINITION OF WORD: " + define[0].shortdef[0];
  } else {
    throw new Error("Something Went Wrong");
  }
};
