async function getUmarahaforAll() {
    try {
        const response = await APIQuery.get(`${APIQuery.baseUrl}/umrahaall`);
        console.log(response, "umrahaall");

        if (response.success) {
            const umrahaall = response.results;

            // Clear the UmrahTripdeals container
            $('#UmarahTrip').html('');

            umrahaall.forEach(Umraha => {
                $('#UmarahTrip').append(`
                    <div class="item">
                         <a href="/umrahaall?umraha=${Umraha.slug}" class="card mb-3 imag-zoom">
                            <div class="card imag-zoom hight-auto">
                                <img src="${Umraha.thumbnail}" class="card-img-top img-zoom-opject" alt="ZealTourism_img">
                                <div class="card-body">
                                    <span class="bookmark" id="saveforitem"><i class="far fa-bookmark"></i></span>
                                    <h6 class="card-title">${Umraha.title}</h6>
                                    <p class="card-text m-0">From</p>
                                    <div class="row">
                                        <div class="col-7">
                                            <h5 class="price">AED 120.00</h5>
                                        </div>
                                        <div class="col-5">
                                            <div class="rating">
                                                <ul class="nav justify-content-end">
                                                    <li><span class="fa fa-star checked"></span></li>
                                                    <li><span class="fa fa-star checked"></span></li>
                                                    <li><span class="fa fa-star checked"></span></li>
                                                    <li><span class="fa fa-star checked"></span></li>
                                                    <li><span class="fa fa-star checked"></span></li>
                                                </ul>
                                                <p class="card-text m-0 text-right"> 4.5 (154)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="days clearfix">
                                        <span><i class="fa-regular fa-clock"></i> <strong>3N</strong> Mecca, <strong>3N</strong> Madina</span>
                                    </div>
                                    <div class="accommodation clearfix">
                                        <span><i class="fas fa-check"></i> Meals</span>
                                        <span><i class="fas fa-check"></i> Transfer</span>
                                        <span><i class="fas fa-check"></i> Hotels</span>
                                    </div>
                                    <div class="adults clearfix">
                                        <span>Family</span>
                                        <span>Standard</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                `);
            });

            // console.log("UmrahTripdeals DOM:", $('#UmarahTrip').html()); // Check the DOM before initialization
            // Destroy previous carousel instance if it exists
            $('#UmarahTrip').trigger('destroy.owl.carousel');

            // Initialize the carousel after content is added
            var owl = $('#UmarahTrip').owlCarousel({
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

        } else {
            console.error("Failed to fetch Umrah packages:", response.message);
        }
    } catch (error) {
        console.error("Error fetching Umrah packages:", error);
    }
}

$(document).ready(function() {
    getUmarahaforAll();
});