//  This file is responsible for creating a 
//  Phaser game instance and rendering it in a React component.
//  It uses the useRef and useEffect hooks to manage the game instance lifecycle.
//  The game is configured with a width and height, and the parent element is set to the ref created by useRef.
// This file also imports the animalSpriteRef and selectedAnimalAndActions classes, which are Phaser scenes
// to userGamePlay.jsx


import React, {useEffect, useRef} from 'react'
import Phaser from 'phaser'
import animalSpriteRef from './animalSpritesRef'
//import selectedAnimalAndActions from './AnimalTings/selectedAnimalAndActions'

const WorkspaceIDEGame = () => {
  const gameRef = useRef(null)
  
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 480,
      height: 320,
      parent: gameRef.current,
      scene: [animalSpriteRef]
    }

    const game = new Phaser.Game(config)
    
    return () => {
      game.destroy(true)
    }
  }, [])
  
  return (
    <div>
      <h2>Phaser Game Area</h2>
      <div
        ref={gameRef}
        style={{
          width: '480px',
          height: '320px',
          border: '2px solid #333',
        }}
      />
    </div>
  )

}

// This part is responsible for displaying leet code problems
// and the user's code editor.
// It uses the useEffect hook to fetch the problems from the server
// and the useState hook to manage the problems state.
// It also uses the useRef hook to create a reference to the code editor.
// The code editor is created using the CodeMirror library.
// It also uses the useState hook to manage the editor instance state.
// It also uses the useEffect hook to fetch the problems from the server
// and the useState hook to manage the problems state.
// It also uses the useRef hook to create a reference to the code editor.





export default WorkspaceIDEGame
