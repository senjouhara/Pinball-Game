/**
 * Created by Chambers on 2017/8/6.
 */
class SceneTitle extends Scene{
    constructor(game) {
        super(game)
        game.registerAction('k', function () {
            var s = MainScene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillText('press k to start game',canvas.width/2,canvas.height/2)
    }
}
