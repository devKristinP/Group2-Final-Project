//add delete button

const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  console.log("createTaskHtml", id);

  return `
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
        }">Mark As Done</button> &nbsp;
        <button class="btn btn-outline-danger delete-button">Delete</button>
    </div>
</li>
`;
};

export class TaskManager {
  #storageKey = "tasks-app";
  #nextId = 0;
  #tasks = [];

  constructor(storageKey = "tasks-app") {
    /**
     *  store storage key prefix in private field
     */

    this.#storageKey = storageKey;

    this.#loadState();
  }

  #loadState() {
    /**
     *  attempt to load saved tasks array and assign to private field
     */
    try {
      this.#tasks =
        JSON.parse(localStorage.getItem(this.#storageKey)).filter(
          (task) => typeof task.id === "number"
        ) || [];
    } catch (err) {
      this.#tasks = [];
    }

    this.#nextId =
      this.#tasks.reduce((max, task) => (max > task.id ? max : task.id), 0) + 1;

    this.#saveState();
  }

  #saveState() {
    // stuff gets saved here

    console.log("#saveState()::", this.#tasks);

    localStorage.setItem(this.#storageKey, JSON.stringify(this.#tasks));

    this.#render();
  }

  // Method-- creating a task object and the key value pairs
  addTask(name, description, assignedTo, dueDate) {
    const task = {
      id: this.#nextId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: "TODO",
    };

    this.#tasks.push(task);
    /*may currently return first task with ID of zero, will eventually show number increasing*/

    /**
     *  make a change, save our stuff
     */

    this.#saveState();
  }
  // Create the deleteTask method

  deleteTask(taskId) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    //looping over the tasks

    for (let i = 0; i < this.#tasks.length; i++) {
      const task = this.#tasks[i];

      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }

    //set this.#tasks to newTasks
    this.#tasks = newTasks;

    /**
     *   alternative to the above, which is cleaner, i think
     *
     *   this.#tasks = this.#tasks.filter(task => task.id !== taskId)
     */

    /**
     *  make a change, save our stuff
     */

    this.#saveState();
  }

  markTaskDone(taskId) {
    for (let i = 0; i < this.#tasks.length; i++) {
      const task = this.#tasks[i];

      console.log("markTaskDone(" + taskId + ")");
      console.log("before:", JSON.stringify(this.#tasks[i]));

      if (task.id === taskId) {
        this.#tasks[i].status = "DONE";
        break;
      }
    }

    this.#saveState();
  }

  // # prefix makes it private field, thus inaccessible from outside the instance

  getTaskById(taskId) {
    console.log("getTaskById:", taskId);
    // Create a variable to store the found task
    let foundTask;

    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.#tasks.length; i++) {
      // Get the current task in the loop

      const task = this.#tasks[i];

      // kp changed task.id === task     to     task.id === taskId
      // Check if its the right task by comparing the task's id to the id passed as a parameter
      if (task.id === taskId) {
        // Store the task in the foundTask variable
        foundTask = task;
      }
    }

    console.log("foundTask", foundTask);
    // Return the found task

    return foundTask;

    /**
     *  alternative to above
     *
     *  return this.#tasks.find(todo => todo.id === taskId)
     */
  }

  // Create the render method
  #render() {
    console.log("render()::", this.#tasks);

    // Create an array to store the tasks' HTML
    const tasksHtmlList = [];

    // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.#tasks.length; i++) {
      // Get the current task in the loop

      const task = this.#tasks[i];

      // Format the date
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

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

    const tasksListbutthole = document.getElementById("tasksList");
    console.log("#render", tasksListbutthole);
    document.getElementById("tasksList").innerHTML = tasksHtml;

    /**
     *   let's chat about the alternative to this one after the program
     */
  }

  /**
   *  removed previous load() and save() methods
   *
   *  save() was converted to #saveState() for internal use only (can't be
   *  called outside of the class instance)
   *
   *  load() is now part of the constructor, but could be extracted into
   *  a private method as well, if you were (for instance) to expand it into
   *  pulling data off a backend server or whatever and wanted to update
   *  with fresh state during runtime
   */
}
