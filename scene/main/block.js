/**
 * Created by Chambers on 2017/8/2.
 */
var Block = function (game,postion) {
    var p = postion
    var img = game.imageByName('block')
    // var image = imageFromPath('block.png')
    var o = {
        x: p[0],
        y: p[1],
        alive: true,
        lifes: p[2] || 1,
    }
    o.image = img.image
    o.w = img.w
    o.h = img.h
    o.kill = function () {
        o.lifes--
        if(o.lifes < 1){
            o.alive = false
        }
    }

    o.collide = function (b) {
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
    return o
}