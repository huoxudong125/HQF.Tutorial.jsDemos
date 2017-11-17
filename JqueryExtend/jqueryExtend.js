jQuery.fn.extend({

    //we using val() directly is enough
    getSelectedValue: function () {
        //    var result= this.find("option:selected").val();
        var result = this.val();
        return result;
    },

    getSelectedText: function () {
        var result = this.find("option:selected").text();
        return result;
    },

    triggerChange: function () {
        this.trigger("change");
    },

    triggerClick: function () {
        this.trigger("click");
    },
});