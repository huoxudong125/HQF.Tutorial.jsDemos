
//https://davidwalsh.name/write-javascript-promises
var hipsterJesus = {

    html: function () {
        return $.getJSON('http://hipsterjesus.com/api/').then(function (data) {
            return data.text;
        });
    },

    paragraphs: function () {
        return this.html().then(function (html) {
            return html.replace(/<[^>]+>/g, "").split("");
        });
    },

    sentences: function () {
        return this.paragraphs().then(function (paragraphs) {
            return [].concat.apply([], paragraphs.map(function (paragraph) {
                return paragraph.split(/. /);
            }));
        });
    }
};

(function () {
        console.log(hipsterJesus.html());
        hipsterJesus.html().then(function (text) {
                $(document.body).append($("<p>").html(text));
            }

        )

    }

)();