package com.cicosy.tenant_management.controler.accounting;

import com.cicosy.tenant_management.model.accounting.TransactionType;
import com.cicosy.tenant_management.service.accounting.TransactionTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transaction-type")
public class TransactionTypeController {
    private TransactionTypeService transactionTypeService;

    @Autowired
    public TransactionTypeController(TransactionTypeService transactionTypeService) {
        this.transactionTypeService = transactionTypeService;
    }

    @PostMapping("/save-type")
    public TransactionType saveTrasactionType(@RequestBody TransactionType transactionType){
        return transactionTypeService.save(transactionType);
    }

    @GetMapping("get-all-types")
    public List<TransactionType> getTransationtypes(){
        return transactionTypeService.getAllTransationTypes();
    }

    @GetMapping("/get-service/{id}")
    public TransactionType getTransactionType(@PathVariable Long id){
        return transactionTypeService.getTransactionType(id);
    }
}
