/**
 * Created by Chambers on 2017/8/2.
 */
class Game {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        //event
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })
        this.init()
    }

    static instance(...args){
        this.i = this.i || new this(...args)
        return this.i
    }

    init() {
        var g = this
        var loads = []
        var names = Object.keys(this.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = this.images[name]
            let img = new Image()
            img.src = path
            img.onload = function () {
                //save to g.images
                g.images[name] = img
                //when load succeed run the game
                loads.push(1)
                // log('load images', loads.length, names.length)
                if (loads.length == names.length) {
                    // log('loag images',g.images)
                    g.__start()
                }
            }
        }
    }

    __start() {
        log('game start')
        this.runCallback(this)
    }

    update() {
        this.scene.update()
    }

    draw() {
        this.scene.draw()
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    drawImage(img) {
        this.context.drawImage(img.image, img.x, img.y)
    }

    imageByName(name) {
        var g = this
        log('image by name', g.images)
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    runWithScene(scene) {
        var g = this
        g.scene = scene
        setTimeout(function () {
            log(g)
            g.runLoop()
        }, 1000 / window.fps)
    }

    replaceScene(scene) {
        this.scene = scene
    }

    runLoop() {
        //event
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // 如果按键被按下, 调用注册的 action
                g.actions[key]()
            }
        }
        //update
        g.update()
        //clear
        g.context.clearRect(0, 0, canvas.width, canvas.height)
        //draw
        g.draw()
        //next run loop
        setTimeout(function () {
            g.runLoop()
        }, 1000 / window.fps)
    }
}
