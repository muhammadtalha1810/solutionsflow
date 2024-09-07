var tasks;
$(document).ready(function () {

    updateTaskslist();
    

    // $('#search-box').keyup(function (event) { 
    //     $('#searched-books').html("");
    //     var keyword = $(this).val();
    //     for(let i=0; i<books.length; i++)
    //     {
    //         if(keyword == "")
    //         {
    //             break;
    //         }
    //         var title = books[i].title;
    //         if((title.toLowerCase()).includes(keyword.toLowerCase()))
    //         {
    //             addBookInSearchList(books[i].title, books[i].author, books[i].imageUrl);
    //         }
    //     }
    // });


    
    
});





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



function updateTaskslist()
{
    $.ajax({
        type: "GET",
        url: "tasks.json",
        dataType: "json",
        success: function (data) {
            tasks = data;
            for(let i=0; i<tasks.length; i++)
            {
                addTaskInList(tasks[i].Jobid,tasks[i].Description,tasks[i].Imageurl);
            }
        },
        error: function(error){
            console.log("Book Server Connection Error");
        }
    });
}