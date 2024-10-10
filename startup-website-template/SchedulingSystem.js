const url = "https://localhost:7072/api/meeting/newmeetingwithclient";
async function clientForm() {
  debugger;
  event.preventDefault();
  var form = document.getElementById("clientForm");
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




// const url2 = "https://localhost:7072/api/meeting/employeemeeting";
// async function teamForm() {
//   debugger;
//   event.preventDefault();
//   var form = document.getElementById("teamForm");
//   var formData = new FormData(form);

//   var response = await fetch(url2, {
//     method: "POST",
//     body: formData,
//   });

//   if (response.ok) {
//     Swal.fire({
//       title: "Success!",
//       text: "Registration completed successfully",
//       icon: "success",
//       confirmButtonText: "OK",
//       timer: 3000, // time in milliseconds
//       timerProgressBar: true, // show a progress bar for the time
//     });

//     // Redirecting to the page after 2 seconds
//     setTimeout(() => {
//       window.location.href = "servesadmin.html";
//     }, 2000);
//   } else {
//     Swal.fire({
//       title: "Error!",
//       text: "Registration failed",
//       icon: "error",
//       confirmButtonText: "OK",
//     });
//   }
// }



async function loadEmployees() {
    try {
      const response = await fetch('https://localhost:7072/api/meeting/getemployees');
      const employees = await response.json();
  
      const employeeSelect = document.getElementById('employeeSelect');
      employeeSelect.innerHTML = ''; // تنظيف الخيارات السابقة
  
      // تعبئة القائمة المنسدلة بأسماء الموظفين
      employees.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee.employeeId; // المعرف
        option.textContent = employee.fullName; // الاسم
        employeeSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }
  


  // استدعاء دالة جلب الموظفين عند تحميل الصفحة
  document.addEventListener('DOMContentLoaded', loadEmployees);
  const url2 = "https://localhost:7072/api/meeting/employeemeeting";
async function teamForm() {
  event.preventDefault(); // منع التحديث التلقائي للصفحة

  var form = document.getElementById("teamForm");
  var formData = new FormData(form);

  // حذف أي مدخلات سابقة للـ EmployeeId لتجنب التكرار
  formData.delete('EmployeeId');

  // الحصول على قائمة المعرفات المختارة للموظفين
  var selectedEmployees = Array.from(document.getElementById('employeeSelect').selectedOptions)
                               .map(option => option.value); // تحويلها إلى مصفوفة معرفات

  // إضافة معرفات الموظفين إلى formData مرة واحدة فقط
  selectedEmployees.forEach(employeeId => {
    formData.append('EmployeeId', employeeId);
  });

  // إرسال الطلب إلى الـ API
  var response = await fetch(url2, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    Swal.fire({
      title: "Success!",
      text: "Meeting scheduled successfully",
      icon: "success",
      confirmButtonText: "OK",
      timer: 3000, 
      timerProgressBar: true, 
    });

    setTimeout(() => {
    
    }, 2000);
  } else {
    Swal.fire({
      title: "Error!",
      text: "Failed to schedule meeting",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}






    async function getAllMeetings() {
        debugger
        const url = "https://localhost:7072/api/meeting/getallmeeting"; // ضع رابط الـ API هنا
        try {
            const response = await fetch(url);
            const data = await response.json();

            // تعريف العنصر الذي سيحتوي على الاجتماعات
            const meetingsTableBody = document.getElementById("meetingsTableBody");

            // تنظيف المحتوى السابق
           

            // عرض اجتماعات الموظفين
            data.employeeMeetings.forEach(meeting => {
                meetingsTableBody.innerHTML += `
                    <tr>
                        <td>Team Meeting</td>
                        <td>${new Date(meeting.meetingDateTime).toLocaleString()}</td>
                        <td>${meeting.employees} </td>
                        <td>${meeting.meetingAgenda}</td>
                        <td><a href="${meeting.meetinglink}" target="_blank">Zoom</a></td>
                        <td>
                           <button class="btn btn-danger btn-sm" onclick="deleteMeetingsByDateTime('${new Date(meeting.meetingDateTime).toISOString()}')">Cancel</button>
                        </td>
                    </tr>
                `;
            });

            // عرض اجتماعات العملاء
            data.customerMeetings.forEach(meeting => {
                meetingsTableBody.innerHTML += `
                    <tr>
                        <td>Client Meeting</td>
                        <td>${new Date(meeting.meetingDateTime).toLocaleString()}</td>
                        <td>${meeting.customerId}</td> <!-- يمكن تعديل هذه القيمة لجلب اسم العميل -->
                        <td>${meeting.meetingAgenda}</td>
                         <td><a href="${meeting.meetinglink}" target="_blank">Zoom</a></td>
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="deleteMeetingsByDateTime('${new Date(meeting.meetingDateTime).toISOString()}')">Cancel</button>
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error("Error fetching meetings:", error);
        }
    }

    // استدعاء الدالة لجلب البيانات عند تحميل الصفحة
    document.addEventListener("DOMContentLoaded", getAllMeetings);



    async function deleteMeetingsByDateTime(meetingDateTime) {
        debugger;
    
        // استخدام SweetAlert للتأكيد على الحذف
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete all meetings at this time?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // إذا تم التأكيد من المستخدم
                const formattedDateTime = new Date(meetingDateTime).toISOString();
    
                // رابط الـ API للحذف
                const url = `https://localhost:7072/api/meeting/deletemeetbydatetime/${formattedDateTime}`;
    
                try {
                    const response = await fetch(url, {
                        method: 'DELETE',
                    });
    
                    // تحقق من نجاح الحذف
                    if (response.ok) {
                        Swal.fire(
                            'Deleted!',
                            'Meetings have been deleted.',
                            'success'
                        );
    window.location.reload();
                        // حذف الصفوف التي تحتوي على هذا التاريخ من الجدول
                        document.querySelectorAll(`tr[data-datetime="${meetingDateTime}"]`).forEach(row => row.remove());
                    } else {
                        Swal.fire('Error!', 'Error deleting meetings', 'error');
                        console.error('Error:', await response.text());
                    }
                } catch (error) {
                    console.error('Error fetching API:', error);
                    Swal.fire('Error!', 'Error deleting meetings', 'error');
                }
            }
        });
    }
    