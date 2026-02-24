// Configura Firebase (metti i tuoi dati)
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROGETTO.firebaseapp.com",
  databaseURL: "https://PROGETTO-default-rtdb.firebaseio.com",
  projectId: "PROGETTO",
  storageBucket: "PROGETTO.appspot.com",
  messagingSenderId: "ID",
  appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function mostraSezione(id){
  document.querySelectorAll('.sezione').forEach(s => s.style.display='none');
  document.getElementById('home').style.display = id==='home'?'block':'none';
  if(id!=='home') document.getElementById(id).style.display='block';
}

function vota(opzione){
  const votoRef = db.ref('voti/'+opzione);
  votoRef.transaction(current => (current||0)+1);
}

// Aggiornamento voti in tempo reale
const voti = ['opzione1','opzione2','opzione3','opzione4'];
voti.forEach(o => {
  db.ref('voti/'+o).on('value', snapshot=>{
    let div = o==='opzione1'||o==='opzione2'?document.getElementById('votiA'):document.getElementById('votiB');
    div.innerHTML = `
      Opzione 1: ${o==='opzione1'?snapshot.val()||0:document.getElementById('votiA').innerHTML.split('Opzione 1: ')[1]?.split('<')[0]||0}<br>
      Opzione 2: ${o==='opzione2'?snapshot.val()||0:document.getElementById('votiA').innerHTML.split('Opzione 2: ')[1]?.split('<')[0]||0}<br>
      Opzione 3: ${o==='opzione3'?snapshot.val()||0:document.getElementById('votiB').innerHTML.split('Opzione 3: ')[1]?.split('<')[0]||0}<br>
      Opzione 4: ${o==='opzione4'?snapshot.val()||0:document.getElementById('votiB').innerHTML.split('Opzione 4: ')[1]?.split('<')[0]||0}
    `;
  });
});
