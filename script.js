$(document).ready(function() {
                
    var replies = {
        
    };

    function stripchar(str) { //strip and replace characters that we don't want in text fields
        str = str.replace(/["']/g, '\\"');
        str = str.replace(/[&/#+()$~%:;*?<>{}]/g, ' ');
        return str;
    }

    function databaseUpdate(datastream) {
        $.ajax({
            method: 'POST',
            url: 'https://7lrul5ojk8.execute-api.us-east-2.amazonaws.com/beta/',
            headers: {
                'Content-Type': "application/json"


            },
            data: JSON.stringify(datastream),
            contentType: 'application/json',
            
        })
        
    };

    $('input[name=reason]').click(function() {
       console.log('Radio Button clicked')
       $('#reason-next').prop('disabled',false);
   })

   $('input[name=wish]').click(function() {
       console.log('Radio Button clicked')
       $('#wish-next').prop('disabled',false);
   })

   $('#dislike-text').keyup(function() {
       l = this.value.length;
       if (l >= 5) {
           $('#dislike-next').prop('disabled',false);
       }
   });

   $('#like-text').keyup(function() {
       l = this.value.length;
       if (l >= 5) {
           $('#like-next').prop('disabled',false);
       }
   });

   $('#close').click( function() {
        window.close();
   });

    $('.textfield').keyup(function() {
       var mlen = parseInt($(this).attr('maxlength'));
       var wlen = mlen/5;
        var len= this.value.length;
        if (this >=mlen) {
            this.value = this.value.substring(0,mlen);
        } else {
            $(this).next().text(mlen-len + '/' + mlen);
            if (len >= (mlen - wlen)) {
                $(this).next().toggleClass('.warn');
            }
        }
    });
    

   $('input[type=radio]').click(function() {
       if($('#other').is(':checked')) {
           $('#other-fill-reason').removeAttr('hidden');
       } else {
           $('#other-fill-reason').attr('hidden','');
       }
       if($('#other2').is(':checked')) {
           $('#other-fill-wish').removeAttr('hidden');
       } else {
           $('#other-fill-wish').attr('hidden','');
       }
    });

    $('.next-button').click(function() {
       var parent = $(this).parent();
       if ( parent.find('.survey-question-option').length > 0) { // If this is a radio button, get the value of the button that is checked
           
           if   (parent.find('.survey-question-option:checked').val() === 'other') { //If 'other' is checked, get the value of the 'survey-question-other' field
               replies[parent.attr('id')] = stripchar(parent.find('.other-fill').find('.survey-question-other').val());
           } else {
               replies[parent.attr('id')] = parent.find('.survey-question-option:checked').val();
           }
       } else if (parent.find('.textfield'). length > 0) { //If this is a textarea, get the value of the textarea
           replies[parent.attr('id')] = stripchar(parent.find('.textfield').val());
       } else if (parent.attr('id') === 'social-q') {
           $.each($('.smcb'), function() {
               cbid = $(this).attr('id');
               if ($(this).prop('checked')) {
                   replies[cbid] = 'Y';
               } else {
               replies[cbid] = 'N';
               }
           });
       } 
   
       console.log(replies);
       $(this).parent().attr('hidden','');
       console.log($(this).parent().attr('id'));
       $(this).parent().next().removeAttr('hidden');
    });
    $('#submit-button').click(function() {
       var parent = $(this).parent();
       if (parent.attr('id') === 'demo') {
           $.each($('select'), function() {
               selid = $(this).attr('id');
               replies[selid] = $(this).val();
           })
       }
       databaseUpdate(replies);
       $(this).parent().attr('hidden','');
       $('#thank').attr('hidden',false);
    });
   
});

