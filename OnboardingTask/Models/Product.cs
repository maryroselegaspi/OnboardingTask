using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
//using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace OnboardingTask.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sales>();
        }

        [ScaffoldColumn(false)]
        public int Id { get; set; }

        [DisplayName("Product Name")]
        [Required(ErrorMessage = "Product Name is required")]
        [StringLength(100)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Product Price is required")]
        public decimal Price { get; set; }

        [JsonIgnore]
        public virtual ICollection<Sales> Sales { get; set; }
    }
    //public class ProductsPaginated
    //{
    //    public List<Product> Products;
    //    public int TotalPages;
    //}
}
