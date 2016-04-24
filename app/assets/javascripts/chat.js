// JavaScript File
//Chat logic

var chatboxFocus = new Array();
var chatBoxes = new Array();

var ready = function() {
    
    chatBox = {
        
        /**
         * creates an inline chatbox on the page by calling the
         * createChatBox function passing along the unique conversation_id
         *the focus section simply draws focus to this specific chatbox
         * @param conversation_id
         */
         
         chatWith: function (conversation_id) {
             //alert(GrchatBoxes.length)
             chatBox.createChatBox(conversation_id)
             $("#chatbox_" + conversation_id + " .chatboxtextarea").focus();
             
         },
         
          /**
         * closes the chatbox by essentially hiding it from the page
         * takes the display and makes it invisible
         * @param conversation_id
         */

        close: function (conversation_id) {
            $('#chatbox_' + conversation_id).css('display', 'none');
            chatBox.restructure();
        },
        
        /**
         * Plays a notification sound when a new chat message arrives
         */

        notify: function () {
            //var audioplayer = $('#chatAudio')[0];
            //audioplayer.play();
        },
        
        /**
         * Handles 'smart layouts' of the chatboxes. Like when new chatboxes are
         * added or removed from the view, it restructures them so that they appear
         * neatly aligned on the page
         * can be removed if needed be
         */

        restructure: function () {
            
            align = 0;
            for (x in chatBoxes) {
                chatbox_id = chatBoxes[x];

                if ($("#chatbox_" + chatbox_id).css('display') != 'none') {
                    if (align == 0) {
                        $("#chatbox_" + chatbox_id).css('right', '20px');
                    } else {
                        width = (align) * (280 + 7) + 20;
                        $("#chatbox_" + chatbox_id).css('right', width + 'px');
                    }
                    align++;
                }
            }
            
            /*
            align = 0;
            var merger = $.merge(chatBoxes,GrchatBoxes)
            for (x in chatBoxes) {
                chatbox_id = chatBoxes[x];

                if ($("#chatbox_" + chatbox_id).css('display') != 'none') {
                    if (align == 0) {
                        $("#chatbox_" + chatbox_id).css('right', '20px');
                    } else {
                        width = (align) * (280 + 7) + 20;
                        $("#chatbox_" + chatbox_id).css('right', width + 'px');
                    }
                    align++;
                }
                else if ($("#gchatbox_" + chatbox_id).css('display') != 'none') {
                    if (align == 0) {
                        $("#gchatbox_" + chatbox_id).css('right', '20px');
                    } else {
                        width = (align) * (280 + 7) + 20;
                        $("#gchatbox_" + chatbox_id).css('right', width + 'px');
                    }
                    align++;
                }
            }
            */
        },
        
        /**
         * Takes in two parameters. It is responsible for fetching the specific conversation's
         * html page and appending it to the body of our home page e.g if conversation_id = 1
         *
         * $.get("conversations/1, function(data){
         *    // rest of the logic here
         * }, "html")
         *
         * @param conversation_id
         * @param minimizeChatBox
         */

        createChatBox: function (conversation_id, minimizeChatBox) {
            //this checks if the chat box already has messages if it does then the length would be > 0
            //if so then it simply makes it pop up and then restructures if needed be
            //then it focuses it and return to stop there
            console.log($("#chatbox_" + conversation_id).length)
            if ($("#chatbox_" + conversation_id).length > 0) {
                console.log(">0");
                if ($("#chatbox_" + conversation_id).css('display') == 'none') {
                    $("#chatbox_" + conversation_id).css('display', 'block');
                    //alert("yo");
                    chatBox.restructure();
                }
                $("#chatbox_" + conversation_id + " .chatboxtextarea").focus();
                return;
            }
                //this simply goes and appends to the html body
                //new html code
            $("body").append('<div id="chatbox_' + conversation_id + '" class="chatbox"></div>')
            // this is a get method that sends a query to the database
            //the "data"within the function is what is returned
            //this is quering conversation table for a conversation id
            //if query succeeds then we run what is inside function
            //first line inside method it takes the data returned and finds the specific chatbox and sets it to the data in html
            //"#chatbox" is a way of getting the actual element from the page which was added in previous line
            //".chatboxcontent" is a css category which in the second line is telling it to scroll to top based of height
            //the expected return is html
            //sets bottom of chatbox to 0
            
            $.get("conversations/" + conversation_id, function (data) {
                $('#chatbox_' + conversation_id).html(data);
                $("#chatbox_" + conversation_id + " .chatboxcontent").scrollTop($("#chatbox_" + conversation_id + " .chatboxcontent")[0].scrollHeight);
            }, "html");

            $("#chatbox_" + conversation_id).css('bottom', '0px');

            chatBoxeslength = 0;
            //loops through all chatboxex to see which ones are not up
            for (x in chatBoxes) {
                if ($("#chatbox_" + chatBoxes[x]).css('display') != 'none') {
                    chatBoxeslength++;
                }
            }
            //if chatboxlength is 0 shift to right by 20px
            //else shift by specific px
            if (chatBoxeslength == 0) {
                $("#chatbox_" + conversation_id).css('right', '20px');
            } else {
                width = (chatBoxeslength) * (280 + 7) + 20;
                $("#chatbox_" + conversation_id).css('right', width + 'px');
            }

            chatBoxes.push(conversation_id);
            //it seems to minimize a chatbox
            if (minimizeChatBox == 1) {
                minimizedChatBoxes = new Array();

                if (Cookies.get('chatbox_minimized')) {
                    minimizedChatBoxes = Cookies.get('chatbox_minimized').split(/\|/);
                }
                minimize = 0;
                for (j = 0; j < minimizedChatBoxes.length; j++) {
                    if (minimizedChatBoxes[j] == conversation_id) {
                        minimize = 1;
                    }
                }

                if (minimize == 1) {
                    $('#chatbox_' + conversation_id + ' .chatboxcontent').css('display', 'none');
                    $('#chatbox_' + conversation_id + ' .chatboxinput').css('display', 'none');
                }
            }

            chatboxFocus[conversation_id] = false;
            //the blur line checks if the specific chatbox has lost focus
            //if so it changes it id in focus array tofalse
            //it removes the CSS class
            //you can deduce what happes at focus
            //it focus on the chatbox then it adds and removes classes
            //at click it simply does the function when clicked
            $("#chatbox_" + conversation_id + " .chatboxtextarea").blur(function () {
                chatboxFocus[conversation_id] = false;
                $("#chatbox_" + conversation_id + " .chatboxtextarea").removeClass('chatboxtextareaselected');
            }).focus(function () {
                chatboxFocus[conversation_id] = true;
                $('#chatbox_' + conversation_id + ' .chatboxhead').removeClass('chatboxblink');
                $("#chatbox_" + conversation_id + " .chatboxtextarea").addClass('chatboxtextareaselected');
            });

            $("#chatbox_" + conversation_id).click(function () {
                if ($('#chatbox_' + conversation_id + ' .chatboxcontent').css('display') != 'none') {
                    $("#chatbox_" + conversation_id + " .chatboxtextarea").focus();
                }
            });
            //after click it shows 
            //this show is in the controller forconversation
            $("#chatbox_" + conversation_id).show();

        },

        /**
         * Responsible for listening to the keypresses when chatting. If the Enter button is pressed,
         * we submit our conversation form to our rails app
         *
         * @param event
         * @param chatboxtextarea
         * @param conversation_id
         */

        checkInputKey: function (event, chatboxtextarea, conversation_id) {
            if (event.keyCode == 13 && event.shiftKey == 0) {
                event.preventDefault();

                message = chatboxtextarea.val();
                message = message.replace(/^\s+|\s+$/g, "");

                if (message != '') {
                    $('#conversation_form_' + conversation_id).submit();
                    $(chatboxtextarea).val('');
                    $(chatboxtextarea).focus();
                    $(chatboxtextarea).css('height', '44px');
                }
            }

            var adjustedHeight = chatboxtextarea.clientHeight;
            var maxHeight = 94;

            if (maxHeight > adjustedHeight) {
                adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
                if (maxHeight)
                    adjustedHeight = Math.min(maxHeight, adjustedHeight);
                if (adjustedHeight > chatboxtextarea.clientHeight)
                    $(chatboxtextarea).css('height', adjustedHeight + 8 + 'px');
            } else {
                $(chatboxtextarea).css('overflow', 'auto');
            }

        },
        
           toggleChatBoxGrowth: function (conversation_id) {
            if ($('#chatbox_' + conversation_id + ' .chatboxcontent').css('display') == 'none') {

                var minimizedChatBoxes = new Array();

                if (Cookies.get('chatbox_minimized')) {
                    minimizedChatBoxes = Cookies.get('chatbox_minimized').split(/\|/);
                }

                var newCookie = '';

                for (i = 0; i < minimizedChatBoxes.length; i++) {
                    if (minimizedChatBoxes[i] != conversation_id) {
                        newCookie += conversation_id + '|';
                    }
                }

                newCookie = newCookie.slice(0, -1)


               Cookies.set('chatbox_minimized', newCookie);
                $('#chatbox_' + conversation_id + ' .chatboxcontent').css('display', 'block');
                $('#chatbox_' + conversation_id + ' .chatboxinput').css('display', 'block');
                $("#chatbox_" + conversation_id + " .chatboxcontent").scrollTop($("#chatbox_" + conversation_id + " .chatboxcontent")[0].scrollHeight);
            } else {

                var newCookie = conversation_id;

                if (Cookies.get('chatbox_minimized')) {
                    newCookie += '|' + Cookies.get('chatbox_minimized');
                }


                Cookies.set('chatbox_minimized', newCookie);
                $('#chatbox_' + conversation_id + ' .chatboxcontent').css('display', 'none');
                $('#chatbox_' + conversation_id + ' .chatboxinput').css('display', 'none');
            }

        }
    }
}
//once page is ready it calls function ready
//adds event handler on page load to call ready
$(document).ready(ready);
$(document).on("page:load", ready);