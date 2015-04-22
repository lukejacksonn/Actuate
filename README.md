# Actuate.js

A jQuery wrapper for [animate.css](https://github.com/daneden/animate.css) that makes it *one line easy* to start using css animations. The plugin includes a bunch of swaggy animations but can be used to initialise any animation you like. 

####Packaged cross-browser animations :


`bounce`, `flash`, `pulse`, `rubberBand`, `shake`, `swing`, `tada`, `wobble`, `bounceIn`, `bounceInDown`, `bounceInLeft`, `bounceInRight`, `bounceInUp`, `bounceOut`, `bounceOutDown`, `bounceOutLeft`, `bounceOutRight`, `bounceOutUp`, `fadeIn`, `fadeInDown`, `fadeInDownBig`, `fadeInLeft`, `fadeInLeftBig`, `fadeInRight`, `fadeInRightBig`, `fadeInUp`, `fadeInUpBig`, `fadeOut`, `fadeOutDown`, `fadeOutDownBig`, `fadeOutLeft`, `fadeOutLeftBig`, `fadeOutRight`, `fadeOutRightBig`, `fadeOutUp`, `fadeOutUpBig`, `flipInX`, `flipInY`, `flipOutX`, `flipOutY`, `lightSpeedIn`, `lightSpeedOut`, `rotateIn`, `rotateInDownLeft`, `rotateInDownRight`, `rotateInUpLeft`, `rotateInUpRight`, `rotateOut`, `rotateOutDownLeft`, `rotateOutDownRight`, `rotateOutUpLeft`, `rotateOutUpRight`, `hinge`, `rollIn`, `rollOut`, `zoomIn`, `zoomInDown`, `zoomInLeft`, `zoomInRight`, `zoomInUp`, `zoomOut`, `zoomOutDown`, `zoomOutLeft`, `zoomOutRight`, `zoomOutUp`, `slideInDown`, `slideInLeft`, `slideInRight`, `slideInUp`, `slideOutDown`, `slideOutLeft`, `slideOutRight`, `slideOutUp`

<br>
## Usage

1) Include the script tag in your documents `<head>`
```html
<head>
  <script src="actuate.js"></script>
</head>
```
2) Use one of the packaged animations
```javascript
$('div').actuate('bounce');
```

<br>
## Definition

The `actuate` function accepts three parameters; `animation`, `callback` and `delay`. If defined, the callback function is executed *delay* milliseconds after `onAnimationEnd`. If a delay is not defined then the callback is executed *immediately* `onAnimationEnd`. Calling actuate on an element that is already animated will have no effect.

```javascript
$(selector).actuate(animation, callback, delay);
```

<br>
## Examples

Below are example implementations that have been found useful and should get you started with whatever you are trying to do. If you would like to see more examples or more functionality then raise an issue or even better create a pull request with something new.

<br>
#### Basic Callbacks

The script below starts the animation `bounce` on a `h1` element and `log` a message `onAnimationEnd`.

```javascript
$('h1').actuate('bounce', function() { 
  console.log('Finished animating!')
});
```
**Delay:** sometimes you might not want to execute the callback immediately. The script below actuates the same animation as above but waits `3000` milliseconds before executing the callback.

```javascript
$('h1').actuate('bounce', function() { 
  console.log('Finished animating 3 seconds ago!')
}, 3000);
```
**NOTE:** If an element is waiting for a callback then it is still considered *animated*. Any further attempts to actuate the element will be ignored until the callback is executed. 

<br>
#### Callback Reference

The callback function gets passed a parameter `$elem` which is a reference to the element that was actuated. This reference can be used inside the callback function to further manipulate the element.

```javascript
$(this).actuate('fadeOut', function(x) { 
  console.log('Finished animating', x);
  x.remove();
});
```
<br>
#### Nested Animations

You can call actuate again on the reference element explained in the above example. This allows you to create animation sequences. Useful for animate in-out cases.

```javascript
$(this).actuate('tada', function(x) { 
  x.actuate('fadeOut', function() {
    x.remove();
  });
}, 1000);
```
<br>
#### Append Animation

You can call actuate on elements that have not yet been added to the DOM. The actuated animation will start once the element is rendered in the view.

```javascript
$('<h1>Superman</h1>').actuate('lightSpeedIn', function(x) {
  x.actuate('lightSpeedOut', function() {
    x.remove();
  });
}, 1000).appendTo('body');
```
<br>
## TODO

* Add options to control `animation-duration` and `animation-iteration-count`
* Create demos for common use cases and write more animations
* Make chaining animations easier and not so nesty
* Write a vanilla javascript version to offer a non-dependant alternative

<br>
## Licence

Actuate.js is licensed under the [MIT license](http://opensource.org/licenses/MIT).
