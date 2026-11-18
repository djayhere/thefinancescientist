(function () {
  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  // Mobile menu
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Newsletter (placeholder until a newsletter tool is connected)
  document.querySelectorAll('form.js-nl').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = f.querySelector('input[type=email]');
      var msg = f.parentNode.querySelector('.msg');
      if (!input.value || input.value.indexOf('@') < 1) {
        msg.textContent = 'Enter a valid email address.';
        return;
      }
      msg.textContent = 'Thanks! The newsletter launches soon, and sign-ups will open here.';
      input.value = '';
    });
  });

  // Insights filters
  var fbar = document.querySelector('.filters');
  if (fbar) {
    fbar.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      fbar.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      var cat = b.getAttribute('data-cat');
      document.querySelectorAll('.post[data-cat]').forEach(function (p) {
        p.style.display = (cat === 'all' || p.getAttribute('data-cat') === cat) ? '' : 'none';
      });
    });
  }

  // Contact form: opens the visitor's email app with the message filled in
  var cf = document.getElementById('contact-form');
  if (cf) {
    cf.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = cf.name.value.trim(), email = cf.email.value.trim(), msg = cf.message.value.trim();
      var err = cf.querySelector('.err');
      if (!name || !email || email.indexOf('@') < 1 || !msg) {
        err.textContent = 'Add your name, a valid email and a message.';
        return;
      }
      err.textContent = '';
      var subject = '[' + cf.topic.value + '] Message from ' + name;
      var body = msg + '\n\n— ' + name + ' (' + email + ')';
      var to = cf.getAttribute('data-to');
      window.location.href = 'mailto:' + to + '?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      cf.querySelector('.sent').textContent = 'Your email app should open with the message ready to send. If it doesn\'t, write to ' + to + '.';
    });
  }
})();
