//get the query holiday 
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('holiday');
async function getHoliday() {
    try {
        const response = await APIQuery.get(`${APIQuery.baseUrl}/holidays/slug/${slug}`);
        if (response.success) {
            let holiday = response.results;
            renderHolidayHero(holiday);
            renderOverview(holiday);
            renderItinerary(holiday);
            renderPricing(holiday);
            renderTourOverview(holiday);
            renderDetailsAndInformation(holiday);
            renderHolidayTiming(holiday);
            renderAdditionalInfo(holiday);
            renderBookingPolicy(holiday);
            renderFAQ(holiday);
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
function renderHolidayHero(holiday) {
    let pdfHtml = holiday?.pdf?.map(pdf => `
        <a class="dropdown-item" href="${pdf?.link}" data-value="${pdf?.type}">${pdf?.type}</a>
    `).join('') || '';
    let html =    `<section id="Photos">
            <div class="card-header trending-slider bg-white pl-0 pr-0 border-0">
                <div class="row">
                    <div class="col-md-6">
                        <h5>${holiday?.title}</h5>
                        <p class="mb-1">${holiday?.details?.duration}</p>
                        <div class="rating normelrating mb-2">
                            <ul class="nav">
                                ${generateStars(holiday?.rating?.stars)}
                                <li>
                                    <p class="card-text ml-2 m-0 py-1 text-dark"> ${holiday?.rating?.stars} | Very Good <span class="text-muted">(${holiday?.rating?.ratingCount} reviews)</span></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6 text-right">
                        <div class="d-block mb-1 pt-3">
                            <a href="${APIQuery?.cdnUrl +holiday?.pdf?.[0]?.link}" class="btn btn-theam-outer-line fs-12 mr-2" id="download_pdf_btn" download>Download PDF</a>
                            <a href="JavaScript:void(0);" class="bookmark normelbookmark mr-2 social-link" id=""><i class="fa-light fa-share-nodes"></i></a>
                            <span class="bookmark normelbookmark" id="saveforitem"><i class="far fa-bookmark"></i></span>
                        </div>
                        <div class="d-block mb-1 pt-3">
                            <p class="m-0">Free cancellation before <strong>${holiday?.bookingPolicy?.cancellation?.description?.split(' ')[4]} ${holiday?.bookingPolicy?.cancellation?.description?.split(' ')[5]}</strong></p>
                        </div>
                        <div class="d-block mb-1">
                            <span>From</span> <span class="price">${holiday?.pricing?.packageCost?.[0]?.currency} ${holiday?.pricing?.packageCost?.[0]?.amount}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="slider-main mb-5">
                <div id="carouselExampleIndicators" class="carousel slide rounded" data-ride="carousel">
                    <ol class="carousel-indicators">
                        ${holiday?.images?.map((_, index) => `
                            <li data-target="#carouselExampleIndicators" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>
                        `).join('')}
                    </ol>
                    <div class="carousel-inner">
                        ${holiday?.images?.map((image, index) => `
                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img class="d-block w-100" src="${APIQuery?.cdnUrl + image}" alt="Slide ${index + 1}">
                            </div>
                        `).join('')}
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
            <div class="card-header rounded mb-5 border-0 pl-0 pr-0">
                <ul class="nav">
                ${
                    holiday?.highlights?.map((highlight) => `
                        <li class="nav-item">
                            <span class="nav-link"><i class="fa-solid fa-circle-check text-success pr-2"></i> ${highlight}</span>
                        </li>
                    `).join('')
                }
                </ul>
            </div>
        </section>`
    $('#HolidayHero').html(html);
}

function renderOverview(holiday) {
    let html = ` <div class="card rounded border-0 shadow">
          <div class="card-body">
            <p>${holiday?.overview}</p>
          </div>
        </div>`
    $('#HolidayOverview').html(html);
}

function renderItinerary(holiday) {
    let html = '';
    holiday?.itinerary?.forEach((item, index) => {
        html += `<div class="card hight-auto panel-default rounded mb-4 m-0">
            <div class="card-header ${index === 0 ? 'active' : ''}" role="tab" id="heading${index}">
                <h4 class="panel-title">
                    <p class="mb-1">${item?.title}</p>
                    <span class="btn-link">${item?.dayDetails}</span>
                    <a role="button" class="collapse-link-arrow" data-toggle="collapse" data-parent="#accordion"
                        href="#item${index}" aria-expanded="${index === 0}" aria-controls="collapse${index}">
                    </a>
                </h4>
            </div>
            <div id="item${index}" class="panel-collapse collapse ${index === 0 ? 'show' : ''}" role="tabpanel" aria-labelledby="heading${index}">
                <div class="card-body">
                    <strong class="d-block">Day overview</strong>
                    <p>${item?.description}</p>
                    <strong class="d-block mb-2">Details</strong>
                    <div class="timeline-master">
                        <ul class="timeline">
                            ${item?.details?.map(detail => `
                                <li class="timeline-item">
                                    <div class="timeline-info">
                                        <span>${detail?.category}</span>
                                    </div>
                                    <div class="timeline-marker"></div>
                                    <div class="timeline-content pb-3">
                                        <div class="row">
                                            <div class="col-md-4 pr-lg-0">
                                                <img src="${APIQuery?.cdnUrl + detail?.image}" class="card-img-top rounded" alt="...">
                                            </div>
                                            <div class="col-md-8 pl-lg-0">
                                                <div class="card-body pt-md-0 pb-0">
                                                    <h6 class="card-title mb-2">${detail?.title}</h6>
                                                    ${detail?.location ? `
                                                    <div class="loction clearfix py-2">
                                                        <span class="fs-11"><i class="far fa-location-dot pr-2"></i> <span>${detail?.location}</span></span>
                                                    </div>` : ''}
                                                    ${detail?.room ? `
                                                    <div class="rooms clearfix py-2">
                                                        <span class="fs-11"><i class="far fa-door-closed pr-2"></i>Room types : <strong>${detail?.room}</strong></span>
                                                    </div>` : ''}
                                                    ${detail?.checkIn && detail?.checkout ? `
                                                    <div class="days clearfix py-2">
                                                        <span class="fs-11"><i class="far fa-clock pr-2"></i>Check-in : <strong>${detail?.checkIn}</strong> - Check-out: <strong>${detail?.checkout}</strong></span>
                                                    </div>` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>`;
    });
    $('#HolidayItinerary').html(html);
}
function renderPricing(holiday) {
    let pricing = holiday?.pricing;
    let packageCostHtml = pricing?.packageCost?.map(cost => `
        <div class="row">
            <div class="col">
                <p>${cost.title}</p>
            </div>
            <div class="col">
                <p>${cost.currency} ${cost.amount}</p>
            </div>
        </div>
    `).join('') || '';

    let taxHtml = pricing?.tax?.map(tax => `
        <div class="row">
            <div class="col">
                <p>${tax.title}</p>
            </div>
            <div class="col">
                <p>${tax.currency} ${tax.amount}</p>
            </div>
        </div>
    `).join('') || '';

    let totalPackageCost = pricing?.packageCost?.reduce((sum, cost) => sum + cost.amount, 0) || 0;
    let totalTax = pricing?.tax?.reduce((sum, tax) => sum + tax.amount, 0) || 0;
    let totalAmount = totalPackageCost + totalTax;

    let html = `
        <div class="card border-0 rounded shadow Totalboxmain">
            <div class="card-header">
                <h6 class="card-title mb-0">${pricing?.title || ''}</h6>
                <p class="mb-0">${pricing?.description || ''}</p>
            </div>
            <div class="panel panel-default">
                <div class="card-header active" role="tab" id="A">
                    <a role="button" data-toggle="collapse" data-parent="#accordion" href=".A" aria-expanded="true" aria-controls="A">
                        <div class="row">
                            <div class="col">
                                <h6><i class="fa-solid fa-angle-down"></i> Package Cost</h6>
                            </div>
                            <div class="col">
                                <h6>${pricing?.packageCost?.[0]?.currency || ''} ${totalPackageCost}</h6>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="panel-collapse collapse in show A" role="tabpanel" aria-labelledby="A">
                    <div class="card-body">
                        ${pricing?.totalCost || packageCostHtml}
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="card-header active" role="tab" id="B">
                    <a role="button" data-toggle="collapse" data-parent="#accordion" href=".B" aria-expanded="true" aria-controls="B">
                        <div class="row">
                            <div class="col">
                                <h6><i class="fa-solid fa-angle-down"></i> Tax & Charges</h6>
                            </div>
                            <div class="col">
                                <h6>${pricing?.tax?.[0]?.currency || ''} ${pricing?.totalTax || totalTax}</h6>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="panel-collapse collapse in show B" role="tabpanel" aria-labelledby="B">
                    <div class="card-body">
                        ${taxHtml}
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="row">
                    <div class="col">
                        <h6>Total Amount:</h6>
                    </div>
                    <div class="col">
                        <h6>${pricing?.totalAmount || totalAmount}</h6>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('#HolidayPricing').html(html);
}
function renderTourOverview(holiday) {
let html = `
      <section class="Tour-Overview mb-5">
        <h6>Tour Overview</h6>
        <div class="card rounded border-0 shadow">
           <div class="card-body">
             <p>${holiday?.tourOverview}</p>
           </div>
         </div>
      </section>
        `
    $('#HolidayTourOverview').html(html);
}
function renderDetailsAndInformation(holiday) {
    let inclusionsHtml = holiday?.inclusion?.map(item => `
        <li class="nav-item">
            <span class="nav-link"><i class="fa-solid fa-circle-check text-success pr-2"></i>${item}</span>
        </li>
    `).join('') || '';

    let exclusionsHtml = holiday?.exclusion?.map(item => `
        <li class="nav-item">
            <span class="nav-link"><i class="fa-solid fa-circle-xmark text-danger pr-2"></i>${item}</span>
        </li>
    `).join('') || '';

    let html = '';

    if (holiday?.inclusion?.length > 0 || holiday?.exclusion?.length > 0) {
        html = `
            <section id="Details_and_Information">
                <div class="row">
                    ${holiday?.inclusion?.length > 0 ? `
                    <div class="col-md-6 mb-5">
                        <h6>Inclusions</h6>
                        <div class="card rounded border-0 shadow">
                            <div class="card-body">
                                <ul class="list-option">
                                    ${inclusionsHtml}
                                </ul>
                            </div>
                        </div>
                    </div>` : ''}
                    ${holiday?.exclusion?.length > 0 ? `
                    <div class="col-md-6 mb-5">
                        <h6>Exclusions</h6>
                        <div class="card rounded border-0 shadow">
                            <div class="card-body">
                                <ul class="list-option">
                                    ${exclusionsHtml}
                                </ul>
                            </div>
                        </div>
                    </div>` : ''}
                </div>
            </section>
        `;
    }

    $('#DetailsAndInformation').html(html);
}

function renderHolidayTiming(holiday) {
    let timingsHtml = holiday?.timings?.map(timing => `
        <p class="m-0">${timing.days} - <strong>${timing.time}</strong></p>
    `).join('') || '';

    let html = `
    <section class="Tour-Overview mb-5" id="Timings">
        <h6>Timings</h6>
        <div class="card rounded border-0 shadow">
            <div class="card-body">
                ${timingsHtml}
            </div>
        </div>
      </section>
    `;

    $('#HolidayTiming').html(html);
}
function renderAdditionalInfo(holiday) {
    let additionalInfoHtml = holiday?.additionalInfo ? `
        <p class="m-0"><i class="fa-solid fa-circle text-danger pr-2"></i> ${holiday.additionalInfo}</p>
    ` : '';

    let html = '';

    if (holiday?.additionalInfo) {
        html = `
            <section class="Tour-Overview mb-5">
                <h6>Additional information</h6>
                <div class="card rounded border-0 shadow">
                    <div class="card-body">
                        ${additionalInfoHtml}
                    </div>
                </div>
            </section>
        `;
    }

    $('#HolidayAdditionalInfo').html(html);
}
function renderBookingPolicy(holiday) {
    let cancellationPolicyHtml = holiday?.bookingPolicy?.cancellation ? `
        <div class="panel panel-default">
            <div class="card-header active" role="tab" id="headingOne">
                <h4 class="panel-title">
                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"
                      aria-expanded="true" aria-controls="collapseOne">
                      Cancelation Policy
                    </a>
                </h4>
            </div>
            <div id="collapseOne" class="panel-collapse collapse in show" role="tabpanel" aria-labelledby="headingOne">
                <div class="card-body">
                    ${holiday.bookingPolicy.cancellation}
                </div>
            </div>
        </div>
    ` : '';
    if(!holiday?.bookingPolicy?.cancellation){
        cancellationPolicyHtml = ``;
    }

    let childPolicyHtml = holiday?.bookingPolicy?.childPolicy ? `
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
                    ${holiday.bookingPolicy.childPolicy}
                </div>
            </div>
        </div>
    ` : '';
    if(!holiday?.bookingPolicy?.childPolicy){
        childPolicyHtml = ``;
    }

    let otherPoliciesHtml = holiday?.bookingPolicy?.otherPolicies?.map((policy, index) => `
        <div class="panel panel-default">
            <div class="card-header" role="tab" id="heading${index + 3}">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse${index + 3}"
                      aria-expanded="false" aria-controls="collapse${index + 3}">
                        
                    </a>
                </h4>
            </div>
            <div id="collapse${index + 3}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading${index + 3}">
                <div class="card-body">
                    ${policy.description}
                </div>
            </div>
        </div>
    `).join('') || '';
    if(!holiday?.bookingPolicy?.otherPolicies.length){
        otherPoliciesHtml = ``
    }

    let html = '';

    if (holiday?.bookingPolicy) {
        html = `
            <section class="Tour-Overview mb-5 collapsepanel" id="Booking_Policy">
                <h6>Booking Policy</h6>
                <div class="card panel-group shadow rounded" id="accordion" role="tablist" aria-multiselectable="true">
                    ${cancellationPolicyHtml}
                    ${childPolicyHtml}
                    ${otherPoliciesHtml}
                </div>
            </section>
        `;
    }

    $('#HolidayBookingPolicy').html(html);
}

function renderFAQ(holiday) {
    let faqHtml = holiday?.faq?.map((faq, index) => `
        <div class="panel panel-default">
            <div class="card-header ${index === 0 ? 'active' : ''}" role="tab" id="heading${index + 1}">
                <h4 class="panel-title">
                    <a class="${index === 0 ? '' : 'collapsed'}" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse${index + 1}"
                      aria-expanded="${index === 0}" aria-controls="collapse${index + 1}">
                      ${faq.question}
                    </a>
                </h4>
            </div>
            <div id="collapse${index + 1}" class="panel-collapse collapse ${index === 0 ? 'in show' : ''}" role="tabpanel" aria-labelledby="heading${index + 1}">
                <div class="card-body">
                    ${faq.answer}
                </div>
            </div>
        </div>
    `).join('') || '';

    let html = '';

    if (holiday?.faq?.length > 0) {
        html = `
            <section class="Tour-Overview mb-5 collapsepanel" id="Booking_Policy">
                <h6>Frequently Asked Questions</h6>
                <div class="card panel-group shadow rounded" id="accordion" role="tablist" aria-multiselectable="true">
                    ${faqHtml}
                </div>
            </section>
        `;
    }

    $('#HolidayFAQSection').html(html);
}
$(document).ready(function() {
    getHoliday();
});