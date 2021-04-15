//References
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
//global ref
let userName = null;

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage)

function login(event) {
  event.preventDefault();
  if(userNameInput.value) {
    userName = event;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  } else if(!userNameInput.value){
    alert('User name is empty!') 
  };
}

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
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
  if(!addMessageForm.value) {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  } else if(!addMessageForm.value) {
    alert('Text field is empty');
  }
};


