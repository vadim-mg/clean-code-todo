const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTaskHolder = document.getElementById('incompleteTasks'); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById('completed-tasks'); //completed-tasks

//Mark task completed
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

//New task list item
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

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

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createNewTaskElement(newTaskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  listItem.addEventListener('click', taskClickHandler);
  newTaskInput.value = '';
};

addButton.addEventListener('click', addTask);

for (const taskListItem of [...incompleteTaskHolder.children, ...completedTasksHolder.children]) {
  taskListItem.addEventListener('click', taskClickHandler);
}
