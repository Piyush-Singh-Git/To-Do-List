document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        storedTasks.forEach((ele) => { tasks.push(ele) });
        updateUI();
        updateStats();
    };
});
let tasks = [];
const add = document.getElementById("add");
add.addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});

const addTask = () => {
    const task = document.getElementById('task');
    const data = task.value.trim();
    // console.log(data);
    if (data) {
        tasks.push({ data: data, completed: false });
        // console.log(tasks)
        task.value = "";

        updateUI();
        updateStats();
        saveTasks();
    };
};

const updateUI = () => {
    const uol = document.getElementById("uol");
    uol.innerHTML = "";
    tasks.forEach((ele, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = ` <div class="taskItem">
                                    <div class="task1 ${ele.completed ? "completed" : ""}" >
                                        <input type="checkbox" class="cb" ${ele.completed ? "checked" : ""} >
                                        <p>${ele.data}</p>
                                    </div>
                                    <div class="icons">
                                        <button class="bin" onClick = "deleteTask(${index})" ><i class="fa fa-trash-o"></i></button>
                                        <button class=edit onClick = "editTask(${index})" ><i class="fa fa-edit"></i></button>
                                    </div>
                                </div> `

        listItem.addEventListener("change", () => toggleTaskComplete(index));
        uol.appendChild(listItem);

    });
    // updateStats();
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;

    updateUI();
    updateStats();
    saveTasks();
    // console.log(tasks);
};

const deleteTask = (index) => {
    tasks.splice(index, 1);

    updateUI();
    saveTasks();
    updateStats();
};

const editTask = (index) => {
    // const taskUpdate = document.getElementById("task");
    task.value = tasks[index].data;
    tasks.splice(index, 1);

    updateUI();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const compltedTasks = tasks.filter(ele => ele.completed).length;
    // console.log(compltedTasks);
    const totalTasks = tasks.length;
    const progress = (compltedTasks / totalTasks) * 100;
    // console.log(progress);
    const fill = document.getElementById("fill");
    // fill.style.width = `${progress}%`;
    fill.style.width = `${isNaN(progress) ? 0 : progress}%`;
    document.getElementById("ratio").innerText = `${compltedTasks}/${totalTasks}`;
};

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
