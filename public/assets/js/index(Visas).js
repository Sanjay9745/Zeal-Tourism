async function getGlobalVisas() {
    try {
        const response = await APIQuery.get(`${APIQuery.baseUrl}/global-visa`);
        console.log(response, "GlobalVis");

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
            $('#VisaHero').owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                items: 2,
                responsive: {
                    0: { items: 1 },
                    600: { items: 2 },
                    1000: { items: 4 }
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
