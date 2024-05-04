const LayoutView = {
	Category: {
		render_top(data){
			data.map(v => {
                $(".category-nav-list").append(`<li><a href="/category?tag=${v.id}">${v.name}</a></li>`)
            })
		}
	},
    Cart: {
        add_to_card(name, callback){
            $(document).on('click', `.action-add-to-card`, function() {
                if($(this).attr('atr').trim() == name) {
                    callback($(this));
                }
            });
        },
        update(){
            var card_data = localStorage.getItem("card")
            let cart_json = JSON.parse(card_data);
            var count = card_data == null || card_data == "" ? 0 : cart_json.data.length;
            $(".cart-count").html(count)
        }
    },
    onPushSearch(){
        var search_data = LayoutView.toSlug($(".product-search-field").val());
        return `keyword=${search_data}`
    },
    toSlug(title){
        slug = title.toLowerCase();
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        slug = slug.replace(/ /gi, " - ");
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        return slug;
    },
    onSearch(callback){
        $(document).on('keyup', '.product-search-field', function() {
            $('.suggest-list .suggess-wrapper').remove()
            var data_text = $(this).val();   
            var fd = new FormData();
            fd.append('data_text', data_text); 
            if (data_text) callback(fd, data_text);
        }); 
    }, 
};
(() => { 
    $(document).on('click', '[modal-control]', function() {
        var name = $(this).attr('modal-control')
        $(`.I-modal[modal-block=${name}]`).addClass('active');
        $("html").addClass("o-hidden")
    });
    $(document).mouseup(function(e) {
        var container = $(".modal-dialog");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.I-modal').removeClass('active');
            $("html").removeClass("o-hidden")
        }
    });
    function init(){ 
        getCategory(); 
        LayoutView.Cart.update();
    }
    function getCategory(){
        Api.Category.GetAll()
            .done(res => {
                LayoutView.Category.render_top(res.data);
            })
            .fail(err => {  })
            .always(() => { });
    }
    LayoutView.onSearch((fd, text) => {
        Api.Product.GetSearch(fd)
            .done(res => { 
                $('.suggest-list .suggess-wrapper').remove()
                $('.suggest-list')
                    .append(`<div class="suggess-wrapper"></div>`)
                if (res.data.length > 0) {
                    res.data.map(v => {
                        $(".suggess-wrapper").append(`<div class="suggess-item"><a title="${v.name}" href="/product?id=${v.id}">${highlight(text, v.name)}</a></div>`)
                    })
                }else{
                    $(".suggess-wrapper").append(`<div class="suggess-item">No resurt</div>`)
                }
            })
    })
    function highlight(text, inputText) {
        var index = inputText.toLowerCase().indexOf(text.toLowerCase());
        inputText = inputText.substring(0,index) + "<span class='highlight'>" + inputText.substring(index,index+text.length) + "</span>" + inputText.substring(index + text.length);
        return inputText
        
    } 
    LayoutView.Cart.add_to_card("Add to card", (item) => {
        var card = localStorage.getItem("card"); 
        card = (card == null || card == '') ? '{ "data": [] }' : card;
        var data_id = item.attr("data-id")

        let cart_json = JSON.parse(card);

        let size = $(".product-size  li.active").text()
        let color = $(".product-color  li.active p").text()


        if (!size || !color) {
            item.text("Bạn cần chọn size và màu")
        }else{
            let value_cart = `{"id": ${data_id}, "size": "${size}", "color": "${color}", "qty": "1"}`

            if (cart_json.data.length == 0) {
                cart_json.data.push(value_cart)
                localStorage.setItem("card", JSON.stringify(cart_json)); 
                item.text("✔ đã thêm")
                console.log(localStorage.getItem("card"));
            }else{
                let visible = false;
                cart_json.data.map(v => {
                    data_v = JSON.parse(v)
                    if (data_v.color == color && data_v.size  == size && data_v.id ==  data_id) {
                        visible = true
                    }
                }) 

                if (visible) {  
                    item.text("Đã có trong giỏ hàng")
                }else{
                    cart_json.data.push(value_cart)
                    localStorage.setItem("card", JSON.stringify(cart_json)); 
                    item.text("✔ đã thêm")
                }
            } 
            console.log(cart_json);
        }
        LayoutView.Cart.update();
    })
    $(document).on('click', '.header-search-button', function() {
        window.location.href = `/category?${LayoutView.onPushSearch()}` ;
    });


    // New
    $(".I-carousel").css({"width": $(window).width()+"px"})
    var stickyNav = $('body').offset().top;
    window.onscroll = function() {
        window.pageYOffset > stickyNav ? $('header').addClass('is-scroll') : $('header').removeClass('is-scroll');
    }; 

    $(document).mouseup(function(e) {
        var container = $("header");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('header').removeClass('is-open'); 
        }
    });
    $(document).on('click', '.header-nav-control', function() { 
        $(`header`).toggleClass('is-open'); 
    });
     
    
    window.onload = function () {
        
    }; 
    init()
})();