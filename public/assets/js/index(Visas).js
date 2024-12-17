async function getGlobalVisas(filter = null) {
  try {
    // Fetch data from the API
    const response = await APIQuery.get(`${APIQuery.baseUrl}/global-visa`);

    if (response.success) {
      const globalVisas = response.results;
      console.log(globalVisas, "globalVisas");

      // Apply filters if provided
      const filteredData = filter
        ? globalVisas.filter((visa) =>
            visa.options.some((option) =>
              option.visaPackage?.some((pkg) => {
                // Debugging each package
                console.log(pkg, "pkg");

                // Filtering logic
                return (
                  (!filter.from || pkg.destinationOrTour === filter.from) &&
                  (!filter.to || pkg.living === filter.to) &&
                  (!filter.nationality || pkg.nationality === filter.nationality)
                );
              })
            )
          )
        : globalVisas;

      console.log(filteredData, "filteredData");

      // Generate HTML content for the visas
      const visaContent = global(filteredData);

      // Clear and update the VisaHero container
      $("#VisaHero").html(visaContent);

      // Reinitialize Owl Carousel
      $("#VisaHero").owlCarousel("destroy");
      $("#VisaHero").owlCarousel({
        loop: false,
        margin: 0,
        dots: false,
        smartSpeed: 700,
        animateIn: "slideInRight",
        animateOut: "slideOutRight",
        nav: true,
        navText: [
          "<i class='fas fa-chevron-left'></i>",
          "<i class='fas fa-chevron-right'></i>",
        ],
        responsive: {
          0: { items: 1, nav: false },
          768: { items: 2 },
          992: { items: 3 },
          1200: { items: 3 },
        },
      });
    } else {
      console.error("Failed to fetch visas: ", response.message);
    }
  } catch (error) {
    console.error("Error fetching global visas:", error);
  }
}

// Helper function to generate HTML for the visas
function global(globalVisas) {
  return globalVisas
    .map(
      (visa) => `
        <div class="item">
          <a href="Visa.html" class="card mb-3 imag-zoom">
            <span class="overflow"></span>
            <img src="${visa.images}" class="img-zoom-object" alt="Visa Image">
            <div class="flow-contents">
              <div class="left-c">
                <h5 class="m-0">${visa.pricing?.packageCost[0]?.title || "N/A"}</h5>
                <p class="m-0">
                  Starting from <span class="them-color">AED ${visa.pricing?.packageCost[0]?.amount || 0}</span>
                </p>
              </div>
              <div class="right-c">
                <img src="${visa.thumbnail}" class="img-fluid" alt="Thumbnail">
              </div>
            </div>
          </a>
        </div>
      `
    )
    .join("");
}

// On document ready, attach event handlers
$(document).ready(function () {
  // Fetch visas on page load
  getGlobalVisas();

  // Attach search button click event
  $("#SearchButton").on("click", function () {
    const filter = {
      from: $("#destinationOrTour").val(),
      to: $("#living").val(),
      date: $("#date").val(),
      nationality: $("#nationality").val(),
    };

    console.log(filter, "filter");

    // Fetch visas with filters
    getGlobalVisas(filter);
  });
});
