const loader = document.querySelector('#loader');
const fingerprintContainer = document.querySelector('#fingerprint');
const formContainer = document.querySelector('#form');

export const showForm = () => {
  loader.classList.remove('show');
  fingerprintContainer.classList.remove('show');
  formContainer.classList.add('show');
};


export const showLoader = () => {
  loader.classList.add('show');
  fingerprintContainer.classList.remove('show');
  formContainer.classList.remove('show');
};

export const showFingerprint = (fingerprint) => {
  loader.classList.remove('show');
  formContainer.classList.remove('show');
  fingerprintContainer.classList.add('show');
  const valueContainer = fingerprintContainer.querySelector('.fingerprint__value');
  valueContainer.innerText = fingerprint.fingerprint;
  const nameContainer = fingerprintContainer.querySelector('.fingerprint__name');
  nameContainer.innerText = fingerprint.name;
};
