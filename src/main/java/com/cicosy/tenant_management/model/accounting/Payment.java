package com.cicosy.tenant_management.model.accounting;

import com.cicosy.tenant_management.model.propertyManagement.Compartment;
import com.cicosy.tenant_management.model.propertyManagement.Property;
import com.cicosy.tenant_management.model.tenantManagement.Tenant;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Payment {
    @Id
    @SequenceGenerator(
            name = "payment_sequence",
            sequenceName = "payment_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "payment_sequence"
    )
    private Long id;
    private String paymentDate;
    private Long compartment;
    private Long property;
    private Long type;
    @Column(unique=true)
    private String reference;
    private Long capturedBy;
    private double amount;
    private Long method;
    private Long invoice;
    @Transient
    private Property propertyObject;
    @Transient
    private Compartment compartmentObject;
    @Transient
    private Tenant tenantObject;

    public Payment(String paymentDate, Long compartment, Long property, Long type, String reference, Long capturedBy, double amount, Long method, Long invoice, Property propertyObject, Compartment compartmentObject, Tenant tenantObject) {
        this.paymentDate = paymentDate;
        this.compartment = compartment;
        this.property = property;
        this.type = type;
        this.reference = reference;
        this.capturedBy = capturedBy;
        this.amount = amount;
        this.method = method;
        this.invoice = invoice;
        this.propertyObject = propertyObject;
        this.compartmentObject = compartmentObject;
        this.tenantObject = tenantObject;
    }
}
