var url="https://localhost:7072/api/User/getalladmin"

async function getalladmin() {
    debugger

    var response = await fetch(url);
    var data = await response.json();
    var contaner = document.getElementById("tr");
    data.forEach(element => {
contaner.innerHTML+=
`
 <tr>
<td>
  <div class="d-flex align-items-center">
   
<div class="ms-3">
      <p class="fw-bold mb-1">${element.firstName +" "+ element.lastName}</p>
     
    </div>
  </div>
</td>
<td>

  <p class="text-muted mb-0">${element.email}</p>
</td>

<td>${element.phoneNumber}</td>
<td>
    <span class="badge badge-warning rounded-pill d-inline">${element.status}</span>
  </td>
<td>${element.role}</td>

<td>
  <button
          type="button"
          class="btn btn-link btn-rounded btn-sm fw-bold"
          data-mdb-ripple-color="dark"
          >
    Edit
  </button>
</td>
</tr>

`
        
    
})
}


getalladmin();