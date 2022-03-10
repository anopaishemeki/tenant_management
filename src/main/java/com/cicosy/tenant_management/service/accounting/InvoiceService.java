package com.cicosy.tenant_management.service.accounting;

import com.cicosy.tenant_management.model.accounting.Invoice;
import com.cicosy.tenant_management.repository.accounting.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceService {
    InvoiceRepository invoiceRepository;

    @Autowired
    public InvoiceService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public Invoice save(Invoice invoice){
        invoiceRepository.save(invoice);
        return invoiceRepository.findById(invoice.getId()).orElseThrow(() -> new  IllegalStateException ("Saving Failed"));
    }

    public List<Invoice> getAll(){
        return invoiceRepository.findAll();
    }

    public List<Invoice> getByTenant(Long id){
        return invoiceRepository.findByTenant(id);
    }

    public Invoice getById(Long id){
        return invoiceRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Invoice with "+id+" does not exist"));
    }
}
