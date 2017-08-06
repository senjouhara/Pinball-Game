/**
 * Created by Chambers on 2017/8/2.
 */
var Game = function (fps, images, runCallback) {
    var g = {
        scene: null,
        actions: {},
        keydowns: {},
        images: {},
    }
    //var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    //draw
    g.drawImage = function (guaImage) {
        g.context.drawImage(guaImage.image,guaImage.x,guaImage.y)
    }

    //event
    window.addEventListener('keydown', function(event){
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event){
        g.keydowns[event.key] = false
    })
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    //update
    g.update = function () {
        g.scene.update()
    }
    //draw
    g.draw = function () {
        g.scene.draw()
    }

    //timer
    window.fps = 30
    var runLoop = function () {
        log(window.fps)
        var actions = Object.keys(g.actions)
        for(var i = 0; i < actions.length; i++){
            var key = actions[i]
            if(g.keydowns[key]){
                // 如果按键被按下, 调用注册的 action
                g.actions[key]()
            }
        }
        //update
        g.update()
        //clear
        context.clearRect(0, 0, canvas.width,canvas.height)
        //draw
        g.draw()
        //next run loop
        setTimeout(function () {
            runLoop()
        },1000/window.fps)
    }


    //load images
    var loads = []
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++){
        let name = names[i]
        var path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function () {
            //save to g.images
            g.images[name] = img
            //when load succeed run the game
            loads.push(1)
            // log('load images', loads.length, names.length)
            if(loads.length == names.length){
                // log('loag images',g.images)
                g.__start()
            }
        }
    }

    g.imageByName = function (name) {
        log('image by name', g.images)
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    g.runWithScene = function (scene) {
        g.scene = scene
        log(g.scene)
        setTimeout(function () {
            runLoop()
        },1000/fps)
    }

    g.replaceScene = function (scene) {
        g.scene = scene
    }

    g.__start = function () {
        log('game start')
        runCallback(g)

    }

    return g
}