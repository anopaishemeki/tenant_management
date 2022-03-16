package com.cicosy.tenant_management.repository.accounting;

import com.cicosy.tenant_management.model.accounting.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByCompartment(Long id);
}
