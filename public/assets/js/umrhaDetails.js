const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('umraha');
console.log(slug);

async function getUmrhaDetails() {
  try {
    const response = await fetch(`https://api.zealtourism.com/slug/${slug}`); // Use backend URL
    const data = await response.json();

    if (data && data.success) {
      const packageData = data.results;
      console.log("Fetched Umrah Data:", packageData);

      $('#MainHeadpage').html(renderUmrahPackage(packageData));
      $('#InclusionExclusion').html(renderInclusionExclusion(packageData))
      $('#BookingPolicy').html(renderBookingPolicy(packageData))
      $('#Faq').html(renderFaq(packageData))
    } else {
      console.error("Failed to fetch Umrah data:", data);
    }
  } catch (error) {
    console.error("Error fetching Umrah data:", error);
  }
}

function renderUmrahPackage(packageData) {
  const title = packageData.title || 'Sample Package Title';
  const description = packageData.description || 'No description available.';
  const images = packageData.images || ['default.jpg'];
  const price = packageData.pricing?.packageCost?.[0] || '$999';
  const tax = packageData.pricing?.tax?.[0] || '$999';
  const itinerary = packageData.itinerary || [];
  const features = packageData.features || ['Feature 1', 'Feature 2'];
  const pdfOptions = packageData.pdf || [];
  const tourOverview = packageData.tourOverview || 'No overview available.';
  const overview = packageData.overview || 'No additional overview information.';

  return `
    <section>
      <div class="card-header bg-white pl-0 pr-0 border-0">
        <div class="row">
          <div class="col-md-6">
            <h5>${title}</h5>
          </div>
          <div class="col-md-6 text-md-right">
            <div class="d-block mb-1 pt-3">
              <button type="button" class="btn btn-theam-outer-line fs-12 mr-2" id="download_pdf_btn">Download PDF</button>
              <span class="bookmark normelbookmark" id="saveforitem"><i class="far fa-bookmark"></i></span>
            </div>
            <div class="d-block mb-1">
              <span>From</span> <span class="price">${price}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="slider-main mb-5">
        <div id="carouselExampleIndicators" class="carousel slide rounded" data-ride="carousel">>
          <div class="carousel-inner">
            ${images.map((image, index) => `
              <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img class="d-block w-100" src="${image}" alt="Slide ${index + 1}">
              </div>`).join('')}
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </section>

     <section class="Tour-Overview mb-5" id="Overview">
        <h6>Overview</h6>
        <div class="card rounded border-0 shadow">
          <div class="card-body">
            <p>${overview}</p>
          </div>
        </div>
      </section>

            <section id="Itinerary">
        <div class="row">
          <div class="col-lg-8 col-xl-9 mb-4 trending-slider collapsepanel overivewholyday mb-3">
            <h6>Itinerary</h6>
            <div class="card hight-auto panel-default rounded mb-4 m-0">
              <div class="card-header active" role="tab" id="headingOne">
                <h4 class="panel-title">
                  <p>${itinerary.title}</p>
                  <span class="btn-link"><strong></strong>Day 2 - 20 December 2022, Monday </span>
                  <a role="button" class="collapse-link-arrow" data-toggle="collapse" data-parent="#accordion"
                    href="#itemB" aria-expanded="true" aria-controls="collapseOne">

                  </a>
                </h4>
              </div>
              <div id="itemB" class="panel-collapse collapse in show collapseOne" role="tabpanel" aria-labelledby="headingOne">
                <div class="card-body">
                  <!-- <strong class="d-block">Day overview</strong> -->
                  <p>${itinerary.description}</p>

                  <!-- <strong class="d-block mb-2">Details</strong> -->
                  <div class="timeline-master">
                    <ul class="timeline">
                      <li class="timeline-item">
                        <div class="timeline-info">
                          <span><img src="assets/img/Icons/Timline_Hotels.png"> Hotel</span>
                        </div>
                        <div class="timeline-marker"></div>
                        <div class="timeline-content pb-3">
                          <div class="row">
                            <div class="col-md-4 pr-lg-0">
                              <img src="assets/img/Tourism Image/flower-garden.png" class="card-img-top rounded"
                                alt="...">
                            </div>
                            <div class="col-md-8 pl-lg-0">
                              <div class="card-body pt-md-0 pb-0">
                                <h6 class="card-title mb-2">${itinerary.details[0].title}</h6>
                                <div class="loction clearfix py-2">
                                  <span class="fs-11"><i class="far fa-location-dot pr-2"></i> <span>${itinerary.details[0].location}</span></span>
                                </div>
                                <div class="rooms clearfix py-2">
                                  <span class="fs-11"><i class="far fa-door-closed pr-2"></i>Room types : <strong>${itinerary.details[0].room}</strong></span>
                                </div>
                                <div class="days clearfix py-2">
                                  <span class="fs-11"><i class="far fa-clock pr-2"></i>Check-in : <strong>${itinerary.details[0].checkIn}</strong>
                                    - Check-out: <strong>${itinerary.details[0].checkout}</strong></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>


                      <li class="timeline-item">
                        <div class="timeline-info">
                          <span><img src="assets/img/Icons/Timline_car.png"> Transfers</span>
                        </div>
                        <div class="timeline-marker"></div>
                        <div class="timeline-content pb-3">
                          <div class="row">
                            <div class="col-md-4  pr-lg-0">
                              <img src="assets/img/trnsfer-cars.png" class="card-img-top rounded" alt="...">
                            </div>
                            <div class="col-md-8  pl-lg-0">
                              <div class="card-body pt-md-0 pb-0">
                                <h6 class="card-title mb-2">SUV</h6>
                                <div class="loction clearfix py-2">
                                  <span class="fs-11"><i class="far fa-location-dot pr-2"></i><span> From : <span>Dubai
                                        Airport to Mecca</span></span></span>
                                </div>
                                <div class="days clearfix py-2">
                                  <span class="fs-11"><i class="far fa-clock pr-2"></i><span>Time: 9:00 AM</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4 col-xl-3 mb-4">
            <div class="card border-0 rounded shadow Totalboxmain">
              <div class="card-header">
                <h6 class="card-title mb-0">Fair Summary</h6>
                <p class="mb-0">2 Adults, 1 Child, 1 Infant</p>
              </div>
              <div class="panel panel-default">
                <div class="card-header active" role="tab" id="A">
                  <a role="button" data-toggle="collapse" data-parent="#accordion" href=".A" aria-expanded="true"
                    aria-controls="A">
                    <div class="row">
                      <div class="col">
                        <h6><i class="fa-solid fa-angle-down"></i>Package Cost</h6>
                      </div>
                      <div class="col">
                        <h6>${price.currency}</h6>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="panel-collapse collapse in show A" role="tabpanel" aria-labelledby="A">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <p>${price.title}</p>
                      </div>
                      <div class="col">
                        <p>${price.amount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel panel-default">
                <div class="card-header active" role="tab" id="B">
                  <a role="button" data-toggle="collapse" data-parent="#accordion" href=".B" aria-expanded="true"
                    aria-controls="B">
                    <div class="row">
                      <div class="col">
                        <h6><i class="fa-solid fa-angle-down"></i> Tax & Charges</h6>
                      </div>
                      <div class="col">
                        <h6>AED ${tax.currency}</h6>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="panel-collapse collapse in show B" role="tabpanel" aria-labelledby="B">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <p>${tax.title}</p>
                      </div>
                      <div class="col">
                        <p>${tax.amount}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <p>Other Charges</p>
                      </div>
                      <div class="col">
                        <p>AED 5.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <div class="row">
                  <div class="col">
                    <h6>Total Amount:</h6>
                  </div>
                  <div class="col">
                    <h6>AED 260.00</h6>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-block mt-3">
              <a href="Umrah_booking_summary.html" class="btn btn-theam btn-block">PROCEED</a>
              <button type="button" class="btn btn-theam-outer-line btn-block mt-3" id="enquiry_holdy">Enquire
                Now</button>
            </div>
          </div>
        </div>
      </section>
  `;
}

function renderInclusionExclusion(packageData) {
  const inclusions = packageData.inclusion || [];
  const exclusions = packageData.exclusion || [];

  // Split the data by spaces
  const separateInclusions = inclusions.split(' ');
  const separateExclusion = exclusions.split(' ');

  // Create HTML for inclusions
  const inclusionList = separateInclusions.map(item => `
    <li class="nav-item">
      <span class="nav-link"><i class="fa-solid fa-circle-check text-success pr-2"></i>
      ${item}
      </span>
    </li>
  `).join(''); // Join the array into a single string

  const exclusionList = separateExclusion.map(item => `
        <li class="nav-item">
      <span class="nav-link"><i class="fa-solid fa-circle-xmark text-danger pr-2"></i>
      ${item}
      </span>
    </li>
    `).join('')

  return `
            <div class="row">
          <div class="col-md-6 mb-5">
            <h6>Inclusions</h6>
            <div class="card rounded border-0 shadow">
              <div class="card-body">
                <ul class="list-option">
                    ${inclusionList}
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-5">
            <h6>Exclusions</h6>
            <div class="card rounded border-0 shadow">
              <div class="card-body">
                <ul class="list-option">
                ${exclusionList}
                </ul>
              </div>
            </div>
          </div>
        </div>
  `;
}

function renderBookingPolicy (packageData) {
  const otherPolicies = packageData.bookingPolicy?.otherPolicies || ['No policies available.'];
  const cancellation = packageData.bookingPolicy?.cancellation || 'No Policy Data '
  const childPolicy = packageData.bookingPolicy?.childPolicy || 'No Policy Data '

  const otherPoliciesData = otherPolicies.map(policy => `
                <div class="panel panel-default">
              <div class="card-header " role="tab" id="headingThree">
                <h4 class="panel-title">
                  <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion"
                    href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    ${policy.title}
                  </a>
                </h4>
              </div>
              <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                <div class="card-body">
                  ${policy.description}
                </div>
              </div>
            </div>
    `)

  

  return`
          <div class="Tour-Overview mb-5 collapsepanel">
          <h6>Booking Policy</h6>
          <div class="card panel-group shadow rounded" id="accordion" role="tablist" aria-multiselectable="true">
            <div class="panel panel-default">
              <div class="card-header active" role="tab" id="headingOne">
                <h4 class="panel-title">
                  <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"
                    aria-expanded="true" aria-controls="collapseOne">
                    Cancellation Policy
                  </a>
                </h4>
              </div>
              <div id="collapseOne" class="panel-collapse collapse in show" role="tabpanel"
                aria-labelledby="headingOne">
                <div class="card-body">
                ${cancellation}
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="card-header" role="tab" id="headingTwo">
                <h4 class="panel-title">
                  <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"
                    aria-expanded="false" aria-controls="collapseTwo">
                    Child Policy
                  </a>
                </h4>
              </div>
              <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                <div class="card-body">
                ${childPolicy}
                </div>
              </div>
            </div>
            ${otherPoliciesData}
          </div>
        </div>
  `
}

function renderFaq(packageData) {
  // Check if the packageData has the faq data; if not, default to an empty array
  const faqs = packageData?.faq || [];

  // If there are no FAQs, return a message indicating "NO DATA"
  if (faqs.length === 0) {
    return <div class="panel panel-default"><div class="card-body">NO DATA</div></div>;
  }

  // Iterate over the FAQs and create HTML for each question and answer
  return faqs.map((faq, index) => `
    <div class="panel panel-default">
      <div class="card-header" role="tab" id="heading${index}">
        <h4 class="panel-title">
          <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse${index}"
            aria-expanded="${index === 0}" aria-controls="collapse${index}">
            ${faq.question}
          </a>
        </h4>
      </div>
      <div id="collapse${index}" class="panel-collapse collapse ${index === 0 ? 'in show' : ''}" role="tabpanel"
        aria-labelledby="heading${index}">
        <div class="card-body">
          ${faq.answer}
        </div>
      </div>
    </div>
  `).join('');
}

$(document).ready(function () {
  getUmrhaDetails();
});