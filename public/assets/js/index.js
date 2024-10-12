async function getHolidays() {
    try {
        const response = await APIQuery.get(`${APIQuery.baseUrl}/holidays`);

        if (response.success) {
            console.log(response.results);
            let holidays = response.results;

            $('#HolidayHero').html('');
            holidays.forEach(holiday => {
                $('#HolidayHero').append(`
                    <div class="item">
                        <a href="/holidays?holiday=${holiday?.slug}">
                            <div class="card imag-zoom height-auto">
                                <img src="${APIQuery.cdnUrl}${holiday.thumbnail}" class="card-img-top img-zoom-object dummy_img" alt="ZealTourism_img">
                                <img src="${APIQuery.cdnUrl}${holiday.thumbnail}" class="card-img-top img-zoom-object" alt="ZealTourism_img">
                                <div class="card-body">
                                    <span class="bookmark" id="saveforitem"><i class="far fa-bookmark"></i></span>
                                    <h6 class="card-title">${holiday.title}</h6>
                                    <p class="card-text m-0">From</p>
                                    <div class="row">
                                        <div class="col-7">
                                            <h5 class="price">${holiday.details?.price}</h5>
                                        </div>
                                        <div class="col-5">
                                            <div class="rating">
                                                <ul class="nav justify-content-end">
                                                    ${generateStars(holiday.rating.stars)}
                                                </ul>
                                                <p class="card-text m-0 text-right">${holiday.rating.stars} (${holiday.rating.ratingCount})</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="days clearfix">
                                        <span><i class="fa-regular fa-clock"></i> <strong>${holiday?.details?.duration}</strong></span>
                                        <span><strong>${holiday?.details?.attracts?.length}</strong> Cities</span> 
                                    </div>
                                    <div class="accommodation clearfix">
                                    ${holiday?.details?.attracts?.map((highlight, index) => `<span><i class="fas fa-check"></i> ${highlight}</span> `).join('')}
                                    </div>
                                    <div class="adults clearfix">
                                    ${holiday?.details?.tags?.map((tag, index) => `<span><i class="fas fa-check"></i> ${tag}</span> `).join('')}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                `);
            });

            console.log("HolidayHero DOM:", $('#HolidayHero').html()); // Check the DOM before initialization
            //display owl carousel
            $('#HolidayHero').owlCarousel('destroy');
            // Initialize Owl Carousel
            var owl = $('#HolidayHero').owlCarousel({
                loop: false,
                margin: 0,
                dots: false,
                smartSpeed: 700,
                animateIn: 'slideInRight',
                animateOut: 'slideOutRight',
                nav: true,
                navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
                responsive: {
                    0: {
                        items: 1,
                        nav: false,
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3
                    },
                    1200: {
                        items: 3
                    }
                }
            });

        }
    } catch (error) {
        console.error("Error in getHolidays:", error);
    }
}

function generateStars(rating) {
    rating = Number(rating);
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<li><span class="fa fa-star checked"></span></li>';
        } else {
            stars += '<li><span class="fa fa-star"></span></li>';
        }
    }
    return stars;
}

$(document).ready(function() {
    getHolidays();
});