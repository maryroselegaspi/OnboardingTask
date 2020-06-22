using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace OnboardingTask.Models
{
    public class Customer
    {
        public Customer()
        {
            Sales = new HashSet<Sales>();
        }

        [ScaffoldColumn(false)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Customer Name is required")]
        [StringLength(50)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Customer Address is required")]
        [StringLength(20)]
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
