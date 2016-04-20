var app = window.app = {};
app.searchMenu = new function()
{
  this._input = $('#searchbar');
  this._initAutocomplete();
};

app.searchMenu.prototype = {
    
   _initAutocomplete: function() {
    this._input
      .autocomplete({
        source: '/groupconversations/show',
        appendTo: '#search-results',
        select: $.proxy(this._select, this)
      })
      .autocomplete('instance')._renderItem = $.proxy(this._render, this);
  },

  _render: function(ul, item) {
    var markup = [
      '<span class="username">' + item.name + '</span>',
      
    ];
    return $('<li>')
      .append(markup.join(''))
      .appendTo(ul);
  },

  _select: function(e, ui) {
    this._input.val(ui.item.name);
    return false;
  } 
};