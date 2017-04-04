# Actuate

> ac·tu·ate /ˈak(t)SHəˌwāt/ : cause (a machine or device) to operate.

A shiny new (~600b) vanilla implementation of what was previously [A tiny jQuery wrapper for animate.css](https://github.com/lukejacksonn/jquery-actuate) which allows for _one line easy_ actuation of CSS animation sequences with _thenable_ chaining.

Check out the [codepen examples](http://codepen.io/lukejacksonn/pen/dvaPPG).

## Getting Started

> Note: this library uses [promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) for which you [might need](http://caniuse.com/#feat=promises) a [polyfill](https://polyfill.io/v2/docs/)

### Include the library
Directly in the head of your document from the CDN
```
<script src='https://unpkg.com/actuatejs'></script>
```
or require in your script after an `npm install actuatejs`
```
import Actuate from 'actuatejs' // ES6
var Actuate = require('actuatejs') // CommonJS
```

### Define a named CSS animation
You can import a tonne of them from [animate.css](https://github.com/daneden/animate.css)
```css
@keyframes pulse {
  from { transform: scale(1) }
  50% { transform: scale(1.05) }
  to { transform: scale(1) }
}
.pulse {
  animation-name: pulse;
}
```

### Actuate it using javascript
In a script tag before the closing body tag
```js
Actuate('pulse')(document.body)
.then(elem => console.log('Finished Animating', elem))
.catch(elem => console.log(elem, 'was already animating'))
```

## Usage

The API is intended to be as simple as possible providing low overhead syntax for animation chaining and `animationEnd` detection.

Here are some examples use cases and the syntax to go with them:

### Single Animation

To animate an HTML element first, pass the `actuate` function the name of the CSS `animation` you would like to apply. This primes the animation ready to be bound to a `target` element which is passed as the second argument like so:

```
Actuate('tada')(document.body)
```

Once the function has received both arguments. The animation will begin to take effect.

### Sequential Animations

Often it is desirable to run animations one after another. Normally this is quite tricky to achieve and would require monitoring when the the first animation is finished, removing the animation class and adding the next. Actuate handles this complexity for you. Just pass a space delimited list of named CSS animations like so:

```
Actuate('rollIn tada rollOut')(document.body)
```

You can also pass in an array of named animations if you prefer:

```
Actuate(['rollIn', 'tada', 'rollOut'])(document.body)
```

### Animation End

The actuate function returns a promise which means you can easily declare a `then` action which guarantees to execute once all animations in a sequence have been applied.

```
Actuate('tada fadeOut')(document.body)
.then($ => console.log('Finished Animating', $))
```

The `then` function gets passed the initial `target` element. In the above case `$ === document.body`.

### Already Animating

The only time the actuate with throw an _error_ is if you try animate an element that is already animating. To detect this use a `catch` statement.

```
addEventListener('click', () =>
  Actuate('tada')(document.body)
  .then($ => console.log('Finished'))
  .catch($ => console.log('Already Animating'))
)
```

### Chaining sequences

The actuate function takes advantage of [partial appliction](https://en.wikipedia.org/wiki/Partial_application) which means that animation sequences can be defined without having to specify a `target` element straight away.

```
var intro = Actuate('rollIn')
var showoff = Actuate('bounce tada bounce')
var outro = Actuate('rollOut')
```

You can then provide a `target` element and let it flow through a chain of predefined animation sequences using the `then` style syntax:

```
Promise.resolve(document.body)
.then(intro)
.then(showoff)
.then(outro)
```
