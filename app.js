(() => {
  const EDIT_MODE_CLASS = 'editMode';
  const NEW_TASK_INPUT_ID = 'new-task-input';
  const ADD_TASK_BUTTON_ID = 'add-task-btn';

  const ELEMENTS = {
    listItem: 'li',
    editLabel: 'label',
    editInput: 'input',
    editButton: 'button',
    deleteButton: 'button',
    deleteImg: 'img',
  };

  const CLASSES = {
    editLabel: 'task',
    editInput: 'task',
    editButton: 'edit',
    deleteButton: 'delete',
  };

  const SELECTORS = {
    incompleteTasks: 'incomplete-tasks',
    completedTasks: 'completed-tasks',
    checkBox: 'input[type=checkbox]',
    editInput: 'input[type=text]',
    editLabel: `${ELEMENTS.editLabel}.${CLASSES.editLabel}`,
    editButton: `${ELEMENTS.editButton}.${CLASSES.editButton}`,
    deleteButton: `${ELEMENTS.deleteButton}.${CLASSES.deleteButton}`,
    taskListItem: 'li',
  };

  const incompleteTasks = document.getElementById(SELECTORS.incompleteTasks);
  const completedTasks = document.getElementById(SELECTORS.completedTasks);

  //Mark task completed
  const toggleTask = function (taskItem) {
    const isCompleted = taskItem.querySelector(SELECTORS.checkBox)?.checked ?? false;
    (isCompleted ? completedTasks : incompleteTasks).appendChild(taskItem);
  };

  const editTask = function (taskItem) {
    const editInput = taskItem.querySelector(SELECTORS.editInput);
    const editLabel = taskItem.querySelector(SELECTORS.editLabel);
    const editButton = taskItem.querySelector(SELECTORS.editButton);
    const containsClass = taskItem.classList.contains(EDIT_MODE_CLASS);
    if (containsClass) {
      editLabel.innerText = editInput.value;
      editButton.innerText = 'Edit';
    } else {
      editInput.value = editLabel.innerText;
      editButton.innerText = 'Save';
    }

    taskItem.classList.toggle(EDIT_MODE_CLASS);
  };

  const deleteTask = function (taskItem) {
    taskItem.remove();
  };

  const taskClickHandler = function (event) {
    const clickedElement = event.target;
    const taskListItem = event.target.closest(SELECTORS.taskListItem);

    if (clickedElement.closest(SELECTORS.deleteButton)) {
      deleteTask(taskListItem);
      return;
    }

    if (clickedElement.closest(SELECTORS.editButton)) {
      editTask(taskListItem);
      return;
    }

    if (clickedElement.closest(SELECTORS.checkBox)) {
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
    const listItem = createEl(ELEMENTS.listItem);

    const checkBox = createEl(ELEMENTS.editInput, { type: 'checkbox' });

    const editLabel = createEl(ELEMENTS.editLabel, { className: CLASSES.editLabel, innerText: taskDescription });

    const editInput = createEl(ELEMENTS.editInput, { className: CLASSES.editInput, type: 'text' });

    const editButton = createEl(ELEMENTS.editButton, { className: CLASSES.editButton, innerText: 'Edit' });

    const deleteButton = createEl(ELEMENTS.deleteButton, { className: CLASSES.deleteButton, innerText: 'Edit' });
    const deleteImg = createEl(ELEMENTS.deleteImg, { src: './remove.svg', alt: 'Delete' });
    deleteButton.appendChild(deleteImg);

    listItem.append(checkBox, editLabel, editInput, editButton, deleteButton);

    return listItem;
  };

  const addTask = function () {
    const newTaskInput = document.getElementById(NEW_TASK_INPUT_ID);
    if (!newTaskInput.value) return;

    const taskElement = createNewTaskElement(newTaskInput.value);
    incompleteTasks.appendChild(taskElement);
    taskElement.addEventListener('click', taskClickHandler);
    newTaskInput.value = '';
  };

  const addButton = document.getElementById(ADD_TASK_BUTTON_ID);
  addButton.addEventListener('click', addTask);

  for (const taskListItem of [...incompleteTasks.children, ...completedTasks.children]) {
    taskListItem.addEventListener('click', taskClickHandler);
  }
})();
