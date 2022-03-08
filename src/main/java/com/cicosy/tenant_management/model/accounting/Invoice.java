package com.cicosy.tenant_management.model.accounting;

import lombok.*;

import javax.persistence.*;
import java.util.List;

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
    private Long tenant;
//    private Object services;
    private String dateIssued;
    private String forTheMonthOf;
    private double amount;
    private String dueDate;
    private Long user;

    public Invoice(Long tenant, String dateIssued, String forTheMonthOf, double amount, String dueDate, Long user) {
        this.tenant = tenant;
        this.dateIssued = dateIssued;
        this.forTheMonthOf = forTheMonthOf;
        this.amount = amount;
        this.dueDate = dueDate;
        this.user = user;
    }
}
