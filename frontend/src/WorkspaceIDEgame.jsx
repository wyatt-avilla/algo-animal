import React, { useEffect, useRef } from 'react'
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
      scene: [animalSpriteRef],
    }

    const game = new Phaser.Game(config)

    return () => {
      game.destroy(true)
    }
  }, [])

  const handleAuth = () => {
    console.log('🔐 Login or Signup button clicked')
    // Add redirect or login logic here (e.g., Auth0 loginWithRedirect())
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button
        onClick={handleAuth}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          fontWeight: 'bold',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        🔐 Login / Signup
      </button>

      <h2>Phaser Game Area</h2>
      <div
        ref={gameRef}
        style={{
          width: '480px',
          height: '320px',
          border: '2px solid #333',
          margin: '0 auto',
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
