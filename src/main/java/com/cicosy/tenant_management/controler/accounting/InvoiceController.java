package com.cicosy.tenant_management.controler.accounting;

import com.cicosy.tenant_management.model.accounting.Invoice;
import com.cicosy.tenant_management.service.accounting.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {
    public final InvoiceService invoiceService;

    @Autowired
    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PostMapping("/save-invoice")
    public Invoice saveInvoice(@RequestBody Invoice invoice){
        return invoiceService.save(invoice);
    }

    @GetMapping("/get-all-invoices")
    public List<Invoice> getAllInvoices(){
        return invoiceService.getAll();
    }

    @GetMapping("/get/invoices-by-tenant/{id}")
    public List<Invoice> getByTenant(@PathVariable Long id){
        return invoiceService.getByTenant(id);
    }

    @GetMapping("/get-specifc-invoice/{id}")
    public Invoice getSpecificInvoice(Long id){
        return invoiceService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteInvoice(@PathVariable Long id){
        invoiceService.delete(id);
    }
}
