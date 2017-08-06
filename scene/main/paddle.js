/**
 * Created by Chambers on 2017/8/2.
 */
var Paddle = function (game) {
    // var image = imageFromPath('paddle.png')
    // var o = {
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     speed: 15,
    // }
    var o = game.imageByName('paddle')
    o.x = 100
    o.y = 250
    o.speed = 15

    var paddle = o
    o.move = function (x) {
        if(x < 0){
            x = 0
        }
        if(x > canvas.width - o.image.width){
            x = canvas.width - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function () {
        o.move(paddle.x - paddle.speed)
    }
    o.moveRight = function () {
        o.move(paddle.x + paddle.speed)
    }
    o.collide = function (ball) {
        if(ball.y + ball.image.height > o.y){
            if(ball.x > o.x && ball.x < o.x + o.image.width){
                log('hit')
                return true
            }
        }
        return false
    }
    return o
}