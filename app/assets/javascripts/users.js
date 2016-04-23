// JavaScript File

var ready = function() {
    
    /**
     * When the send message link on our home page is clicked
     * send an ajax request to our rails app with the sender_id and
     * recipient_id
     */

    $('.start-conversation').click(function (e) {
     
        e.preventDefault();

        var sender_id = $(this).data('sid');
        var recipient_id = $(this).data('rip');
        /**
         * when you do a post
         * the first url is for which table
         * also when you do a post it calls that controllers create method
         * in this case the create method and you see that it passes the parasmeters needed as well
         * 
         */
        $.post("/conversations", { sender_id: sender_id, recipient_id: recipient_id }, function (data) {
            chatBox.chatWith(data.conversation_id);
        });
        
    });
    
     $(document).on('click', '.gfaddusertoChatbox', function (e) {
        e.preventDefault();
        /*
        var id = $(this).data('cid');
        var vv = $("#searchbar").val();
        alert(id + "bubu " + vv);
        */
        alert( "bubu " );
        $("gfaddusertoChatbox").focus();
         
        //reset search bar to blank or remove it
    });
    /*
    this code will be for file selecting and actual work
    */
    $(document).on('click', '#fileLoader', function (e) {
        /*
        console.log("lkok");
        var fileInput = $( "input:file" );
        console.log(fileInput)
        var url = $(this).data('url');
        //var formm = $(this).data('form');
        console.log("lol");
        console.log(url);
        */
        
        console.log("tits")
        console.log(url)
        console.log(formm)
        console.log(typeof(formm))
        var id = $(this).data("cid");
        
        /*
        $.get("groupconversations/" + id, function (data) {
               console.log("lol")
               console.log(data.url);
               console.log(data.fields);
            }, "json");
            */
       //console.log(formm);
          var fileInput = $( "input:file" );
          
         fileInput.fileupload({
             fileInput: fileInput,
             url: url,
             type:            'POST',
      autoUpload:       true,
      formData:        formm,
      paramName:        'file', // S3 does not like nested name fields i.e. name="user[avatar_url]"
      dataType:         'XML',  // S3 returns XML if success_action_status is set to 201
      replaceFileInput: false,
      done: function(e, data) {
          /*
          console.log("done");
            console.log(tex)
            var filename = $('input[type=file]').val().split('\\').pop();
            console.log(filename)
        console.log("done again");
        var ffilen = filename+"?";
        var ftx = tex+ffilen
        console.log(ftx);
        */
        var filename = $('input[type=file]').val().split('\\').pop();
        
             $.ajax({
            
            
        url:  '/groupconversations/searchUsers.json',
        data: {idd:curid,filename:filename},
        dataType:'json',
        success: function(data) {
            //$('#gchatbox_' + gcid).load('/groupconversations/'+gcid +' #gchatbox_' + gcid);
            console.log("lollllg");
            console.log(data);
        },
        error: function(data) {
            console.log("error");
            console.log(data);
        }
        });
      }
         });
         
    });
    /*
    this button will trigger file selecting
    */
     $(document).on('click', '.guploadfile', function (e) {
         //var fileInput    = $('input:file');
         console.log("uploadfilefam");
        
        console.log("lol")
            url = $(this).data('sid');
         formm = $(this).data('form');
         tex = $(this).data('tex');
         cgid =  $(this).data('cid');
         console.log("pre-click")
         console.log(tex)
         // console.log( formm);
         // console.log(url);
           $('#fileLoader').click();
     });
     
    $(document).on('click', '.adduser', function (e) {
        e.preventDefault();
        
        var gcid = $(this).data('cid');
        /*
        var vv = $("#searchbar").val();
        alert(id + "bubu " + vv);
        */
        var currentG = $(this).data('rip');
        var my_id = $(this).data('sid')
        
        alert(currentG + "|| " + gcid + "|| " + my_id);
        var tagged_user = $('.searchbartype').tokenfield('getTokens');
        var pres = []
        var pores = []
        var thiss = []
        
        alert("done" + " " + tagged_user[0]);
        alert(tagged_user.length);
        if(tagged_user.length > 0)
        {
            //do the stuff
            for (i=0; i < tagged_user.length; i++) {
                pres.push(tagged_user[i].value)
                thiss.push(tagged_user[i].value)
            }
            
            for (i=0; i < currentG.length; i++) {
                pres.push(currentG[i])
            }
            pres.push(my_id)
            pres.sort();
            pores = pres.map(Number);
            alert(pores)
              $.ajax({
            
            type: 'PUT',
        url:  '/groupconversations/'+gcid,
        data: {groupuserarray: pores, newGuys:thiss},
        success: function(data) {
            //$('#gchatbox_' + gcid).load('/groupconversations/'+gcid +' #gchatbox_' + gcid);
            console.log(data);
        },
        error: function(data) {
            console.log(data);
        }
        });
            
        }
         
        //reset search bar to blank or remove it
    });
    
    
    $(document).on('click', '.searchbartype', function (event) {

        var id = $(this).data('cid');
        
       $('.searchbartype').focus();
        /*
        var datta;
        var datra;
       url = "/groupconversations/6.json";
       $.ajax({
    url: url,
    method: 'GET',
}).done(function(data, textStatus, jqXHR){
        console.log(data);
        datra = data;
        console.log(jqXHR.responseText);
        datta = jqXHR.responseText;
        console.log("lol");
        console.log(datta);
  });
        data = $.getJSON(url).done(function(response) {
            datra = response; //here's your response
            });
        console.log(data.responseText);
        console.log(data);
        $('#searchbar-typehead').focus();
        $("#searchbar-typehead").tokenInput(url, {

                preventDuplicates: true,
                 noResultsText: "Nothin' found.",
                theme:"facebook",
                
                onResult: function (results) {
                    $.each(results, function (index, value) {
                        value.name = value.name;
                        value.id = value.key;
                    });
                    return results;
                }

            });
            */
        $('.searchbartype').typeahead('destroy');
       var engine = new Bloodhound({
           
           prefetch: {
           
            url: '/groupconversations/'+id+'.json',
              ttl: 0,
              catche: false,
            
            transform: function (response) {
                //console.log(response);
                var tagged_user = $('.searchbartype').tokenfield('getTokens');
                return $.map(response, function (user) {
                    var exists = false;
                    for (i=0; i < tagged_user.length; i++) {
                        console.log(user.id);
                        console.log("inside loop");
                        if (user.id == tagged_user[i].value) {
                            var exists = true;
                        }
                    }
                    if (!exists) {
                        return {
                            
                            label: user.name,
                            value: user.id
                        };
                    }
                });
            }
            
        },
      datumTokenizer: function (d) {
          console.log(d.label);
          console.log("inside datum");
            return Bloodhound.tokenizers.whitespace(d.label);
        },
        
        queryTokenizer: Bloodhound.tokenizers.whitespace
       });
  
       engine.initialize(true);
         /**
         * autocomplete is used to autocomplete the searchbar
         * source tells use were the data is comming from
         */
         
       $('.searchbartype').tokenfield({
   typeahead: [ {
                hint: false,
                 highlight: true,
                 minLength: 1
            }, {name:"users",
                displayKey: 'label',
                source: engine.ttAdapter() }]
}).on('tokenfield:createtoken', function (event) {
    var existingTokens = $(this).tokenfield('getTokens');
    $.each(existingTokens, function(index, token) {
        if (token.value === event.attrs.value)
            event.preventDefault();
    });
    
});

 
        /*
        $('#searchbar').autocomplete({
               source: availableTutorials
            });
        */
    });
    
   
    
    /**
     * this will be used to start the modal to ask for upload of document to send
     * 
     */
     $('.start-upload').click(function (e) {
     
        e.preventDefault();

        //var sender_id = $(this).data('sid');
       // var recipient_id = $(this).data('rip');
        
       $('#uploadModal').modal('show');
        
    });
    /**
     * this will get all the values that have been choosen to create group
     * first is to gather an array of all the values because they are the user ids
     * if the array size is 0 tell them they choose nothing
     * if array is one it means its a regualr conversation so do like regualr conversation
     * else its a group conversation
     * 
     */
    $('.start-group').click(function (e) {
     
        e.preventDefault();

        var gsender_id = $(this).data('sid');
       // var recipient_id = $(this).data('rip');
        
      // $('#uploadModal').modal('show');
      var checkboxName = $(":checkbox").attr('name');
      
      //get all checkboxes
      var value = [];
      var fValue = []
      $("input[name*='" + checkboxName + "']").each(function () {
                        // Get all checked checboxes in an array
                        if (jQuery(this).is(":checked")) {
                            value.push($(this).val());
                            
                        }
                    });
                value.push(gsender_id)
                value.sort()    
                fValue = value.map(Number)    
                 
                 
                 $.post("/groupconversations", { groupuserarray: fValue }, function (data) {
                   
            gchatBox.chatWith(data.groupconversation_id);
        });
        $('#uploadModal').modal('hide');
    });
    
    /**
     * this will be used to create a search bar were 
     * you can add friends to this group
     */

    $(document).on('click', '.gaddusertoChatBox', function (e) {
        e.preventDefault();

        var id = $(this).data('cid');
        chatBox.toggleChatBoxGrowth(id);
    });
    /**
     * Used to minimize the chatbox
     */

    $(document).on('click', '.toggleChatBox', function (e) {
        e.preventDefault();

        var id = $(this).data('cid');
        chatBox.toggleChatBoxGrowth(id);
    });
    
    

    /**
     * Used to close the chatbox
     */

    $(document).on('click', '.closeChat', function (e) {
        e.preventDefault();

        var id = $(this).data('cid');
        chatBox.close(id);
    });


    /**
     * Listen on keypress' in our chat textarea and call the
     * chatInputKey in chat.js for inspection
     */

    $(document).on('keydown', '.chatboxtextarea', function (event) {

        var id = $(this).data('cid');
        chatBox.checkInputKey(event, $(this), id);
    });

    /**
     * When a conversation link is clicked show up the respective
     * conversation chatbox
     */

    $('a.conversation').click(function (e) {
        e.preventDefault();

        var conversation_id = $(this).data('cid');
        chatBox.chatWith(conversation_id);
    });
    /**
     * When a groupconversation link is clicked show up the respective
     * conversation chatbox
     */
    $('a.groupconversation').click(function (e) {
        e.preventDefault();

        var conversation_id = $(this).data('cid');
        gchatBox.chatWith(conversation_id);
    });
    
     /**
     * Used to minimize the chatbox
     */

    $(document).on('click', '.gtoggleChatBox', function (e) {
        e.preventDefault();

        var id = $(this).data('cid');
        gchatBox.toggleChatBoxGrowth(id);
    });

    /**
     * Used to close the chatbox
     */

    $(document).on('click', '.gcloseChat', function (e) {
        e.preventDefault();

        var id = $(this).data('cid');
        gchatBox.close(id);
    });


    /**
     * Listen on keypress' in our chat textarea and call the
     * chatInputKey in chat.js for inspection
     */

    $(document).on('keydown', '.gchatboxtextarea', function (event) {

        var id = $(this).data('cid');
        gchatBox.checkInputKey(event, $(this), id);
    });

    /**
     * When a conversation link is clicked show up the respective
     * conversation chatbox
     */
/**
    $('a.gconversation').click(function (e) {
        e.preventDefault();

        var groupconversation_id = $(this).data('cid');
        gchatBox.chatWith(groupconversation_id);
    });
    **/
}

$(document).ready(ready);
$(document).on("page:load", ready);