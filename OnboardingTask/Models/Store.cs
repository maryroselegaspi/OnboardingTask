using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
//using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace OnboardingTask.Models
{
    public partial class Store
    {
        public Store()
        {
            Sales = new HashSet<Sales>();
        }

        [ScaffoldColumn(false)]
        public int Id { get; set; }

        [DisplayName("Store Name")]
        [Required(ErrorMessage = "Store Name is required")]
        [StringLength(100)]
        public string Name { get; set; }

        [DisplayName("Store Address")]
        [Required(ErrorMessage = "Store Address is required")]
        [StringLength(200)]
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
