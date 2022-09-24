const heading = document.querySelector(".heading");
const taskSections = [...document.querySelectorAll(".task-section")];
const taskTitles = [...document.querySelectorAll(".task-title")];
const taskDescs = [...document.querySelectorAll(".task-description")];
const dragContainers = [...document.querySelectorAll(".drag-container")]

const addCards = [...document.querySelectorAll(".add-card")];
const addTaskContainers = [...document.querySelectorAll(".add-task-container")];
const saveBtns = [...document.querySelectorAll(".save-button")];

heading.addEventListener("dblclick", () => {
    heading.toggleAttribute("readonly");
})

heading.addEventListener("blur", () => {
    heading.classList.remove("heading-focus");
})


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
            taskContainer.classList.add("task-container");
            taskContainer.classList.add("draggable");

            const taskTitleEl = document.createElement("p");
            taskTitleEl.innerText = taskTitles[saveBtnIndex].value;
            taskTitleEl.className = "task-title-p";
            taskContainer.appendChild(taskTitleEl);

            const taskDescEl = document.createElement("p");
            taskDescEl.innerText = taskDescs[saveBtnIndex].value;
            taskDescEl.className = "task-description-p";
            taskContainer.appendChild(taskDescEl);
            taskContainer.setAttribute("draggable", true);

            taskTitles[saveBtnIndex].value = null;
            taskDescs[saveBtnIndex].value = null;

            dragContainers[saveBtnIndex].appendChild(taskContainer);
            addCards[saveBtnIndex].style.display = "block";
            addTaskContainers[saveBtnIndex].style.display = "none";
        }

        const draggables = document.querySelectorAll(".draggable");
        draggables.forEach((draggable) => {
            draggable.addEventListener("dragstart", () => {
                draggable.classList.add("dragging");
            });

            draggable.addEventListener("dragend", () => {
                draggable.classList.remove("dragging");
            })
        });
    })
})


dragContainers.forEach((dragContainer) => {
    dragContainer.addEventListener("dragover", (event) => {
        event.preventDefault();
        const draggable = document.querySelector(".dragging");
        const afterEl = getDragUponEl(dragContainer, event.clientY);
        if(afterEl == null) {
            dragContainer.appendChild(draggable);
        } else {
            dragContainer.insertBefore(draggable, afterEl);
        }
    })
})


function getDragUponEl(dragContainer, y) {
    const dragContainers = [...dragContainer.querySelectorAll('.draggable:not(dragging)')];
    return dragContainers.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - (box.height / 2);
        if (offset < 0 && offset > closest.offset) {
            return {
                offset: offset,
                element: child
            }
        } else {
            return closest;
        }
    }, {
        offset: Number.NEGATIVE_INFINITY
    }).element;
}