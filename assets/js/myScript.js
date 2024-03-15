// document.addEventListener("DOMContentLoaded", function() {
$(document).ready(function(){ 
    let taskInput = $("#taskInput");
    let btnAddTaskInput = $("#btnAddTaskInput");
    let btnTaskCompleted = $("#btnTaskCompleted");
    let btnTaskRemoveFromList = $("#btnTaskRemoveFromList");
    let btnTaskAllSelect = $("#btnTaskAllSelect");
    let btnClearCompletedList =  $("#btnClearCompletedList");

    let tasksList = $("#tasksList");
    let completedList =  $("#completedList");
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks == null) tasks = [];

    let completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
    if(completedTasks == null) completedTasks = [];

    function isTaskExistsTasks(task) {
        return tasks.includes(task);
    }
    list(tasks, tasksList);
    list(completedTasks, completedList);

   
    btnAddTaskInput.click(function(event){

        if(taskInput.val().length > 0 && !isTaskExistsTasks(taskInput.val())){
            
            tasks.push(taskInput.val());
            localStorage.setItem('tasks',JSON.stringify(tasks));
            list(tasks, tasksList);
        } else {
            swal.fire("Please enter a valid Task!");
        }
        taskInput.val("");
    });

    btnTaskCompleted.click(function(event){
        
        let checked = $("#tasksList input[type='checkbox']:checked");


        if(checked.length != 0){
        checked.each(function(checkedTask,index){
            let completed =tasks.splice(checked,1)[0];
            completedTasks.push(completed) ;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        
        })

        list(tasks, tasksList);
        list(completedTasks, completedList);
        
            

        }
    });

    btnTaskRemoveFromList.click(function(event){

        let checked = $("#tasksList input[type='checkbox']:checked");


        if(checked.length != 0){
        checked.each(function(checkedTask,index){
            let removed = tasks.splice(checked,1)[0];
            tasks=tasks.filter((e)=> e!==removed);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        })
    }
        list(tasks, tasksList);
        list(completedTasks, completedList);
    });

    btnTaskAllSelect.click(function(){
       selectAll();
   });

    btnClearCompletedList.click(function(){
        removeCompleted();
        list(completedTasks, completedList);
    });

    document.body.addEventListener( "click", function ( e ) {
      
        let element = e.target;
        let elementId = element.id;
        let elementIsTaskDelete = element.className.includes("delete-task") ; 
        
        if(elementIsTaskDelete && idExistsTasks(elementId) && (taskName = tasks[elementId]) && isNameExistsTasks(taskName)){ 

        tasks.splice(elementId,1);
        localStorage.setItem('tasks',JSON.stringify(tasks));
        list(tasks, tasksList);

        }
    });
    function idExistsTasks(id){
        return tasks[id] !== undefined;
    }
    function isNameExistsTasks(taskName){
        return tasks.find(item => item  === taskName )!== undefined;
    }

    function list(items, listPlace) {

        if(items == null || (Array.isArray(items) && !items.length)){
            let liElement = $("<li>");
            //let liElement = document.createElement( 'li' );
            liElement.addClass('list-group-item bg-warning text-white');
            //liElement.setAttribute('class','list-group-item bg-warning text-white');
            liElement.text("There are no Tasks listed yet.");
            // listPlace.innerHTML = " ";
            // listPlace.appendChild(liElement);
            $(listPlace).html(liElement);
        }
        else {
            $(listPlace).html(""); // Önceki içeriği temizle
            items.forEach(function(item, index, array){

                let liElement = $("<li>");
                liElement.addClass("list-group-item bg-secondary mb-2");

                let inputElement = $("<input>");
                inputElement.attr({
                    type: "checkbox",
                    value: item,
                    name: item,
                    id: `task-${index}`
                });
                // inputElement.type='checkbox';
                // inputElement.value= item;
                // inputElement.name = item;
                // inputElement.id=`task-${index}`;

                let labelElement = $("<label>");
                labelElement.attr("for", `task-${index}`);
                labelElement.text(item);
                labelElement.addClass("ms-3");
                // labelElement.textContent=item;

                let iElement = $("<i>");
                iElement.addClass("bi bi-trash-fill float-end delete-task text-primary");
                iElement.attr("id", index);

                if(listPlace == tasksList){
                    liElement.append(inputElement, labelElement, iElement);
                } else {
                    liElement.append(labelElement); 
                }
   
//         }
                $(listPlace).append(liElement);
            });
        }
    }

    function selectAll(){
        let allTask = $("#tasksList input[type='checkbox']");
        console.log( allTask.prop('checked'));

        allTask.prop("checked", true);
    }
    function removeCompleted() {

        completedTasks.length = 0;
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        
    }

});
