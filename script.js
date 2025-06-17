// Form Validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
  const email = this.email.value;
  const name = this.name.value;
  const message = this.message.value;

  if (!email || !name || !message) {
    alert("Please fill in all fields.");
    e.preventDefault();
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    e.preventDefault();
  }
});document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  // Get form values
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Show success message
  const messageBox = document.getElementById("formMessage");
  messageBox.textContent = "Message submitted successfully!";

  // Optionally, clear form fields
  this.reset();

  // Optionally hide message after a few seconds
  setTimeout(() => {
    messageBox.textContent = "";
  }, 3000);
});
function addImage() {
  const url = document.getElementById("imageUrlInput").value;
  if (url.trim() !== "") {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "User added image";
    document.getElementById("gallery").appendChild(img);
    document.getElementById("imageUrlInput").value = "";
  } else {
    alert("Please enter a valid image URL.");
  }
}



// To-Do List Logic
function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task === "") return;

  const li = document.createElement("li");
  li.textContent = task;

  li.onclick = () => li.remove(); // Click to remove
  document.getElementById("taskList").appendChild(li);
  input.value = "";
}
// Load tasks on page load
window.onload = function () {
  loadTasks();
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText) {
    const task = {
      text: taskText,
      completed: false
    };
    saveTask(task);
    taskInput.value = "";
    loadTasks(); // Re-render list
  }
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear existing

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.style.textDecoration = task.completed ? "line-through" : "none";
    li.style.cursor = "pointer";

    // Toggle complete
    li.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}
