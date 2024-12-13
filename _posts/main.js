const images = [
  './images/images.avif',
  './images/photo-1431066444736-9e4962596d13.avif',
  './images/photo-1522799809538-e328295d6749.avif',
  './images/photo-1539807083969-fc1f6a4f6da8.avif',
  './images/photo-1545647274-96644da34363.avif',
  './images/photo-1557360798-c91519105dd7.avif',
];

function initApp() {
  // Set random background image
  const bodyTag = document.querySelector('body');
  const randomImg = images[Math.floor(Math.random() * images.length)];
  bodyTag.style.backgroundImage = `url(${randomImg})`;
  bodyTag.style.backgroundRepeat = 'no-repeat';
  bodyTag.style.backgroundSize = 'cover';
  bodyTag.style.backgroundPosition = 'center';

  // Geolocation and weather functionality
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      // Display location information
      const statusElement = document.getElementById('status');
      statusElement.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
      
      // Fetch weather information
      getWeather(latitude, longitude);
    }, (error) => {
      console.error("Geolocation error:", error);
      document.getElementById('status').textContent = "Unable to retrieve location information.";
    });
  } else {
    console.log("Geolocation is not available");
    document.getElementById('status').textContent = "This browser does not support geolocation.";
  }

  // Timer setup
  const timer = document.querySelector('.timer');
  if (timer) {
    const h1Tag = document.createElement('h1');
    h1Tag.style.textAlign = 'center';
    h1Tag.style.color = "white";
    h1Tag.innerHTML = 'Current time:';
    timer.appendChild(h1Tag);

    const getTime = () => {
      const now = new Date();
      const hour = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      h1Tag.innerHTML = `${hour}:${minutes}:${seconds}`;
    };

    const countTime = () => {
      setInterval(getTime, 1000);
    };

    countTime();
  } else {
    console.error("Timer element not found in the DOM");
  }

  // Todo List setup
  setupTodoList();
}

function getWeather(latitude, longitude) {
  const apiKey = '';
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=kr`;
  const geocodeUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}&lang=kr`;

  Promise.all([
    fetch(weatherUrl).then(response => response.json()),
    fetch(geocodeUrl).then(response => response.json())
  ])
    .then(([weatherData, locationData]) => {
      const weatherInfo = document.getElementById('weather-info');
      if (weatherInfo) {
        const locationName = locationData[0].local_names?.ko || locationData[0].name;
        weatherInfo.innerHTML = `
          <p>위치: ${locationName}</p>
          <p>온도: ${weatherData.main.temp}°C</p>
          <p>날씨: ${weatherData.weather[0].description}</p>
          <p>습도: ${weatherData.main.humidity}%</p>
        `;
      }
    })
    .catch(error => {
      console.error("날씨 정보를 가져오는데 실패했습니다:", error);
      const weatherInfo = document.getElementById('weather-info');
      if (weatherInfo) {
        weatherInfo.textContent = "날씨 정보를 가져올 수 없습니다.";
      }
    });
}


function setupTodoList() {
  const btn = document.querySelector(".todoListBtn");
  const inputValue = document.querySelector('.todoListInput');
  const todoSection = document.querySelector(".todoListSection");

  if (btn && inputValue && todoSection) {
    const saveTodos = () => {
      const todos = Array.from(todoSection.children).map(li => li.querySelector('span').textContent);
      localStorage.setItem('todos', JSON.stringify(todos));
    };

    const loadTodos = () => {
      const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      savedTodos.forEach(todo => {
        const liTag = createTodoElement(todo);
        todoSection.appendChild(liTag);
      });
    };

    const createTodoElement = (text) => {
      const liTag = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = text;
      const btn = document.createElement('button');
      btn.textContent = '❌';
      btn.addEventListener('click', removeTodo);
      liTag.appendChild(span);
      liTag.appendChild(btn);
      return liTag;
    };

    const removeTodo = (e) => {
      const li = e.target.closest('li');
      todoSection.removeChild(li);
      saveTodos();
    };

    const addTodo = () => {
      const trimmedValue = inputValue.value.trim();
      if (!trimmedValue) {
        alert('Please enter a task');
        return;
      }
      const liTag = createTodoElement(trimmedValue);
      todoSection.appendChild(liTag);
      inputValue.value = '';
      saveTodos();
    };

    btn.addEventListener("click", addTodo);
    loadTodos();
  } else {
    console.error("One or more required elements for todo functionality not found in the DOM");
  }
}

// Login functionality
const loginContainer = document.querySelector('.login-container');
const loginBtn = document.querySelector('.loginBtn');
const registerBtn = document.querySelector('.registerBtn');
const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');
const loginStatusText = document.getElementById('loginStatus');

registerBtn.addEventListener('click', () => {
   const username = usernameInput.value.trim();
   const password = passwordInput.value.trim();

   if (!username || !password) {
     alert('Please enter both username and password.');
     return;
   }

   localStorage.setItem('username', username);
   localStorage.setItem('password', password);

   alert('Registration successful.');
});

loginBtn.addEventListener('click', () => {
   const username = usernameInput.value.trim();
   const password = passwordInput.value.trim();

   const storedUsername = localStorage.getItem('username');
   const storedPassword = localStorage.getItem('password');

   if (username === storedUsername && password === storedPassword) {
     loginStatusText.textContent = 'Login successful!';
     loginStatusText.style.color = 'green';

     loginContainer.style.display = 'none';
     document.querySelector('.todoList').style.display = 'block';

     initApp();
   } else {
     loginStatusText.textContent = 'Login failed. Incorrect username or password.';
     loginStatusText.style.color = 'red';
   }
});

document.addEventListener('DOMContentLoaded', function() {
  // Your existing DOMContentLoaded code here
  if (localStorage.getItem('username')) {
    loginContainer.style.display = 'none';
    document.querySelector('.todoList').style.display = 'block';
    initApp();
  }
});
