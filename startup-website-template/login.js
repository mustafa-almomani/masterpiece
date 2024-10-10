
const url = "https://localhost:7072/api/User"
async function register() {
    
    event.preventDefault();
    var form = document.getElementById('registerform');
    var formData = new FormData(form);
    var response = await fetch(url, {
        method: "POST",
        body: formData
    });

    // localStorage.setItem("EmployeeId", Id);

    if (response.ok) {
        Swal.fire({
            title: 'Success!',
            text: 'Registration successful',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 3000, // 3 seconds
            timerProgressBar: true // Show a progress bar
        });

        // Redirect to the page after 3 seconds
        setTimeout(() => {
            window.location.reload();
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




const url2="https://localhost:7072/api/User/LOGIN";



async function login() {
    debugger
    event.preventDefault();
    var data = {
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
    };

    var response = await fetch(url2, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    var result = await response.json();
    console.log(result);
    if (response.ok) {
        Swal.fire({
            title: 'نجاح!',
            text: 'تم التسجيل بنجاح',
            icon: 'success',
            timer: 3000, // الوقت بالمللي ثانية
            timerProgressBar: true, // لعرض شريط تقدم للوقت
        });
        localStorage.setItem("UserID",result.userId);

        // الانتقال إلى الصفحة بعد 3 ثوانٍ
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
    } else {
        Swal.fire({
            title: 'خطأ!',
            text: 'فشل التسجيل',
            icon: 'error',
            confirmButtonText: 'موافق'
        });
    }

    
}







