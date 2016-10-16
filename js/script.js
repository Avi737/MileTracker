
$(document).one('pageinit',function(){

    // Display runs
    showRuns();


    // Add Handler
    $('#submitAdd').on('tap',addRun);


    // Edit Handler
    $('#submitEdit').on('tap',editRun);


    // Delete Handler
    $('#stats').on('tap','#deleteLink',deleteRun);


    // Set Current Handler (The that been clicked for edit will be the current)
    $('#stats').on('tap','#editLink',setCurrent);



    // Clear  Handler
    $('#clearRuns').on('tap',clearRuns);



    /*
     * Show all runs on homepage
     */
    function showRuns(){
        // get runs object
        var runs = getRunsObject();

        // Check if empty
        if(runs != '' && runs != null){
            for(var i = 0;i < runs.length;i++){
                $('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>'+runs[i]["date"]+
                    ' <br><strong>Distance: </strong>'+runs[i]["miles"]+'m<div class="controls">' +
                    '<a href="#edit" id="editLink" data-miles="'+runs[i]['miles']+'" data-date="'+runs[i]['date']+'">Edit</a> | <a href="#" id="deleteLink" data-miles="'+runs[i]['miles']+'" data-date="'+runs[i]['date']+'" onclick="return confirm(\'Are you sure?\')">Delete</a></li>');
            }

            $('#home').bind('pageinit', function(){
                $('#stats').listview('refresh');
            });
        }else{
            $('#stats').html('<p>You have no logged runs</p>');
        }
    }





    /*
    * Add a run
    */
    function addRun(){
        // Get form values and put them into variables
        var miles = $('#addMiles').val();
        var date  = $('#addDate').val();

        // Create 'run' object
        var run = {
            date:date,
            miles:parseFloat(miles)
        };

        // Get the current run
        var runs = getRunsObject();

        // Add run to runs array
        runs.push(run);

        alert('Run Added');

        // Set stringfied to localStorage
        localStorage.setItem('runs', JSON.stringify(runs));

        // Redirect to index page
       	window.location.href="index.html";

        return false;
    }



    /*
     * Edit a run
     */
    function editRun() {
        // Get the current data
        currentMiles = localStorage.getItem('currentMiles');
        currentDate = localStorage.getItem('currentDate');

        // Get the current run
        var runs = getRunsObject();

        // Loop through all current runs
        for(var i = 0;i < runs.length;i++){
            if(runs[i].miles == currentMiles && runs[i].date == currentDate){
                runs.splice(i,1);
            }
            localStorage.setItem('runs',JSON.stringify(runs));
        }


        // Get the new values we want to update and putting them into variables.
        var miles = $('#editMiles').val();
        var date  = $('#editDate').val();

        // Create 'run' object
        var update_run = {
            date:date,
            miles:parseFloat(miles)
        };

        // Add run to runs array
        runs.push(update_run);

        alert('Run Updated');

        // Set stringfied to localStorage
        localStorage.setItem('runs', JSON.stringify(runs));

        // Redirect to index page
        window.location.href="index.html";

        return false;
    }

    /*
     * Clear Local Storage
     */
    function clearRuns(){
        localStorage.removeItem('runs');
        $('#stats').html('<p>You have no logged runs</p>');
    }

    /*
     * Delete a run
     */
    function deleteRun() {

        // Set localStorage items
        localStorage.setItem('currentMiles',$(this).data('miles'));
        localStorage.setItem('currentDate',$(this).data('date'));

        // Get the current data
        currentMiles = localStorage.getItem('currentMiles');
        currentDate = localStorage.getItem('currentDate');

        // Get the current run
        var runs = getRunsObject();

        // Loop through all current runs
        for(var i = 0;i < runs.length;i++){
            if(runs[i].miles == currentMiles && runs[i].date == currentDate){
                runs.splice(i,1);
            }
            localStorage.setItem('runs',JSON.stringify(runs));
        }

        alert('Run Deleted');

        // Redirect to index page
        window.location.href="index.html";

        return false;
    }


    /*
     * Set the current clicked miles,date
     */
    function setCurrent() {
        // Set localStorage items
        localStorage.setItem('currentMiles',$(this).data('miles'));
        localStorage.setItem('currentDate',$(this).data('date'));

        // Insert form fields
        $('#editMiles').val(localStorage.getItem('currentMiles'));
        $('#editDate').val(localStorage.getItem('currentDate'));
    }


    /*
     * Get the run object
     */
    function getRunsObject(){

        // Set runs array
        var runs = new Array();

        // Get the current run from localStorage.(coming back as a string)
        var currentRuns = localStorage.getItem('runs');

        // Check if there's anything in localStorage
        if(currentRuns !== null){
            // Set to runs
            runs = JSON.parse(currentRuns);
        }

        // Return runs object We'll sort it from the most recent to the further away.
        return runs.sort(function(a, b){return new Date(b.date) - new Date(a.date)});
    }

});
