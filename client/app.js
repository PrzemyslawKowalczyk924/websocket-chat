//References
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

//global ref
let userName = null;

const socket = io();
socket.on('message', ({ author, content}) => addMessage(author, content));
socket.on('join', ({ author, content}) => addMessage(author, content));
socket.on('itemToBeRemoved', ({ author, content}) => addMessage(author, content));


function login(event) {
  event.preventDefault();
  
  if(userNameInput.value) {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    socket.emit('join', userName);
  } 
  else if(!userNameInput.value){
    alert('User name is empty!') 
  };
}

/* CLIENT SECTION */

function addMessage(author, content) {
  console.log('Im ', author)
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
  if(author === 'Chat Bot') message.classList.add('message--chatbot');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}

function sendMessage(event) {
  event.preventDefault();

  if(messageContentInput.value) {
    addMessage(userName, messageContentInput.value);
    socket.emit('message', { author: userName, content: messageContentInput.value });
    messageContentInput.value = '';
  }
  else if(!messageContentInput.value) {
    alert('Text field is empty');
  }
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage)
