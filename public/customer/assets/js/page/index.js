const View = {
    Category: {
        firstID: 1,
        render_product(data, id){
            $(".data-category-render").find(".product-category-data").remove()
            $(".data-category-render").find(".shop-all-btn").remove()
            $(`.category-tab-list .nav-link`).removeClass("active");

            $(`.category-tab-list .nav-link[category-id=${id}]`).addClass("active");
            data.map(v => {
                var image           = v.images.split(",")[0];

                var discount = v.discount == 0 ? "" : `<span class="percentage">${v.discount}%</span><span class="flags"> <span class="sale">Sale</span> </span>`
                // var real_prices     = View.formatNumber(v.discount == 0 ? v.prices : v.prices - (v.prices*v.discount/100));
                var real_prices     = View.formatNumber(v.discount == 0 ? v.prices : (v.prices - (v.prices / 100 * v.discount)));
                var discount_value = v.discount == 0 ? "" : `<span class="old-price">${View.formatNumber(v.prices)} đ</span>`
                $(".data-category-render").append(`
                    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6  ec-product-content product-category-data" >
                        <div class="ec-product-inner">
                            <div class="ec-pro-image-outer">
                                <div class="ec-pro-image">
                                    <a href="/product?id=${v.id}" class="image">
                                        <img class="main-image" src="${image}" alt="Product" />
                                    </a>
                                    ${discount}
                                </div>
                            </div>
                            <div class="ec-pro-content">
                                <h5 class="ec-pro-title"><a href="/product?id=${v.id}">${v.name}</a></h5>
                                <span class="ec-price">
                                    ${discount_value}
                                    <span class="new-price">${real_prices} đ</span>
                                </span>
                            </div>
                        </div>
                    </div>`)
            })
            $(".data-category-render").append(`<div class="col-sm-12 shop-all-btn"><a href="/category?tag=0">Xem thêm</a></div>`)
        },
        render_top(data){
            data.map((v, k) => {
                if (k == 0) View.Category.firstID = v.id;
                $('.category-tab-list').append(`
                    <li class="nav-item">
                        <a class="nav-link" category-id="${v.id}">${v.name}</a>
                    </li>
                `)
            })
        },
        onChange(callback){
            $(document).on('click', '.category-tab-list .nav-link', function() {
                var id = $(this).attr('category-id');
                callback(id);
            });
        }
    },
    Product: {
        renderNew(data){
            data.map(v => {
                var image           = v.images.split(",")[0];

                var discount = v.discount == 0 ? "" : `<span class="percentage">${v.discount}%</span><span class="flags"> <span class="sale">Sale</span> </span>`
                // var real_prices     = View.formatNumber(v.discount == 0 ? v.prices : v.prices - (v.prices*v.discount/100));
                var real_prices     = View.formatNumber(v.discount == 0 ? v.prices : (v.prices - (v.prices / 100 * v.discount)));
                var discount_value = v.discount == 0 ? "" : `<span class="old-price">${View.formatNumber(v.prices)} đ</span>`
                $(".new-product").append(`
                    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6  ec-product-content" >
                        <div class="ec-product-inner">
                            <div class="ec-pro-image-outer">
                                <div class="ec-pro-image">
                                    <a href="/product?id=${v.id}" class="image">
                                        <img class="main-image" src="${image}" alt="Product" />
                                    </a>
                                    ${discount}
                                </div>
                            </div>
                            <div class="ec-pro-content">
                                <h5 class="ec-pro-title"><a href="/product?id=${v.id}">${v.name}</a></h5>
                                <span class="ec-price">
                                    ${discount_value}
                                    <span class="new-price">${real_prices} đ</span>
                                </span>

                            </div>
                        </div>
                    </div>`)
            })
            $(".new-product").append(`<div class="col-sm-12 shop-all-btn"><a href="/category?sort=1">Xem thêm</a></div>`)
        },
        hotProduct(data){
            data.map(v => {
                var image           = v.images.split(",")[0];

                var discount = v.discount == 0 ? "" : `<span class="percentage">${v.discount}%</span><span class="flags"> <span class="sale">Sale</span> </span>`
                // var real_prices     = View.formatNumber(v.discount == 0 ? v.prices : v.prices - (v.prices*v.discount/100));
                var real_prices     = View.formatNumber(v.discount == 0 ? v.prices : (v.prices - (v.prices / 100 * v.discount)));
                var discount_value = v.discount == 0 ? "" : `<span class="old-price">${View.formatNumber(v.prices)} đ</span>`
                $(".hot-product").append(`
                    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6  ec-product-content" >
                        <div class="ec-product-inner">
                            <div class="ec-pro-image-outer">
                                <div class="ec-pro-image">
                                    <a href="/product?id=${v.id}" class="image">
                                        <img class="main-image" src="${image}" alt="Product" />
                                    </a>
                                    ${discount}
                                </div>
                            </div>
                            <div class="ec-pro-content">
                                <h5 class="ec-pro-title"><a href="/product?id=${v.id}">${v.name}</a></h5>
                                <span class="ec-price">
                                    ${discount_value}
                                    <span class="new-price">${real_prices} đ</span>
                                </span>

                            </div>
                        </div>
                    </div>`)
            })
            $(".new-product").append(`<div class="col-sm-12 shop-all-btn"><a href="/category?sort=1">Xem thêm</a></div>`)
        },
        renderBestSale(data){
            // var real_prices     = View.formatNumber(data.discount == 0 ? data.prices : data.prices - (data.prices*data.discount/100));
            var real_prices     = View.formatNumber(data.discount == 0 ? data.prices : data.discount);
            $(".offer-wrapper")
                .append(`<div class="container">
                    <div class="row justify-content-end">
                        <div class="col-xl-6 col-lg-7 col-md-7 col-sm-7 align-self-center ec-offer-content">
                            <h1>Siêu giảm giá</h1>
                            <h2 class="ec-offer-title">${data.name}</h2>
                            <span class="ec-offer-img" data-animation="zoomIn">${data.description}</span>
                            <span class="ec-offer-price">${real_prices} đ</span>
                            <a class="btn btn-primary" href="/product?id=${data.id}" data-animation="zoomIn">Xem ngay</a>
                        </div>
                    </div>
                </div>`)
        },
        renderTrending(data){
            data.map(v => {
                $(".slider-wrapper")
                    .append(`<div class="ec-slide-item swiper-slide d-flex ec-slide-1" style="background-image: url('${v.banner ?? "customer/assets/images/main-slider-banner/1.jpg"}')" >
                                <div class="container align-self-center">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-7 col-md-7 col-sm-7 align-self-center">
                                            <div class="ec-slide-content slider-animation">
                                                <h1 class="ec-slide-title">${v.name}</h1>
                                                <h2 class="ec-slide-stitle">${v.discount > 0 ? "Đang giảm giá" : ""}</h2>
                                                <p>${v.description}</p>
                                                <a href="/product?id=${v.id}" class="btn btn-lg btn-secondary">Xem ngay</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`)
            })
            View.Slider.init()
        },
        renderListSale(data){
            data.map(v => {
                var image           = v.images.split(",")[0];

                var discount = v.discount == 0 ? "" : `<span class="percentage">${v.discount}%</span><span class="flags"> <span class="sale">Sale</span> </span>`
                // var real_prices     = View.formatNumber(v.discount == 0 ? v.prices : v.prices - (v.prices*v.discount/100));
                var real_prices     = View.formatNumber(v.discount == 0 ? v.prices : (v.prices - (v.prices / 100 * v.discount)));
                var discount_value = v.discount == 0 ? "" : `<span class="old-price">${View.formatNumber(v.prices)} đ</span>`
                $(".sale-product").append(`
                    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6  ec-product-content" >
                        <div class="ec-product-inner">
                            <div class="ec-pro-image-outer">
                                <div class="ec-pro-image">
                                    <a href="/product?id=${v.id}" class="image">
                                        <img class="main-image" src="${image}" alt="Product" />
                                    </a>
                                    ${discount}
                                </div>
                            </div>
                            <div class="ec-pro-content">
                                <h5 class="ec-pro-title"><a href="/product?id=${v.id}">${v.name}</a></h5>
                                <span class="ec-price">
                                    ${discount_value}
                                    <span class="new-price">${real_prices} đ</span>
                                </span>
                                
                            </div>
                        </div>
                    </div>`)
            })
        }
    },
    Slider: {
        init(){
            var EcMainSlider = new Swiper('.ec-slider.swiper-container', {
                loop: true,
                speed: 2000,
                effect: "slide",
                autoplay: {
                    delay: 7000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
        }
    },
    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    init(){
    }
};
(() => {
    View.init()
    function init(){ 
        getCategory(); 
        getNewArrivals();
        getBestSale();
        getTrending();
        getHotProduct()
    }
    View.Category.onChange((id) => {
        loadProductOnCategory(id)
    })
    function debounce(f, timeout) {
        let isLock = false;
        let timeoutID = null;
        return function(item) {
            if(!isLock) {
                f(item);
                isLock = true;
            }
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function() {
                isLock = false;
            }, timeout);
        }
    } 
    function getNewArrivals(){
        Api.Product.NewArrivals()
            .done(res => {
                View.Product.renderNew(res.data);
            })
            .fail(err => {  })
            .always(() => { });
    }
    function getBestSale(){
        Api.Product.BestSale()
            .done(res => {
                if (res.data.length > 0) View.Product.renderBestSale(res.data[0]);
            })
            .fail(err => {  })
            .always(() => { });
    }
    function getHotProduct(){
        Api.Product.HotProduct()
            .done(res => {
                if (res.data.length > 0) View.Product.hotProduct(res.data);
            })
            .fail(err => {  })
            .always(() => { });
    }
    function loadProductOnCategory(id){
        Api.Product.GetWithCategory(id)
            .done(res => {
                View.Category.render_product(res.data, id);
            })
            .fail(err => {  })
            .always(() => { });
    }
    function getCategory(){
        Api.Category.GetAll()
            .done(res => {
                View.Category.render_top(res.data);
                setTimeout(loadProductOnCategory(View.Category.firstID), 500);
            })
            .fail(err => {  })
            .always(() => { });
    }
    function getTrending(){
        Api.Product.Trending()
            .done(res => {
                View.Product.renderTrending(res.data);
            })
            .fail(err => {  })
            .always(() => { });
    }
    init()
})();
