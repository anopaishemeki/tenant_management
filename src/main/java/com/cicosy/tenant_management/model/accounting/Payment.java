package com.cicosy.tenant_management.model.accounting;

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
    private Long tenant;
    private Long type;
    private String reference;
    private Long capturedBy;
    private double amount;
    private Long method;
    private Long invoice;

    public Payment(String paymentDate, Long tenant, Long type, String reference, Long capturedBy, double amount, Long method, Long invoice) {
        this.paymentDate = paymentDate;
        this.tenant = tenant;
        this.type = type;
        this.reference = reference;
        this.capturedBy = capturedBy;
        this.amount = amount;
        this.method = method;
        this.invoice = invoice;
    }
}
