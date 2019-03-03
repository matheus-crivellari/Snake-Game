class Snake {
    /**
     * Initializes the game.
     */
    constructor() {
        this.cv = document.getElementById("snake");
        this.tileDim = this.cv.width * 0.05;
        this.tLength = this.cv.width / this.tileDim;
        this.ctx = this.cv.getContext("2d");
        this.direction = "y";
        this.magnitude = 1;
        this.body = [];
        this.length = 3;
        this.startX = Math.floor(this.tLength / 2);
        this.startY = this.startX + 1;
        this.item = null;
        this.lastTime = null;
        this.speed = 250;
        this.score = 0;
        this.scoreDisplay = this.score;
        this.paused = true;

        this.reset();
        this.clear();
        this.render();
    }

    /**
     * Converts a pixel value from the canvas
     * to a tile number.
     * @param value Tile number.
     */
    toTile(value) {
        return Math.floor(value / this.cv.width * this.tLength);
    }

    /**
     * Converts a tile number to a pixel number from the canvas.
     * @param tile Pixel number.
     */
    toValue(tile) {
        return tile * this.tileDim;
    }

    /**
     * Clears the canvas with solid black color.
     */
    clear() {
        this.ctx.clearRect(0, 0, this.cv.width, this.cv.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.cv.width, this.cv.height);
    }

    /**
     * Resets the game logic.
     */
    reset() {
        this.paused = true;
        this.direction = "y";
        this.magnitude = 1;
        this.score = 0;
        this.scoreDisplay = 0;

        this.item = this.createItem(4, 4);
        this.lastTime = null;
        this.speed = 250;

        this.body = [];
        for (let i = 0; i < this.length; i++) {
            this.body.push(this.createSegment(this.startX, this.startY - i));
        }
    }

    /**
     * Creates a new body segment for the senke in
     * the specified X and Y tile.
     * @param tileX X tile number where to create the segment.
     * @param tileY Y yile number where to create the segment.
     */
    createSegment(tileX, tileY) {
        return {
            x: this.toValue(tileX),
            y: this.toValue(tileY)
        };
    }

    /**
     * Creates a new item at given position.
     * @param {int} tileX New item's x position (in tiles).
     * @param {int} tileY New item's y position (in tiles).
     */
    createItem(tileX, tileY) {
        return {
            x: this.toValue(tileX),
            y: this.toValue(tileY)
        };
    }

    /**
     * Renders the game screen.
     */
    render() {
        const me = this;

        if (this.item) {
            let { x, y } = this.item;
            this.ctx.fillStyle = "#00fa";
            this.ctx.strokeStyle = "blue";
            me.ctx.fillRect(x, y, me.tileDim, me.tileDim);
            me.ctx.strokeRect(x, y, me.tileDim, me.tileDim);
        }

        // Renders snake's body
        this.body.map(segment => {
            let { x, y } = segment;
            this.ctx.fillStyle = "#0f07";
            this.ctx.strokeStyle = "green";
            me.ctx.fillRect(x, y, me.tileDim, me.tileDim);
            me.ctx.strokeRect(x, y, me.tileDim, me.tileDim);
        });

        this.ctx.font = '16px Arial Black';
        this.ctx.fillStyle = 'green';
        this.ctx.fillText(this.scoreDisplay.toString().padStart(5, '0'), 16, 32);
    }

    /**
     * Returns snake'a head segment which is the array's first one.
     */
    head() {
        return this.body[0];
    }

    /**
     * Returns sneake's tail segment which is the array's last one.
     */
    tail() {
        return this.body.pop();
    }

    /**
     * Updates the game logic.
     */
    update() {
        const head = this.head();
        const tail = this.tail();

        if (this.item) {
            if (this.item.x == head.x && this.item.y == head.y) {
                this.item = null;

                this.body.push(this.createSegment(
                    this.body[this.body.length - 1].x,
                    this.body[this.body.length - 1].y
                ));

                this.score++;
                this.scoreDisplay += 10;

                this.item = this.createItem(
                    Math.floor(Math.random() * this.tLength),
                    Math.floor(Math.random() * this.tLength)
                );

                if (this.score % 5 == 0) {
                    this.scoreDisplay *= 1.25;
                    this.scoreDisplay = Math.floor(this.scoreDisplay);
                    this.speed *= .9;
                }
            }
        }

        let { x: oldX, y: oldY } = head;
        tail.x = oldX;
        tail.y = oldY;
        head[this.direction] += this.tileDim * this.magnitude;
        this.body.splice(1, 0, tail);
    }

    /**
     * One step of the game.
     */
    tick(timestamp) {
        if (timestamp == undefined) {
            snake.update();
            snake.clear();
            snake.render();
            this.paused = true;

            return false;
        }

        if (!this.lastTime && timestamp) this.lastTime = timestamp;
        if (timestamp - this.lastTime > this.speed) {
            this.lastTime = timestamp;

            snake.update();
            snake.clear();
            snake.render();
        }

        if (!this.paused)
            window.requestAnimationFrame(this.tick.bind(this));
    }
}

// Instantiates a new Senake game.
const snake = new Snake();

// Add funcionality to the PLAY button.
const playBtn = document.getElementById("play");
playBtn.addEventListener("click", () => {
    snake.paused = false;
    window.requestAnimationFrame(snake.tick.bind(snake));
});

// Add funcionality to the STEP button.
const stepBtn = document.getElementById("step");
stepBtn.addEventListener("click", () => {
    snake.tick();
});

// Add funcionality to the RESET button.
const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
    snake.reset();
    snake.clear();
    snake.render();
});

// Gets user's key input
window.addEventListener("keyup", event => {
    let { key } = event;
    switch (key) {
        case "ArrowUp":
            if (snake.direction == "y") return false;

            snake.magnitude = -1;
            snake.direction = "y";
            break;
        case "ArrowDown":
            if (snake.direction == "y") return false;

            snake.magnitude = 1;
            snake.direction = "y";
            break;
        case "ArrowLeft":
            if (snake.direction == "x") return false;

            snake.magnitude = -1;
            snake.direction = "x";
            break;
        case "ArrowRight":
            if (snake.direction == "x") return false;

            snake.magnitude = 1;
            snake.direction = "x";
            break;
        default:
            return false;
            break;
    }
});
