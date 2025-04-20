class animalSpriteRef extends Phaser.Scene {
    constructor() {
        super('animalSpriteRef');
    }

    preload() {
        // Load the panda sprite sheets
        this.load.spritesheet('pandaHappy', '/assets/Happy.png', {frameWidth: 64, frameHeight: 64});
        //this.load.spritesheet('pandaCry', '/src/AnimalTings/AnimalAssets/PandaSprite/PandaCry.png', {frameWidth: 64, frameHeight: 64});
        
        // Debug tool
        this.textures.on('addtexture', (key) => {
            console.log(`Texture loaded: ${key}`);
        });
    }

    create() {
        // Create a sprite to display the animation
        this.player = this.add.sprite(100, 100, 'pandaHappy');
        
        // Create the animation
        this.anims.create({
            key: 'pandaHappy',
            frames: this.anims.generateFrameNumbers('pandaHappy', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        // Play the animation
        this.player.play('pandaHappy').setOrigin(0.5, 0.5).setScale(2);
    }
}

export default animalSpriteRef;
