const taskSections = [...document.querySelectorAll(".task-section")];
const taskTitles = [...document.querySelectorAll(".task-title")];
const taskDescs = [...document.querySelectorAll(".task-description")];


const addCards = [...document.querySelectorAll(".add-card")];
const addTaskContainers = [...document.querySelectorAll(".add-task-container")];
const saveBtns = [...document.querySelectorAll(".save-button")];

addTaskContainers.forEach((addTaskContainer) => {
    addTaskContainer.style.display = "none";
})


addCards.forEach((addCard) => {
    addCard.addEventListener("click", () => {
        const containerIndex = addCards.indexOf(addCard);
        addCard.style.display = "none";
        addTaskContainers[containerIndex].style.display = "flex";

        
    })
})

saveBtns.forEach((saveBtn) => {
    saveBtn.addEventListener("click", () => {
        const saveBtnIndex = saveBtns.indexOf(saveBtn);

        if (taskTitles[saveBtnIndex].value === "" && taskDescs[saveBtnIndex].value === "") {
            addCards[saveBtnIndex].style.display = "block";
            addTaskContainers[saveBtnIndex].style.display = "none";
        } else {
            const taskContainer = document.createElement("div");
            taskContainer.className = "task-container";

            const taskTitleEl = document.createElement("p");
            taskTitleEl.innerText = taskTitles[saveBtnIndex].value;
            taskTitleEl.className = "task-title";
            taskContainer.appendChild(taskTitleEl);

            const taskDescEl = document.createElement("p");
            taskDescEl.innerText = taskDescs[saveBtnIndex].value;
            taskDescEl.className = "task-description";
            taskContainer.appendChild(taskDescEl);

            taskSections[saveBtnIndex].appendChild(taskContainer);
            addCards[saveBtnIndex].style.display = "block";
            addTaskContainers[saveBtnIndex].style.display = "none";
        }
    })
})