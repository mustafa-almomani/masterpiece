var orderurl = "https://localhost:7072/api/services/getallorder";
var selectedEmployeesMap = {}; // لتخزين جميع الموظفين لكل طلب

async function getallorder() {
  var response = await fetch(orderurl);
  var data = await response.json();
  var contaner = document.getElementById("contaner");

  data.forEach((element) => {
    contaner.innerHTML += `
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-primary shadow-sm h-100">
                <div class="card-header bg-primary text-white d-flex justify-content-between">
                    <h5 class="mb-0">Order ${element.orderNumber}</h5>
                    <i class="fas fa-folder-open icon" onclick="downloadOrderInfo(${element.orderNumber}, '${element.firstname}', '${element.lastname}', '${element.companyname}', '${element.email}', '${element.servicename}', '${element.projectdetails}')"></i>
                </div>
                <div class="card-body">
                    <div class="order-info">
                        <p class="text-truncate"><i class="fas fa-user"></i> <strong>Name:</strong> ${element.firstname + " " + element.lastname}</p>
                        <p class="text-truncate"><i class="fas fa-building"></i> <strong>Company:</strong> ${element.companyname}</p>
                        <p class="text-truncate"><i class="fas fa-phone"></i> <strong>Phone:</strong> ${element.phonnumber}</p>
                        <p class="text-truncate"><i class="fas fa-envelope"></i> <strong>Email:</strong> ${element.email}</p>
                        <p class="text-truncate" id="mm"><i class="fas fa-laptop-code"></i> <strong>Project:</strong> ${element.servicename}</p>
                    </div>

                    <!-- دروب داون ليست للحالة -->
                    <div class="dropdown mt-3">

                      <select onchange="editstatus(${element.requestid})"  id="status-${element.requestid}" class="form-select form-select-sm text-uppercase fw-bold bg-light border-0 shadow-sm">
                          <option value="" class="text-Info">${element.status}</option>
                          <option value="Pending" class="text-Info">Pending</option>
                          <option value="In Progress" class="text-primary">In Progress</option>
                          <option value="Completed" class="text-success">Completed</option>
                        </select>

                    </div>

                </div>

                <button type="button" onClick="batool('${element.servicename}', ${element.orderNumber})" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#orderModal-${element.orderNumber}">
                    View Details
                </button>
            </div>
        </div>

        <!-- Modal لعرض التفاصيل -->
        <div class="modal fade" id="orderModal-${element.orderNumber}" tabindex="-1" aria-labelledby="orderModalLabel-${element.orderNumber}" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="orderModalLabel-${element.orderNumber}">Order Details - ${element.orderNumber}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-dark">

              <p style="display: none;" id="ddd-${element.orderNumber}">${element.requestid}</p> <!-- تعديل ال id ليكون فريد -->
                <p><strong>Name:</strong> ${element.firstname + " " + element.lastname}</p>
                <p><strong>Company:</strong> ${element.companyname}</p>
                <p><strong>Phone:</strong> ${element.phonnumber}</p>
                <p ><strong>Email:</strong> ${element.email}</p>
                <p><strong>Project:</strong> ${element.servicename}</p>
                <p><strong>Project Details:</strong><p id="projectdetails-${element.orderNumber}"> ${element.projectdetails}</p></p> <!-- تعديل id ليكون فريد لكل طلب -->
                <p><strong>Request Date:</strong> ${element.requestdate}</p>
                <img src="img/${element.img}" width="150px" alt="">
<!--
                <div>
                    <label for="employeeDropdown-{element.orderNumber}">Select Employee:</label>
                    <select id="employeeDropdown-{element.orderNumber}" class="form-select" onChange="selectEmployee('${element.orderNumber}')">
                        <option value="">Select an employee</option>
                    </select>
                </div>
-->
                
              <!--  <div class="mt-3" id="selectedEmployeesContainer-{element.orderNumber}">
                    <strong>Selected Employees:</strong>
                    <ul id="selectedEmployeesList-{element.orderNumber}">
                      
                    </ul>
                </div> -->
              </div>
              <div class="modal-footer">
             <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="shareOrder({element.orderNumber})">Share this order</button>-->

                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    `;
  });
}

// دالة لتحويل بيانات الطلب إلى ملف نصي وتحميله
function downloadOrderInfo(orderNumber, firstname, lastname, companyname, email, servicename, projectdetails) {
  const orderInfo = `
        Order Number: ${orderNumber}
        Name: ${firstname} ${lastname}
        Company: ${companyname}
        Email: ${email}
        Service Name: ${servicename}
        Project Details: ${projectdetails}
    `;

  const blob = new Blob([orderInfo], { type: "text/plain" });
  const a = document.createElement("a");
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = `Order_${orderNumber}.txt`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

getallorder();

// دالة لجلب قائمة الموظفين
async function getEmployees(servicename, orderNumber) {
  if (!servicename) {
    alert("Please enter a service name.");
    return;
  }

  try {
    const response = await fetch(
      `https://localhost:7072/api/services/getjoptitleforemployee?serviceName=${servicename}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }

    const data = await response.json();
    const dropdown = document.getElementById(`employeeDropdown-${orderNumber}`);
    dropdown.innerHTML = ""; // مسح أي نتائج سابقة

    dropdown.innerHTML = '<option value="">Select an employee</option>';

    if (data.length === 0) {
      dropdown.innerHTML = '<option value="">No employees found</option>';
      return;
    }

    data.forEach((employee) => {
      // يتم استخدام employeeId كـ value وemployeeName كالنص الظاهر
      dropdown.innerHTML += `
        <option value="${employee.employeeid}">${employee.employeeName} - ${employee.jobTitle}</option>
      `;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("An error occurred while fetching employees.");
  }
}

// دالة لإضافة الموظف المختار إلى القائمة المختارة داخل المودال
// function selectEmployee(orderNumber) {
//   const dropdown = document.getElementById(`employeeDropdown-${orderNumber}`);
//   const selectedEmployeeId = dropdown.value;
//   const selectedEmployeeName = dropdown.options[dropdown.selectedIndex].text.split(" - ")[0]; // أخذ اسم الموظف فقط من النص

//   if (selectedEmployeeId) {
//     // إضافة الموظف إلى قائمة الموظفين المختارين مع زر X لحذف الاسم
//     const selectedList = document.getElementById(`selectedEmployeesList-${orderNumber}`);
//     const li = document.createElement('li');
//     li.textContent = selectedEmployeeName;

//     // إنشاء زر "إكس" لحذف الموظف من القائمة
//     const removeBtn = document.createElement('button');
//     removeBtn.textContent = '×';
//     removeBtn.className = 'btn btn-sm btn-danger ms-2';
//     removeBtn.onclick = function() {
//       // عند الضغط على زر "إكس"، يتم حذف الموظف من القائمة
//       selectedList.removeChild(li);

//       // إزالة الموظف من مصفوفة الموظفين الخاصة بهذا الطلب
//       selectedEmployeesMap[orderNumber] = selectedEmployeesMap[orderNumber].filter(emp => emp.EmployeeId !== selectedEmployeeId);
//     };

//     li.appendChild(removeBtn);
//     selectedList.appendChild(li);

//     // إضافة الموظف إلى المصفوفة الخاصة بالطلب الحالي
//     if (!selectedEmployeesMap[orderNumber]) {
//       selectedEmployeesMap[orderNumber] = [];
//     }

//     selectedEmployeesMap[orderNumber].push({
//       EmployeeId: selectedEmployeeId,
//       EmployeeName: selectedEmployeeName
//     });

//     // حذف الموظف من القائمة المنسدلة
//     const optionToRemove = dropdown.querySelector(`option[value="${selectedEmployeeId}"]`);
//     optionToRemove.remove();
//   }
// }

// function batool(servicename, orderNumber) {
//   getEmployees(servicename, orderNumber);
// }

// function shareOrder(orderNumber) {

//     const modal = document.getElementById(`orderModal-${orderNumber}`);

//     // استرجاع requestId من العنصر المخفي داخل المودال
//     const requestId = document.getElementById(`ddd-${orderNumber}`).innerHTML; // تعديل لاستخدام id الفريد لكل طلب
//     const projectdetails = document.getElementById(`projectdetails-${orderNumber}`).innerHTML; // استخدام id فريد لاسترجاع projectdetails

//     // استرجاع رابط الصورة
//     const imageSrc = modal.querySelector('img').getAttribute('src');

//     const selectedEmployees = selectedEmployeesMap[orderNumber] || []; // استرجاع قائمة الموظفين المختارين

//     if (selectedEmployees.length === 0) {
//       alert("No employees selected for this order.");
//       return;
//     }

//     const requestDate = new Date().toISOString(); // يمكنك تغيير هذا حسب الحاجة

//     // إنشاء كائن الطلب لإرساله إلى الـ API
//     const requestData = {
//       Request: {
//         RequestId: requestId, // استخدام requestId المسترجع من العنصر المخفي
//         ProjectDetails: projectdetails,
//         RequestDate: requestDate,
//         Image: imageSrc // إضافة رابط الصورة إلى الطلب
//       },
//       Employees: selectedEmployees, // جميع الموظفين المختارين
//     };

//     // إرسال البيانات إلى الـ API باستخدام POST
//     fetch("https://localhost:7072/api/CustomerManagement/addassimentforemployee", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(requestData)
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Task assignments added successfully:", data);
//         alert("Order shared successfully!"); // رسالة تأكيد
//       })
//       .catch((error) => {
//         console.error("Error sharing order:", error);
//         alert("An error occurred while sharing the order.");
//       });
// }




async function editstatus(id) {
    event.preventDefault();
    debugger
    let urlm=`https://localhost:7072/api/CustomerManagement/editorder/${id}`;
    let response = await fetch(urlm,{
        method: 'PUT',
        body: JSON.stringify({status: document.getElementById(`status-${id}`).value}),
        headers: {
            'Content-Type': 'application/json',
        },
        
       

    })
    
    if (response.status==200){
        alert('Status updated successfully');
   
    }
    else{
        alert('Error updating status');
    }

}