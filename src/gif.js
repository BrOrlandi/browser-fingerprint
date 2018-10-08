const image = document.querySelector('.fingerprint__image');

const showGif = () => {
  const gifs = [
    'https://media.giphy.com/media/fpXxIjftmkk9y/giphy.gif',
    'https://media2.giphy.com/media/H1UqQRwnz9Z28/giphy.gif',
  ];

  const gifIndex = Math.floor(Math.random() * gifs.length);
  const gifUrl = gifs[gifIndex];
  image.innerHTML = `<img src="${gifUrl}" />`;
};

const detectPrivateModeFirefox = (cb) => {
  let db;

  const on = cb.bind(null, true);

  const off = cb.bind(null, false);

  function tryls() {
    try {
      localStorage.length
        ? off()
        : ((localStorage.x = 1), localStorage.removeItem('x'), off());
    } catch (e) {
      // Safari only enables cookie in private mode
      // if cookie is disabled then all client side storage is disabled
      // if all client side storage is disabled, then there is no point
      // in using private mode
      navigator.cookieEnabled ? on() : off();
    }
  }

  // Blink (chrome & opera)
  window.webkitRequestFileSystem
    ? webkitRequestFileSystem(0, 0, off, on)
    : // FF
    'MozAppearance' in document.documentElement.style
      ? ((db = indexedDB.open('test')), (db.onerror = on), (db.onsuccess = off))
      : // Safari
      /constructor/i.test(window.HTMLElement) || window.safari
        ? tryls()
        : // IE10+ & edge
        !window.indexedDB && (window.PointerEvent || window.MSPointerEvent)
          ? on()
          : // Rest
          off();
};

detectPrivateModeFirefox((isPrivateMode) => {
  if (isPrivateMode) {
    showGif();
  }
});
