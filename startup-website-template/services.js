const url = "https://localhost:7072/api/services";
async function addservice() {
  debugger;
  event.preventDefault();
  var form = document.getElementById("addservice");
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

async function fetchCardData() {
  let url = "https://localhost:7072/api/services/getallservices";
  const response = await fetch(url);
  let data = await response.json();
  // allData = data;
  let card = document.getElementById("contener");

  data.forEach((product) => {
    card.innerHTML += `


        <div class="col-xl-4 col-md-6 mb-4">
                        <div class="service-card">
                          <div class="service-icon">
                        <img src="../img/${product.img}" alt="img">
                    </div>
                       
                            <h5>${product.serviceName}</h5>
                            <div class="service-info">
                                <p><strong>Description:</strong> ${product.serviceDescription}.</p>
                            </div>
                            <div class="service-actions">
                                <a href="#"  class="edit" onclick="editservice(${product.serviceId})"><i class="fas fa-edit"></i> Edit</a>
                                <a href="#" class="delete"  onclick="deleteservices(${product.serviceId})"><i class="fas fa-trash"></i> Delete</a>
                            </div>
                        </div>
                    </div>
        `;
  });
  console.log(data);
}

fetchCardData();

async function editservice(id) {
  debugger;

  var urll1 = `https://localhost:7072/api/services/getservicesbyid/${id}`;
  var response = await fetch(urll1);
  var employee = await response.json();

  document.getElementById("editEmployeeId").value = employee.serviceId;
  document.getElementById("ServiceName").value = employee.serviceName;
  document.getElementById("ServiceDescription").value =
    employee.serviceDescription;
  // document.getElementById("Img").value =employee.img;
  document.getElementById("batool").src = `../img/${employee.img}`;

  $("#editEmployeeModal").modal("show");
}

async function updateservice() {
  var id = document.getElementById("editEmployeeId").value;
  var url2 = `https://localhost:7072/api/services/editservices/${id}`;
  var formData = new FormData(document.getElementById("serviceEditForm"));

  // طباعة بيانات النموذج

  var response = await fetch(url2, {
    method: "PUT",
    body: formData,
  });

  console.log("Response Status:", response.status);
  console.log("Response OK:", response.ok);

  if (response.ok) {
    await Swal.fire({
      title: "Success!",
      text: "Employee updated successfully.",
      icon: "success",
    });

    $("#editEmployeeModal").modal("hide"); // إغلاق المودال بعد التحديث
    // الانتظار قبل إعادة تحميل الصفحة
    setTimeout(() => {
      location.reload();
    }, 1000); // الانتظار لمدة 1 ثانية قبل إعادة تحميل الصفحة
  } else {
    const errorMessage = await response.text();
    await Swal.fire({
      title: "Error!",
      text: `Failed to update employee: ${errorMessage}`,
      icon: "error",
    });
  }
}

async function deleteservices(id) {
  debugger;
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This employee will be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    var delet = `https://localhost:7072/api/services/deleteservicesid?id=${id}`;
    var response = await fetch(delet, {
      method: "DELETE",
    });

    console.log("Response Status:", response.status);
    console.log("Response OK:", response.ok);

    if (response.ok) {
      await Swal.fire(
        "Deleted!",
        "The employee has been deleted successfully.",
        "success"
      );
      location.reload();
    } else {
      const errorMessage = await response.text();
      await Swal.fire(
        "Error!",
        `There was an error deleting the employee: ${errorMessage}`,
        "error"
      );
    }
  }
}




