using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace OnboardingTask.Models
{
    public partial class Sales
    {
        [ScaffoldColumn(false)]
        public int Id { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{dd/mm/yyyy}")]
        [DisplayName("Date Sold")]
        [Required(ErrorMessage = "Date Sold is required")]
        public DateTime DateSold { get; set; }

        [DisplayName("Product Name")]
        [Required(ErrorMessage = "Product Name id required")]
        public int ProductId { get; set; }

        [DisplayName("Customer Name")]
        [Required(ErrorMessage = "Customer Name id required")]
        public int CustomerId { get; set; }

        [DisplayName("Store Name")]
        [Required(ErrorMessage = "Store Name id required")]
        public int StoreId { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
    }
}
