import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import Card from "./Card.js";

function CandyCoverageGame({options, setOptions, highScore, setHighScore}) {
    const [game, setGame] = useState([])
    const [selectedCount, setSelectedCount] = useState(0)
    const [selectedIndexes, setSelectedIndexes] = useState([])
    const [shown, setShown] = useState([])
    const [topOfDeck, setTopOfDeck] = useState(0)
    const [score, setScore] = useState(0)
    const [hintMessage, setHintMessage] = useState("The largest match is")
    const [hintOpacity, setHintOpacity] = useState(0)

    let cardIds = [
      "00", "01", "02", "03", "04", "05", "06",
      "07", "08", "09", "10", "11", "12", "13",
      "14", "15", "16", "17", "18", "19", "20",
      "21", "22", "23", "24", "25", "26", "27",
      "28", "29", "30", "31", "32", "33", "34"];

    let cardCandies = [
      [1, 2, 3], [4, 8, 12], [5, 10, 15], [6, 11, 13], [7, 9, 14], [1, 4, 5], [2, 8, 10],
      [3, 13, 14], [6, 9, 15], [7, 11, 12], [1, 6, 7], [2, 9, 11], [3, 12, 15], [4, 10, 14],
      [5, 8, 13], [1, 8, 9], [2, 12, 14], [3, 5, 6], [4, 11, 15], [7, 10, 13], [1, 10, 11],
      [2, 13, 15], [3, 4, 7], [5, 9, 12], [6, 8, 14], [1, 12, 13], [2, 4, 6], [3, 9, 10],
      [5, 11, 14], [7, 8, 15], [1, 14, 15], [2, 5, 7], [3, 8, 11], [4, 9, 13], [6, 10, 12]];

    useEffect(() => {
        const newGame = []
        for (let i = 0; i < 35; i++) {
            const c = {
                cardId: cardIds[i],
                cardCandies: cardCandies[i],
                selected: false,
                flipped: false,
            }
            newGame.push(c)
        }

        const shuffledGame = newGame.sort(() => Math.random() - 0.5)
        setGame(shuffledGame)
        setShown(shuffledGame.slice(0, 2*options))
        setTopOfDeck(2*options)
  }, [])

  useEffect(() => {
      if (score > highScore) {
          setHighScore(score)
      }
  }, [game])

  if (game.length === 0) return <div>loading...</div>
  else {
    return (
            <div id="game">
              <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
              <h1>Score: {score}</h1>
            <div id="cards">
              {shown.map((card, index) => (
                      <div className="card" key={index}>
                      <Card
                  id={index}
                  cardId={card.cardId}
                  cardCandies={card.cardCandies}
                  flipped={card.flipped}
                  game={game}
                  shown={shown}
                  setShown={setShown}
                  selectedCount={selectedCount}
                  setSelectedCount={setSelectedCount}
                  selectedIndexes={selectedIndexes}
                  setSelectedIndexes={setSelectedIndexes}
                  topOfDeck={topOfDeck}
                  setTopOfDeck={setTopOfDeck}
                      />
                      </div>
              ))}
            </div>
            <div id="match">
              <button className="match" onClick={() => {
                    let scoreMap = [0, 0, 1, 3, 6, 10];
                    if (selectedCount > 1) {
                        setScore(x => x + scoreMap[selectedCount])
                        const newGame = [...game]
                        setGame(newGame)

                        const newIndexes = [...selectedIndexes]
                        newIndexes.push(false)
                        setSelectedIndexes(newIndexes)
                    } else {
                        const newIndexes = [...selectedIndexes]
                        newIndexes.push(true)
                        setSelectedIndexes(newIndexes)
                    }
                }
              }>Take Match!</button>
              <button className="match" onClick={() => {
                let largestMatch = 1;
                for (let a = 0; a < 2*options; a++) {
                  if (game[a].flipped) continue;
                  for (let b = a + 1; b < 2*options; b++) {
                    if (game[b].flipped) continue;
                    for (let c = b + 1; c < 2*options; c++) {
                      if (game[c].flipped) continue;
                      for (let d = c + 1; d < 2*options; d++) {
                        if (game[d].flipped) continue;
                        for (let e = d + 1; e < 2*options; e++) {
                          if (game[e].flipped) continue;
                          let allCandies = [game[a].cardCandies,
                                            game[b].cardCandies,
                                            game[c].cardCandies,
                                            game[d].cardCandies,
                                            game[e].cardCandies].flat();
                          if (new Set(allCandies).size === allCandies.length) {
                            largestMatch = 5
                          }
                        }
                        let allCandies = [game[a].cardCandies,
                                          game[b].cardCandies,
                                          game[c].cardCandies,
                                          game[d].cardCandies].flat();
                        if (new Set(allCandies).size === allCandies.length) {
                          largestMatch = largestMatch < 4 ? 4 : largestMatch;
                        }
                      }
                      let allCandies = [game[a].cardCandies,
                                        game[b].cardCandies,
                                        game[c].cardCandies].flat();
                      if (new Set(allCandies).size === allCandies.length) {
                        largestMatch = largestMatch < 3 ? 3 : largestMatch;
                      }
                    }
                    let allCandies = [game[a].cardCandies,
                                      game[b].cardCandies].flat();
                    if (new Set(allCandies).size === allCandies.length) {
                              largestMatch = largestMatch < 2 ? 2 : largestMatch;
                    }
                  }
                }
                setHintOpacity(1)
                setHintMessage("The largest match is " + largestMatch)
                setTimeout(() => setHintOpacity(0), 3000)
                console.log(shown)
              }
            }>Hint!</button>
            </div>
            <div id="hint" className="body" style={{
                   opacity: hintOpacity,
                   transition: "opacity 1s"
                 }}>
              {hintMessage}
            </div>
            <style jsx global>
{`
    .match {
      background: #00ad9f;
      border-radius: 10px;
      font-weight: 1000;
      color: #fff;
      border: none;
      padding: 17px 25px;
      margin-left: 18px;
      cursor: pointer;
      font-size: xx-large
      enabled: ${selectedIndexes.length > 2}
    }
`}
            </style>
        </div>
    )
  }
}

export default CandyCoverageGame;
