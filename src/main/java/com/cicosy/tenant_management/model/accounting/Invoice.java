package com.cicosy.tenant_management.model.accounting;

import com.cicosy.tenant_management.model.propertyManagement.Compartment;
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
    @Transient
    private Compartment compartmentObject;
//    private Object services;
    private LocalDate dateIssued = LocalDate.now();
    private String forTheMonthOf;
    private double amount;
    private String dueDate;
    private String status;
    private Long user;
    private String servicesList;
    private long rentalAmount;

    public Invoice(Long compartment, Compartment compartmentObject, LocalDate dateIssued, String forTheMonthOf, double amount, String dueDate, String status, Long user, String servicesList, long rentalAmount) {
        this.compartment = compartment;
        this.compartmentObject = compartmentObject;
        this.dateIssued = dateIssued;
        this.forTheMonthOf = forTheMonthOf;
        this.amount = amount;
        this.dueDate = dueDate;
        this.status = status;
        this.user = user;
        this.servicesList = servicesList;
        this.rentalAmount = rentalAmount;
    }
}
