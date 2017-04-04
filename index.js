(function() {

  const types = {
    'animation':'animationend',
    'MSAnimation':'MSAnimationEnd',
    'WebkitAnimation':'webkitAnimationEnd',
  }

  const event = types[
    Object.keys(types).filter(x =>
      document.body.style.hasOwnProperty(x)
    )[0]
  ]

  const Actuate = animations => $ => new Promise ((resolve, reject) => {

    const commands = Array.isArray(animations) ?
      animations : animations.split(' ')

    const done = _ => {
      $.classList.remove('animated', commands[0])
      $.removeEventListener(event, done)
      commands.shift()
      commands.length ? animate() : resolve($)
    }

    const animate = _ => {
      $.addEventListener(event, done)
      $.classList.add('animated', commands[0])
    }

    $.classList.contains('animated') ?
      reject($) : animate()

  });

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Actuate
  else window.Actuate = Actuate

})()
