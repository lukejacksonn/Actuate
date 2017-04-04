(function() {

  const Actuate = animations => $ => new Promise ((resolve, reject) => {

    const commands = Array.isArray(animations) ?
      animations : animations.split(' ')

    const event = [
      'animationsend',
      'webkitAnimationEnd',
      'oAnimationEnd',
      'mozAnimationEnd',
      'MSAnimationEnd',
    ]

    const done = _ => {
      $.classList.remove('animated', commands[0])
      event.forEach(e => $.removeEventListener(e, done))
      commands.shift()
      commands.length ? animate() : resolve($)
    }

    const animate = _ => {
      event.forEach(e => $.addEventListener(e, done))
      $.classList.add('animated', commands[0])
    }

    $.classList.contains('animated') ?
      reject($) : animate()

  });

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Actuate
  else window.Actuate = Actuate

})()
