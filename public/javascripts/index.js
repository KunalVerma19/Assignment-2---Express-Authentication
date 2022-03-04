var text = ["Full Stack developer", "Mobile developer","Software Developer", "Wordpress Developer"];
var counter = 0;
var elem = document.getElementById("changeText");
var inst = setInterval(change, 3000);

function change() {
    elem.innerHTML = text[counter];
    counter++;
    if (counter >= text.length) {
        counter = 0;
        // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
    }
}

// !(function($) {
//     "use strict";

//     $('.skills-content').waypoint(function() {
//         $('.progress .progress-bar').each(function() {
//             $(this).css("width", $(this).attr("aria-valuenow") + '%');
//         });
//         offset: '80%'
//     });
// })(jQuery);