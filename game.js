export class Game extends Phaser.Scene {
    constructor() {
      super({ key: 'game' });
    }
    preload() {
      //With the prelorad method, we load all the resources.
      this.load.image('background', 'background.png');
      this.load.image('sun','sun.png');
      this.load.image('clouds','clouds.png');
      this.load.image('gameover', 'gameover.png');
      this.load.image('plataforma','plataforma.png');
      this.load.image('platform','platform.png');
      this.load.image('madera','madera.png');
      this.load.audio('punchaudio', 'super-punch-mma.mp3');
      this.load.audio('provocacion', 'Provocacion.mp3');
      this.load.audio('sonidomadera', 'sonidomadera.mp3');
      this.load.audio('remate', 'remate.mp3');
      this.load.spritesheet('huevitorey','HuevitoRey-Sheet.png',{ frameWidth: 64, frameHeight: 64 } );
      this.load.spritesheet('vendedor','VendedorLena-Sheet.png',{ frameWidth: 64, frameHeight: 64 } );
      this.load.spritesheet('barravida','barravida.png',{ frameWidth: 247, frameHeight: 55 } );
      this.load.spritesheet('barravida1','barravida1.png',{ frameWidth: 247, frameHeight: 55 } );
    }
       
    create() {
      //With this create method, we will create the physical and positions of all our elements.
      this.golpeando = false;
      this.golpeandoDuracion = 0;
      this.physics.world.setBoundsCollision(true,true,true,false);
      this.add.image(960, 540, 'background');
      this.add.image(960, 540, 'sun');
      this.add.image(960, 540, 'clouds');
      this.add.image(960, 900, 'plataforma');
      this.barravida1 = this.add.sprite(1200, 400, 'barravida1');
      this.barravida = this.add.sprite(750, 400, 'barravida');
      this.gameoverImage = this.add.image(960, 470, 'gameover');
      this.audiogolpear = this.sound.add('punchaudio');
      this.audioprovocacion = this.sound.add('provocacion');
      this.audiomadera = this.sound.add('sonidomadera');
      this.audioremate = this.sound.add('remate');
      this.gameoverImage.visible = false;
      this.platform = this.physics.add.image(960,900,'platform').setImmovable();
      this.platform.body.allowGravity = false;
      this.huevitorey = this.physics.add.sprite(1100, 820, 'huevitorey');
      this.huevitorey.vida = 200;
      this.madera = this.physics.add.image(-100,-100,'madera');
      this.madera.visible = false;
      this.vendedor = this.physics.add.sprite(800,820,'vendedor');
      this.vendedor.vida = 100;
      this.huevitorey.setCollideWorldBounds(false);
      this.physics.add.collider(this.huevitorey, this.platform);
      this.physics.add.collider(this.vendedor, this.platform);
      this.physics.add.collider(this.madera, this.platform);
     
      this.anims.create({
        //Here we will create all our animations
        key: 'idle',
        frames: this.anims.generateFrameNumbers('huevitorey', { start: 1, end: 5 }),
        frameRate: 8,
        repeat: -1,
        yoyo: true,
        });
      this.anims.create({
        key: 'correrD',
        frames: this.anims.generateFrameNumbers('huevitorey', { start: 13, end: 17 }),
        frameRate: 20,
        repeat: -1,
        yoyo: true,
        });
      this.anims.create({
        key: 'correrI',
        frames: this.anims.generateFrameNumbers('huevitorey', { start: 7, end: 11 }),
        frameRate: 20,
        repeat: -1,
        yoyo: true,
        });
      this.anims.create({
        key: 'golpear',
        frames: this.anims.generateFrameNumbers('huevitorey', { start: 18, end: 18 }),
        frameRate: 10,
        repeat: 1,
        yoyo: true,
        });
      this.anims.create({
        key: 'barradevida',
        frames: this.anims.generateFrameNumbers('barravida', { start: 0, end: 16 }),
        frameRate: 5,
        repeat: 1,
        yoyo: true,
        });   
      this.anims.create({
        key: 'barradevida1',
        frames: this.anims.generateFrameNumbers('barravida1', { start: 0, end: 16 }),
        frameRate: 5,
        repeat: 1,
        yoyo: true,
        });          
      this.anims.create({
        key: 'idle1',
        frames: this.anims.generateFrameNumbers('vendedor', { start: 0, end: 2 }),
        frameRate: 8,
        repeat: -1,
        yoyo: true,
        });
      this.anims.create({
        key: 'correrD1',
        frames: this.anims.generateFrameNumbers('vendedor', { start: 3, end: 8 }),
        frameRate: 8,
        repeat: -1,
        yoyo: true,
        });
       this.anims.create({
        key: 'correrI1',
        frames: this.anims.generateFrameNumbers('vendedor', { start: 9, end: 14 }),
        frameRate: 8,
        repeat: -1,
        yoyo: true,
        });
      this.anims.create({
        key: 'lanzar',
        frames: this.anims.generateFrameNumbers('vendedor', { start: 15, end: 17 }),
        frameRate: 8,
        repeat: -1,
        yoyo: false,
        });
                    
      //Here we will configure the controls for in this case 2 players on the same PC.
      this.cursors = this.input.keyboard.createCursorKeys();
      this.player2 = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
      });
    }
    update(){
      //In this Update method the entire logic of the game is configured and executed in loop.
      this.barravida.anims.play('barradevida',true);//Execution of life bars/
      this.barravida1.anims.play('barradevida1',true);  
     if (this.cursors.left.isDown){//Here the animation of the main character is controlled.
       this.huevitorey.setVelocityX(-200);
       this.huevitorey.anims.play('correrI',true); 
      }
     else if (this.cursors.right.isDown){ 
       this.huevitorey.setVelocityX(200);
       this.huevitorey.anims.play('correrD',true);
     } 
      else {
      this.huevitorey.setVelocityX(0);
      this.huevitorey.anims.play('idle',true); 
       if (this.cursors.up.isDown && !this.golpeando){
         if (this.physics.overlap(this.huevitorey, this.vendedor)) {
          this.vendedor.vida -= 10;
          this.barravida.setScale(this.vendedor.vida / 100, 1);
          this.golpeando = true;
          this.golpeandoDuracion = 50;
          this.audiogolpear.play(); 
         } }
          if (this.golpeando){        
         this.huevitorey.anims.play('golpear',true);
           if (this.huevitorey.anims.currentFrame.index === 18){
              this.golpeando = false;
           }                             
            }
         if (this.golpeandoDuracion > 0) {
          this.golpeandoDuracion--;
           } else {
          this.golpeando = false;
          }
        }
      if (this.player2.left.isDown){//Character movement control 2.
        this.vendedor.setVelocityX(-100);
        this.vendedor.anims.play('correrI1',true); 
      }
      else if (this.player2.right.isDown){
         this.vendedor.setVelocityX(100);
         this.vendedor.anims.play('correrD1',true); 
      }
      else {
        this.vendedor.setVelocityX(0);
        this.vendedor.anims.play('idle1',true); 
        if (this.player2.up.isDown){
          this.vendedor.anims.play('lanzar',true);
          this.madera.visible = true;
          this.madera.setPosition(this.vendedor.x,this.vendedor.y);
          this.tweens.add({
            targets: this.madera,
            x: 1000,
            y: 800,
            duration: 300,
            onComplete: function(){
            this.physics.overlap(this.madera,this.huevitorey, function(madera,huevitorey){
               huevitorey.vida -=1;
               this.audiomadera.play(); 
               this.barravida1.setScale(this.huevitorey.vida / 200, 1);
             },null,this);
             this.madera.setPosition(-100,-100);
             this.madera.visible =false;
            },
              onCompleteScope: this
           });               
         }          
      }
      if (this.vendedor.vida >= 0) {
        this.barravida.setScale(this.vendedor.vida / 100, 1);
      } else {
        this.barravida.setScale(0, 1);
      } 
     if (this.huevitorey.y > 1080 || this.vendedor.y > 1080 || this.vendedor.vida <=0 || this.huevitorey.vida <=0){
     this.gameoverImage.visible = true;
     this.scene.pause();
     }
     if (this.vendedor.vida === 0 || this.vendedor.y > 1080){
      this.audioprovocacion.play();
     }
     if (this.huevitorey.vida === 0 || this.huevitorey.y > 1080){
      this.audioremate.play();
     }    
     console.log('vida de vendedor:', this.vendedor.vida);
     console.log('vida de huevito:', this.huevitorey.vida);
    } 
} 
