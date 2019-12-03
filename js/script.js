$(function() {
    let questionIndex = 0;
    let newurl='';
    $("#headerText").text(headerText);
    $("#instruction").css({color: headerInstructionColor});
    $("#instruction").text(Instruction);
    $('body').css({'background-image': 'url('+bg+')'});
  


    // url value
    // let url = window.location.href;
    // if (url.indexOf('?') > 0) {
    //     let params = new URLSearchParams(url.substring(1));
    //     tableFor = parseInt(params.get('tableFor'));
    //     // generateOptions();
    //     dragDrop();
    //     optionRandPosition();
    //     // console.log("url variable available....");
    // } else {
    //     // console.log("url variable not available...");
    // }



    //function to generateFirstQuestion

    function generateQuestion(){
        let numArray = [];
        let denomArray = [];
        let lcm = null;
        let questHtml = '';
        // let lcmCarry  = null;

        for(let i=0; i< noOfFraction; i++){
            // generate random numerator and denominator
            let numerator = Math.ceil(Math.random() * (numeratorMax - numeratorMin)+1) + numeratorMin;
            let denominator = Math.ceil(Math.random() * (denominatorMax - denominatorMin)+1) + denominatorMin;
            numArray.push(numerator);
            denomArray.push(denominator);
            let html = `<div class="singleFraction">
                             <p class="noOne">${numerator}</p>
                             <p class="straightLine"></p>
                             <p class="noTwo">${denominator}</p>
                        </div>
                        <p class="plusSign sign">+</p>`

            questHtml += html;
            }
            $('.question').html(questHtml);

            console.log("numArray", numArray);
            console.log("denomArray", denomArray);
            let  length = denomArray.length();
            
            console.log('array length ', length)
            let Index = null;
            function lcmr(){
                Index = null;
                let i = 0;
                lcm = lcm + denomArray[0];
                
                // if(lcm % numArray[i]==0 && lcm % numArray[1]){
                // }
                for(let i=0; i < denomArray.length; i++){
                    if(lcm % denomArray[i]==0){
                      Index++;
                    }
                }

                if(Index == denomArray.length){
                     console.log('lcm',lcm);
                     console.log('Index',Index);
                    return false;
                }else{
                    lcmr();
                }

            }
            lcmr()
    }

    generateQuestion()

    //function to generateFirstQuestion end here
  
    // load next question
    $('#next').click(function(){
       
    })  // end to load the next question



        // function for drag and drop
    function dragDrop() {

        $('.drag').draggable({
            revert: 'invalid',
            snapMode: 'inner',
            // helper: 'clone'
        });

        $(".drop").droppable({

            accept: ".drag",
            // tolerance: 'intersect',
            drop: function(event, ui) {

                // if ($(event.target).attr('data-user') == '') {
                $(event.target).attr('data-user', ui.draggable.text())

                // centering element when drop
                var drop_el = $(this).offset();
                var drag_el = ui.draggable.offset();
                var left_end = (drop_el.left + ($(this).width() / 2)) - (drag_el.left + (ui.draggable.width() / 2));
                var top_end = (drop_el.top + ($(this).height() / 2)) - (drag_el.top + (ui.draggable.height() / 2));
                ui.draggable.animate({
                    top: '+=' + top_end,
                    left: '+=' + left_end
                });
                // centering element when drop end

            } // drop method end here
        });

    } //end here drag and drop 

  
  // width of the straightLine
  let noOneWidth = $('.question .noOne').width();
$('.question .straightLine').width(noOneWidth+10);
  console.log(noOneWidth);





    // arrange the options to the random position
    function optionRandPosition() {
        let dragElement = $('.dropContainer ul li');
        $.each(dragElement, function(i, value) {
            $(this).css({
                order: Math.floor(Math.random() * dragElement.length) + 1
            });
        })
    }
    // end arrange the options to the random position
    
  $('#nextTable').click(function(){
      window.location.href = newurl;
  })

    $('#playAgain').click(function(){
        window.location.href = 'main.html'
    })


        //reset question function
    $('#reset').click(function() {


    })
    //reset question function end

    // check answer function  
  
}); // end document function 