package com.cicosy.tenant_management.repository.accounting;

import com.cicosy.tenant_management.model.accounting.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionTypeRepository extends JpaRepository<TransactionType, Long> {
}
