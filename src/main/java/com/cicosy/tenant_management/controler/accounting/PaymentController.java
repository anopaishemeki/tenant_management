package com.cicosy.tenant_management.controler.accounting;

import com.cicosy.tenant_management.controler.propertyManagement.CompartmentController;
import com.cicosy.tenant_management.controler.tenantManagement.TenantController;
import com.cicosy.tenant_management.model.accounting.Payment;
import com.cicosy.tenant_management.service.accounting.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    private final PaymentService paymentService;
    private final CompartmentController compartmentController;
    private final com.cicosy.tenant_management.controler.propertyManagement.propertyController propertyController;
    private final TenantController tenantController;

    @Autowired
    public PaymentController(PaymentService paymentService, CompartmentController compartmentController, com.cicosy.tenant_management.controler.propertyManagement.propertyController propertyController, TenantController tenantController) {
        this.paymentService = paymentService;
        this.compartmentController = compartmentController;
        this.propertyController = propertyController;
        this.tenantController = tenantController;
    }

    @PostMapping("/save-payment")
    public Payment savePayment(@RequestBody Payment payment){
        System.out.println(payment.toString());
        return paymentService.save(payment);
    }

    @GetMapping("/get-payments")
    public List<Payment> getPayments(){
        List<Payment> payments = paymentService.getAll();

        for (int i = 0; i < payments.size(); i++){
            payments.get(i).setCompartmentObject(compartmentController.getCompartment(payments.get(i).getCompartment()));
            if (payments.get(i).getProperty() == null){
                payments.get(i).setPropertyObject(propertyController.getProperty(compartmentController.getCompartmentSpecificCompartment(payments.get(i).getCompartment()).getProperty()));
            }else{
                payments.get(i).setPropertyObject(propertyController.getProperty(payments.get(i).getProperty()));
            }
            payments.get(i).setTenantObject(tenantController.getTenant(compartmentController.getCompartmentSpecificCompartment(payments.get(i).getCompartment()).getTenant()));
        }


        return payments;
    }

    @GetMapping("/get-payments-for-specific-tenant/{id}")
    public List<Payment> getByTenant(@PathVariable Long id){
        return paymentService.getByTenant(id);
    }
}
