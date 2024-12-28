import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import Card from "./Card.js";

function CandyCoverGame({options, setOptions, highScore, setHighScore}) {
    const [game, setGame] = useState([])
    const [selectedCount, setSelectedCount] = useState(0)
    const [selectedIndexes, setSelectedIndexes] = useState([])
    const [shown, setShown] = useState([])
    const [topOfDeck, setTopOfDeck] = useState(0)
    const [score, setScore] = useState(0)
    
    let cardIds = [
      "00", "01", "02", "03", "04", "05", "06",
      "07", "08", "09", "10", "11", "12", "13",
      "14", "15", "16", "17", "18", "19", "20",
      "21", "22", "23", "24", "25", "26", "27",
      "28", "29", "30", "31", "32", "33", "34"];

    let cardCandies = [
      [1, 2, 3], [1, 4, 5], [1, 6, 7], [1, 8, 9], [1, 10, 11], [1, 12, 13], [1, 14, 15],
      [2, 4, 6], [2, 5, 7], [2, 8, 10], [2, 9, 11], [2, 12, 14], [2, 13, 15], [3, 4, 7],
      [3, 5, 6], [3, 8, 11], [3, 9, 10], [3, 12, 15], [3, 13, 14], [4, 8, 12], [4, 9, 13],
      [4, 10, 14], [4, 11, 15], [5, 8, 13], [5, 9, 12], [5, 10, 15], [5, 11, 14], [6, 8, 14],
      [6, 9, 15], [6, 10, 12], [6, 11, 13], [7, 8, 15], [7, 9, 14], [7, 10, 13], [7, 11, 12]];

    useEffect(() => {
        const newGame = []
        for (let i = 0; i < 35; i++) {
            const c = {
                cardId: cardIds[i],
                selected: false,
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
                    if (selectedCount > 2) {
                        setScore(x => x + 1)
                        const newGame = [...game]
                        newGame[selectedIndexes[0]].selected = true
                        newGame[selectedIndexes[1]].selected = true
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

export default TacoramaGame;
