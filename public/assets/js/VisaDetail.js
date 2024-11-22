const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('global');

async function getGlobalVisa() {
  try {
    const response = await APIQuery.get(`${APIQuery.baseUrl}/global-visa/slug/${slug}`);
 

    if (response.success) {
      const GlobalVisa = response.results; 

      // Render sections with fetched data
      $('#MainHeadpage').html(renderMainHeadpage(GlobalVisa));
      $('#VisaOptions').html(VisaOptions(GlobalVisa)); // Pass pricing if it exists
      $('#Summary').html(renderSummary(GlobalVisa.pricing));
      $('#DetailsInformation').html(DetailsInformation(GlobalVisa));
    }
  } catch (error) {
    console.error("Error fetching global visa data:", error);
  }
}


// document.getElementById("visaModal")?.addEventListener("submit", async function (event) {
//   event.preventDefault(); // Prevent the default form submission
  
//   // Collect form data
//   const name = document.getElementById("EnquiryName").value;
//   const email = document.getElementById("EnquiryEmail").value;
//   const mobileNumber = document.getElementById("number").value;
//   const visaCategory = document.querySelector("select.form-control").value;
//   const travelDate = document.getElementById("dedate").value;
  
//   // Data to send in the POST request
//   const data = {
//     name: name,
//     email: email,
//     mobileNumber: mobileNumber,
//     visaCategory: visaCategory,
//     travelDate: travelDate
//   };
  
//   try {
//     // Send the POST request to the API
//     const response = await axios.post("http://localhost:3002/api/Enquiryss/enquiry", data);

//     if (response.data.success) {
//       // Success action
//       alert("Enquiry submitted successfully!");
//       // Optionally, clear the form fields after successful submission
//       document.getElementById("visaModal").reset();
//     } else {
//       alert("There was an issue submitting the enquiry.");
//     }
//   } catch (error) {
//     console.error("Error submitting enquiry:", error);
//     alert("An error occurred. Please try again.");
//   }
// });



function renderMainHeadpage(GlobalVisa) {
  return `
    <section>
      <div class="col-12 p-0 main-image visa-main-image mt-3 mb-3">
        <span class="overflow"></span>
        <img src="${GlobalVisa.images[0]}" class="img-fluid" alt="Main Visa Image">
        <h4 class="text-center text-white mb-5 position-absolute">
          <img src=${GlobalVisa.thumbnail} alt="Flag"> ${GlobalVisa.title} Global Visa
        </h4>
      </div>
    </section>
  `;
}

function VisaOptions(GlobalVisa) {
return`
                <div class="main-header">
                  <h5 class="card-title">Visa Options</h5>
                </div>
                <!-- Visa Option Card -->
                ${GlobalVisa.options.map(option => `
                <div class="d-block mb-3">
                  <div class="col-12 card imag-zoom list-card tour-details">
                    <div class="row">
                      <div class="col-12">
                        <div class="row">
                          <div class="col-md-9">
                            <div class="card-body">
                              <h6 class="card-title">
                                ${option.title}<span
                                  class="info-ouline curser-pointer"
                                  data-toggle="modal"
                                  data-target=".info"
                                  >Info</span
                                >
                              </h6>
                            </div>
                          </div>
                          <div class="col-md-3 text-md-right">
                            <div class="d-block mb-2 pt-md-3 ml-2 ml-md-0">
                              <h6>${option.discountPercentage}% OFF</h6>
                              <p class="m-0">${option.refundStatus}</p>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6 col-6 pr-md-0 pr-0">
                            <div class="card-body">
                              <div class="row">
                                <div class="col-lg-6 mb-1">
                                  <div class="warrapper">
                                    <span class="h-name">Processing Type</span>
                                    <select class="form-control">
                                      ${option.processType.map(type => `
                                      <option>${type}</option>
                                      `).join('')}
                                    </select>
                                  </div>
                                </div>
                                <div class="col-lg-6 mb-1">
                                  <div class="warrapper">
                                    <span class="h-name">No. of Visa</span>
                                    <select class="form-control">
                                      ${Array.from({ length: 300 }, (_, i) => `
                                      <option>${i + 1}</option>
                                      `).join('')}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6 col-6 pl-md-0 pl-0 ml-auto">
                            <div class="card-body pt-0">
                              <div class="row">
                                <div class="col text-right pr-md-0">
                                  <p
                                    class="card-text m-0 middle-line text-muted"
                                  >
                                    ${option.currency} ${option.price}
                                  </p>
                                  <h5 class="price">
                                    ${option.currency} ${(option.price * (1 -
                                    parseFloat(option.discountPercentage) /
                                    100)).toFixed(2)}
                                  </h5>
                                </div>
                                <div class="ml-2 pr-md-0">
                                  <div class="border p-2 rounded-ckecbox py-1">
                                    <div class="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        id="Select_${option._id}"
                                        name="example1"
                                      />
                                      <label
                                        class="custom-control-label"
                                        for="Select_${option._id}"
                                        >Select</label
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr class="mt-1 mb-1" />
                        <p class="pl-2 mb-1">
                          Credit Card Offer - Save up to
                          <span class="theme-color font-weight-bold">
                            ${option.priceWithCurrency[0].currency}
                            ${option.priceWithCurrency[0].discountPrice}
                          </span>
                          on Promocode ZEAL123
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                `).join('')}
                <div class="pagination py-2">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      <li class="page-item">
                        <a class="page-link active" href="#">1</a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">2</a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">3</a>
                      </li>
                    </ul>
                  </nav>
                </div>
`
}

function renderSummary (pricing) {
  return`
                  <div class="card border-0 rounded shadow Totalboxmain">
                  <div class="card-header">
                    <h6 class="card-title mb-0">Fair Summary</h6>
                    <p class="mb-0">2 Adults, 1 Child, 1 Infant</p>
                  </div>
                  <div class="panel panel-default">
                    <div class="card-header active" role="tab" id="A">
                      <a
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href=".A"
                        aria-expanded="true"
                        aria-controls="A"
                      >
                        <div class="row">
                          <div class="col">
                            <h6>
                              <i class="fa-solid fa-angle-down"></i> 2 Units
                            </h6>
                          </div>
                          <div class="col">
                            <h6>
                              AED ${pricing.packageCost.reduce((total, item) =>
                              total + item.amount, 0).toFixed(2)}
                            </h6>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div
                      class="panel-collapse collapse in show A"
                      role="tabpanel"
                      aria-labelledby="A"
                    >
                      <div class="card-body">
                        ${pricing.packageCost.map(item => `
                        <div class="row">
                          <div class="col">
                            <p>${item.title}</p>
                          </div>
                          <div class="col">
                            <p>${item.currency} ${item.amount.toFixed(2)}</p>
                          </div>
                        </div>
                        `).join('')}
                      </div>
                    </div>
                  </div>

                  <div class="panel panel-default">
                    <div class="card-header active" role="tab" id="B">
                      <a
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href=".B"
                        aria-expanded="true"
                        aria-controls="B"
                      >
                        <div class="row">
                          <div class="col">
                            <h6>
                              <i class="fa-solid fa-angle-down"></i> Tax &
                              Charges
                            </h6>
                          </div>
                          <div class="col">
                            <h6>
                              ${pricing.tax[0].currency}
                              ${pricing.tax.reduce((total, item) => total +
                              item.amount, 0).toFixed(2)}
                            </h6>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div
                      class="panel-collapse collapse in show B"
                      role="tabpanel"
                      aria-labelledby="B"
                    >
                      <div class="card-body">
                        ${pricing.tax.map(item => `
                        <div class="row">
                          <div class="col">
                            <p>${item.title}</p>
                          </div>
                          <div class="col">
                            <p>${item.currency} ${item.amount.toFixed(2)}</p>
                          </div>
                        </div>
                        `).join('')}
                      </div>
                    </div>
                  </div>

                  <div class="card-footer">
                    <div class="row">
                      <div class="col">
                        <h6>Total Amount:</h6>
                      </div>
                      <div class="col">
                        <h6>
                          AED ${(pricing.packageCost.reduce((total, item) =>
                          total + item.amount, 0) + pricing.tax.reduce((total,
                          item) => total + item.amount, 0)).toFixed(2)}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
  `
}

function DetailsInformation(GlobalVisa) {
  return `
    <section class="Tour-Overview mb-5" id="Details_and_Information">
      <h6>Visa Information</h6>
      <div class="card rounded border-0 shadow">
        <div class="card-body">
          <p>${GlobalVisa.details}</p>
        </div>
      </div>
    </section>
    <section class="Tour-Overview mb-5" id="How_to_Apply">
      <h6>How to Apply</h6>
      <div class="card rounded border-0 shadow">
        <div class="card-body">
          <p>${GlobalVisa.howToApply}</p>
        </div>
      </div>
    </section>
    <section class="Tour-Overview mb-5 collapsepanel" id="FAQ">
      <h6>Frequently Asked Questions</h6>
      <div class="card panel-group shadow rounded" id="accordion" role="tablist" aria-multiselectable="true">
        ${GlobalVisa.faq.map((faqItem, index) => `
          <div class="panel panel-default">
            <div class="card-header ${index === 0 ? 'active' : ''}" role="tab" id="heading${index}">
              <h4 class="panel-title">
                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse${index}" aria-expanded="${index === 0}" aria-controls="collapse${index}">
                  ${faqItem.question}
                </a>
              </h4>
            </div>
            <div id="collapse${index}" class="panel-collapse collapse ${index === 0 ? 'show' : ''}" role="tabpanel" aria-labelledby="heading${index}">
              <div class="card-body">
                <p>${faqItem.answer}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

$(document).ready(function() {
    getGlobalVisa();
});
