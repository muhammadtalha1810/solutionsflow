var tasks;
$(document).ready(function () {

    updateTaskslist();


    $('#searchfield').keyup(function (event) {
        performSearch($(this).val());
    });


    $('#matchcasecheckbox').change(function (e) {
        performSearch($('#searchfield').val());
    });

});


function performSearch(keyword)
{
    $('#tasks-container').html("");
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
    $.ajax({
        type: "GET",
        url: "tasks.json",
        dataType: "json",
        success: function (data) {
            tasks = data;
            // for(let i=0; i<tasks.length; i++)
            // {
            //     addTaskInList(tasks[i].Jobid,tasks[i].Description,tasks[i].Imageurl);
            // }
        },
        error: function (error) {
            console.log("Book Server Connection Error");
        }
    });
}