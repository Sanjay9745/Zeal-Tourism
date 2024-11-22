async function getGlobalVisasMul() {
    try {
        const response = await fetch('http://localhost:3002/api/global-visa');
        const data = await response.json(); // Parse the JSON data
        console.log(data, "GlobalVis");

        if (data.success) {
            const globalVisas = data.results;
            $('#VisaMultiple').html(''); // Clear the VisaMultiple container

            // Loop through each visa in the response
            globalVisas.forEach(global => {
                const title = global.title || "Visa";
                const slug = global.slug || "slug";
             
                
                const amount = global.pricing?.packageCost[0]?.amount || "N/A";
                const currency = global.pricing?.packageCost[0]?.currency || "AED";
                const visaImage = global.images || "assets/img/default.jpg"; // Fallback image
                const thumbnail = global.thumbnail || "assets/img/default-flag.png"; // Fallback thumbnail

                // Append the visa card HTML dynamically
                $('#VisaMultiple').append(`
                    <div class="col-xl-4 col-md-6 item">
                        <a href="/global-visa?global=${slug}" class="card mb-3 imag-zoom">
                            <span class="overflow"></span>
                            <img src="${visaImage}" class="img-zoom-object">
                            <div class="flow-contents">
                                <div class="left-c">
                                    <h5 class="m-0">${title}</h5>
                                    <p class="m-0">Starting from <span class="them-color">${currency} ${amount}</span></p>
                                </div>
                                <div class="right-c">
                                    <img src="${thumbnail}" class="img-fluid">
                                </div>
                            </div>
                        </a>
                    </div>
                `);
            });
        } else {
            console.error("Failed to fetch visas: ", data.message);
        }
    } catch (error) {
        console.error("Error fetching global visas:", error);
    }
}

$(document).ready(function() {
    getGlobalVisasMul();
});
