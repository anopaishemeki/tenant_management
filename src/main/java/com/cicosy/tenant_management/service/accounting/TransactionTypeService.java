package com.cicosy.tenant_management.service.accounting;

import com.cicosy.tenant_management.model.accounting.TransactionType;
import com.cicosy.tenant_management.repository.accounting.TransactionTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionTypeService {
    private final TransactionTypeRepository transactionTypeRepository;

    @Autowired
    public TransactionTypeService(TransactionTypeRepository transactionTypeRepository) {
        this.transactionTypeRepository = transactionTypeRepository;
    }

    public TransactionType save(TransactionType transactionType){
        transactionTypeRepository.save(transactionType);
        return transactionTypeRepository.findById(transactionType.getId()).orElseThrow(() -> new  IllegalStateException ("Saving Failed"));
    }

    public List<TransactionType> getAllTransationTypes(){
        return transactionTypeRepository.findAll();
    }

    public TransactionType getTransactionType(Long id){
        return transactionTypeRepository.getById(id);
    }
}
