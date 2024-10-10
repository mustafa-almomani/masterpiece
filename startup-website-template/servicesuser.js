async function servicesuser() {
    debugger;
    let url = "https://localhost:7072/api/services/getallservices";
    const response = await fetch(url);
    let data = await response.json();
    // allData = data;
    let card = document.getElementById("contener");
  
    data.forEach((product) => {
      card.innerHTML +=
       `
                     <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                <div class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                    <div class="service-icon">
                          <img src="../img/${product.img}" alt="img">
                    </div>
                    <h4 class="mb-3">${product.serviceName}</h4>
                    <p class="m-0"> ${product.serviceDescription}.</p>
                    <a class="btn btn-lg btn-primary rounded" onclick="getservicesbyid(${product.serviceId})" >
                        <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
    });
    card.innerHTML += `
    <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.9s">
        <div class="position-relative bg-primary rounded h-100 d-flex flex-column align-items-center justify-content-center text-center p-5">
            <h3 class="text-white mb-3">Call Us For A Quote</h3>
            <p class="text-white mb-3">Our team is ready to provide the best solutions for your business. Contact us now for a free consultation.</p>
            <h2 class="text-white mb-0">+123 456 7890</h2>
        </div>
    </div>
  `;
    console.log(data);
  }
  


  
  
 






  async function servicesuser() {
    let url = "https://localhost:7072/api/services/getallservices";
    const response = await fetch(url);
    let data = await response.json();
    let card = document.getElementById("contener");
  
    data.forEach((product) => {
      card.innerHTML += `
        <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
          <div class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
            <div class="service-icon">
              <img src="../img/${product.img}" alt="img">
            </div>
            <h4 class="mb-3">${product.serviceName}</h4>
            <p class="m-0">${product.serviceDescription}.</p>
            <button class="btn btn-lg btn-primary rounded" onclick="showServiceModal(${product.serviceId}, '${product.serviceName}', '${product.serviceDescription}')">
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    });

    card.innerHTML += `
    <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.9s">
      <div class="position-relative bg-primary rounded h-100 d-flex flex-column align-items-center justify-content-center text-center p-5">
        <h3 class="text-white mb-3">Call Us For A Quote</h3>
        <p class="text-white mb-3">Our team is ready to provide the best solutions for your business. Contact us now for a free consultation.</p>
        <h2 class="text-white mb-0">+123 456 7890</h2>
      </div>
    </div>
    `;
}

// Function to show the modal and populate the form
async function showServiceModal(serviceId, serviceName, serviceDescription) {
    try{
        const respone=await fetch(`https://localhost:7072/api/services/userInfo?userid=${localStorage.getItem("UserID")}`)
        const data=await respone.json();
        document.getElementById("FirstName").value=data.firstName;
        document.getElementById("LastName").value=data.lastName;
        document.getElementById("Email").value=data.email;
        document.getElementById("phonenumber").value=data.phoneNumber;


    }catch(e){console.log("bla balablbaklbhq")}
  document.getElementById('serviceId').value = serviceId;
  document.getElementById('serviceName').value = serviceName;

  let serviceModal = new bootstrap.Modal(document.getElementById('serviceModal'));
  serviceModal.show();
}

servicesuser();


const url = "https://localhost:7072/api/services/PostService";
async function addorder() {
  debugger;
  event.preventDefault();
  var form = document.getElementById("addorder");
  var formData = new FormData(form);
  formData.append("UserId",localStorage.getItem("UserID"))
  formData.append("ServiceId",document.getElementById('serviceId').value )

  var response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    Swal.fire({
      title: "Success!",
      text: "Registration completed successfully",
      icon: "success",
      confirmButtonText: "OK",
      timer: 3000, // time in milliseconds
      timerProgressBar: true, // show a progress bar for the time
    });

    // Redirecting to the page after 2 seconds
    setTimeout(() => {
      window.location.href = "servesadmin.html";
    }, 2000);
  } else {
    Swal.fire({
      title: "Error!",
      text: "Registration failed",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}











  

  
 