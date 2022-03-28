package com.cicosy.tenant_management.controler.accounting;

import com.cicosy.tenant_management.controler.propertyManagement.CompartmentController;
import com.cicosy.tenant_management.model.accounting.Invoice;
import com.cicosy.tenant_management.service.accounting.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {
    public final InvoiceService invoiceService;
    private final CompartmentController compartmentController;

    @Autowired
    public InvoiceController(InvoiceService invoiceService, CompartmentController compartmentController) {
        this.invoiceService = invoiceService;
        this.compartmentController = compartmentController;
    }

    @PostMapping("/save-invoice")
    public Invoice saveInvoice(@RequestBody Invoice invoice){
        return invoiceService.save(invoice);
    }

    @GetMapping("/get-all-invoices")
    public List<Invoice> getAllInvoices(){
        List<Invoice> invoices = invoiceService.getAll();

        for(int i = 0; i < invoices.size(); i++){
            invoices.get(i).setCompartmentObject(compartmentController.getCompartmentSpecificCompartment(invoices.get(i).getCompartment()));
        }

        System.out.println(invoices);
        return invoices;
    }

    @GetMapping("/get/invoices-by-tenant/{id}")
    public List<Invoice> getByTenant(@PathVariable Long id){
        return invoiceService.getByTenant(id);
    }

    @GetMapping("/get-specifc-invoice/{id}")
    public Invoice getSpecificInvoice(Long id){
        return invoiceService.getById(id);
    }

    @GetMapping("/get-invoice-for-specic-compartment/{id}")
    public List<Invoice> getInvoiceForCompartment(@PathVariable Long id){
        return invoiceService.getInvoiceForSpecificCompartment(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteInvoice(@PathVariable Long id){
        invoiceService.delete(id);
    }
}
