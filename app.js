const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTaskHolder = document.getElementById('incompleteTasks'); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById('completed-tasks'); //completed-tasks

const toggleTask = function (taskItem) {
  const isCompleted = taskItem.querySelector('input[type=checkbox]')?.checked ?? false;
  (isCompleted ? completedTasksHolder : incompleteTaskHolder).appendChild(taskItem);
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
  const taskItem = event.target.closest('li');

  if (clickedElement.closest('button.delete')) {
    deleteTask(taskItem);
    return;
  }

  if (clickedElement.closest('button.edit')) {
    editTask(taskItem);
    return;
  }

  if (clickedElement.closest('input[type=checkbox]')) {
    toggleTask(taskItem);
    return;
  }
};

const createNewTaskElement = function (taskString) {
  const taskItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  taskItem.appendChild(checkBox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createNewTaskElement(newTaskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  listItem.addEventListener('click', taskClickHandler);
  newTaskInput.value = '';
};

addButton.addEventListener('click', addTask);

for (const taskItem of [...incompleteTaskHolder.children, ...completedTasksHolder.children]) {
  taskItem.addEventListener('click', taskClickHandler);
}
