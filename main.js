var canvas = document.getElementById('id-canvas');
var blocks = []

var loadLevel = function (game, n) {
    n = n - 1;
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function (event) {
        var k = event.key
        if (k == 'p') {
            //pause
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            //load level
            log(event)
            blocks = loadLevel(game, Number(k))
        }
    })

    var enableDrag = false
    //mouse event
    window.addEventListener('mousedown', function (event) {
        var x = event.offsetX
        var y = event.offsetY
        //check click ball
        log(x, y, 'click')

        if (game.scene.ball && game.scene.ball.hasPoint(x, y)) {
            enableDrag = true
        }
    })

    window.addEventListener('mousemove', function (event) {
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y,'drag')
        if (enableDrag && game.scene.ball) {
            game.scene.ball.x = x
            game.scene.ball.y = y
        }
    })

    window.addEventListener('mouseup', function (event) {
        var x = event.offsetX
        var y = event.offsetY
        enableDrag = false
    })

    //game speed
    document.querySelector('#id-input-speed').addEventListener('input', function (event) {
        var input = event.target

        window.fps = Number(input.value)
    })
}

var main = function () {
    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
        background: 'img/background.png',
    }

    var game = Game.instance(30, images, function (g) {
        var s = new SceneTitle(g)
        g.runWithScene(s)
    })
    enableDebugMode(game, true)

}

main()