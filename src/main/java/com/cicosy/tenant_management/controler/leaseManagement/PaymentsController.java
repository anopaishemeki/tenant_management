package com.cicosy.tenant_management.controler.leaseManagement;


import com.cicosy.tenant_management.model.leaseManagement.Payments;
import com.cicosy.tenant_management.repository.leaseManagement.LeaseRepository;
import com.cicosy.tenant_management.repository.leaseManagement.PaymentsRepository;
import com.cicosy.tenant_management.service.leaseManagement.PaymentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/v1/lease")
public class PaymentsController {

    private final PaymentsService paymentsService;
    @Autowired
    public PaymentsController(PaymentsService paymentsService ) {
        this.paymentsService = paymentsService;
    }
    @Autowired
    private LeaseRepository leaseRepository;

    @Autowired
    private PaymentsRepository paymentsRepository;

    @PostMapping("/makePayment")
    public void makePayment(@RequestBody Payments request){
        paymentsService.addNewPayment(request);
    }

    @GetMapping("/viewPayments")
    public List<Payments> getPayments(){
        return paymentsRepository.findAll();
    }
}
