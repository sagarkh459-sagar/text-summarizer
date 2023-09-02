
// console.log("popup.js loaded");
document.getElementById("summarizeButton").addEventListener("click", summarizeText);

function summarizeText() {
  // console.log("summarizeText loaded");
  const inputText = document.getElementById("inputText").value;
  const inputLines = document.getElementById("inputLines").value;
  const summary = generateSummary(inputText,inputLines);
  document.getElementById("summary").textContent = summary;
}

function generateSummary(text, maxSentences = 2) {
  // console.log("generateSummary loaded");
  const sentences = text.split(/[.!?]/);
    
  // Tokenize the text
  const words = text.toLowerCase().match(/\b\w+\b/g);
  
  // Remove common English stop words (e.g., "the", "and", "in")
  const stopWords = new Set([
      "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves",
      "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves",
      "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has",
      "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", 
      "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", 
      "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both",
      "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", 
      "just", "don", "should", "now" ]);
  
  // Filter out stop words
  const filteredWords = words.filter(word => !stopWords.has(word.toLowerCase()));
  
  // Calculate word frequencies
  const wordFrequencies = {};
  filteredWords.forEach(word => {
    wordFrequencies[word] = (wordFrequencies[word] || 0) + 1;
  });
  
  // Score sentences based on word frequencies
  const sentenceScores = sentences.map(sentence => {
  // Tokenize the sentence
  const sentenceWords = sentence.toLowerCase().match(/\b\w+\b/g);
  if (!sentenceWords) {
    return { sentence, score: 0 }; // Handle cases where sentenceWords is null
  }
  const score = sentenceWords.reduce((acc, word) => acc + (wordFrequencies[word] || 0), 0);
    return { sentence, score };
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



