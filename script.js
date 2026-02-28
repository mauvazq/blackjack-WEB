// <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
let deck = [ "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC",
  "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS",
  "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH",
  "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD"]

deck = _.shuffle(deck)

points = 0
src = "images/cartas/"


const pull = (player, playerPoints) =>{
    card = deck.pop()
    card = card + ".png"
    nsrc = src + card

    
    
    img = document.createElement("img")
    img.setAttribute("src", nsrc)
    img.setAttribute("class", "carta")
    img.setAttribute("alt", "carta")

    p = document.getElementById(player)
    p.appendChild(img)

    if(points === 0) {
      points = calculatePoints(card, points)
    } else {
      points += calculatePoints(card, points)
    }
    evaluateP()
    document.getElementById(playerPoints).innerHTML = points
    
    
    
    
  }
  
  const evaluateP = () => {
    if (points > 21) {
      document.getElementById("hitButton").disabled = true;
      document.getElementById("standButton").disabled = true;
      document.getElementById("winner").innerHTML = "Dealer wins!"
    } else if (points === 21) {
      document.getElementById("hitButton").disabled = true;
      document.getElementById("standButton").disabled = true;
      document.getElementById("winner").innerHTML = "You win!"
    }
  }
    
    const calculatePoints = (card, points) => {
      let pointsTemp = 0
      if (card[0] === "A" && points + 11 <= 21) {
        pointsTemp += 11
      } else if (card[0] === "A") {
        pointsTemp += 1
      } else if (card[0] === "J" || card[0] === "Q" || card[0] === "K") {
        pointsTemp += 10
      } else if (card[0] === "1" && card[1] === "0") {
        pointsTemp += 10
      } else {
        pointsTemp += parseInt(card[0])
      }

      return pointsTemp
      
    }

    const stand = () => {
      document.getElementById("dealerCard1").remove()
      document.getElementById("dealerCard2").remove()

      document.getElementById("hitButton").disabled = true;
      document.getElementById("standButton").disabled = true;
      
      dPoints = 0
      
      do {
        card = deck.pop()
        card = card + ".png"
        nsrc = src + card
        
        img = document.createElement("img")
        img.setAttribute("src", nsrc)
        img.setAttribute("class", "carta")
        img.setAttribute("alt", "carta")
        
        p = document.getElementById("cd")
        p.appendChild(img)
        dPoints += calculatePoints(card, dPoints)
        document.getElementById("dealersPoints").innerHTML = dPoints
        
      } while (dPoints < points && dPoints < 22);
      
      
      setTimeout(() => {
        if( dPoints === points ) {
          document.getElementById("winner").innerHTML = "No one wins!"
        } else if ( points > 21 ) {
          document.getElementById("winner").innerHTML = "Dealer wins!"
        } else if( dPoints > 21 ) {
          document.getElementById("winner").innerHTML = "You win!"
        } else {
          document.getElementById("winner").innerHTML = "Dealer wins!"
        }
      }, 100 );
      
      
      
    }