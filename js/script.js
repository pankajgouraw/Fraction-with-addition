$(function() {
    let questionIndex = 0;
    let newurl='';
    let chance = 0;
    let correctAns = 0;
    let mainIndex = 0;
    let checkAllAns = 0;

    $("#headerText").text(headerText);
    $("#instruction").css({color: headerInstructionColor});
    $("#instruction").text(Instruction);
    $('body').css({'backgroundImage': bg});
    generateQuestion()
    boxWidth()
    dragDrop() 


    // grab the value from url 
    let url = window.location.href;
    if (url.indexOf('?') > 0) {
        let params = new URLSearchParams(url.substring(1));
        mainIndex = parseInt(params.get('mainIndex'));
        correctAns = parseInt(params.get('num'));
        console.log(mainIndex);
        console.log(correctAns);
        // generateOptions();
        // dragDrop();
        // optionRandPosition();
        // console.log("url variable available....");
    }else{
        console.log('url variable not available')
    } 
  
    //function to generateFirstQuestion

    function generateQuestion(){
        let numArray = [];
        let denomArray = [];
        let lcm = null;
        let questHtml = '';
        let afterdevideMultiply =[];
        let afterAddHtml = '';
        let sum = null;
        // let firstNoShouldGreate = true;
        // let lcmCarry  = null;

        for(let i=0; i< noOfFraction; i++){
            // generate random numerator and denominator

            let numerator = Math.ceil(Math.random() * (numeratorMax - numeratorMin)+1) + numeratorMin;
            let denominator = Math.ceil(Math.random() * (denominatorMax - denominatorMin)+1) + denominatorMin;
            numArray.push(numerator);
            denomArray.push(denominator);
            }

            let a = numArray[0];
            let b = denomArray[0];
            let c = numArray[1];
            let d = denomArray[1];

            // let bc = b*c;
            // let ad = a*d;

            for(let i =0; (a*d) < (b*c); i++){
                a++;
            }
            numArray[0] = a;

            // console.log('numArray[0]', numArray[0]);
            // console.log('a', a);
            $.each(numArray,function(index, value){
                    let html = `<div class="singleFraction">
                             <p class="noOne">${numArray[index]}</p>
                             <p class="straightLine"></p>
                             <p class="noTwo">${denomArray[index]}</p>
                        </div>
                        <span class="plusSign sign">-</span>`
                     questHtml += html;  
            });

            $('.question').html(questHtml);

            console.log("numArray", numArray);
            console.log("denomArray", denomArray);
            let  length = denomArray.length;
            
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
                     $('.lcm').html(`<span class="drop" data-ans='${lcm}' data-user=''>${lcm}</span>`);
                    return false;
                }else{
                    lcmr();
                }
            }
            lcmr()

            for(let i =0; i<denomArray.length; i++){
                let lcmAryData = (lcm / denomArray[i]) * numArray[i];
                afterdevideMultiply.push(lcmAryData);
            }
            
            for(let i =0; i<afterdevideMultiply.length; i++){
               let html= `<span class="drop" data-ans='${afterdevideMultiply[i]}' data-user=''>${afterdevideMultiply[i]}</span><span class="plusSign sign">-</span>`;
               afterAddHtml += html;
               // sum -= afterdevideMultiply[i];
            } 
            sum = (afterdevideMultiply[0]) - (afterdevideMultiply[1])
            $('#afterDevideAdd').html(afterAddHtml);
            $('#ansTop').html(`<span class="drop" data-user='' data-ans='${sum}'>${sum}</span>`);
            console.log(afterdevideMultiply);

    }


    //function to generateFirstQuestion end here
  

    function boxWidth(){
        let drop = $('.drop');
        for (let i=0; i<drop.length; i++){
           let width = $(drop[i]).width();
           let height = $(drop[i]).height();
           $(drop[i]).width(width);
           $(drop[i]).height(height);
           $(drop[i]).text('');
           // console.log(width);
        }
    }
    // load next question
    $('#next').click(function(){

        mainIndex++;
        console.log('table for', mainIndex)
        let url2 = window.location.pathname;
        newurl = url2 + `?data=10&mainIndex=${mainIndex}&num=${correctAns}`;
        window.location.href = newurl;
            // generateQuestion()
            // boxWidth()
            // dragDrop() 
    })  // end to load the next question

    $('#playAgain').click(function(){
    })
        //reset question function
    $('#reset').click(function() {

         $.each($('.drop'), function(index, value) {
                    let dataUser = $(value).attr('data-user');
                    let dataAns = $(value).attr('data-ans');
                    // console.log(dataUser, dataAns);
                    if (dataUser == dataAns) {

                    } else {
                        $(value).attr('data-user', '');
                        $(value).text('')
                         .css({'border':'2px solid #000'});

                    }
                })
    })
    //reset question function end


    // check answer function 

    $('#check').click(function(){
        let validateField = null;
         $.each($('.drop'), function(index, value) {
          validateField += Number($(value).attr('data-user'));
         });

         if(validateField == 0){
            return false;
         }else{
            chance++;
            check();

         }
    })

    function check() {
        $('#reset').show();
         let DropLength = $('.drop').length;    
         console.log('DropLength', DropLength)
        $.each($('.drop'), function(index, value) {
            let dataUser = $(value).attr('data-user');
            let dataAns = $(value).attr('data-ans');
           
            // console.log(dataUser, dataAns);
            if (dataUser == dataAns) {
                checkAllAns++;
                $(value).css({
                    'border': '2px solid green'
                })
            } else {
                $(value).css({
                    'border': '2px solid red'
                })
            }
        })
        if(DropLength == checkAllAns){
                correctAns++;
            $('#check').hide();
            $('#reset').hide();
            $('#next').show();
            playAudio('audio/welldone.mp3');
            $('.wellDone').fadeIn();
            setTimeout(function(){
                $('.wellDone').fadeOut(); 
            },2000)
            if(mainIndex == 10){
                    $('#next').hide();
                    
                    $('#yourScore').show();
            }
        }
        
        console.log('drop lenght',DropLength, checkAllAns);

         if(chance == 1 && !(DropLength == checkAllAns)){
            $('.errors').fadeIn();
             playAudio('audio/tryAgain.mp3');
            setTimeout(function(){
                $('.errors').fadeOut(); 
            },2000)
           
         }

        if(chance == 2){
            // console.log(chance)
            $('#check').hide();
            $('#reset').hide();
            $('#next').show();
            $('#showAns').show();
            $('#reset').hide();
            if(mainIndex == 10){
                    $('#next').hide();
                    
                    $('#yourScore').show();
            }
            if(DropLength == checkAllAns){
                $('#showAns').hide();
            }
        }
        
    } // check answer function  end


$('#playAgain').click(function(){
    window.location.href='main.html';
});

$('#yourScore').click(function(){
      $('#showAns').hide();
    $('.score').show();
    $('.questContainer').hide();
    $('.optionContainer').hide();
    $(this).hide();
    $('#playAgain').show();
   
     $('.totalQuest').text(10);
     $('.youDidCorrect').text(correctAns);
     // console.log('yourScore')
});


$('#showAns').click(function(){
    $(this).hide();
    $.each($('.drop'), function(i, value){
     $(value).text($(value).attr('data-ans'));
    });
    $('.drop').css({'border': '2px solid green'});
})


let playAudio = function(music) {
    let audio = new Audio(music);
    audio.play();
}

        // function for drag and drop
function dragDrop() {

        $('.drag').draggable({
            revert: 'invalid',
            snapMode: 'inner',
            helper: 'clone'
        });
            let res= null;
            let srtLength = null;
        $(".drop").droppable({

            accept: ".drag",
            // tolerance: 'intersect',
            drop: function(event, ui) {
                let text = null;
                let dataUser = null;
                // if ($(event.target).attr('data-user') == '') {
                text = $(event.target).text();
                $(event.target).text(text + ui.draggable.text());
                dataUser = $(event.target).text();
                
                $(event.target).attr('data-user', dataUser);
                 srtLength = dataUser.length
                if(srtLength > $(event.target).attr('data-ans').length){
                       res = dataUser.substr(0, srtLength-1);
                      $(event.target).attr('data-user', res); 
                      $(event.target).text(res);
                }else{
                     console.log('its lower than');
                }
                

                console.log('dataUser', dataUser.length);
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

 let ansStraightWidth = $('#afterDevideAdd').width();
  $('.firstOperation').width(ansStraightWidth+10);

   let lastansStraightWidth = $('#ansTop').width();
  $('.secondOperation').width(lastansStraightWidth+10);
    // width of the straightLine end

   
}); // end document function 