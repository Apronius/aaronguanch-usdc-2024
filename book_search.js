/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
  /** You will need to implement your search and
   * return the appropriate object here. */
  const ISBN = scannedTextObj[0]["ISBN"];
  const TERM = searchTerm.replace(/\W/,"");
  let result = {
    SearchTerm: TERM,
    Results: [],
  };

  let lines = scannedTextObj[0]["Content"].length;

  for (let i = 0; i < lines; i++) {
    let currentLineString = scannedTextObj[0]["Content"][i]["Text"];
    let currentLineArray = currentLineString.replace(/\W/, "").split(" ");
    let currentLineSet = new Set(currentLineArray);

    // Edge case for line break
    if (currentLineString[currentLineString.length - 1] === "-" && i < currentLineString.length - 1) {
      let hyphenWord = currentLineArray[currentLineArray.length - 1].replace(
        "-",
        scannedTextObj[0]["Content"][i+1]["Text"].split(" ")[0]
      );
      currentLineSet.add(hyphenWord);
    }

 
    if (currentLineSet.has(TERM)) {
      result["Results"].push({
        ISBN: ISBN,
        Page: parseInt(scannedTextObj[0]["Content"][i]["Page"]),
        Line: parseInt(scannedTextObj[0]["Content"][i]["Line"]),
      });
    }
  }

  return result;
}

/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

/** Example output objects */
const twentyLeaguesOut = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
  ],
};
const twentyLeaguesHyphen = {
    SearchTerm: "darkness",
    Results: [
      {
        ISBN: "9780000528531",
        Page: 31,
        Line: 8,
      },
    ],
  };
  const twentyLeaguesCaps = {
    SearchTerm: "The",
    Results: [
      {
        ISBN: "9780000528531",
        Page: 31,
        Line: 8,
      },
    ],
  };

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known hypenated line, we get the line the hyphenated word starts on. */
const testResultCustom1 = findSearchTermInBooks("darkness", twentyLeaguesIn);
if(JSON.stringify(twentyLeaguesHyphen) === JSON.stringify(testResultCustom1)) {
    console.log("PASS: Custom Test 1");
} else {
    console.log("FAIL: Custom Test 1");
    console.log("Expected:", twentyLeaguesHyphen);
    console.log("Received:", testResultCustom1);
}

/** We can check that, given a word with capitalization, we are returned only exact matches */
const testResultCustom2 = findSearchTermInBooks("The", twentyLeaguesIn);
if(JSON.stringify(twentyLeaguesCaps) === JSON.stringify(testResultCustom2)) {
    console.log("PASS: Custom Test 2");
} else {
    console.log("FAIL: Custom Test 2");
    console.log("Expected:", twentyLeaguesCaps);
    console.log("Received:", testResultCustom2);
}

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
  console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected:", twentyLeaguesOut);
  console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
  console.log("PASS: Test 2");
} else {
  console.log("FAIL: Test 2");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test2result.Results.length);
}
