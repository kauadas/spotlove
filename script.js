// Defina aqui o ID da faixa do Spotify (apenas o ID, por exemplo: 3n3Ppam7vgaVa1iaRUc9Lp)
const SPOTIFY_TRACK_ID = '2QjOHCTQ1Jl3zawyYOpxh6';

const spotifyFrame = document.getElementById('spotifyFrame');
const playToggle = document.getElementById('playToggle');
const openEmbed = document.getElementById('openEmbed');
const embedWrap = document.getElementById('embedWrap');

const daysCountEl = document.getElementById('daysCount');
const monthsCountEl = document.getElementById('monthsCount');
const anniversariesCountEl = document.getElementById('anniversariesCount');
const memoriesCountEl = document.getElementById('memoriesCount');

const topMomentEl = document.getElementById('topMoment');

const descDays = document.getElementById('descDays');
const descMonths = document.getElementById('descMonths');
const descAnn = document.getElementById('descAnn');
const descMem = document.getElementById('descMem');

const descMoment = document.getElementById('descMoment');

const lyricsEl = document.getElementById('lyrics');

// Configuração principal — edite estes valores diretamente no código
const CONFIG = {
  descDays: 'Desde 11 de março',
  descMonths: 'Cada mês, um novo capítulo',
  descAnn: 'Momentos especiais comemorados',
  descMem: 'Conversas, chamadas, risos e tudo mais que compartilhamos.',
  descSong: 'Nome da música favorita do casal',
  descMoment: 'Deleta, tenho ciúmes dessa música.',
  favoriteSongTitle: '—',
  topMomentTitle: '—',
  lyrics: `Nós dois\nUm pouco sobre nós: momentos, risos e conversas.\nSubstitua este texto pela sua mensagem pessoal.`
};

function setSpotifyEmbed(trackId){
  if(!trackId || trackId === 'TRACK_ID_HERE'){
    spotifyFrame.src = '';
    embedWrap.style.opacity = '0.6';
    return;
  }
  spotifyFrame.src = `https://open.spotify.com/embed/track/${trackId}`;
  embedWrap.style.opacity = '1';
}

// Calcula dias desde 11 de março (usa o ano atual, ou o ano anterior se a data ainda não ocorreu neste ano)
function daysSinceMarch11(){
  const now = new Date();
  const year = now.getFullYear();
  let start = new Date(year, 2, 11); // mês 2 = março (0-indexed)
  if(start > now){
    start = new Date(year - 1, 2, 11);
  }
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.floor((now - start) / msPerDay) + 1; // +1 para contar o dia inicial
  return days;
}

function updateDaysCounter(){
  const days = daysSinceMarch11();
  daysCountEl.textContent = days;
}

function monthsSince(startDate){
  const now = new Date();
  let months = (now.getFullYear() - startDate.getFullYear()) * 12;
  months += now.getMonth() - startDate.getMonth();
  // se dia do mês atual é anterior ao dia de início, subtrai um mês
  if(now.getDate() < startDate.getDate()) months -= 1;
  return months + 1; // contar mês atual
}

function anniversariesSince(startDate){
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  const annThisYear = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());
  if(now < annThisYear) years -= 1;
  return Math.max(0, years);
}

function updateRetrospective(){
  const now = new Date();
  // determine start (11 de março deste ano ou ano anterior)
  const year = 2026;
  let start = new Date(year, 2, 11);
  if(start > now) start = new Date(year - 1, 2, 11);

  const days = daysSinceMarch11();
  const months = monthsSince(start) - 1;
  const anniversaries = anniversariesSince(start) + 2;
  const memories = "∞";

  daysCountEl.textContent = days;
  monthsCountEl.textContent = months;
  anniversariesCountEl.textContent = anniversaries;
  memoriesCountEl.textContent = memories;

  // populate small items from CONFIG
  favoriteSongEl.textContent = CONFIG.favoriteSongTitle;
  topMomentEl.textContent = CONFIG.topMomentTitle;
}
// populate descriptive texts and lyrics from CONFIG
function populateTexts(){
  descDays.textContent = CONFIG.descDays;
  descMonths.textContent = CONFIG.descMonths;
  descAnn.textContent = CONFIG.descAnn;
  descMem.textContent = CONFIG.descMem;
  
  descMoment.textContent = CONFIG.descMoment;

  topMomentEl.textContent = CONFIG.topMomentTitle;
  lyricsEl.textContent = CONFIG.lyrics;
}


// Inicialização

setSpotifyEmbed(SPOTIFY_TRACK_ID);
updateRetrospective();
populateTexts();

// Atualiza contador/retrospectiva a cada hora
setInterval(updateRetrospective, 1000 * 60 * 60);

openEmbed.addEventListener('click', ()=>{
  if(!spotifyFrame.src){
    alert('Nenhuma faixa configurada. Abra script.js e defina SPOTIFY_TRACK_ID.');
    return;
  }
  spotifyFrame.focus();
  spotifyFrame.scrollIntoView({behavior:'smooth', block:'center'});
});

playToggle.addEventListener('click', ()=>{
  if(!spotifyFrame.src){
    alert('Nenhuma faixa configurada. Edite script.js e coloque o ID da faixa do Spotify.');
    return;
  }
  spotifyFrame.scrollIntoView({behavior:'smooth', block:'center'});
  alert('Clique no botão ▶︎ dentro do player do Spotify para reproduzir a faixa.');
});

editLyricsBtn.addEventListener('click', enableEditing);
saveLyricsBtn.addEventListener('click', saveLyrics);
resetLyricsBtn.addEventListener('click', resetLyrics);

// Expor utilitário para trocar pista no console (útil para testes)
window.setTrack = function(trackId){
  setSpotifyEmbed(trackId);
}
