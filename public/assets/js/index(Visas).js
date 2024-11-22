async function getGlobalVisas() {
    try {
        const response = await APIQuery.get(`${APIQuery.baseUrl}/global-visa`);
       

        if (response.success) {
            const globalVisas = response.results;

            // Clear the VisaHero container
            $('#VisaHero').html('');

            globalVisas.forEach(global => {
                // Access the title and amount from packageCost
                const packageCost = global.pricing.packageCost;
                const packageTitle = packageCost[0]?.title || "N/A";
                const packageAmount = packageCost[0]?.amount || 0;

                $('#VisaHero').append(`
                    <div class="item">
                        <a href="Visa.html" class="card mb-3 imag-zoom">
                            <span class="overflow"></span>
                            <img src="${global.images}" class="img-zoom-object">
                            <div class="flow-contents">
                                <div class="left-c">
                                    <h5 class="m-0">${packageTitle}</h5>
                                    <p class="m-0">Starting from <span class="them-color">AED ${packageAmount}</span></p>
                                </div>
                                <div class="right-c">
                                    <img src="${global.thumbnail}" class="img-fluid">
                                </div>
                            </div>
                        </a>
                    </div>
                `);
            });

            // Destroy previous carousel instance if it exists
            $('#VisaHero').owlCarousel('destroy');

            // Initialize the carousel after content is added
            var owl = $('#VisaHero').owlCarousel({
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
            console.error("Failed to fetch visas: ", response.message);
        }
    } catch (error) {
        console.error("Error fetching global visas:", error);
    }
}

$(document).ready(function() {
    getGlobalVisas();
});
