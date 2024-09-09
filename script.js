var tasksold;
var tasksnew;
$(document).ready(function () {

    updateTaskslist();

    $('#searchfield').keyup(function (event) {
        performSearch($(this).val());
    });

    $('#matchcasecheckbox').change(function (e) {
        performSearch($('#searchfield').val());
    });

    $('#old').click(function (e) {
        toggle('old');
        performSearch($('#searchfield').val());
    });

    $('#new').click(function (e) {
        toggle('new');
        performSearch($('#searchfield').val());
    });
});


function toggle(button) {
    const oldButton = document.getElementById('old');
    const newButton = document.getElementById('new');

    if (button === 'old') {
        oldButton.classList.add('active');
        newButton.classList.remove('active');
    } else {
        newButton.classList.add('active');
        oldButton.classList.remove('active');
    }
}

function performSearch(keyword) {
    $('#tasks-container').html("");
    let tasks = null;
    if ($('#old').hasClass('active')) {
        tasks = tasksold;
    }
    else {
        tasks = tasksnew;
    }
    if(tasks == null)
    {
        return;
    }
    for (let i = 0; i < tasks.length; i++) {
        if (keyword == "") {
            break;
        }
        keyword = keyword.toLowerCase();
        let description = tasks[i].Description;
        description = description.toLowerCase();
        if (document.getElementById('matchcasecheckbox').checked) {
            if (description.includes(keyword)) {
                addTaskInList(tasks[i].Jobid, tasks[i].Description, tasks[i].Imageurl);
            }
        }
        else {
            let words = keyword.split(' ');
            for (let j = 0; j < words.length; j++) {
                if (!description.includes(words[j])) {
                    break;
                }
                else if (j == words.length - 1 && description.includes(words[j])) {
                    addTaskInList(tasks[i].Jobid, tasks[i].Description, tasks[i].Imageurl);
                }
                else {
                    continue;
                }
            }
        }
    }
}


function addTaskInList(jobid, description, imageurl) {
    $('#tasks-container').append(`<div class="task">
        <div class="task-left-container">
            <span class="jobid-heading">Job ID : </span>
            <span class="jobid">${jobid}</span>
            <h2 class="text-heading">Extracted Text:</h2>
            <span class="text-content">${description}</span>
        </div>
        <img class="task-image"
            src="${imageurl}"
            alt="Image">
    </div>`);
}



function updateTaskslist() {
    updateoldtasklist();
    updatenewtasklist();
}

function updateoldtasklist() {
    $.ajax({
        type: "GET",
        url: "tasksold.json",
        dataType: "json",
        success: function (data) {
            tasksold = data;
        },
        error: function (error) {
            console.log("Error Loading Old Tasks List");
        }
    });
}

function updatenewtasklist() {
    $.ajax({
        type: "GET",
        url: "tasksnew.json",
        dataType: "json",
        success: function (data) {
            tasksnew = data;
        },
        error: function (error) {
            console.log("Error Loading New Tasks List");
        }
    });
}