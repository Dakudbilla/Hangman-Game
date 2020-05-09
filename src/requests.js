const getPuzzle = async (wordCount) => {
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

const getCurrentCountry = async () => {
  const location = await getLocation();
  return getCountry(location.country);
};

const getCountry = async (countryCode) => {
  const response = await fetch("//restcountries.eu/rest/v2/all");

  if (response.status === 200) {
    const data = await response.json();
    return data.find((country) => country.alpha2Code === countryCode);
  } else {
    throw new Error("Unable to fetch the country");
  }
};

const getLocation = async () => {
  const response = await fetch("//ipinfo.io/json?token=1a11bd55cc8f9c");

  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error("Unable to get the current location");
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
