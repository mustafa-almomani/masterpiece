var url = "https://localhost:7072/api/User/addemployee";
async function addemployee() {
    debugger;
    event.preventDefault();
    var form = document.getElementById("employeeadd");
    var formData = new FormData(form);
    
    var response = await fetch(url, {
        method: "POST",
        body: formData
    });
    
    if (response.ok) {
        Swal.fire({
            title: 'Success!',
            text: 'Registration completed successfully',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 3000, // time in milliseconds
            timerProgressBar: true, // show a progress bar for the time
        });

        // Redirecting to the page after 2 seconds
        setTimeout(() => {
            window.location.href = "employee.html";
        }, 2000);
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Registration failed',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}



var urlemployee="https://localhost:7072/api/User/getallemployee";
async function getalldata() {
    debugger
    var response = await fetch(urlemployee);
    var data = await response.json();
    var contaner = document.getElementById("contaner");
    data.forEach(element => {
        contaner.innerHTML+=
        `
        <tr>
                            <td>${element.firstName}</td>
                            <td>${element.lastName}</td>
                            <td>${element.email}</td>
                            <td>${element.phoneNumber}</td>
                            <td>${element.jobTitle}</td>
                            <td>${element.joinDate}</td>
                            <td>${element.status}</td>
                       
                            <td>${element.role}</td>
                            <td>
                                <button class="btn btn-warning btn-sm" onclick="editemployee(${element.employeeId})">Edit</button>
                                <button  class="btn btn-danger btn-sm" onclick="deleteemployee(${element.employeeId})">Delete</button>
                            </td>
            </tr>            
        `
    
        ;
    });
}
getalldata();





async function deleteemployee(id) {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This employee will be deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
        var delet=`https://localhost:7072/api/User/deleteemployee${id}`;
        var response = await fetch(delet, {
            method: "DELETE",
        });

        console.log('Response Status:', response.status);
        console.log('Response OK:', response.ok);

        if (response.ok) {
            await Swal.fire(
                'Deleted!',
                'The employee has been deleted successfully.',
                'success'
            );
            location.reload();
        } else {
            const errorMessage = await response.text();
            await Swal.fire(
                'Error!',
                `There was an error deleting the employee: ${errorMessage}`,
                'error'
            );
        }
    }
}



// async function editproduct(id)
// {
//     var url=`https://localhost:7072/api/User/${id}`;
//     event.preventDefault();
   
//     var formData = new FormData(form);
//     var response= await fetch(url ,{
//         method: "PUT",
//         body : formData 

        
//     })

//     alert("product updated Successfully");
  
// }




async function editemployee(id) {
    debugger
   
    var urll1=`https://localhost:7072/api/User/getemployeebyid/${id}`;
    var response = await fetch(urll1);
    var employee = await response.json();

    
    document.getElementById("editEmployeeId").value = employee.employeeId;
    document.getElementById("Email").value = employee.email;
    document.getElementById("phoneNumber").value = employee.phoneNumber;
    document.getElementById("joptitle").value = employee.jobTitle;
    document.getElementById("PerformanceReport").value = employee.performanceReport;
    document.getElementById("Status").value = employee.status;
    document.getElementById("Role").value = employee.role;

    
    $('#editEmployeeModal').modal('show');
}



async function updateEmployee() {
    var id = document.getElementById("editEmployeeId").value;
    var url2 = `https://localhost:7072/api/User/${id}`;
    var formData = new FormData(document.getElementById("employeeEditForm"));

    // طباعة بيانات النموذج
    console.log('Form Data:', Array.from(formData.entries()));

    var response = await fetch(url2, {
        method: "PUT",
        body: formData
    });

    console.log('Response Status:', response.status);
    console.log('Response OK:', response.ok);

    if (response.ok) {
        await Swal.fire({
            title: 'Success!',
            text: 'Employee updated successfully.',
            icon: 'success'
        });

        $('#editEmployeeModal').modal('hide'); // إغلاق المودال بعد التحديث
        // الانتظار قبل إعادة تحميل الصفحة
        setTimeout(() => {
            location.reload();
        }, 1000); // الانتظار لمدة 1 ثانية قبل إعادة تحميل الصفحة
    } else {
        const errorMessage = await response.text();
        await Swal.fire({
            title: 'Error!',
            text: `Failed to update employee: ${errorMessage}`,
            icon: 'error'
        });
    }
}


var servicesemployee="https://localhost:7072/api/services/getallservices"
async function getservicename(){
debugger
    var response = await fetch(servicesemployee);
    var data = await response.json();
    var contaner = document.getElementById("JobTitle");
    data.forEach(element => {
        contaner.innerHTML+=
        `    
        <option value="${element.serviceName}">${element.serviceName}</option>  
        `
    
        ;
    });

}

getservicename()