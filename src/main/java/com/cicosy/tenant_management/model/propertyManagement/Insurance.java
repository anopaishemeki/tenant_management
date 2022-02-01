package com.cicosy.tenant_management.model.propertyManagement;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Insurance {
    @Id
    @SequenceGenerator(
            name = "insurance_sequence",
            sequenceName = "insurance_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "insurance_sequence"
    )
    private String id;
    private String providerName;
    private String packageName;
    private double subscriptionFee;
    private Long contactDetails;
}
