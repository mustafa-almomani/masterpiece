var urlemployee = "https://localhost:7072/api/User/getalluserd";
async function getalldata() {
  debugger;
  var response = await fetch(urlemployee);
  var data = await response.json();
  var contaner = document.getElementById("contaner");
  data.forEach((element) => {
    contaner.innerHTML += `
          <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img
                                src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                alt=""
                                style="width: 45px; height: 45px"
                                class="rounded-circle"
                                />
                            <div class="ms-3">
                              <p class="fw-bold mb-1">${
                                element.firstName + " " + element.lastName
                              }</p>
                          
                            </div>
                          </div>
                        </td>
                        <td>
                            <p class="text-muted mb-0">${element.email}</p>
                        </td>
                        <td>
                          <span class="">${element.phoneNumber}</span>
                        </td>
                      
                        <td>
                          <button type="button" class="btn btn-link btn-sm btn-rounded" onclick="editusers(${
                            element.userId
                          })" >
                            Edit
                          </button>
                        </td>
                      </tr>
        `;
  });
}
getalldata();

async function editusers(id) {
  debugger;

  var urll1 = `https://localhost:7072/api/User/getusersbyid/${id}`;
  var response = await fetch(urll1);
  var employee = await response.json();

  document.getElementById("editUserId").value = employee.userId;
  document.getElementById("firstName").value = employee.firstName;
  document.getElementById("lastName").value = employee.lastName;
  document.getElementById("email").value = employee.email;
  document.getElementById("phoneNumber").value = employee.phoneNumber;

  $("#editEmployeeModal").modal("show");
}

async function updateEmployee() {
  debugger;
  var id = document.getElementById("editUserId").value;
  var url2 = `https://localhost:7072/api/User/edit/user/${id}`;
  var formData = new FormData(document.getElementById("employeeEditForm"));

  // طباعة بيانات النموذج
  console.log("Form Data:", Array.from(formData.entries()));

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
