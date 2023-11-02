// Get a reference to below button elements
const addButton = document.getElementById("addButton");
const completeAllButton = document.getElementById("completeAllButton");
const clearButton = document.getElementById("clearButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");


// Add an event listener to execute the functions when clicked
addButton.addEventListener("click", addTask);
completeAllButton.addEventListener("click", toggleAllCompleted);
clearButton.addEventListener("click", clearAllTasks);

// Add an event listener to the 'taskInput' input field to detect the 'Enter' key press
// If 'Enter' key is pressed, it executes the 'addTask' function
taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Function to add a new task to the task list
function addTask() {
  // Get the task text from the input field and remove leading/trailing whitespace
  const taskText = taskInput.value.trim();
  // Check if the task text is not empty
  if (taskText !== "") {
	// Create a new list item element
    const li = document.createElement("li");
	// Set the HTML content of the list item with task details
    li.innerHTML = `
      <span class="check">&#10003;</span>
      <span>${taskText}</span>
      <span class="delete">X</span>
    `;
	
    taskList.appendChild(li); // Append the new list item to the task list container
    taskInput.value = "";     // Clear the input field for a new task
    addEventListeners(li);	  // Add event listeners to the new task for completion and deletion
    updateTaskCount();		  // Update the displayed task count
  }
}

/**
 * Adds event listeners to the specified list item (task).
 * @param {HTMLElement} li - The list item element to which event listeners are added.
 */

function addEventListeners(li) {
  const check = li.querySelector(".check");
  const deleteBtn = li.querySelector(".delete");
  
  check.addEventListener("click", toggleTask);
  deleteBtn.addEventListener("click", deleteTask);
}

/**
 * Toggles the completion status of a task when a user interacts with a "check" element.
 * @param {Event} event - The event object triggered by the user's interaction.
 */
function toggleTask(event) {
  const check = event.target;
  const task = check.parentElement;
  task.classList.toggle("completed");
  updateTaskCount();
}

/**
 * Function to delete a task from the to-do list.
 * @param {Event} event - The event object, typically triggered by clicking a "delete" button.
 */
function deleteTask(event) {
  const deleteBtn = event.target;
  const task = deleteBtn.parentElement;
  taskList.removeChild(task);
  updateTaskCount();
}

/**
 * Toggles the completion status of all tasks in the to-do list.
 */
function toggleAllCompleted() {
  const tasks = taskList.children;
  let allCompleted = true;

  // Loop through each task to check if it's not completed; if found, set 'allCompleted' to false and exit the loop
  for (const task of tasks) {
    const check = task.querySelector(".check");
    const completed = task.classList.contains("completed");

    if (!completed) {
      allCompleted = false;
      break;
    }
  }

  // Loop through each task again to update their completion status and checkmarks
  for (const task of tasks) {
    const check = task.querySelector(".check");
    const completed = task.classList.contains("completed");

    if (allCompleted) {
      task.classList.remove("completed");
      if (!completed) {
        check.textContent = "";
      }
    } else {
      task.classList.add("completed");
      if (!completed) {
        check.textContent = "✓";
      }
    }
  }

  updateTaskCount();
}


/**
 * Clears all tasks in the to-do list and updates the task count.
 */
function clearAllTasks() {
  taskList.innerHTML = "";
  updateTaskCount();
}

/**
 * Updates and displays the count of completed tasks out of the total tasks in the to-do list.
 */
function updateTaskCount() {
  const totalTasks = taskList.children.length;
  const completedTasks = taskList.querySelectorAll(".completed").length;
  taskCount.textContent = `${completedTasks} tasks completed out of ${totalTasks} total tasks`;
}
