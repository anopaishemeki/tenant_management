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
public class Invoice {
    @Id
    @SequenceGenerator(
            name = "invoice_sequence",
            sequenceName = "invoice_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "invoice_sequence"
    )
    private Long id;
    private Long compartment;
//    private Object services;
    private String dateIssued;
    private String forTheMonthOf;
    private double amount;
    private String dueDate;
    private String status;
    private Long user;

    public Invoice(Long compartment, String dateIssued, String forTheMonthOf, double amount, String dueDate, String status, Long user) {
        this.compartment = compartment;
        this.dateIssued = dateIssued;
        this.forTheMonthOf = forTheMonthOf;
        this.amount = amount;
        this.dueDate = dueDate;
        this.status = status;
        this.user = user;
    }
}
