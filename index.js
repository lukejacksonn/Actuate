(function() {
  const event = 'animationend'

  const Actuate = animations => $ => new Promise ((resolve, reject) => {

    const commands = Array.isArray(animations) ?
      animations : animations.split(' ')

    const done = _ => {
      $.classList.remove('animated')
      $.classList.remove(commands[0])
      $.removeEventListener(event, done)
      commands.shift()
      commands.length ? animate() : resolve($)
    }

    const animate = _ => {
      $.addEventListener(event, done)
      $.classList.add('animated')
      $.classList.add(commands[0])
    }

    $.classList.contains('animated') ?
      reject($) : animate()

  });

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Actuate
  else window.Actuate = Actuate

})()
