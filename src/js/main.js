Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
};

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function thousandSeparator(amount) {
    return amount.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
}


/*
* search visibility
* */
$('.js_search_btn').on('click', function () {
    let $this = $(this);

    if (window.matchMedia('(max-width: 768px)').matches) {
        $('.js_search_block_mobile').toggleClass('active');
    } else {
        $this.toggleClass('active');
        $this.parent().toggleClass('active-search');
        $('.js_search_block').toggleClass('active');
    }
});


/*
* burger
* */
$('.js_burger_btn').on('click', function () {
    $('.js_burger_menu').toggleClass('show');
    $('body').toggleClass('fixed');
});


/*
* hero video btn
* */
$('.js_hero_video_btn').on('click', function () {
    let $this = $(this),
        isActive = $this.hasClass('active');

    if (isActive) {
        $this.removeClass('active');
        document.querySelector('.hero__video').play();
    } else {
        $this.addClass('active');
        document.querySelector('.hero__video').pause();
    }

});


/*
* service info visibility
* */
$('.js_services_btn').on('click', function () {
    let $this = $(this),
        $thisParent = $this.closest(".js_services_item"),
        thisMoreInfo = $thisParent.find('.js_services_more_info'),
        isActive = thisMoreInfo.hasClass('active');

    if (!isActive) {
        $thisParent
            .addClass('active');
        thisMoreInfo
            .addClass('active')
            .mouseleave(function () {
                thisMoreInfo.removeClass('active');
                $thisParent.removeClass('active');
            });
    }
});


/*
* tabs
* */
$('.js_tab').on('click', function () {
    let $this = $(this),
        isActive = $this.hasClass('active'),
        thisIndex = +$this.attr('data-index'),
        $thisParent = $this.closest('.js_tabs_wrapper'),
        $thisTabContainer = $thisParent.find(`.js_tab_container[data-index="${thisIndex}"]`);

    if (!isActive) {
        $this
            .addClass('active')
            .siblings()
            .removeClass('active');

        $thisTabContainer
            .addClass('active')
            .siblings()
            .removeClass('active');

        selectedTabTextSet();
    }
});

$('.js_tabs_selected').on('click', function () {
    $(this).toggleClass('active');
});

// selected tab text set
function selectedTabTextSet() {
    $('.js_tabs_selected')
        .html($('.js_tab.active').html())
        .removeClass('active');
}

selectedTabTextSet();

// technology tabs fixing on scrolling
function technologyTabFixing() {
    let thisOffsetTop = $(this).scrollTop(),
        $tabsListWrapper = $('.js_tabs_list_wrapper'),
        $tabsList = $('.js_tabs_list'),
        tabsListWrapperTop = $tabsListWrapper.offset().top,
        tabsListWrapperHeight = $tabsListWrapper.outerHeight(),
        tabsListHeight = $tabsList.outerHeight(),
        bottomPoint = tabsListWrapperTop + tabsListWrapperHeight - tabsListHeight;

    if (thisOffsetTop > tabsListWrapperTop - 80) {
        $tabsList.attr('data-position', 'center')
    } else {
        $tabsList.attr('data-position', 'top')
    }

    if (thisOffsetTop > bottomPoint - 80) {
        $tabsList.attr('data-position', 'bottom')
    }
}

if ($(".js_tabs_wrapper").length && window.matchMedia('(min-width: 769px)').matches) {
    $(window).scroll(technologyTabFixing);
}


/*
* slick
* */
let slickButtonSvgPrev = '<button type="button" class="slider-arrow slider-arrow--prev"><svg viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1L2 7.25L8 13.5" stroke-width="2"/></svg></button>',
    slickButtonSvgNext = '<button type="button" class="slider-arrow slider-arrow--next"><svg viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 14L7 7.75L1 1.5" stroke-width="2"/></svg></button>';

$('.js_clients__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: slickButtonSvgPrev,
    nextArrow: slickButtonSvgNext,
});

$('.js_gallery_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: slickButtonSvgPrev,
    nextArrow: slickButtonSvgNext,
});

let $usedTechnologyItem = $('.used-technology__item'),
    $usedTechnologySlider = $('.js_used_technology_slider');

if ($usedTechnologyItem.length > 6) {
    $usedTechnologySlider.slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        prevArrow: slickButtonSvgPrev,
        nextArrow: slickButtonSvgNext,

        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });
} else if ($usedTechnologyItem.length > 3 && window.matchMedia('(max-width: 1280px)').matches) {
    $usedTechnologySlider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: slickButtonSvgPrev,
        nextArrow: slickButtonSvgNext,

        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });
} else if ($usedTechnologyItem.length > 2 && window.matchMedia('(max-width: 768px)').matches) {
    $usedTechnologySlider.slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: slickButtonSvgPrev,
        nextArrow: slickButtonSvgNext,
    });
}


/*
* review
* */
class ReviewSlider {
    constructor(el, autoplaySpeed, transitionSpeed, autoplay) {

        this.$el = $(el);
        this.autoplaySpeed = autoplaySpeed || 5000;
        this.transitionSpeed = transitionSpeed || 2000;
        this.autoplay = !!autoplay;

        this.childLength = this.$el.children().length;
        this.data = [];
        this.visibleSlides = [0, 1, 2, 3, 4];
        this.prevDataSlide = null;

        // timers
        this.movingTimeout = null;


    }

    dataGet() {
        for (let elem of this.$el.children()) {
            let slideData = {};

            slideData.photo = $(elem).find('.js_review_img img').attr('src');
            slideData.text = $(elem).find('.js_review_text').html().trim();
            slideData.name = $(elem).find('.js_review_name').html().trim();
            slideData.position = $(elem).find('.js_review_position').html().trim();
            slideData.link = $(elem).find('.js_review_link').attr('href');
            this.data.push(slideData);
        }
    }

    hiddenSlidesGet() {
        this.hiddenSlidesIndex = [];

        for (let i = 0; i < this.childLength; i++) {
            if (this.visibleSlides.indexOf(i) === -1) {
                this.hiddenSlidesIndex.push(i);
            }
        }
    }

    get currentDataSlide() {
        return +$(`.js_reviews_dot[data-index="${0}"]`).attr('data-slide')
    }

    arrowsAppend() {
        this.$el.append(
            slickButtonSvgPrev + slickButtonSvgNext
        );

        this.prevBtnClickHandler();
        this.nextBtnClickHandler();

    }

    dotsWrapperCreate() {
        this.$dotsWrapper = $("<div class='reviews__dots'></div>");
        this.$el.prepend(this.$dotsWrapper);
    }

    dotsAppend() {
        for (let i = 0; i < 5; i++) {
            this.$dotsWrapper.append(`
                <button 
                    style="transition: all ${this.transitionSpeed}ms ease;"
                    class="reviews__dots-item js_reviews_dot" 
                    data-index="${i}" 
                    data-slide="${this.visibleSlides[i]}" 
                >
                    <img 
                        style="transition: all ${this.transitionSpeed}ms ease;"
                        class="reviews__dots-img" 
                        src="${this.data[this.visibleSlides[i]].photo}" 
                        alt=""
                    >
                </button>
            `)
        }

        this.dotsClickHandler();
    }

    dotsClickHandler() {
        this.$el.on('click', '.js_reviews_dot', (target) => {
            let $targetDot = $(target.currentTarget),
                targetDotIndex = +$targetDot.attr('data-index');

            this.selectSlide(targetDotIndex);
        })
    }

    randomDotGet() {
        this.hiddenSlidesGet();
        this.randomDot = this.hiddenSlidesIndex.random();
    }

    newDotAppend() {
        let lastDotIndex = +$(`.js_reviews_dot:first-child`).attr('data-slide');

        this.randomDotGet();
        this.visibleSlides[this.visibleSlides.indexOf(lastDotIndex)] = this.randomDot;

        this.$dotsWrapper.append(`
                <button 
                    style="width: 0; height: 0; transition: all ${this.transitionSpeed}ms ease;"
                    class="reviews__dots-item js_reviews_dot" 
                    data-index="4" 
                    data-slide="${this.visibleSlides[this.visibleSlides.indexOf(this.randomDot)]}" 
                >
                    <img 
                        class="reviews__dots-img" 
                        src="${this.data[this.visibleSlides[this.visibleSlides.indexOf(this.randomDot)]].photo}" 
                        alt=""
                        style="transition: all ${this.transitionSpeed}ms ease;"
                    >
                </button>
        `);

        setTimeout(() => {
            $(`.js_reviews_dot[data-index="4"]`)
                .css({
                    width: '',
                    height: ''
                })
        }, 1);

    }

    lastDotRemove() {
        let $firstChild = $(`.js_reviews_dot:first-child`);
        $firstChild.attr('data-index', '-1');

        setTimeout(() => {
            $(`.js_reviews_dot:first-child`)
                .remove()
        }, this.transitionSpeed);
    }

    dotsPositionAutoChange() {
        for (let elem of $('.js_reviews_dot')) {
            let thisDataIndex = +$(elem).attr('data-index');

            thisDataIndex--;

            $(elem).attr('data-index', thisDataIndex)
        }

        this.newDotAppend();
        this.lastDotRemove();
        this.slideInfoSet();
    }

    selectSlide(targetDataIndex) {
        let $targetDot = $(`.js_reviews_dot[data-index="${targetDataIndex}"]`);

        if (targetDataIndex !== 0 && !this.movingTimeout) {
            $targetDot.attr('data-index', '0');

            this.movingTimeout = setTimeout(() => {
                $targetDot.insertAfter($(`.js_reviews_dot:first-child`));
                this.movingTimeout = null;
            }, this.transitionSpeed);

            for (let elem of $('.js_reviews_dot')) {
                let $elem = $(elem),
                    elemIndex = +$elem.attr('data-index'),
                    newElemIndex = elemIndex - 1;

                if (targetDataIndex < elemIndex) {
                    $elem.attr('data-index', newElemIndex)
                }
            }

            this.newDotAppend();
            this.lastDotRemove();
            this.slideInfoSet();
        }
    }

    slideTextWrapperCreate() {
        this.$el.append(`
            <div class='reviews__slide-wrapper'>
                <div class="reviews__slide">
                    <div class="reviews__text js_review_text"></div>
                    <div class="flex">
                        <div class="reviews__img-block js_review_img"></div>
                        <div>
                            <div class="reviews__name js_review_name"></div>
                            <div class="reviews__position js_review_position"></div>
                        </div>
                    </div>
                    <a href="#" class="reviews__link js_review_link btn-clutch">
                        <span>View on</span>
                        <svg class="btn-clutch__svg" width="88" height="25" viewBox="0 0 88 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.9277 0H22.8799V24.992H26.9277V0ZM36.7842 21.2959C37.8398 21.2959 41.0078 20.9439 41.0078 17.0719V8.09589H45.0557V24.9919H41.0078V23.5839C39.9521 24.6399 38.1924 24.9919 36.7842 24.9919C34.8477 24.9919 33.2637 24.4639 32.0322 23.2319C30.624 21.9999 29.9199 19.8879 29.9199 17.5999V8.09589H33.9678V17.7759C33.9678 19.0079 34.3203 21.2959 36.7842 21.2959ZM52.9756 1.93591H48.9277V8.09589H45.9355V11.9679H48.9277V24.9919H52.9756V11.9679H55.9678V8.09589H52.9756V1.93591ZM65.2959 21.1201C66.5283 21.1201 67.7598 20.5922 68.6396 19.8881L69.168 19.3602L71.9834 22.1761L71.2803 22.7042C69.6963 24.1121 67.584 24.9921 65.2959 24.9921C60.3682 24.9921 56.6719 21.2961 56.6719 16.3682C56.6719 11.4401 60.3682 7.74414 65.2959 7.74414C67.584 7.74414 69.6963 8.62415 71.2803 10.0322L71.9834 10.5601L69.168 13.2001L68.6396 12.6721C67.7598 11.7921 66.5283 11.4401 65.2959 11.4401C62.4795 11.4401 60.5439 13.3762 60.5439 16.1921C60.5439 19.0081 62.4795 21.1201 65.2959 21.1201ZM86.2402 9.50403C85.0078 8.27197 83.7764 7.74402 81.8398 7.74402C80.4316 7.74402 79.0234 8.09601 77.9678 9.15198V0H73.9199V24.992H77.9678V15.664C77.9678 11.792 80.6084 11.44 81.6641 11.44C83.9805 11.44 83.9639 13.4619 83.9541 14.7277L83.9521 14.96V24.816H88V15.136C88 12.848 87.4717 10.736 86.2402 9.50403ZM11.4404 21.12C13.7275 21.12 15.8398 20.24 17.248 18.832L17.7764 18.304L20.416 20.944L19.8877 21.472C17.7764 23.76 14.6084 24.992 11.4404 24.992C4.92773 24.992 0 19.712 0 12.848C0 5.98401 4.92773 0.703979 11.6162 0.880005C14.7842 0.880005 17.7764 2.112 20.0645 4.40002L20.5918 4.92798L17.9521 7.56799L17.4238 7.03998C15.8398 5.45599 13.7275 4.57599 11.6162 4.57599C7.04004 4.57599 3.87207 8.09601 3.87207 12.848C3.87207 17.6 7.04004 21.12 11.4404 21.12Z" />
                            <path d="M65.1197 19.1841C66.6749 19.1841 67.9357 17.9233 67.9357 16.3681C67.9357 14.8128 66.6749 13.5521 65.1197 13.5521C63.5645 13.5521 62.3037 14.8128 62.3037 16.3681C62.3037 17.9233 63.5645 19.1841 65.1197 19.1841Z" fill="#EF4335"/>
                        </svg>
                    </a>
                </div>
            </div>
        `);

        this.reviewImg = $('.js_review_img');
        this.reviewText = $('.js_review_text');
        this.reviewName = $('.js_review_name');
        this.reviewPosition = $('.js_review_position');
        this.reviewLink = $('.js_review_link');
    }

    slideTextSet(dataSlide) {
        this.reviewText
            .addClass('hidden');

        setTimeout(() => {
            this.reviewText
                .html(this.data[dataSlide].text)
                .removeClass('hidden')
        }, this.transitionSpeed / 2)
    }

    slideNameSet(dataSlide) {
        this.reviewName
            .addClass('hidden');

        setTimeout(() => {
            this.reviewName
                .html(this.data[dataSlide].name)
                .removeClass('hidden')
        }, this.transitionSpeed / 2)
    }

    slidePositionSet(dataSlide) {
        this.reviewPosition
            .addClass('hidden');

        setTimeout(() => {
            this.reviewPosition
                .html(this.data[dataSlide].position)
                .removeClass('hidden')

        }, this.transitionSpeed / 2)
    }

    slidePhotoSet(dataSlide) {
        this.reviewImg
            .addClass('hidden');

        setTimeout(() => {
            this.reviewImg
                .html(`
                    <img src="${this.data[dataSlide].photo}" alt="" class="reviews__img">
                `)
                .removeClass('hidden')
        }, this.transitionSpeed / 2)
    }

    slideLinkSet(dataSlide) {
        this.reviewLink.attr('href', this.data[dataSlide].link)
    }

    dotsPhotoSet(dataSlide) {
        let $thisImg = this.$el.find('.js_reviews_dot[data-index="0"] img');

        $thisImg.attr('src', this.data[dataSlide].photo)
    }

    slideInfoSet(dataSlide = this.currentDataSlide) {
        this.slideTextSet(dataSlide);
        this.slideNameSet(dataSlide);
        this.slidePositionSet(dataSlide);
        this.slidePhotoSet(dataSlide);
        this.slideLinkSet(dataSlide);
    }

    autoSlideStop() {
        clearInterval(this.loading);
    }

    autoSlidePlay() {
        if (this.autoplay) {
            this.loading = setInterval(this.dotsPositionAutoChange.bind(this), this.autoplaySpeed);
        }
    }

    pauseOnHover() {
        $('.js_reviews_slider')
            .on("mouseenter", '.js_reviews_dot', () => {
                this.autoSlideStop();
            }).on("mouseleave", '.js_reviews_dot', () => {
            this.autoSlidePlay();
        })
    }

    newDotSelect() {
        let $newDot = $(`.js_reviews_dot[data-index="${4}"]`);

        if (!this.movingTimeout) {
            $newDot.attr('data-index', '0');

            this.movingTimeout = setTimeout(() => {
                $newDot.insertAfter($(`.js_reviews_dot:first-child`));
                this.movingTimeout = null
            }, this.transitionSpeed);

            for (let elem of $('.js_reviews_dot')) {
                let $elem = $(elem),
                    elemIndex = +$elem.attr('data-index'),
                    newElemIndex = elemIndex - 1;

                if (4 < elemIndex) {
                    $elem.attr('data-index', newElemIndex)
                }
            }

            this.newDotAppend();
            this.lastDotRemove();
            this.slideInfoSet();
        }
    }

    randomSlideSet() {
        let randomInt = randomInteger(0, this.childLength),
            isVisible = this.visibleSlides.indexOf(randomInt);

        if (isVisible !== -1) {
            this.selectSlide(isVisible)
        } else {
            this.newDotSelect();
        }

    }

    nextBtnClickHandler() {
        this.$el.on('click', '.slider-arrow--next', () => {

            this.prevDataSlide = +$('.js_reviews_dot[data-index="0"]').attr('data-slide');

            this.randomSlideSet();
        })
    }

    prevBtnClickHandler() {
        this.$el.on('click', '.slider-arrow--prev', () => {
            if (typeof this.prevDataSlide === 'number') {
                this.visibleSlides[this.visibleSlides.indexOf(this.currentDataSlide)] = this.prevDataSlide;
                $('.js_reviews_dot[data-index="0"]').attr('data-slide', this.prevDataSlide);
                this.slideInfoSet(this.prevDataSlide);
                this.dotsPhotoSet(this.prevDataSlide);
                this.prevDataSlide = null
            } else {
                this.randomSlideSet();
            }
        })
    }

    init() {
        this.dataGet();
        this.$el.html('');
        this.dotsWrapperCreate();
        this.dotsAppend();
        this.slideTextWrapperCreate();
        this.slideInfoSet();
        this.arrowsAppend();
        // this.autoSlidePlay();
        // this.pauseOnHover();
    }
}

const reviewSlider = new ReviewSlider(
    '.js_reviews_slider',
    5000,
    600,
    true
);

if ($('.js_reviews_slider').length) {
    reviewSlider.init();
}


/*
* navigation
* */
(function () {
    'use strict';

    let $navigation = $('.js_navigation');

    function trackScroll() {
        let scrolled = $(window).scrollTop(),
            coords = $(window).innerHeight();

        if (scrolled > coords) {
            $navigation.addClass('show');
        }
        if (scrolled < coords) {
            $navigation.removeClass('show');
        }
    }

    $(window).scroll(trackScroll);

    $('section').each(function () {
        let $this = $(this),
            hasId = $this.attr('data-anchor');

        if (hasId) {
            $('.js_navigation_list').append(`
                <li class="navigation__item" data-anchor="#${hasId}"></li>
            `)
        }
    });

    $("body").on('click', '[data-anchor*="#"]', function () {
        let fixed_offset = 0,
            thisAnchor = $(this).attr('data-anchor');

        $('html,body')
            .animate({
                scrollTop: $(`section[data-anchor="${thisAnchor.slice(1)}"]`).offset().top - fixed_offset
            }, 500);
    });

    function selectNavDots() {
        let top = $(window).scrollTop();

        $('section').each(function () {
            let $this = $(this),
                thisTop = $this.offset().top;

            if (top >= thisTop - 50) {
                $(`.navigation__item[data-anchor="#${$this.attr('data-anchor')}"]`)
                    .addClass('active')
                    .siblings()
                    .removeClass('active')
            }
        })
    }

    $(window).scroll(selectNavDots);
})();


/*
* counter
* */
(function () {
    'use strict';
    let block_show = false,
        $advantages = $('.advantages');

    function counterStart() {
        if (block_show) {
            return false;
        }

        var wt = $(window).scrollTop();
        var wh = $(window).height();
        var et = $advantages.offset().top;
        var eh = $advantages.outerHeight();
        var dh = $(document).height();

        if (wt + wh >= et || wh + wt === dh || eh + et < wh) {
            block_show = true;

            // Код анимации
            $('.js_counter').each(function () {
                $(this)
                    .prop('Counter', 0)
                    .animate({
                        Counter: $(this).text()
                    }, {
                        duration: 1000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(thousandSeparator(Math.ceil(now)));
                        },
                        // complete: function () {
                        //     $(this).append('+')
                        // }
                    });
            });
        }
    }

    if ($('.js_counter').length) {
        $(window).scroll(counterStart);
    }
})();


/*
* back to top btn
* */
(function () {
    'use strict';
    let goTopBtn = document.querySelector('.js_back_to_top');

    function trackScroll() {
        let scrolled = window.pageYOffset,
            coords = document.documentElement.clientHeight;

        if (scrolled > coords) {
            goTopBtn.classList.add('show');
        }
        if (scrolled < coords) {
            goTopBtn.classList.remove('show');
        }
    }

    function backToTop() {
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -80);
            setTimeout(backToTop, 0);
        }
    }

    window.addEventListener('scroll', trackScroll);
    goTopBtn.addEventListener('click', backToTop);
})();


/*
* vacancies
* */
$('.js_vacancies_tab').on('click', function () {
    let $this = $(this),
        isActive = $this.hasClass('active');

    if (!isActive) {
        $this
            .addClass('active')
            .siblings()
            .removeClass('active')

        selectedVacanciesTabTextSet();
    }
})

$('.js_vacancies_selected').on('click', function () {
    let $this = $(this),
        isActive = $this.hasClass('active');

    if (isActive) {
        $this.removeClass('active')
    } else {
        $this
            .addClass('active')
            .parent()
            .siblings()
            .find('.js_vacancies_selected')
            .removeClass('active')
    }

})

function selectedVacanciesTabTextSet() {
    $('.js_vacancies_tab.active').each(function () {
        let $this = $(this),
            thisType = $this.attr('data-type'),
            thisName = $this.attr('data-name');

        if (thisType === 'division') {
            $('.js_division_selected')
                .html(thisName)
        } else if (thisType === 'location') {
            $('.js_location_selected')
                .html(thisName)
        } else if (thisType === 'technology') {
            $('.js_technology_selected')
                .html(thisName)
        }

        if ($('.js_vacancies_selected').hasClass('active')) {
            $('.js_vacancies_selected').removeClass('active')
        }
    })
}

selectedVacanciesTabTextSet();

/*
* accordion
* */
let $accordion = $('.js_accordion'),
    accordionHeader = '.js_accordion_header',
    accordionSub = '.js_accordion_sub';

$accordion
    .on('click', accordionHeader, function () {
        if ($(this).siblings(accordionSub).is(':visible')) {
            $(accordionSub).slideUp();
            $(accordionHeader).removeClass("active");
            $(accordionHeader).parent().removeClass("active");
        } else {
            $(accordionSub).slideUp().siblings('normal');
            $(accordionHeader).removeClass("active");
            $(accordionHeader).parent().removeClass("active");
            $(this).addClass("active");
            $(this).siblings(accordionSub).slideDown();
            $(this).parent().addClass("active");
        }
    })

// accordion-modal
$accordion
    .on('click', '.js_accordion_modal_btn_open', function () {
        $accordion
            .find('.js_accordion_modal')
            .addClass('show')
    })
    .on('click', '.js_accordion_modal_btn_close', function () {
        $accordion
            .find('.js_accordion_modal')
            .removeClass('show');
        accordionFileClear();
    })
    .on('click', '.js_accordion_modal_overlay', function () {
        $accordion
            .find('.js_accordion_modal')
            .removeClass('show');
        accordionFileClear();
    })

// accordion file
function accordion_file_handler(){
    let $inputFile = $('.js_accordion_file'),
        inputFileVal = $inputFile.val();

    if (inputFileVal.length){
        $('.js_form_file_label_text')
            .html(`
                <span class="form__file-icon js_file_clear">
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.333984 30.3333C0.333984 32.1742 1.82637 33.6666 3.66732 33.6666H26.0243L33.6673 26.0236V3.66659C33.6673 1.82564 32.1749 0.333252 30.334 0.333252H3.66732C1.82637 0.333252 0.333984 1.82564 0.333984 3.66659V30.3333ZM3.66732 3.66659H30.334V21.9999H25.334C23.493 21.9999 22.0007 23.4923 22.0007 25.3333V30.3333H3.66732V3.66659ZM25.334 25.3333H29.6436L25.334 29.6429V25.3333ZM8.66732 21.9999V25.3333H18.6673V21.9999H8.66732ZM8.66732 18.6666V15.3333H25.334V18.6666H8.66732ZM8.66732 8.66658V11.9999H25.334V8.66658H8.66732Z" fill="#222222"/>
                    </svg>
                    <svg class="form__clear " width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="12" height="12" rx="6" fill="#F06666"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.87783 3.03003L3.0293 3.87856L5.151 6.00026L3.02992 8.12134L3.87845 8.96987L5.99953 6.84879L8.12047 8.96973L8.96899 8.1212L6.84806 6.00026L8.96962 3.8787L8.12109 3.03017L5.99953 5.15173L3.87783 3.03003Z" fill="white"/>
                    </svg>

                </span>
                <span class="form__filename">${$inputFile[0].files[0].name}</span>
            `);
    } else {
        $('.js_form_file_label_text')
            .html('Прикрепите свое резюме <br />.exel .pdf .doc');
    }
}

$('.js_file_clear').on('click', function () {
    console.log('clear')
})

function accordionFileClear() {
    $('.js_accordion_file').val('');
    accordion_file_handler();
}