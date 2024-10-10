var orderurl = "https://localhost:7072/api/taskes/getorderbyif1026";
async function getallorder() {
  debugger;
  var response = await fetch(orderurl);
  var data = await response.json();
  var contaner = document.getElementById("contaner");

  data.forEach((element) => {
    contaner.innerHTML += `
    <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-primary shadow-sm h-100">
            <div class="card-body">
                <div class="order-info" style="color: black;">
                    <p class="text-truncate"><i class="fas fa-user"></i> <strong>Order Details:</strong> ${element.taskDetails}</p>
                    <p class="text-truncate"><i class="fas fa-phone"></i> <strong>Assigned Date:</strong> ${element.assignedDate}</p>
                    <p class="text-truncate"><i class="fas fa-building"></i> <strong>Company:</strong> ${element.dueDate}</p>
                    <p class="text-truncate"><i class="fas fa-info-circle"></i> <strong>Status:</strong> ${element.taskStatus}</p>
                </div>

                <!-- دروب داون للحالة -->
                <div class="dropdown mt-3">
                   <select onchange="editstatus(${element.taskId})" id="status-${element.taskId}" class="form-select form-select-sm text-uppercase fw-bold bg-light border-0 shadow-sm">
                          <option value="" class="text-Info">${element.taskStatus}</option>
                          <option value="Assigned" class="text-Info">Assigned</option>
                          <option value="In Progress" class="text-primary">In Progress</option>
                          <option value="Completed" class="text-success">Completed</option>
                        </select>

                </div>

            </div>
            <div class="card-footer text-center">
                <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#orderModal-${element.taskId}">
                    Show Details
                </button>
            </div>
        </div>
    </div>

    <!-- Modal لعرض التفاصيل -->
    <div class="modal fade" id="orderModal-${element.taskId}" tabindex="-1" aria-labelledby="orderModalLabel-${element.taskId}" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="orderModalLabel-${element.taskId}">Order Details - ${element.taskId}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-dark">
                    <p><strong>task Details:</strong> ${element.taskDetails}</p>
                    <p><strong> assigned Date :</strong> ${element.assignedDate}</p>
                    <p><strong>due Date:</strong> ${element.dueDate}</p>
                    <p><strong>Status:</strong> ${element.taskStatus}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `;
  });
}

getallorder();
async function editstatus(id) {
    debugger
  event.preventDefault();
  debugger;
  let urlm = `https://localhost:7072/api/taskes/edittask/${id}`;
  let response = await fetch(urlm, {
    method: "PUT",
    body: JSON.stringify({
        taskStatus: document.getElementById(`status-${id}`).value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status == 200) {
    alert("Status updated successfully");
    window.location.reload(); // Refresh the page to reflect the updated status.
  } else {
    alert("Error updating status");
  }
}
