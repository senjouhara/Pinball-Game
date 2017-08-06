/**
 * Created by Chambers on 2017/8/5.
 */
var Scene = function (game) {
    var s = {
        game: game,
        ball: null,
    }
    //initialize
    var paddle = Paddle(game)
    s.ball = Ball(game)

    var score = 0
    blocks = loadLevel(game,1)

    var paused = false

    game.registerAction('a', function () {
        paddle.moveLeft()
    })
    game.registerAction('d', function () {
        paddle.moveRight()
    })
    game.registerAction('f', function () {
        s.ball.fire()
    })


    s.update = function () {
        if(window.paused){
            return
        }
        s.ball.move()
        //end game
        if(s.ball.y > paddle.y + paddle.image.height){
            var end = SceneEnd.new(game)
            game.replaceScene(end)
        }
        //判断相撞
        if(paddle.collide(s.ball)){
            s.ball.rebound()
        }
        //判断 ball 和 blocks 相撞
        for(var i = 0; i < blocks.length; i++){
            var block = blocks[i]
            if(block.collide(s.ball)){
                block.kill()
                s.ball.rebound()
                score += 100
            }
        }
    }

    s.draw = function () {
        //background
        game.context.fillStyle = "#482455"
        game.context.fillRect(0,0,canvas.width,canvas.height)
        game.drawImage(paddle)
        game.drawImage(s.ball)
        for(var i = 0; i < blocks.length; i++){
            var block = blocks[i]
            if(block.alive){
                game.drawImage(block)
            }
        }
        // draw labels
        game.context.fillText('Score: ' + score, 10, 290)

    }

    return s
}