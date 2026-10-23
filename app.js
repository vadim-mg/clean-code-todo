(() => {
  const TAG_NAMES = {
    listItem: 'li',
    label: 'label',
    input: 'input',
    button: 'button',
    image: 'img',
  };

  const CLASS_NAMES = {
    task: 'task',
    editButton: 'edit',
    deleteButton: 'delete',
    editMode: 'editMode',
  };

  const SELECTORS = {
    newTaskInput: `#new-task-input`,
    addTaskButton: `#add-task-btn`,
    incompleteTasks: '#incomplete-tasks',
    completedTasks: '#completed-tasks',
    checkBox: 'input[type=checkbox]',
    editInput: 'input[type=text]',
    editLabel: `label.${CLASS_NAMES.task}`,
    editButton: `button.${CLASS_NAMES.editButton}`,
    deleteButton: `button.${CLASS_NAMES.deleteButton}`,
  };

  const incompleteTasks = document.querySelector(SELECTORS.incompleteTasks);
  const completedTasks = document.querySelector(SELECTORS.completedTasks);

  const toggleTask = function (taskItem) {
    const isCompleted = taskItem.querySelector(SELECTORS.checkBox)?.checked ?? false;
    (isCompleted ? completedTasks : incompleteTasks).appendChild(taskItem);
  };

  const editTask = function (taskItem) {
    const editInput = taskItem.querySelector(SELECTORS.editInput);
    const editLabel = taskItem.querySelector(SELECTORS.editLabel);
    const editButton = taskItem.querySelector(SELECTORS.editButton);
    if (taskItem.classList.contains(CLASS_NAMES.editMode)) {
      editLabel.textContent = editInput.value;
      editButton.textContent = 'Edit';
      taskItem.classList.remove(CLASS_NAMES.editMode);
      return;
    }
    editInput.value = editLabel.textContent;
    editButton.textContent = 'Save';
    taskItem.classList.add(CLASS_NAMES.editMode);
  };

  const deleteTask = function (taskItem) {
    taskItem.remove();
  };

  const taskClickHandler = function (event) {
    const clickedElement = event.target;
    const taskItem = event.target.closest(TAG_NAMES.listItem);

    if (clickedElement.closest(SELECTORS.deleteButton)) {
      deleteTask(taskItem);
      return;
    }

    if (clickedElement.closest(SELECTORS.editButton)) {
      editTask(taskItem);
      return;
    }

    if (clickedElement.closest(SELECTORS.checkBox)) {
      toggleTask(taskItem);
      return;
    }
  };

  const createEl = (tag, props = {}) => Object.assign(document.createElement(tag), props);

  const createNewTaskElement = function (taskDescription) {
    const taskItem = createEl(TAG_NAMES.listItem);

    const checkBox = createEl(TAG_NAMES.input, { type: 'checkbox' });

    const editLabel = createEl(TAG_NAMES.label, { className: CLASS_NAMES.task, innerText: taskDescription });

    const editInput = createEl(TAG_NAMES.input, { className: CLASS_NAMES.task, type: 'text' });

    const editButton = createEl(TAG_NAMES.button, { className: CLASS_NAMES.editButton, innerText: 'Edit' });

    const deleteButton = createEl(TAG_NAMES.button, { className: CLASS_NAMES.deleteButton });

    const deleteImg = createEl(TAG_NAMES.image, { src: './remove.svg', alt: 'Delete' });
    deleteButton.appendChild(deleteImg);

    taskItem.append(checkBox, editLabel, editInput, editButton, deleteButton);

    return taskItem;
  };

  const addTask = function () {
    const newTaskInput = document.querySelector(SELECTORS.newTaskInput);
    if (!newTaskInput.value) return;

    const taskElement = createNewTaskElement(newTaskInput.value);
    incompleteTasks.appendChild(taskElement);
    taskElement.addEventListener('click', taskClickHandler);
    newTaskInput.value = '';
  };

  const addButton = document.querySelector(SELECTORS.addTaskButton);
  addButton.addEventListener('click', addTask);

  for (const taskItem of [...incompleteTasks.children, ...completedTasks.children]) {
    taskItem.addEventListener('click', taskClickHandler);
  }
})();
