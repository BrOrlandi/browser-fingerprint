import Fingerprint2 from 'fingerprintjs2';
import { showFingerprint, showForm, showLoader } from './dom';
import './gif';

let fingerprint;
const form = document.querySelector('#form');

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true,
});


new Fingerprint2().get((result) => {
  fingerprint = result;
  const fingerprintRef = db.doc(`fingerprints/${fingerprint}`);

  fingerprintRef.get().then((doc) => {
    if (doc && doc.exists) {
      const data = doc.data();
      showFingerprint({
        fingerprint,
        name: data.name,
      });
      return;
    }
    showForm();
  });


  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target.name.value;

    showLoader();
    fingerprintRef.set({
      name,
    }).then(() => {
      showFingerprint({
        fingerprint,
        name,
      });
    });
  });
});
