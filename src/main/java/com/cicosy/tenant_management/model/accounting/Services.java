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
public class Services {
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
    private String serviceName;
    private double amount;

    public Services(String serviceName, double amount) {
        this.serviceName = serviceName;
        this.amount = amount;
    }
}
