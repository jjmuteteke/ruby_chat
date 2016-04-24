//the chat javascript is for one to one chat
//this one is meant to deal with the group chat activities
var GrchatboxFocus = new Array();
var GrchatBoxes = new Array();

var Gready =  function() {
    
    gchatBox = {
        
        /**
         * creates an inline chatbox on the page by calling the
         * createChatBox function passing along the unique conversation_id
         *the focus section simply draws focus to this specific chatbox
         * @param conversation_id
         */
         
         chatWith: function (groupconversation_id) {
             gchatBox.createChatBox(groupconversation_id)
             $("#gchatbox_" + groupconversation_id + " .chatboxtextarea").focus();
         },
         
          /**
         * closes the chatbox by essentially hiding it from the page
         * takes the display and makes it invisible
         * @param conversation_id
         */

        close: function (groupconversation_id) {
            $('#gchatbox_' + groupconversation_id).css('display', 'none');
            gchatBox.restructure();
        },
        
        /**
         * Plays a notification sound when a new chat message arrives
         */

        notify: function () {
            //var audioplayer = $('#chatAudio')[0];
            //audioplayer.play();
        },
        /**
         * this method searchs for users placed inside
         * 
         */
        userSearch: function () {
            
        },
         /**
         * Handles 'smart layouts' of the chatboxes. Like when new chatboxes are
         * added or removed from the view, it restructures them so that they appear
         * neatly aligned on the page
         * can be removed if needed be
         * might need for this to check for the other conversations
         */

        restructure: function () {
            
            align = 0;
            for (x in GrchatBoxes) {
                chatbox_id = chatBoxes[x];

                if ($("#gchatbox_" + chatbox_id).css('display') != 'none') {
                    if (align == 0) {
                        $("#gchatbox_" + chatbox_id).css('right', '20px');
                    } else {
                        width = (align) * (280 + 7) + 20;
                        $("#gchatbox_" + chatbox_id).css('right', width + 'px');
                    }
                    align++;
                }
            }
            
            /*
            align = 0;
            var merger = $.merge(chatBoxes,GrchatBoxes)
            for (x in merger) {
                chatbox_id = merger[x];

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
         * @param groupconversation_id
         * @param minimizeChatBox
         */

        createChatBox: function (groupconversation_id, gminimizeChatBox) {
            //this checks if the chat box already has messages if it does then the length would be > 0
            //if so then it simply makes it pop up and then restructures if needed be
            //then it focuses it and return to stop there
            if ($("#gchatbox_" + groupconversation_id).length > 0) {
                if ($("#gchatbox_" + groupconversation_id).css('display') == 'none') {
                    $("#gchatbox_" + groupconversation_id).css('display', 'block');
                    alert("gyo");
                    gchatBox.restructure();
                }
                $("#gchatbox_" + groupconversation_id + " .chatboxtextarea").focus();
                return;
            }
                //this simply goes and appends to the html body
                //new html code
            $("body").append('<div id="gchatbox_' + groupconversation_id + '" class="chatbox"></div>')
            // this is a get method that sends a query to the database
            //the "data"within the function is what is returned
            //this is quering conversation table for a conversation id
            //if query succeeds then we run what is inside function
            //first line inside method it takes the data returned and finds the specific chatbox and sets it to the data in html
            //"#chatbox" is a way of getting the actual element from the page which was added in previous line
            //".chatboxcontent" is a css category which in the second line is telling it to scroll to top based of height
            //the expected return is html
            //sets bottom of chatbox to 0
            
            $.get("groupconversations/" + groupconversation_id, function (data) {
                $('#gchatbox_' + groupconversation_id).html(data);
                $("#gchatbox_" + groupconversation_id + " .chatboxcontent").scrollTop($("#gchatbox_" + groupconversation_id + " .chatboxcontent")[0].scrollHeight);
            }, "html");

            $("#gchatbox_" + groupconversation_id).css('bottom', '0px');

            gchatBoxeslength = 0;
            //loops through all chatboxex to see which ones are not up
            for (x in GrchatBoxes) {
                if ($("#gchatbox_" + GrchatBoxes[x]).css('display') != 'none') {
                    gchatBoxeslength++;
                }
            }
            //if chatboxlength is 0 shift to right by 20px
            //else shift by specific px
            if (gchatBoxeslength == 0) {
                $("#gchatbox_" + groupconversation_id).css('right', '20px');
            } else {
                width = (gchatBoxeslength) * (280 + 7) + 20;
                $("#gchatbox_" + groupconversation_id).css('right', width + 'px');
            }

            GrchatBoxes.push(groupconversation_id);
            //it seems to minimize a chatbox
            if (gminimizeChatBox == 1) {
                gminimizedChatBoxes = new Array();

                if (Cookies.get('gchatbox_minimized')) {
                    gminimizedChatBoxes = Cookies.get('gchatbox_minimized').split(/\|/);
                }
                gminimize = 0;
                for (j = 0; j < gminimizedChatBoxes.length; j++) {
                    if (gminimizedChatBoxes[j] == groupconversation_id) {
                        gminimize = 1;
                    }
                }

                if (gminimize == 1) {
                    $('#gchatbox_' + groupconversation_id + ' .chatboxcontent').css('display', 'none');
                    $('#gchatbox_' + groupconversation_id + ' .chatboxinput').css('display', 'none');
                }
            }

            GrchatboxFocus[groupconversation_id] = false;
            //the blur line checks if the specific chatbox has lost focus
            //if so it changes it id in focus array tofalse
            //it removes the CSS class
            //you can deduce what happes at focus
            //it focus on the chatbox then it adds and removes classes
            //at click it simply does the function when clicked
            $("#gchatbox_" + groupconversation_id + " .chatboxtextarea").blur(function () {
                GrchatboxFocus[groupconversation_id] = false;
                $("#gchatbox_" + groupconversation_id + " .chatboxtextarea").removeClass('chatboxtextareaselected');
            }).focus(function () {
                GrchatboxFocus[groupconversation_id] = true;
                $('#gchatbox_' + groupconversation_id + ' .chatboxhead').removeClass('chatboxblink');
                $("#gchatbox_" + groupconversation_id + " .chatboxtextarea").addClass('chatboxtextareaselected');
            });

            $("#gchatbox_" + groupconversation_id).click(function () {
                if ($('#gchatbox_' + groupconversation_id + ' .chatboxcontent').css('display') != 'none') {
                    $("#gchatbox_" + groupconversation_id + " .chatboxtextarea").focus();
                }
            });
            //after click it shows 
            //this show is in the controller forconversation
            $("#gchatbox_" + groupconversation_id).show();

        },
        
        /**
         * Responsible for listening to the keypresses when chatting. If the Enter button is pressed,
         * we submit our conversation form to our rails app
         *
         * @param event
         * @param chatboxtextarea
         * @param conversation_id
         */

        checkInputKey: function (event, gchatboxtextarea, groupconversation_id) {
            if (event.keyCode == 13 && event.shiftKey == 0) {
                event.preventDefault();

                message = gchatboxtextarea.val();
                message = message.replace(/^\s+|\s+$/g, "");

                if (message != '') {
                    $('#groupconversation_form_' + groupconversation_id).submit();
                    $(gchatboxtextarea).val('');
                    $(gchatboxtextarea).focus();
                    $(gchatboxtextarea).css('height', '44px');
                }
            }

            var adjustedHeight = gchatboxtextarea.clientHeight;
            var maxHeight = 94;

            if (maxHeight > adjustedHeight) {
                adjustedHeight = Math.max(gchatboxtextarea.scrollHeight, adjustedHeight);
                if (maxHeight)
                    adjustedHeight = Math.min(maxHeight, adjustedHeight);
                if (adjustedHeight > gchatboxtextarea.clientHeight)
                    $(gchatboxtextarea).css('height', adjustedHeight + 8 + 'px');
            } else {
                $(gchatboxtextarea).css('overflow', 'auto');
            }

        },
        
        toggleChatBoxGrowth: function (groupconversation_id) {
            if ($('#gchatbox_' + groupconversation_id + ' .chatboxcontent').css('display') == 'none') {

                var minimizedChatBoxes = new Array();

                if (Cookies.get('gchatbox_minimized')) {
                    minimizedChatBoxes = Cookies.get('chatbox_minimized').split(/\|/);
                }

                var newCookie = '';

                for (i = 0; i < minimizedChatBoxes.length; i++) {
                    if (minimizedChatBoxes[i] != groupconversation_id) {
                        newCookie += groupconversation_id + '|';
                    }
                }

                newCookie = newCookie.slice(0, -1)


               Cookies.set('gchatbox_minimized', newCookie);
                $('#gchatbox_' + groupconversation_id + ' .chatboxcontent').css('display', 'block');
                $('#gchatbox_' + groupconversation_id + ' .chatboxinput').css('display', 'block');
                $("#gchatbox_" + groupconversation_id + " .chatboxcontent").scrollTop($("#gchatbox_" + groupconversation_id + " .chatboxcontent")[0].scrollHeight);
            } else {

                var newCookie = groupconversation_id;

                if (Cookies.get('gchatbox_minimized')) {
                    newCookie += '|' + Cookies.get('gchatbox_minimized');
                }


                Cookies.set('gchatbox_minimized', newCookie);
                $('#gchatbox_' + groupconversation_id + ' .chatboxcontent').css('display', 'none');
                $('#gchatbox_' + groupconversation_id + ' .chatboxinput').css('display', 'none');
            }

        }
        
        
        
    }
    
}

//once page is ready it calls function ready
//adds event handler on page load to call ready
$(document).ready(Gready);
$(document).on("page:load", Gready);