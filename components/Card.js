import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";

function imgName(cardId) {
    return "cards/card"+cardId+".png"
}

function Card({
    id,
    game,
    shown,
    setShown,
    selectedCount,
    setSelectedCount,
    selectedIndexes,
    setSelectedIndexes,
    flippedIndexes,
    setFlippedIndexes,
    topOfDeck,
    setTopOfDeck,
}) {
    const [selected, setSelect] = useState(false)
    const [flipped, setFlip] = useState(false)
    const [tilted, setTilted] = useState(0)
    const {transform, opacity} = useSpring({
        opacity: flipped ? 0 : 1,
        transform: `perspective(600px) rotateY(${flipped ? 0 : 180}deg) scale(${selected ? 1.15 : 1}) rotateZ(${tilted * 5}deg)`,
        config: {mass: 5, tension: 500, friction: 80},
    })

    useEffect(() => {
        if (selectedIndexes[selectedCount] === true && selectedIndexes.indexOf(id) > -1) {
            setTimeout(() => {
                rejectSelection()
                setSelect(state => !state)
                setSelectedCount(0)
                setSelectedIndexes([])
            }, 10)
        } else if (selectedIndexes[selectedCount] === false && selectedIndexes.indexOf(id) > -1) {
            setFlip(flip => !flip)
            setSelectedCount(0)
            setSelectedIndexes([])
            setTimeout(() => {
                let sii = selectedIndexes.indexOf(id)
                if (topOfDeck + sii < 35) {
                    console.log(`TOD @ ${sii}: ` + topOfDeck)
                    shown[id].cardId = game[topOfDeck+sii].cardId
                    shown[id].cardCandies = game[topOfDeck+sii].cardCandies
                    shown[id].flipped = game[topOfDeck+sii].flipped
                    setShown(shown)
                    setTopOfDeck(tod => tod + 1)
                    setFlip(flip => !flip)
                    setSelect(state => !state)
                } else {
                    game[id].flipped = true
                    setSelect(state => !state)
                }
            }, 1000)
        }
    }, [selectedIndexes])

    const rejectSelection = () => {
        setTilted(3)
        setTimeout(() => setTilted(-3), 100)
        setTimeout(() => setTilted(3), 200)
        setTimeout(() => setTilted(-3), 300)
        setTimeout(() => setTilted(0), 400)
    }

    const isMatch = (indexes) => {
        let allCandies = indexes.map(index => {
          return game[index].cardCandies;
        }).flat();
        return new Set(allCandies).size === allCandies.length;
    }
    
    const onCardClick = () => {
        if (!flipped) {
            if (!selected) {
                if (isMatch(selectedIndexes.concat([id]))) {
                    setSelect(state => true)
                    setSelectedCount(selectedCount + 1)
                    const newIndexes = [...selectedIndexes]
                    newIndexes.push(id)
                    setSelectedIndexes(newIndexes)
                } else {
                    rejectSelection()
                }
            } else {
                setSelect(state => false)
                setSelectedCount(selectedCount - 1)
                const newIndexes = selectedIndexes.filter(i => i != id)
                setSelectedIndexes(newIndexes)
            }
        }
    }

  return (
    <div onClick={onCardClick}>
      <a.div
        className="c back"
        style={{
          opacity: opacity.interpolate(o => 1 - o),
          transform,
        }}
      />
      <a.div
        className="c front"
        style={{
            opacity,
            transform: transform.interpolate(t => `${t} rotateY(180deg)`),
            "backgroundImage": "url(" + imgName(shown[id].cardId, true) + ")",
        }}
          />
    </div>
  )
}

export default Card;
