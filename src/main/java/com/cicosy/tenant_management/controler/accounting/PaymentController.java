package com.cicosy.tenant_management.controler.accounting;

import com.cicosy.tenant_management.model.accounting.Payment;
import com.cicosy.tenant_management.service.accounting.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/save-payment/{id}")
    public Payment savePayment(@RequestBody Payment payment){
        return paymentService.save(payment);
    }

    @GetMapping("/get-payments")
    public List<Payment> getPayments(){
        return paymentService.getAll();
    }

    @GetMapping("/get-payments-for-specific-tenant/{id}")
    public List<Payment> getByTenant(@PathVariable Long id){
        return paymentService.getByTenant(id);
    }
}
