const $ = (el) => document.querySelector(el);
const create = (el) => document.createElement(el);

const getSinglePhoto = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(data => resolve(data.url))
    .catch(error => reject(error))
  });
}

const baseUrl = "https://source.unsplash.com/random?";
let counter = 1, max = 10;

function loadPhotos() {
  while (counter <= max) {
    const msg = create('span');
    msg.textContent = `Loading #${counter}`;
    const img = create('img');
    const a = create('a');
    a.setAttribute('target', '_blank');
    a.appendChild(img);
    const li = create('li');
    li.appendChild(a);
    li.appendChild(msg);
    $('.container').appendChild(li);
    const randomUrl = `${baseUrl}/${counter++}`;
    getSinglePhoto(randomUrl).then(url => {
      a.href = url;
      img.src = url;
      img.classList.add('fade-in');
      msg.classList.add('fade-out');
    })
    .catch(error => console.log({error}));
  }
}

$('.load').addEventListener('click', (e) => {
  max += 10;
  loadPhotos();
  window.scrollTo(0, document.body.scrollHeight);
});

loadPhotos();