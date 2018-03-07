let friends = require('../data/friends.js');
let util = require('../data/util.js')


module.exports = function(app) {

  app.get('/api/1.0/friends', function(req, res) {
    res.json(friends);
  })

  app.post('/api/1.0/friends', function(req, res) {

    let yourName = req.body.name
    let yourImageUrl = req.body.imageUrl

    let yourScores = [];
    // Turns question answers into valid scores
    for (let i = 1; i <= 10; i++) {
      yourScores.push(Number(req.body['question' + i].split(" ")[0]));
    }

    // Find best match
    let yourScoreSum = util.getScoreTotal(yourScores);
    let bestMatch = {
      "name": null,
      "imageUrl": null,
      "scoreDifference": null
    }

    // Iterate through all existing users
    for (let user = 0; user < friends.length; user++) {
      let userScores = friends[user].scores
      let userScoreSum = util.getScoreTotal(userScores);

      // get score difference
      let diff = Math.abs(userScoreSum - yourScoreSum);

      // TODO: optimize this routine
      if (bestMatch.scoreDifference) {
        if (bestMatch.scoreDifference > diff) {
          bestMatch.scoreDifference = diff
          bestMatch.name = friends[user]["name"]
          bestMatch.imageUrl = friends[user]["photo"]
        }
      } else {
        bestMatch.scoreDifference = diff
        bestMatch.name = friends[user]["name"]
        bestMatch.imageUrl = friends[user]["photo"]
      }
    }

    // Add new user to friends
    let newUser = {
      "name": yourName,
      "photo": yourImageUrl,
      "scores": yourScores
    }
    friends.push(newUser);


    res.render('survey', 
      { 
        modalActive: "is-active", 
        matchName: bestMatch.name,
        imageUrl: bestMatch.imageUrl
      })

  })

  app.get('/api/1.0/clear', function(res, res) {
    friends = [];
    res.redirect('/api/1.0/friends')
  })

}
