var currentDate = new Date();

// jquery is used below
$(function() {  // this function is loaded whenever the page is loaded
    $.getJSON('/api/feedback', updateFeedback);  // invoke REST API (GET feedback route) returning JSON objet passed as parameter to function updateFeedback
    
    $(".feedback-form").submit(function(e){ // event listener of the submit form. It generate an event 'e' 
        e.preventDefault();  // prevent the form to be reloaded
        $.post('/api/feedback', { // invoke REST API (POST feedback route)
            "rating": $("#feedback-form-rating").val(),  // building the POST body
            "name": $("#feedback-form-name").val(),
            "email": $("#feedback-form-email").val(),
            "message": $("#feedback-form-message").val(),
            "date": currentDate
        }, updateFeedback); // execute the updateFeedback to reaload the content of the feedbacl section
    });
    
    $(".feedback-messages").on('click', function(e) {  // Click event doesn't work on dynamically generated elements (e.g. .media-left)
       console.log("### Clicked!"); 
        if (e.target.className == 'glyphicon glyphicon-remove') {
            $.ajax({
                url: '/api/feedback/' + e.target.id, // this is the id (key) of the feedback element used to correlate the array element in the feedback.json
                type: 'DELETE',
                success: updateFeedback
            });
        }
    });
    
    function updateFeedback(data) {  // data is a variable provided by jquery with the reslult of the get call
        var output = '';  
        var delBtn = '';
        
        if (document.getElementById('adminFeedback') != null) {
            delBtn = '<div class="media-left"><button class="feedback-delete btn btn-xs btn-danger"><span id="${key}" class="glyphicon glyphicon-remove"></span></button></div>';
        }

        $.each(data.feedback, function(key, item) {  // key is the array index, it is used to identify elements in feedback array (and file)
           output += `
                <div class="feedback-item item-list media-list">
                    <div class="feedback-item media">
                        ${delBtn}
                        <div class="feedback-info media-body">
                            <div class="feedback-head">
                                <div class="feedback-title"><small class="feedback-name"> ${item.name} </small><small class="feedback-name label label-info">${item.rating}</small></div>
                            </div>
                            <div class="feedback-message">${item.message}</div>
                        </div>
                    </div>
                </div>
            `; 
        });
        $(".feedback-messages").html(output);
    };  
});