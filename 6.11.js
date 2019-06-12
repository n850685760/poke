$(function () {
    let arr = []
    let colorarr = ['s', 'h', 'd', 'c']
    let flag = {}
    let frist = null
    for (let i = 0; i < 52; i++) {
        let num = Math.floor(Math.random() * 13 + 1)
        let colorindex = Math.floor(Math.random() * colorarr.length)
        let color = colorarr[colorindex]
        while (flag[num + '_' + color]) {
            num = Math.floor(Math.random() * 13 + 1)
            colorindex = Math.floor(Math.random() * colorarr.length)
            color = colorarr[colorindex]
        }
        flag[num + '_' + color] = true

        arr.push({num, color})

    }
    let index = -1
    let id = {}
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < i; j++) {
            index++
            let obj = arr[index]
            console.log(obj);
            let tops = 50 * i
            let lefts = 400 - 50 * i + 100 * j
            id = i + '_' + j
            $('<div>').addClass('poke')
                .attr('id', i + '_' + j)
                .data('number', obj.num)
                .appendTo('.box')
                .delay(index * 100)
                .animate({left: lefts, top: tops, opacity: 1})
                .css({backgroundImage: `url(imgs/${obj.num}${obj.color}.jpg)`, opacity: 0})
        }
    }
    let i = 0
    for (; index < 52; index++) {
        let obj = arr[index]
        $('<div>').addClass('poke')
            .addClass('ready')
            .appendTo('.box')
            .delay(index * 100)
            .attr('id', i++)
            .data('number', obj.num)
            .animate({left: 0, top: 480, opacity: 1})
            .css({backgroundImage: `url(imgs/${obj.num}${obj.color}.jpg)`, opacity: 0})
    }

    $('.box >div').on('click', function () {
        let _this = $(this);
        let [i, j] = _this.attr('id').split('_')
        let id1 = i * 1 + 1 + '_' + j, id2 = i * 1 + 1 + '_' + (j * 1 + 1);
        if ($('#' + id1).length || $('#' + id2).length) {
            return
        }
        if (_this.hasClass('move')) {
            $(this).removeClass('move').animate({top: '+=30px'})
        } else {
            $(this).addClass('move').animate({top: '-=30px'})
        }
        let number1, number2
        if (!frist) {
            frist = _this;
            number1 = frist.data('number')
            if (number1 == 13) {
                $('.move').animate({top: '0', left: '710'}, function () {
                    $(this).remove()
                    frist = null
                })
            }
        } else {
            number1 = frist.data('number')
            number2 = _this.data('number')
            console.log(number1);
            if (number1 + number2 === 13) {
                $('.move').animate({top: '0', left: '710'}, function () {
                    $(this).remove()
                })
            } else {
                $('.move').animate({top: '+=30'}, function () {
                    $(this).removeClass('move')
                })
            }
            frist = null
        }


    })
    let n = 0
    $('.next').on("click", function () {
        $('.ready').last().css({zIndex:n++}).animate({left:146},function () {
            $(this).removeClass('ready').addClass('chayue')
        })
        if ($('.ready').last().length === 0){
            $('.chayue').animate({left:0,zIndex:0}).removeClass('chayue').addClass('ready')
        }


    $('.re').on('click',function () {
        history.go(0)
    })
    })





})