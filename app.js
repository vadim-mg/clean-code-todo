const incompleteTasks = document.getElementById('incomplete-tasks');
const completedTasks = document.getElementById('completed-tasks');

//Mark task completed
const toggleTask = function (taskItem) {
  const isCompleted = taskItem.querySelector('input[type=checkbox]')?.checked ?? false;
  (isCompleted ? completedTasks : incompleteTasks).appendChild(taskItem);
};

const editTask = function (taskItem) {
  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editBtn = taskItem.querySelector('.edit');
  const containsClass = taskItem.classList.contains('editMode');
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function (taskItem) {
  taskItem.remove();
};

const taskClickHandler = function (event) {
  const clickedElement = event.target;
  const taskListItem = event.target.closest('li');

  if (clickedElement.closest('button.delete')) {
    deleteTask(taskListItem);
    return;
  }

  if (clickedElement.closest('button.edit')) {
    editTask(taskListItem);
    return;
  }

  if (clickedElement.closest('input[type=checkbox]')) {
    toggleTask(taskListItem);
    return;
  }
};

/**
 * creare element with props
 * @param {string} tag
 * @param {object} props
 * @returns
 */
const createEl = (tag, props = {}) => Object.assign(document.createElement(tag), props);

//New task list item
const createNewTaskElement = function (taskDescription) {
  const listItem = createEl('li');

  const checkBox = createEl('input', { type: 'checkbox' });

  const editLabel = createEl('label', { className: 'task', innerText: taskDescription });

  const editInput = createEl('input', { className: 'task', type: 'text' });

  const editButton = createEl('button', { className: 'edit', innerText: 'Edit' });

  const deleteButton = createEl('button', { className: 'delete', innerText: 'Edit' });
  const deleteImg = createEl('img', { src: './remove.svg', alt: 'Delete' });
  deleteButton.appendChild(deleteImg);

  listItem.append(checkBox, editLabel, editInput, editButton, deleteButton);

  return listItem;
};

const addTask = function () {
  const newTaskInput = document.getElementById('new-task-input');
  if (!newTaskInput.value) return;

  const taskElement = createNewTaskElement(newTaskInput.value);
  incompleteTasks.appendChild(taskElement);
  taskElement.addEventListener('click', taskClickHandler);
  newTaskInput.value = '';
};

const addButton = document.getElementById('add-task-btn');
addButton.addEventListener('click', addTask);

for (const taskListItem of [...incompleteTasks.children, ...completedTasks.children]) {
  taskListItem.addEventListener('click', taskClickHandler);
}
