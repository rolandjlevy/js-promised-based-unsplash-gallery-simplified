const $ = (selector) => document.querySelector(selector);

function getSinglePhoto(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(data => resolve(data.url))
    .catch(error => reject({error}))
  });
}

const baseUrl = "https://source.unsplash.com/random?";
let counter = 0;
let max = 60;

while (counter++ < max) {
  const randomUrl = `${baseUrl}/${counter}`;
  const msg = document.createElement('span');
  msg.textContent = `Loading #${counter}`;
  const img = document.createElement('img');
  const a = document.createElement('a');
  a.setAttribute('target', '_blank');
  a.appendChild(img);
  const li = document.createElement('li');
  li.appendChild(msg);
  li.appendChild(a);
  $('.container').appendChild(li);
  getSinglePhoto(randomUrl).then(url => {
    a.href = url;
    img.src = url;
    img.classList.add('fade-in');
    msg.classList.add('fade-out');
  });
}