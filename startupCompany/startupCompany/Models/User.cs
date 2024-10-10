using System;
using System.Collections.Generic;

namespace startupCompany.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public byte[]? Passwordsult { get; set; }

    public byte[]? PasswordHash { get; set; }

    public virtual ICollection<CustomerRequest> CustomerRequests { get; set; } = new List<CustomerRequest>();
}
