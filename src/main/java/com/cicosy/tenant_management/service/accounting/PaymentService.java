package com.cicosy.tenant_management.service.accounting;

import com.cicosy.tenant_management.model.accounting.Payment;
import com.cicosy.tenant_management.repository.accounting.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Payment save(Payment payment){
        paymentRepository.save(payment);
        return paymentRepository.findById(payment.getId()).orElseThrow(() -> new  IllegalStateException ("Saving Failed"));
    }

    public List<Payment> getAll(){
        return paymentRepository.findAll();
    }

    public List<Payment> getByTenant(Long id) {
        return paymentRepository.getByTenant(id);
    }
}
