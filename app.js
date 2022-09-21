const addCards = [...document.querySelectorAll(".add-card")];
const addTaskContainers = [...document.querySelectorAll(".add-task-container")];

addTaskContainers.forEach((addTaskContainer)=> {
    addTaskContainer.style.display = "none";
})


addCards.forEach((addCard) => 
{
    addCard.addEventListener("click",()=> {
        const containerIndex = addCards.indexOf(addCard);
        addCard.style.display = "none";
        addTaskContainers[containerIndex].style.display = "flex";
    });
});

