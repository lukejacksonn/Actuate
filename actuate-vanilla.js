var actuate = function (animation, elements, callback) {

  var elem;
  var regex = new RegExp(' animated ' + animation, 'g');
  var event = ['animationend', 'webkitAnimationEnd',
               'oAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd'];

  var finish = function() {
    var self = this;
    // Remove animation Class
    // Remove animationEnd Listeners
    self.className = self.className.replace(regex, '');
    event.forEach(function(e) {
      self.removeEventListener(e, finish, false);
    });
    // Execute callback Function
    if (typeof(callback) === 'function') {
      callback(self);
    }
  }

  for (var i = 0; i < elements.length; i++) {
    // This unanimated Item
    elem = elements[i];
    if(!elem.className.match(/animated/g)) {
      // Append animation Class
      // Add animationEnd Listeners
      elem.className += ' animated ' + animation;
      event.forEach(function(e) {
        elem.addEventListener(e, finish, false);
      });
    }
  }
}