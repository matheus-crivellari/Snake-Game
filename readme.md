# Snake ECMAScript 6

## About
This is a simple implementation of the classic mobile game snake in the purpose of studying **JavaScript**'s *Object Orientation* and **ECMAScript 6** new features as *Arrow Functions* and *Object Destructuring*.

## Background
**Snake** is the common name for a *video game* concept where the player maneuvers a line which grows in length, with the line itself being a primary obstacle. The concept originated in the 1976 arcade game Blockade, and the ease of implementing Snake has led to *hundreds* of versions (some of which have the word snake or worm in the title) for many platforms. After a variant was preloaded on Nokia mobile phones in 1998, there was a resurgence of interest in the snake concept as it found a larger audience.

## Implementation details
The whole game is represented in one single class called ***Snake***. There are three main methods in this class:

1. **Update**: This method is responsible for *Game Logic* only. No screen draw process handled by it.
2. **Render**: This is the actual drawing process, it uses a canvas's 2D context for rendering snake's body's segments, items and the score.
3. **Tick**: In *game development*, a **tick** generally refers to one *iteration* of the *game loop* in which all the logic is computed. In this case, **update** and **render** methods are called by **tick** and the time inbetween ticks vary based on the player's progress in game.

## Snake's game logic
The main logic is very simple, we only need to handle **snake's head** (the first segment of its body and the actual one which really moves) and the **snake's tail** (the very last one of its body).

We store head's position, then we move head in the desired *direction* and *magnitude*. For this implementation we have *direction* as either `x` or `y` and magnitude as *1* or *-1*. For instance, if we have direction x and magnitude 1, it means that our snake is going to the right. If we have direction y and magnitude -1, it means our senake is going up, and so on.

Once have head's old position we move tail to it, so now tail is in the same position as head. Then we move head to the desired position.

```javascript
const head = this.head(); // Retrieves head object.
const tail = this.tail(); // Retrieves tail object.

// Stores head's position's x and y values
let { x: oldX, y: oldY } = head;

// Moves tail to old head's position
tail.x = oldX;
tail.y = oldY;

// Move head to desired position
head[this.direction] += this.tileDim * this.magnitude;

// Reorder tail object's position in
// body array for correct rendering
this.body.splice(1, 0, tail);
```

Easy, isn't it? :)

## Testing and contributing
For testing purposes you can open this project at [CodePen](https://codepen.io/matheus-crivellari/pen/ZPWZzL) and see it in action.

If you feel like modifying it or contributing you can either fork this project on **GitHub** or **CodePen** and make modifications on your own.

## TO-DO:
There's still some features to implement before this project is complete. There is no snake collision, so you can't over this game if you hit the walls or snake's body yet.

## License
Copyright 2019 Matheus Crivellari

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

