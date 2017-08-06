/**
 * Created by Chambers on 2017/8/5.
 */
class SceneEnd extends Scene{
    constructor(game) {
        super(game)
        game.registerAction('r', function () {
            var s = new SceneTitle(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillText('Game Over press r to start game',canvas.width/2,canvas.height/2)
    }
}

