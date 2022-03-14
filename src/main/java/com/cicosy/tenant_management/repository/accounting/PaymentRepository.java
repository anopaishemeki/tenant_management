package com.cicosy.tenant_management.repository.accounting;

import com.cicosy.tenant_management.model.accounting.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("select p from Payment p where p.compartment = ?1")
    List<Payment> getByTenant(Long id);
}
