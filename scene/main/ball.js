/**
 * Created by Chambers on 2017/8/2.
 */
var Ball = function (game) {
    // var image = imageFromPath('ball.png')
    // var o ={
    //     image: image,
    //     x: 100,
    //     y: 100,
    //     speedX: 10,
    //     speedY: 10,
    //     fired: false,
    // }
    var o = game.imageByName('ball')
    o.x = 100
    o.y = 100
    o.speedX = 5
    o.speedY = 5
    o.fired = false

    o.fire = function () {
        o.fired = true
    }
    o.move = function () {
        if(o.fired){
            if(o.x < 0 || o.x > canvas.width - o.image.width){
                o.speedX *= -1
            }
            if(o.y < 0 || o.y > canvas.height - o.image.height){
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.rebound = function () {
        o.speedY *= -1
    }

    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    return o
}