jQuery.fn.extend({

    getSelectedValue: function () {
    //    var result= this.find("option:selected").val();
       var result= this.val();
       return result;
    },

    getSelectedText: function () {
       var result= this.find("option:selected").text();
       return result;
    }


});




