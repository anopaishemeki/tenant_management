package com.cicosy.tenant_management.model.accounting;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.AbstractList;
import java.util.ArrayList;
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
    private Long compartment;
//    private Object services;
    private LocalDate dateIssued = LocalDate.now();
    private String forTheMonthOf;
    private double amount;
    private String dueDate;
    private String status;
    private Long user;
    @ElementCollection
    List<Services> servicesList = new ArrayList<Services>();

    public Invoice(Long compartment, String forTheMonthOf, double amount, String dueDate, String status, Long user) {
        this.compartment = compartment;
        this.forTheMonthOf = forTheMonthOf;
        this.amount = amount;
        this.dueDate = dueDate;
        this.status = status;
        this.user = user;
    }
}
