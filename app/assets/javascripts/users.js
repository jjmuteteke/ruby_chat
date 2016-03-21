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

        //var sender_id = $(this).data('sid');
       // var recipient_id = $(this).data('rip');
        
      // $('#uploadModal').modal('show');
      var checkboxName = $(":checkbox").attr('name');
      
      //get all checkboxes
      var value = [];
      $("input[name*='" + checkboxName + "']").each(function () {
                        // Get all checked checboxes in an array
                        if (jQuery(this).is(":checked")) {
                            value.push($(this).val());
                        }
                    });
                    
                    //alert(value.join());
                    
                 
                 
                 $.post("/groupconversations", { sender_id: 1, groupuserarray: value }, function (data) {
            chatBox.chatWith(data.conversation_id);
        });
        $('#uploadModal').modal('hide');
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
}

$(document).ready(ready);
$(document).on("page:load", ready);