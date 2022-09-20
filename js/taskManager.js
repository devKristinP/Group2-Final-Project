/*function createTaskHtml(name, description, assignedTo, dueDate) {
    const html = `<li class="list-group-item">Dishes
    <div class="task-cards">
      <div class="card  border-dark border-5 my-5 ml-3" style="width: 18rem">
        <div class="card-body">
          <ul class="card-text" style="list-style: none">
            <div class="d-flex justify-content-end">
              <input class="form-check-input" type="checkbox" />
            </div>
            <li>Task Name${name}</li>
            <li>Task Description${description}</li>
            <li>Assigned To${assignedTo}</li>
            <li>Due Date${dueDate}</li>
            <li>Status</li>
            console.log(html);
 
       <div class="d-flex w-100 justify-content-end">
       <button class="btn btn-outline-success done-button ${status === 'TODO' ? 'visible' : 'invisible'}">Mark As Done</button>
        </div>`
}*/

//add delete button
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => `
    <li class="list-group-item" data-task-id=${id}>
        <div class="d-flex w-100 mt-2 justify-content-between align-items-center">
            <h5>${name}</h5>
            <span class="badge ${
              status === "TODO" ? "badge-danger" : "badge-success"
            }">${status}</span>
        </div>
        <div class="d-flex w-100 mb-3 justify-content-between">
            <small>Assigned To: ${assignedTo}</small>
            <small>Due: ${dueDate}</small>
        </div>
        <p>${description}</p>
        <div class="d-flex w-100 justify-content-end">
            <button class="btn btn-outline-success done-button mr-1 ${
              status === "TODO" ? "visible" : "invisible"
            }">Mark As Done</button>
            <button class="btn btn-outline-danger delete-button>Delete</button><button type="button" class="btn btn-danger delete-button float-right">Delete</button>
            </div>
        </div>
    </li>
`;

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = []; //this is the task list
    this.currentId = currentId;
  }
  // Method-- creating a task object and the key value pairs
  addTask(name, description, assignedTo, dueDate) {
    const task = {
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: "TODO",
    };

    this.tasks.push(task);
    /*may currently return first task with ID of zero, will eventually show number increasing*/

    this.#saveState(); // make a change, save our stuff
  }
  // Create the deleteTask method

  deleteTask(taskId) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    //looping over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];

      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }

    //set this.tasks to newTasks
    this.tasks = newTasks;

    this.#saveState(); // make a change, save our stuff
  }

  // # prefix makes it private field, thus inaccessible from outside the instance
  #saveState() {
    // stuff gets saved here
    localStorage.setItem("saved-todo-tasks", this.tasks);
    localStorage.setItem("saved-current-id", this.currentId);
  }

  getTaskById(taskId) {
    // Create a variable to store the found task
    let foundTask;

    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop

      const task = this.tasks[i];
      // kp changed task.id === task     to     task.id === taskId
      // Check if its the right task by comparing the task's id to the id passed as a parameter
      if (task.id === taskId) {
        // Store the task in the foundTask variable
        foundTask = task;
      }
    }

    // Return the found task
    return foundTask;
  }
  // Create the render method
  render() {
    // Create an array to store the tasks' HTML
    const tasksHtmlList = [];

    // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

      // Format the date
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

      // Create the task html
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );

      // Push it to the tasksHtmlList array
      tasksHtmlList.push(taskHtml);
    }

    // Create the tasksHtml by joining each item in the tasksHtmlList

    const tasksHtml = tasksHtmlList.join("\n");

    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector("#tasksList");
    tasksList.innerHTML = tasksHtml;
  }

  // Create the save method
  save() {
    // Create a JSON string of the tasks
    const tasksJson = JSON.stringify(this.tasks);

    // Store the JSON string in localStorage
    localStorage.setItem("tasks", tasksJson);

    // Convert the currentId to a string;
    const currentId = String(this.currentId);

    // Store the currentId in localStorage
    localStorage.setItem("currentId", currentId);
  }

  // Create the load method
  load() {
    // Check if any tasks are saved in localStorage
    if (localStorage.getItem("tasks")) {
      // Get the JSON string of tasks in localStorage
      const tasksJson = localStorage.getItem("tasks");

      // Convert it to an array and store it in our TaskManager
      this.tasks = JSON.parse(tasksJson);
    }

    // Check if the currentId is saved in localStorage
    if (localStorage.getItem("currentId")) {
      // Get the currentId string in localStorage
      const currentId = localStorage.getItem("currentId");

      // Convert the currentId to a number and store it in our TaskManager
      this.currentId = Number(currentId);
    }
  }
}
