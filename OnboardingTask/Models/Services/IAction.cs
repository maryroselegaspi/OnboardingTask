using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnboardingTask.Models.Services
{
    public interface IAction
    {
        //List<Customer> GetDetails();
        //Customer GetDetailsById(int Id);
        void Add(Customer cus);
        void Update(int Id, Customer cus);   
        void Delete(int Id);
        //List<Customer> GetCustomers();
        //Customer GetCustomerById(int Id);
        //void UpdateCustomer(int Id, Customer cus);
        //void DeleteCustomer(int Id);
        //void AddCustomer(Customer cus);
    }
    public interface IProduct
    {
        List<Product> GetProducts();
        Product GetProductById(int Id);
        void UpdateProduct(int Id, Product cus);
        void DeleteProduct(int Id);
        void AddProduct(Product cus);

    }
    public interface IStore
    {

    }
    public interface ISales
    {

    }
}
