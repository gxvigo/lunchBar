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
    
    function updateFeedback(data) {  // data is a variable provided by jquery with the reslult of the get call
        var output = '';   
        $.each(data.feedback, function(key, item) {
           output += `
                <div class="feedback-item item-list media-list">
                    <div class="feedback-item media">
                        <div class="feedback-info media-body">
                            <div class="feedback-head">
                                <div class="feedback-title"><small class="feedback-name">${item.name}  </small><small class="feedback-name label label-info">${item.rating}</small></div>
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