var url = "https://localhost:7072/api/contact/newmassege";
async function contactus() {
  debugger;
  event.preventDefault();
  var form = document.getElementById("formcontact");
  var formData = new FormData(form);

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
      window.location.href = "employee.html";
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

var url2 = "https://localhost:7072/api/contact/getallcontact";
async function getAllContact() {
    debugger;
    var response = await fetch(url2);
    var data = await response.json();
    var contact = document.getElementById("contact");
  
    // الحد الأقصى لعرض الرسالة في الكارد
    const messageLimit = 10; // الحد الأقصى لعدد الحروف
  
    data.forEach((element) => {
      // عرض جزء من الرسالة إذا كانت أطول من الحد المسموح
      let shortMessage = element.messageText;
      if (element.messageText.length > messageLimit) {
        shortMessage = element.messageText.substring(0, messageLimit) + '...';
      }
  
      // إنشاء الكارد
      contact.innerHTML += `
        <div class="col-xl-4 col-md-6 mb-4">
          <div class="feedback-card">
            <h5>${element.name}</h5>
            <div class="feedback-info">
              <p>
                <i class="fas fa-envelope"></i> ${element.email}
              </p>
              <h4>${element.phoneNumber}</h4>
             
            </div>
            <div class="feedback-message">
              <strong>Message:</strong> "${shortMessage}"
              ${element.messageText.length > messageLimit ? '<a href="#" class="see-more" data-id="' + element.id + '" data-name="' + element.name + '" data-email="' + element.email + '" data-phone="' + element.phoneNumber + '" data-message="' + element.messageText.replace(/"/g, "&quot;") + '" data-bs-toggle="modal" data-bs-target="#messageModal">See More</a>' : ''}
            </div>
          </div>
        </div>
      `;
    });
  
    // حدث للنقر على روابط "See More"
    const seeMoreLinks = document.querySelectorAll('.see-more');
    seeMoreLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        
        // جلب البيانات الكاملة من خصائص الرابط
        const name = link.getAttribute('data-name');
        const email = link.getAttribute('data-email');
        const phoneNumber = link.getAttribute('data-phone');
        const fullMessage = link.getAttribute('data-message');
  
        // عرض جميع البيانات في المودال
        document.getElementById('modalTitle').textContent = name;
        document.getElementById('modalEmail').textContent = "Email: " + email;
        document.getElementById('modalPhone').textContent = "Phone Number: " + phoneNumber;
        document.getElementById('modalMessageContent').textContent = fullMessage;
      });
    });
  }
  
getAllContact();
