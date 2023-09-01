// popup.js
console.log("popup.js loaded");
document.getElementById("summarizeButton").addEventListener("click", summarizeText);

function summarizeText() {
  console.log("button summary");
  const inputText = document.getElementById("inputText").value;
  const summary = generateSummary(inputText,5);
  document.getElementById("summary").textContent = summary;
}

// function generateSummary(text) {
//   // Implement your summarization logic here
//   // This could be the same summarizeText function from the previous example

//   // For this example, let's use a simple approach: selecting the first sentence
//   const sentences = text.split('. ');
//   if (sentences.length > 0) {
//     return sentences[0] + '.';
//   } else {
//     return "No text to summarize.";
//   }
// }

function generateSummary(text, maxSentences = 3) {
  const tokenize = (text) => text.toLowerCase().match(/\b\w+\b/g);
  
  const sentences = text.split(/[.!?]/);
  const sentenceScores = [];

  // Calculate word frequencies
  const wordFrequencies = {};
  const words = tokenize(text);
  words.forEach(word => {
    if (!wordFrequencies[word]) {
      wordFrequencies[word] = 1;
    } else {
      wordFrequencies[word]++;
    }
  });

  // Calculate sentence scores
  sentences.forEach((sentence) => {
    const sentenceWords = tokenize(sentence);
    let score = 0;
    sentenceWords.forEach(word => {
      score += wordFrequencies[word];
    });
    sentenceScores.push({ sentence, score });
  });

  // Sort sentences by score in descending order
  sentenceScores.sort((a, b) => b.score - a.score);

  // Select the top sentences for the summary
  const summarySentences = sentenceScores.slice(0, maxSentences);
  
  // Reorder the summary sentences to match the original order
  summarySentences.sort((a, b) => sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence));

  const summary = summarySentences.map(entry => entry.sentence).join('. ');

  return summary;
}

// // Example usage
// const inputText = "This is a sample text. It contains multiple sentences. We want to summarize this text.";
// const summary = generateSummary(inputText);
// console.log(summary); // Output: "This is a sample text. It contains multiple sentences."



