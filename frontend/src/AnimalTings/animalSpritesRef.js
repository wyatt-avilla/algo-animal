class animalSpriteRef extends Phaser.Scene {

    constructor (){
        super('animalSpriteRef')
    }

    preload() {

        // Load the panda sprite sheets 
        this.load.spritesheet('pandaHappy', 'frontend/src/AnimalTings/AnimalAssets/animal.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('pandaCry', 'frontend/src/AnimalTings/AnimalAssets/animal.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('pandaEating', 'frontend/src/AnimalTings/AnimalAssets/animal.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('pandaIdle', 'frontend/src/AnimalTings/AnimalAssets/animal.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('pandaIdleBlinking', 'frontend/src/AnimalTings/AnimalAssets/animal.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('pandaResting', 'frontend/src/AnimalTings/AnimalAssets/animal.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('pandaSitting', 'frontend/src/AnimalTings/AnimalAssets/animal.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('pandaSleep', 'frontend/src/AnimalTings/AnimalAssets/animal.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('pandaSoFull', 'frontend/src/AnimalTings/AnimalAssets/animal.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('pandaTalkingSitting', 'frontend/src/AnimalTings/AnimalAssets/animal.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('pandaThinking', 'frontend/src/AnimalTings/AnimalAssets/animal.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('pandaWave', 'frontend/src/AnimalTings/AnimalAssets/animal.png', {frameWidth: 64, frameHeight: 64})

        // Load other sprite sheets later

        // Debug tool
        this.textures.on('addtexture', (key) => {
            console.log(`Texture loaded: ${key}`)
        });

    }

    create() {
        
    }

}

