var models = require('../database');
var Song = models.songModel;

var stopWords = [ "a", "about", "above", "after", "again", "against",
"all", "am", "an", "and", "any", "are", "as", "at", "be", "because",
 "been", "before", "being", "below", "between", "both", "but", "by",
  "could", "did", "do", "does", "doing", "down", "during", "each", "few",
   "for", "from", "further", "had", "has", "have", "having", "he", "he'd",
    "he'll", "he's", "her", "here", "here's", "hers", "herself", "him",
     "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've",
      "if", "in", "into", "is", "it", "it's", "its", "itself", "let's",
       "me", "more", "most", "my", "myself", "nor", "of", "on", "once",
        "only", "or", "other", "ought", "our", "ours", "ourselves", "out",
         "over", "own", "same", "she", "she'd", "she'll", "she's", "should",
          "so", "some", "such", "than", "that", "that's", "the", "their", "theirs",
           "them", "themselves", "then", "there", "there's", "these", "they", "they'd",
            "they'll", "they're", "they've", "this", "those", "through", "to", "too",
             "under", "until", "up", "very", "was", "we", "we'd", "we'll", "we're", "we've",
              "were", "what", "what's", "when", "when's", "where", "where's", "which", "while",
               "who", "who's", "whom", "why", "why's", "with", "would", "you", "you'd", "you'll",
                "you're", "you've", "your", "yours", "yourself", "yourselves" ];

function createWordCountMap(wordsArray) {
    var wordCountMap = {};

    wordsArray.forEach(function (key) {
        if (wordCountMap.hasOwnProperty(key)) {
          wordCountMap[key]++;
        } else {
          wordCountMap[key] = 1;
        }
    });
    return wordCountMap;
}

// Return an ordered array based on count with only keys in both wordsMaps
function getCommonWords (wordCountMap1, wordCountMap2) {
    var commonWords = [];
    /*[
        {
            word: x,
            count: wordCountMap1[x] + wordCountMap2[x]
        },
        ...
    ]*/

    Object.entries(wordCountMap1).forEach(entry => {
        let word = entry[0];
        if (wordCountMap2.hasOwnProperty(word) && !stopWords.includes(word.toLowerCase())) {
            let count1 = entry[1];
            let count2 = wordCountMap2[word];

            commonWords.push({
                word: word,
                count: count1 + count2
            });
        }
    });

    // Order commonWords, higher count = higher precedence
    commonWords.sort((a, b) => (a.count > b.count) ? -1 : 1);
    return commonWords;
}

function getCommonWordPhrases(song1Lyrics, song2Lyrics) {
    // Remove new lines, commas, question/exclamation marks, and parentheses
    song1LyricsFiltered = song1Lyrics.replace(/\\n|\,|\?|\!|\(|\)/g, '');
    song2LyricsFiltered = song2Lyrics.replace(/\\n|\,|\?|\!|\(|\)/g, '');

    song1WordsArray = song1LyricsFiltered.split(' ');
    song2WordsArray = song2LyricsFiltered.split(' ');

    song1WordCountMap = createWordCountMap(song1WordsArray);
    song2WordCountMap = createWordCountMap(song2WordsArray);

    let commonWords = getCommonWords(song1WordCountMap, song2WordCountMap);

    let results = [];
    let song1LyricLines = song1Lyrics.split(/\\n/);
    let song2LyricLines = song2Lyrics.split(/\\n/);
    let numResults = Math.min(5, commonWords.length);
    for (i = 0; i < numResults; i++) {
        let word = commonWords[i].word;
        let lyrics1 = [];
        let lyrics2 = [];

        song1LyricLines.forEach(l => {
            if(l.replace(/\,|\?|\!|\(|\)/g, '').split(' ').includes(word)) {
                lyrics1.push(l);
            }
        });
        song2LyricLines.forEach(l => {
            if(l.replace(/\,|\?|\!|\(|\)/g, '').split(' ').includes(word)) {
                lyrics2.push(l);
            }
        });

        results.push({
            word: word,
            song1Lyrics: lyrics1,
            song2Lyrics: lyrics2
        });
    }

    return results;
}

module.exports = function(router) {
    var songsCompareRoute = router.route('/compare');

    songsCompareRoute.get(async (req, res) => {
        if (Object.keys(req.query).length == 2 && req.query.song1 && req.query.song2) {
            // Search for both songs, not case sensitive
            var song1 = await Song.findOne({'songTitle': { $regex : new RegExp(req.query.song1, "i") }});
            var song2 = await Song.findOne({'songTitle': { $regex : new RegExp(req.query.song2, "i") }});
            var commonWordPhrases = getCommonWordPhrases(song1.lyrics, song2.lyrics)
            if (song1 && song2) {
                res.status(200).send({
                    message: "OK",
                    data: {
                        topFiveCommonWords: commonWordPhrases
                    }
                });
            } else {
                res.status(404).send({
                    message: "Could not successfully find both songs. Please check the provided songs again.",
                    data: {}
                });
            }
        } else {
            res.status(400).send({
                message: "This is not a valid GET type for compare.",
                data: {}
            });
        }
    });

    return router;
}
