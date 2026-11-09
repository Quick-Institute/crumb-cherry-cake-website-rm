(() => {
  'use strict';

  // Helper functions
  const $ = (s, r = document) => r.querySelector(s);
  // Money in rupees, e.g. Rs. 3,200
  const money = n => 'Rs. ' + Math.round(n).toLocaleString('en-US');

  // Fees (change these numbers only)
  const DELIVERY_FEE = 900;
  const FREE_OVER = 8000;
  const DECOR = 600;

  /* ==========================================================
     REAL IMAGES — change your photo file names here only
     All photos go inside the "images" folder
     ========================================================== */
  // Exact file name of each cake photo (some are .jpg, some are .webp)
  const CAKE_FILE = {
    ny:     'placeholder.webp',   // no New York photo yet
    rasp:   'rasp.jpg',
    lemon:  'lemon.webp',
    oreo:   'oreo.jpg',
    turtle: 'turtle.jpg',
    straw:  'straw.webp',
    choc:   'choc.webp',
    blue:   'blue.webp'
  };

  const IMG = {
    // Hero slides (big pictures on the home page)
    hero: [
      'images/bg2.jpg',
      'images/bg1.jpg',
      'images/bg3.webp'
    ],

    // Shown if any photo file is missing
    fallback: 'images/placeholder.webp',

    // Product photo: looks up the file name above
    cake: id => 'images/' + (CAKE_FILE[id] || id + '.jpg')
  };

  // Image helper with a fallback image
  const photo = (src, alt = '', cls = '') => `
    <img class="${cls}" src="${src}" alt="${alt}" loading="lazy"
      onerror="this.onerror=null;this.src='${IMG.fallback}'">
  `;

  // Available cake sizes
  const SIZES = {
    s: {
      label: '6-inch · serves 6',
      serves: 6,
      f: 1
    },
    l: {
      label: '9-inch · serves 12',
      serves: 12,
      f: 1.7
    },
    b: {
      label: 'Box of 4 slices · serves 4',
      serves: 4,
      f: .62
    }
  };

  // Cake categories
  const CATS = ['All', 'Classic', 'Fruity', 'Chocolate'];

  // Cheesecake product data
  // Each photo file is listed in CAKE_FILE above
  const P = [
    {
      id: 'ny',
      name: 'New York Plain',
      cat: 'Classic',
      price: 3800,
      pop: 9,
      bg: '#FFF1C9',
      note: 'Dense, creamy and tangy on a buttery crust.',
      diet: []
    },
    {
      id: 'rasp',
      name: 'Raspberry Swirl',
      cat: 'Fruity',
      price: 4200,
      pop: 10,
      bg: '#FADBE6',
      note: 'Vanilla cheesecake ribboned with tart raspberry.',
      diet: []
    },
    {
      id: 'lemon',
      name: 'Lemon Curd',
      cat: 'Fruity',
      price: 4100,
      pop: 8,
      bg: '#FFF4B8',
      note: 'Bright lemon curd over a light, silky filling.',
      diet: ['veg']
    },
    {
      id: 'oreo',
      name: 'Cookies & Cream',
      cat: 'Chocolate',
      price: 4300,
      pop: 9,
      bg: '#E7E2EE',
      note: 'Chocolate cookie crust and crunchy cookie pieces.',
      diet: []
    },
    {
      id: 'turtle',
      name: 'Salted Caramel Turtle',
      cat: 'Chocolate',
      price: 4600,
      pop: 7,
      bg: '#F3DEC7',
      note: 'Caramel and dark chocolate. Made without nuts.',
      diet: []
    },
    {
      id: 'straw',
      name: 'Strawberry Fields',
      cat: 'Fruity',
      price: 4200,
      pop: 8,
      bg: '#FFE0DC',
      note: 'Fresh strawberries on a vanilla bean base.',
      diet: ['gf']
    },
    {
      id: 'choc',
      name: 'Flourless Chocolate',
      cat: 'Chocolate',
      price: 4500,
      pop: 6,
      bg: '#E3D3CB',
      note: 'Rich, fudgy and made with no flour at all.',
      diet: ['gf', 'veg']
    },
    {
      id: 'blue',
      name: 'Blueberry Cloud',
      cat: 'Fruity',
      price: 4200,
      pop: 7,
      bg: '#DDE0FA',
      note: 'Wild blueberry compote on a soft vanilla base.',
      diet: ['gf']
    }
  ];

  // Ingredients for each cake
  const ING = {
    ny: [
      'Cream cheese', 'Eggs', 'Cane sugar',
      'Butter biscuit crust', 'Vanilla bean'
    ],
    rasp: [
      'Cream cheese', 'Raspberries', 'Eggs',
      'Sugar', 'Butter biscuit crust'
    ],
    lemon: [
      'Cream cheese', 'Lemon juice and zest',
      'Egg yolks', 'Sugar', 'Butter biscuit crust'
    ],
    oreo: [
      'Cream cheese', 'Chocolate cookies',
      'Eggs', 'Sugar', 'Butter'
    ],
    turtle: [
      'Cream cheese', 'Caramel', 'Dark chocolate',
      'Eggs', 'Sea salt'
    ],
    straw: [
      'Cream cheese', 'Strawberries', 'Eggs',
      'Rice-flour crust', 'Vanilla bean'
    ],
    choc: [
      'Dark chocolate', 'Cream cheese',
      'Eggs', 'Cocoa', 'Sugar'
    ],
    blue: [
      'Cream cheese', 'Wild blueberries',
      'Eggs', 'Rice-flour crust', 'Sugar'
    ]
  };

  // Flat list of menu items (from js/menu-data.js)
  // Each cake size becomes one cart item (id = cake id + size number)
  const CAKE_ITEMS = CAKES.flatMap(c => c.sizes.map((z, i) => ({
    id: c.id + '-' + i, name: c.name, note: z.label, price: z.price
  })));

  const MENU_ITEMS = [
    ...MENU.flatMap(g => g.items),
    ...CAKE_ITEMS
  ].map(i => ({ ...i, bg: '#F4EAF2' }));

  // Find a cake or a menu item by id
  const itemOf = id =>
    P.find(p => p.id === id) || MENU_ITEMS.find(m => m.id === id);

  // Size label: menu items have no size
  const sizeLabel = l =>
    SIZES[l.sz] ? SIZES[l.sz].label : (itemOf(l.id).note || 'Menu item');

  // Application state
  const state = {
    saved: false,
    cat: 'All',
    q: '',
    diet: [],
    sort: 'pop',
    rec: null,
    cart: [],
    mode: 'pickup'
  };

  // Restore cart
  try {
    state.cart = JSON.parse(
      localStorage.getItem('cc-cart')
    ) || [];
  } catch (e) {}

  // Restore wishlist
  let _w = [];

  try {
    _w = JSON.parse(
      localStorage.getItem('cc-wish')
    ) || [];
  } catch (e) {}

  const wish = new Set(_w);

  // Save cart data
  const save = () => {
    try {
      localStorage.setItem(
        'cc-cart',
        JSON.stringify(state.cart)
      );
    } catch (e) {}
  };

  // Date helpers
  const fmtDate = d => d.toISOString().slice(0, 10);

  const minDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + (d.getHours() >= 14 ? 2 : 1));
    return d;
  };

  // Hero slider content
  const SL = [
    [
      'A true', 'delight', '', '',
      'Velvet-finished cheesecakes, baked fresh every morning.',
      'Chocolate cake topped with raspberries and blackberries'
    ],
    [
      'Sweet little', 'moments', '', '',
      'Lemon, caramel and vanilla for every celebration.',
      'Yellow cake with piped buttercream roses on a white stand'
    ],
    [
      'Baked with', 'love', '', '',
      'Order by 2pm for next-day pickup or delivery.',
      'Chocolate layer cake topped with fresh cherries'
    ]
  ];

  // Build the hero slides
  $('#heroSlides').innerHTML = SL.map((s, i) => `
    <div class="hs" data-i="${i}" role="group"
      aria-roledescription="slide" aria-label="${i + 1} of 3">
      <div class="txt">
        <div class="script" aria-hidden="false">
          <span class="g">${s[0]}</span>
          <span class="w">${s[1]}</span>
        </div>
        <p class="sub-line">${s[4]}</p>
        <a class="btn" href="#shop">Shop cheesecakes</a>
      </div>
      <img class="art" src="${IMG.hero[i]}" alt="${s[5]}"
        onerror="this.onerror=null;this.src='${IMG.fallback}'">
    </div>
  `).join('');

  // Build hero navigation dots
  $('#hDots').innerHTML = SL.map((s, i) => `
    <button type="button" data-i="${i}"
      aria-label="Go to slide ${i + 1}">
      <i></i>
    </button>
  `).join('');

  let hi = 0;

  // Display the selected hero slide
  function hero(i) {
    hi = (i + SL.length) % SL.length;

    document.querySelectorAll('.hs').forEach((el, k) => {
      el.classList.toggle('on', k === hi);
      el.setAttribute('aria-hidden', k !== hi);

      el.querySelectorAll('a').forEach(a => {
        a.tabIndex = k === hi ? 0 : -1;
      });
    });

    document.querySelectorAll('#hDots button').forEach((b, k) => {
      b.setAttribute('aria-current', k === hi);
    });
  }

  $('#hPrev').onclick = () => hero(hi - 1);
  $('#hNext').onclick = () => hero(hi + 1);

  $('#hDots').onclick = e => {
    const b = e.target.closest('button');
    if (b) hero(+b.dataset.i);
  };

  $('.hero2').addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') hero(hi + 1);
    if (e.key === 'ArrowLeft') hero(hi - 1);
  });

  hero(0);

  
  // Header scroll effect
  const hd = $('#hd');
  const sc = () => {
    hd.classList.toggle('solid', scrollY > 60);
  };
  addEventListener('scroll', sc, { passive: true });
  sc();

  // Dropdown navigation menus
  const subs = document.querySelectorAll('.has-sub, .has-sub2');
  const canHover = () => matchMedia('(hover:hover)').matches;
  const setOpen = (li, o) => {
    li.classList.toggle('open', o);
    li.querySelector(':scope > ul').hidden = !o;
    li.querySelector(':scope > button')
      .setAttribute('aria-expanded', o);
  };
  const closeAll = keep => subs.forEach(li => {
    if (!keep || (li !== keep && !li.contains(keep))) {
      setOpen(li, false);
    }
  });

  subs.forEach(li => {
    const b = li.querySelector(':scope > button');

    b.onclick = () => {
      const o = !li.classList.contains('open');
      closeAll(li);
      setOpen(li, o);
    };

    li.addEventListener('focusout', e => {
      if (e.relatedTarget && !li.contains(e.relatedTarget)) {
        setOpen(li, false);
      }
    });

    li.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        setOpen(li, false);
        b.focus();
        e.stopPropagation();
      }
    });
  });

  document.addEventListener('click', e => {
    if (
      !e.target.closest('.has-sub') ||
      e.target.closest('.sub a')
    ) {
      closeAll(null);
    }
  });

  // Apply filters from navigation links
  document.querySelectorAll('[data-filter]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();

      const [k, v] = a.dataset.filter.split(':');

      Object.assign(state, {
        cat: 'All',
        diet: [],
        saved: false,
        q: '',
        rec: null
      });

      $('#q').value = '';

      if (k === 'cat') state.cat = v;
      if (k === 'diet') state.diet = [v];
      if (k === 'saved') state.saved = true;

      render();
      closeAll(null);
      $('#shop').scrollIntoView();
    });
  });

  // Search and mobile navigation
  $('#srchBtn').onclick = () => {
    const f = $('#searchForm');
    f.hidden = !f.hidden;

    $('#srchBtn').setAttribute('aria-expanded', !f.hidden);

    if (!f.hidden) {
      hd.classList.add('solid');
      $('#q').focus();
    }
  };

  const mn = $('#menu');

  $('#menuBtn').onclick = () => {
    mn.hidden = false;
    $('#menuBtn').setAttribute('aria-expanded', true);
    $('#menuX').focus();
  };

  const closeMenu = () => {
    mn.hidden = true;
    $('#menuBtn').setAttribute('aria-expanded', false);
    $('#menuBtn').focus();
  };

  $('#menuX').onclick = closeMenu;

  mn.addEventListener('click', e => {
    if (e.target.tagName === 'A') mn.hidden = true;
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !mn.hidden) closeMenu();
  });

  // Notification messages
  let tt;

  function toast(msg, undo) {
    const t = $('#toast');
    t.innerHTML = '';
    t.append(msg);

    if (undo) {
      const b = document.createElement('button');
      b.textContent = 'Undo';

      b.onclick = () => {
        undo();
        t.classList.remove('on');
      };

      t.append(b);
    }

    t.classList.add('on');
    clearTimeout(tt);

    tt = setTimeout(() => {
      t.classList.remove('on');
    }, 5000);
  }

  // Shop category buttons
  function chips() {
    $('#catChips').innerHTML = CATS.map(c => `
      <button type="button"
        aria-pressed="${state.cat === c}" data-c="${c}">
        ${c}
      </button>
    `).join('') + `
      <button type="button"
        aria-pressed="${state.saved}" data-saved>
        ♥ Saved
      </button>
    `;
  }

  // Filter, sort and display cheesecakes
  function render() {
    chips();

    let list = P.filter(p =>
      (state.cat === 'All' || p.cat === state.cat) &&
      p.name.toLowerCase().includes(state.q.toLowerCase()) &&
      state.diet.every(d => p.diet.includes(d)) &&
      (!state.saved || wish.has(p.id))
    );

    list.sort((a, b) =>
      state.sort === 'lo' ? a.price - b.price :
      state.sort === 'hi' ? b.price - a.price :
      b.pop - a.pop
    );

    $('#grid').innerHTML = list.map(p => `
      <article class="card ${state.rec ? 'rec' : ''}"
        data-id="${p.id}">
        <div class="img" style="background:${p.bg}">
          ${photo(IMG.cake(p.id), p.name, 'ph')}

          <button class="heart" data-heart
            aria-pressed="${wish.has(p.id)}"
            aria-label="Save ${p.name}">♥</button>

          ${p.pop >= 9 ? '<span class="tag">Most loved</span>' : ''}
        </div>

        <div class="body">
          <h3>${p.name}</h3>
          <p>${p.note}</p>

          ${p.diet.length ? `
            <span class="diet">
              ${p.diet.map(d =>
                d === 'gf' ? 'Gluten-free' : 'Eggless'
              ).join(' · ')}
            </span>
          ` : ''}

          <label class="sr" for="s-${p.id}">
            Size for ${p.name}
          </label>

          <select id="s-${p.id}">
            ${Object.entries(SIZES).map(([k, s]) => `
              <option value="${k}"
                ${state.rec === k ? 'selected' : ''}>
                ${s.label}
              </option>
            `).join('')}
          </select>

          <div class="price" data-price>${money(p.price)}</div>

          <button class="btn primary" data-add>
            Add to cart
          </button>

          <button class="rm" data-qv>Quick view</button>
        </div>
      </article>
    `).join('');

    $('#empty').hidden = list.length > 0;

    $('#empty p:nth-child(2)').textContent = state.saved
      ? 'You have not saved any cakes yet. Tap the heart on a cake to save it.'
      : 'Try a shorter search or clear the filters.';

    $('#result').textContent = list.length
      ? `${list.length} cheesecake${list.length === 1 ? '' : 's'} found`
      : 'No cheesecakes found';

  }

  // Update cake prices when the size changes
  $('#grid').addEventListener('change', e => {
    const c = e.target.closest('.card');
    if (!c || e.target.tagName !== 'SELECT') return;

    const p = P.find(x => x.id === c.dataset.id);

    $('[data-price]', c).textContent = money(
      p.price * SIZES[e.target.value].f
    );
  });

  // Add cakes to the cart
  $('#grid').addEventListener('click', e => {
    const b = e.target.closest('[data-add]');
    if (!b) return;

    const c = b.closest('.card');
    const id = c.dataset.id;
    const sz = $('select', c).value;

    add(id, sz);

    const p = P.find(x => x.id === id);
    toast(`Added ${p.name} to your cart`);
  });

  // Category, saved cakes and sorting
  $('#catChips').addEventListener('click', e => {
    if (e.target.hasAttribute('data-saved')) {
      state.saved = !state.saved;
      render();
      $('[data-saved]').focus();
      return;
    }

    const c = e.target.dataset.c;

    if (c) {
      state.cat = c;
      render();
      $(`[data-c="${c}"]`).focus();
    }
  });

  $('#sort').onchange = e => {
    state.sort = e.target.value;
    render();
  };

  // Search cheesecakes
  $('#searchForm').addEventListener('submit', e => {
    e.preventDefault();
    location.hash = 'shop';
  });

  $('#q').addEventListener('input', e => {
    state.q = e.target.value;
    render();
  });

  // Clear shop filters
  $('#clear').onclick = () => {
    Object.assign(state, {
      saved: false,
      cat: 'All',
      q: '',
      diet: [],
      rec: null
    });

    $('#q').value = '';

    document.querySelectorAll('.help input[type=checkbox]')
      .forEach(i => i.checked = false);

    render();
  };

  // Help me choose a cake size
  const g = $('#guests');
  const w = $('#when');

  w.min = fmtDate(minDate());
  w.value = w.min;

  function advice() {
    const n = Math.max(1, Math.min(60, +g.value || 1));

    let msg, k = 'l';

    if (n <= 4) {
      k = 'b';
      msg = `For ${n}, a box of 4 slices is perfect.`;
    } else if (n <= 6) {
      k = 's';
      msg = `For ${n}, one 6-inch cheesecake is just right.`;
    } else if (n <= 12) {
      k = 'l';
      msg = `For ${n}, one 9-inch cheesecake feeds everyone.`;
    } else {
      const c = Math.ceil(n / 12);
      msg = `For ${n}, order ${c} 9-inch cheesecakes. Try mixing two flavours.`;
    }

    const d = new Date(w.value + 'T00:00');

    const ok = !isNaN(d) &&
      d >= new Date(w.min + 'T00:00');

    msg += ok ? '' :
      ` The earliest date is ${new Date(w.min + 'T00:00')
        .toLocaleDateString(undefined, {
          weekday: 'long',
          month: 'short',
          day: 'numeric'
        })}.`;

    $('#advice').textContent = msg;

    return k;
  }

  g.oninput = w.oninput = advice;

  $('#gPlus').onclick = () => {
    g.value = Math.min(60, (+g.value || 0) + 1);
    advice();
  };

  $('#gMinus').onclick = () => {
    g.value = Math.max(1, (+g.value || 2) - 1);
    advice();
  };

  $('#applyHelp').onclick = () => {
    state.rec = advice();

    if (+g.value > 12) state.rec = 'l';

    state.diet = [
      ...document.querySelectorAll('.help input:checked')
    ].map(i => i.value);

    render();
    $('#shop').scrollIntoView();

    toast('Showing cakes that fit. Sizes are pre-selected for you.');
  };

  advice();

  // Cart operations
  // x = extra price, note = cake message, colour = icing name
  function add(id, sz, n = 1, x = 0, note = '', colour = '') {
    const l = state.cart.find(y =>
      y.id === id &&
      y.sz === sz &&
      (y.x || 0) === x &&
      (y.note || '') === note &&
      (y.colour || '') === colour
    );

    l ? l.n += n : state.cart.push({
      id, sz, n, x, note, colour
    });

    update();
  }

  const price = l => {
    const m = MENU_ITEMS.find(i => i.id === l.id);
    // Menu items have a fixed price, cakes depend on size
    return m
      ? m.price + (l.x || 0)
      : itemOf(l.id).price * SIZES[l.sz].f + (l.x || 0);
  };

  const sub = () =>
    state.cart.reduce((s, l) => s + price(l) * l.n, 0);

  const items = () =>
    state.cart.reduce((s, l) => s + l.n, 0);

  function update() {
    save();

    const c = $('#count');
    c.textContent = items();
    c.setAttribute('aria-label', items() + ' items');

    c.classList.remove('bump');
    void c.offsetWidth;
    c.classList.add('bump');

    if (!$('#drawer').hidden) {
      view === 'cart' && drawCart();
    }
  }

  // Open and close the cart drawer
  let view = 'cart';
  let lastFocus;

  function open() {
    lastFocus = document.activeElement;

    $('#drawer').hidden = $('#scrim').hidden = false;

    view = 'cart';
    drawCart();
    $('#closeCart').focus();

    document.body.style.overflow = 'hidden';
  }

  function close() {
    $('#drawer').hidden = $('#scrim').hidden = true;
    document.body.style.overflow = '';

    lastFocus && lastFocus.focus();
  }

  $('#openCart').onclick = open;
  $('#closeCart').onclick = close;
  $('#scrim').onclick = close;

  // Keyboard accessibility for the cart
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$('#drawer').hidden) close();

    if (e.key === 'Tab' && !$('#drawer').hidden) {
      const f = [
        ...$('#drawer').querySelectorAll('button,input,select,a')
      ].filter(x => !x.disabled);

      if (!f.length) return;

      const a = f[0];
      const z = f[f.length - 1];

      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    }
  });

  // Step bar so the buyer always knows where they are
  const steps = n => `
    <ol class="steps" aria-label="Order steps">
      ${['Cart', 'Details', 'Done'].map((t, i) => `
        <li ${i + 1 === n ? 'class="on" aria-current="step"' : ''}>
          ${t}
        </li>`).join('')}
    </ol>
  `;

  // Delivery charges and cart display
  const ship = s =>
    state.mode === 'pickup' ? 0 : s >= FREE_OVER ? 0 : DELIVERY_FEE;

  function drawCart() {
    const b = $('#cartBody');

    if (!state.cart.length) {
      b.innerHTML = `
        <div class="done">
          <p><strong>Your cart is empty.</strong></p>
          <p>Pick a cheesecake and it will show up here.</p>
          <button class="btn primary" id="goShop">
            Browse cheesecakes
          </button>
        </div>
      `;

      $('#goShop').onclick = () => {
        close();
        location.hash = 'shop';
      };

      return;
    }

    const s = sub();
    const left = Math.max(0, FREE_OVER - s);

    b.innerHTML = steps(1) + `
      <p class="${left ? '' : 'diet'}">
        ${left
          ? `Add ${money(left)} more for free delivery.`
          : 'You have free delivery.'}
      </p>

      <div class="meter" aria-hidden="true">
        <i style="width:${Math.min(100, s / FREE_OVER * 100)}%"></i>
      </div>

      ${state.cart.map((l, i) => {
        const p = itemOf(l.id);

        return `
          <div class="line">
            <div class="th" style="background:${p.bg}">
              ${photo(IMG.cake(p.id), p.name)}
            </div>

            <div>
              <strong>${p.name}</strong>

              <small>
                ${sizeLabel(l)}
                ${l.colour ? ' · ' + l.colour + ' decoration' : ''}
              </small>

              ${l.note ? `
                <small>Message: ${l.note.replace(/</g, '&lt;')}</small>
              ` : ''}

              <div class="qty">
                <button data-d="-1" data-i="${i}"
                  aria-label="Fewer ${p.name}">−</button>

                <span aria-live="polite">${l.n}</span>

                <button data-d="1" data-i="${i}"
                  aria-label="More ${p.name}">+</button>

                <button class="rm" data-rm="${i}">Remove</button>
              </div>
            </div>

            <strong>${money(price(l) * l.n)}</strong>
          </div>
        `;
      }).join('')}

      <fieldset class="seg" style="border:0;padding:0">
        <legend class="lbl">How will you get it?</legend>

        <label>
          <input type="radio" name="mode" value="pickup"
            ${state.mode === 'pickup' ? 'checked' : ''}>
          Pick up <small>Free</small>
        </label>

        <label>
          <input type="radio" name="mode" value="delivery"
            ${state.mode === 'delivery' ? 'checked' : ''}>
          Delivery <small>${s >= FREE_OVER ? 'Free' : money(DELIVERY_FEE)}</small>
        </label>
      </fieldset>

      <div class="row">
        <span>Subtotal</span>
        <span>${money(s)}</span>
      </div>

      <div class="row">
        <span>${state.mode === 'pickup' ? 'Pickup' : 'Delivery'}</span>
        <span>${ship(s) ? money(ship(s)) : 'Free'}</span>
      </div>

      <div class="row total">
        <span>Total</span>
        <span>${money(s + ship(s))}</span>
      </div>

      <button class="btn primary"

        style="width:100%;margin-top:1rem" id="toCheckout">
        Continue to details
      </button>
    `;
    $('#toCheckout').onclick = checkout;
  }

  // Update quantities and remove cart items
  $('#cartBody').addEventListener('click', e => {
    const d = e.target.dataset;

    if (d.d) {
      const l = state.cart[+d.i];
      l.n += +d.d;

      if (l.n < 1) l.n = 1;

      update();

      const nb = $(`[data-d="${d.d}"][data-i="${d.i}"]`);
      nb && nb.focus();
    }

    if (d.rm !== undefined) {
      const [r] = state.cart.splice(+d.rm, 1);
      const at = +d.rm;

      update();

      toast('Removed from cart', () => {
        state.cart.splice(at, 0, r);
        update();
      });
    }
  });

  $('#cartBody').addEventListener('change', e => {
    if (e.target.name === 'mode') {
      state.mode = e.target.value;
      drawCart();
      $(`[name=mode][value=${state.mode}]`).focus();
    }
  });

  // Checkout form and validation
  function checkout() {
    view = 'form';

    const d = fmtDate(minDate());
    const del = state.mode === 'delivery';

    $('#cartBody').innerHTML = steps(2) + `
      <button class="rm" id="back">← Back to cart</button>
      <h3 style="margin-top:.5rem">Your details</h3>

      <ul class="sum">
        ${state.cart.map(l => `
          <li>
            ${l.n} × ${itemOf(l.id).name}
            <small>${sizeLabel(l)}</small>
          </li>`).join('')}
      </ul>

      <form id="f" novalidate>
        <div class="fld">
          <label for="nm">Full name</label>
          <input id="nm" type="text"
            autocomplete="name" required>
        </div>

        <div class="fld">
          <label for="em">Email (for your confirmation)</label>
          <input id="em" type="email"
            autocomplete="email" required>
        </div>

        <div class="fld">
          <label for="ph">Phone (for pickup or delivery updates)</label>
          <input id="ph" type="tel"
            autocomplete="tel" required>
        </div>

        <div class="fld">
          <label for="dt">${del ? 'Delivery' : 'Pickup'} date</label>
          <input id="dt" type="date"
            min="${d}" value="${d}" required>
        </div>

        ${del ? `
          <div class="fld">
            <label for="ad">Delivery address</label>
            <input id="ad" type="text"
              autocomplete="street-address" required>
          </div>
        ` : ''}

        <div class="fld">
          <label for="nt">Note for the bakery (optional)</label>
          <input id="nt" type="text" maxlength="80"
            placeholder="e.g. Please add a candle">
        </div>

        <div class="row">
          <span>Subtotal</span><span>${money(sub())}</span>
        </div>
        <div class="row">
          <span>${del ? 'Delivery' : 'Pickup'}</span>
          <span>${ship(sub()) ? money(ship(sub())) : 'Free'}</span>
        </div>
        <div class="row total">
          <span>Total</span>
          <span>${money(sub() + ship(sub()))}</span>
        </div>

        <button class="btn primary"
          style="width:100%;margin-top:1rem">
          Place order
        </button>
      </form>
    `;

    $('#back').onclick = () => {
      view = 'cart';
      drawCart();
    };

    $('#nm').focus();

    $('#f').onsubmit = e => {
      e.preventDefault();

      let first = null;

      const rules = {
        nm: v => v.trim().length > 1 ||
          'Enter your name so we can label the order.',

        em: v => /^\S+@\S+\.\S+$/.test(v) ||
          'Enter an email like name@example.com.',

        ph: v => v.replace(/\D/g, '').length >= 7 ||
          'Enter a phone number with at least 7 digits.',

        dt: v => v >= d ||
          'Pick a date from ' + d + ' onwards.',

        ad: v => v.trim().length > 5 ||
          'Enter the street address for delivery.'
      };

      for (const [id, fn] of Object.entries(rules)) {
        const el = $('#' + id);
        if (!el) continue;

        const old = el.parentNode.querySelector('.err');
        old && old.remove();

        const r = fn(el.value);

        el.removeAttribute('aria-invalid');
        el.removeAttribute('aria-describedby');

        if (r !== true) {
          el.setAttribute('aria-invalid', 'true');

          const p = document.createElement('p');
          p.className = 'err';
          p.id = id + 'e';
          p.textContent = r;

          el.setAttribute('aria-describedby', p.id);
          el.after(p);

          first = first || el;
        }
      }

      if (first) return first.focus();

      const num = 'CC-' +
        Math.floor(1000 + Math.random() * 9000);

      const em = $('#em').value;
      const total = money(sub() + ship(sub()));
      const day = $('#dt').value;
      const how = del ? 'Delivery' : 'Pickup';

      state.cart = [];
      save();
      update();

      view = 'done';

      $('#cartBody').innerHTML = steps(3) + `
        <div class="done" tabindex="-1" id="ok">
          <div class="tick" aria-hidden="true">✓</div>
          <h3>Order ${num} is placed</h3>
          <p><strong>${how} on ${day} · ${total}</strong></p>

          <p>
            We sent a confirmation to ${em.replace(/</g, '&lt;')}.
            You can change it until 2pm the day before.
          </p>

          <button class="btn primary" id="fin">
            Keep browsing
          </button>
        </div>
      `;

      $('#ok').focus();
      $('#fin').onclick = close;
    };
  }

  // Wishlist management
  function updWish() {
    const n = wish.size;
    const b = $('#wcount');

    b.textContent = n;
    b.setAttribute('aria-label', n + ' saved');

    try {
      localStorage.setItem('cc-wish', JSON.stringify([...wish]));
    } catch (e) {}
  }

  function toggleWish(id) {
    const p = P.find(x => x.id === id);

    wish.has(id) ? wish.delete(id) : wish.add(id);

    updWish();

    toast(
      wish.has(id)
        ? `Saved ${p.name}`
        : `Removed ${p.name} from saved`
    );
  }

  $('#wishBtn').onclick = () => {
    state.saved = !state.saved;

    $('#wishBtn').setAttribute('aria-pressed', state.saved);

    render();
    location.hash = 'shop';
    $('#shop').scrollIntoView();
  };

  // Product quick view
  $('#grid').addEventListener('click', e => {
    const c = e.target.closest('.card');
    if (!c) return;

    const id = c.dataset.id;

    if (e.target.closest('[data-heart]')) {
      toggleWish(id);

      const b = $('[data-heart]', c);
      b.setAttribute('aria-pressed', wish.has(id));
      return;
    }

    if (e.target.closest('[data-qv]')) {
      quickView(id);
    }
  });

  function quickView(id) {
    const p = P.find(x => x.id === id);
    if (!p) return;

    const d = $('#qv');

    d.innerHTML = `
      <button class="x" data-close aria-label="Close">×</button>

      <div class="qv-grid">
        <div style="background:${p.bg}">
          ${photo(IMG.cake(p.id), p.name)}
        </div>

        <div>
          <p class="eyebrow">${p.cat}</p>
          <h2 id="qvT">${p.name}</h2>
          <p>${p.note}</p>

          <p class="price">${money(p.price)}</p>

          <label for="qvSize">Choose a size</label>

          <select id="qvSize">
            ${Object.entries(SIZES).map(([k, s]) => `
              <option value="${k}">${s.label}</option>
            `).join('')}
          </select>

          <p id="qvPrice">${money(p.price)}</p>

          <button class="btn primary" id="qvAdd">
            Add to cart
          </button>
        </div>
      </div>
    `;

    d.showModal();

    d.querySelector('[data-close]').onclick = () => d.close();

    $('#qvSize').onchange = e => {
      $('#qvPrice').textContent = money(
        p.price * SIZES[e.target.value].f
      );
    };

    $('#qvAdd').onclick = () => {
      add(id, $('#qvSize').value);
      d.close();
      toast(`Added ${p.name} to your cart`);
    };
  }

  // Featured cheesecake slider
  const top5 = [...P]
    .sort((a, b) => b.pop - a.pop)
    .slice(0, 5);

  $('#slider').innerHTML = top5.map((p, i) => `
    <article class="slide"
      style="background:${p.bg};--i:${i}" data-id="${p.id}">
      ${photo(IMG.cake(p.id), p.name)}
      <h3>${p.name}</h3>
      <p>${p.note}</p>
      <strong class="price">
        From ${money(p.price * SIZES.s.f)}
      </strong>
      <div class="acts">
        <button class="btn primary" data-sadd>
          Add 6-inch
        </button>
        <button class="btn ghost" data-qv>
          Quick view
        </button>
      </div>
    </article>
  `).join('');

  $('#slider').addEventListener('click', e => {
    const s = e.target.closest('.slide');
    if (!s) return;

    if (e.target.closest('[data-qv]')) {
      quickView(s.dataset.id);
    }

    if (e.target.closest('[data-sadd]')) {
      add(s.dataset.id, 's');
      toast('Added to your cart');
    }
  });

  const step = () => {
    const first = $('.slide');
    return first ? first.offsetWidth + 20 : 300;
  };

  $('#prev').onclick = () => {
    $('#slider').scrollBy({
      left: -step(),
      behavior: 'smooth'
    });
  };

  $('#next').onclick = () => {
    $('#slider').scrollBy({
      left: step(),
      behavior: 'smooth'
    });
  };

  $('#slider').addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') $('#next').click();
    if (e.key === 'ArrowLeft') $('#prev').click();
  });

  // ---- Bakers' favourites: 3D tilt and auto-moving ----
  const sl = $('#slider');
  const motionOK = !matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 3D tilt: the card turns towards the mouse
  sl.addEventListener('mousemove', e => {
    const c = e.target.closest('.slide');
    if (!c || !motionOK) return;

    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;

    c.style.setProperty('--ry', (x * 14) + 'deg');
    c.style.setProperty('--rx', (-y * 14) + 'deg');
  });

  // Reset the tilt when the mouse leaves a card
  sl.addEventListener('mouseleave', e => {
    const c = e.target;
    if (!c.classList || !c.classList.contains('slide')) return;

    c.style.setProperty('--rx', '0deg');
    c.style.setProperty('--ry', '0deg');
  }, true);

  // Cards fly in once when the section scrolls into view
  if (motionOK && 'IntersectionObserver' in window) {
    sl.classList.add('pre');

    new IntersectionObserver((list, ob) => {
      if (list[0].isIntersecting) {
        sl.classList.remove('pre');
        ob.disconnect();
      }
    }, { threshold: .2 }).observe(sl);
  }

  // Auto-move: next card every 3.5 seconds
  let auto = motionOK;
  let hold = false;
  const playBtn = $('#fPlay');

  playBtn.textContent = auto ? 'Pause' : 'Play';

  setInterval(() => {
    if (!auto || hold) return;

    const end = sl.scrollLeft + sl.clientWidth >= sl.scrollWidth - 4;

    end
      ? sl.scrollTo({ left: 0, behavior: 'smooth' })
      : sl.scrollBy({ left: step(), behavior: 'smooth' });
  }, 3500);

  // Stop moving while the person hovers, touches or focuses
  ['mouseenter', 'focusin', 'touchstart'].forEach(ev =>
    sl.addEventListener(ev, () => { hold = true; }, { passive: true }));

  ['mouseleave', 'focusout', 'touchend'].forEach(ev =>
    sl.addEventListener(ev, () => { hold = false; }, { passive: true }));

  // Pause / Play button
  playBtn.onclick = () => {
    auto = !auto;
    playBtn.textContent = auto ? 'Pause' : 'Play';
  };

  // Custom cake designer
  // The selected cake photo is shown with a coloured frame.
  const COL = {
    Berry: '#C2185B',
    Lemon: '#F4C430',
    Mint: '#6CBF9B',
    Lilac: '#9B7FD1'
  };

  $('#cuF').innerHTML = P.map(p => `
    <option value="${p.id}">${p.name}</option>
  `).join('');

  $('#cuS').innerHTML = Object.entries(SIZES).map(([k, s]) => `
    <option value="${k}">${s.label}</option>
  `).join('');

  $('#cuC').innerHTML = Object.entries(COL).map(([n, c], i) => `
    <label style="background:${c}" title="${n}">
      <input type="radio" name="cc" value="${c}"
        data-name="${n}" ${i ? '' : 'checked'}>
      <span class="sr">${n}</span>
    </label>
  `).join('');

  function cuDraw() {
    const p = P.find(x => x.id === $('#cuF').value);
    const s = SIZES[$('#cuS').value];
    const selected = $('#cuC input:checked');
    const col = selected ? selected.value : COL.Berry;
    const m = $('#cuM').value.trim();

    // Show the chosen cake image and decoration colour.
    $('#cuV').style.background = col;

    $('#cuV').innerHTML = photo(IMG.cake(p.id), p.name) + (
      m
        ? `<span class="cu-msg">${m.replace(/</g, '&lt;')}</span>`
        : ''
    );

    $('#cuP').textContent =
      `Total: ${money(p.price * s.f + DECOR)}`;
  }

  $('#cuForm').addEventListener('input', cuDraw);

  $('#cuForm').addEventListener('submit', e => {
    e.preventDefault();

    add(
      $('#cuF').value,
      $('#cuS').value,
      1,
      DECOR,
      $('#cuM').value.trim(),
      $('#cuC input:checked').dataset.name
    );

    toast('Added your custom cake to the cart');
  });

  // Menu section: group tabs and item list
  let menuGroup = MENU[0].name;

  function drawMenu() {
    $('#menuTabs').innerHTML = MENU.map(g => `
      <button type="button" data-m="${g.name}"
        aria-pressed="${g.name === menuGroup}">
        ${g.name}
      </button>
    `).join('');

    const g = MENU.find(x => x.name === menuGroup);

    $('#menuList').innerHTML = g.items.map(i => `
      <li>
        <div>
          <strong>${i.name}</strong>
          <small>${i.note}</small>
        </div>
        <span class="mp">${money(i.price)}</span>
        <button type="button" class="btn ghost"
          data-mid="${i.id}"
          aria-label="Add ${i.name} to cart">Add</button>
      </li>
    `).join('');
  }

  $('#menuTabs').addEventListener('click', e => {
    const b = e.target.closest('[data-m]');
    if (!b) return;

    menuGroup = b.dataset.m;
    drawMenu();
    $(`[data-m="${menuGroup}"]`).focus();
  });

  $('#menuList').addEventListener('click', e => {
    const b = e.target.closest('[data-mid]');
    if (!b) return;

    add(b.dataset.mid, 'f');
    toast('Added ' + itemOf(b.dataset.mid).name + ' to your cart');
  });

  // All cakes: search, type filter and size picker
  const cakeState = { cat: 'All', q: '' };

  // Show the price and the right button for the chosen size
  function cakeAct(card) {
    const c = CAKES.find(x => x.id === card.dataset.id);
    const i = +$('select', card).value;
    const z = c.sizes[i];

    $('.cc-price', card).textContent = money(z.price);

    $('.cc-act', card).innerHTML =
      z.stock === 'out'
        ? '<button type="button" class="btn ghost" disabled>Out of stock</button>'
      : z.stock === 'call'
        ? `<a class="btn ghost" href="tel:${SHOP_PHONE}">Call to order</a>`
        : `<button type="button" class="btn primary"
             data-cadd="${i}">Add to cart</button>`;
  }

  function drawCakes() {
    const q = cakeState.q.trim().toLowerCase();

    const list = CAKES.filter(c =>
      (cakeState.cat === 'All' || c.cat === cakeState.cat) &&
      c.name.toLowerCase().includes(q)
    );

    $('#cakeChips').innerHTML = CAKE_CATS.map(c => `
      <button type="button" data-cc="${c}"
        aria-pressed="${c === cakeState.cat}">${c}</button>
    `).join('');

    $('#cakeGrid').innerHTML = list.map(c => `
      <article class="cc" data-id="${c.id}">
        <div class="cc-pic">
          ${photo(c.pic || CAKE_PIC[c.cat], c.name)}
        </div>
        <h3>${c.name}</h3>
        <label class="sr" for="sz-${c.id}">Size of ${c.name}</label>
        <select id="sz-${c.id}">
          ${c.sizes.map((z, i) => `
            <option value="${i}">${z.label}</option>`).join('')}
        </select>
        <p class="cc-price"></p>
        <div class="cc-act"></div>
      </article>
    `).join('');

    document.querySelectorAll('.cc').forEach(cakeAct);

    $('#cakeCount').textContent = list.length + ' cakes';
    $('#cakeEmpty').hidden = list.length > 0;
  }

  $('#cakeQ').addEventListener('input', e => {
    cakeState.q = e.target.value;
    drawCakes();
  });

  $('#cakeChips').addEventListener('click', e => {
    const b = e.target.closest('[data-cc]');
    if (!b) return;

    cakeState.cat = b.dataset.cc;
    drawCakes();
    $(`[data-cc="${cakeState.cat}"]`).focus();
  });

  $('#cakeGrid').addEventListener('change', e => {
    if (e.target.tagName === 'SELECT') cakeAct(e.target.closest('.cc'));
  });

  $('#cakeGrid').addEventListener('click', e => {
    const b = e.target.closest('[data-cadd]');
    if (!b) return;

    const id = b.closest('.cc').dataset.id + '-' + b.dataset.cadd;
    add(id, 'f');
    toast('Added ' + itemOf(id).name + ' to your cart');
  });

  // Gallery images
  const GAL = [
    ['Cherry chocolate', 'images/bg3.webp'],
    ['Raspberry bundt', 'images/rasp.jpg'],
    ['Lemon cake', 'images/lemon.webp'],
    ['Blueberry cheesecake', 'images/blue.webp'],
    ['Chocolate and berries', 'images/bg2.jpg'],
    ['Caramel pecan', 'images/turtle.jpg'],
    ['Strawberry and chocolate', 'images/straw.webp'],
    ['Yellow rose cake', 'images/bg1.jpg']
  ];

  $('#mas').innerHTML = GAL.map((g, i) => `
    <button type="button" data-i="${i}"
      aria-label="View ${g[0]}">
      ${photo(g[1], g[0])}
      <span>${g[0]}</span>
    </button>
  `).join('');

  let gi = 0;

  // Open the image lightbox.
  function lightbox(i) {
    gi = (i + GAL.length) % GAL.length;

    const g = GAL[gi];
    const d = $('#lb');

    d.innerHTML = `
      <div class="lb">
        <button class="x" data-close
          aria-label="Close"
          style="position:absolute;top:.4rem;right:.4rem">
          ×
        </button>

        ${photo(g[1], g[0])}

        <h3 id="lbT">${g[0]}</h3>

        <p style="margin-inline:auto">
          Photo ${gi + 1} of ${GAL.length}
        </p>

        <div class="nav">
          <button class="btn ghost" data-n="-1">
            Previous
          </button>

          <button class="btn ghost" data-n="1">
            Next
          </button>
        </div>
      </div>
    `;

    if (!d.open) d.showModal();

    d.querySelector('[data-n="1"]').focus();
  }

  $('#mas').addEventListener('click', e => {
    const b = e.target.closest('button[data-i]');
    if (b) lightbox(+b.dataset.i);
  });

  $('#lb').addEventListener('click', e => {
    const n = e.target.dataset.n;

    if (n) {
      lightbox(gi + Number(n));
      $(`#lb [data-n="${n}"]`).focus();
    }

    if (
      e.target === $('#lb') ||
      e.target.hasAttribute('data-close')
    ) {
      $('#lb').close();
    }
  });

  $('#lb').addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') lightbox(gi + 1);
    if (e.key === 'ArrowLeft') lightbox(gi - 1);
  });

  // Initialize the application.
  drawMenu();
  drawCakes();
  cuDraw();
  updWish();
  render();
  update();

})();
