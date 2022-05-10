package com.cicosy.tenant_management.model.company_details;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="company_details")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Company {

    @Id
    @SequenceGenerator(
            name = "company_sequence",
            sequenceName = "company_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "company_sequence"
    )
    private Long id;
    private  String company_name;
    private String company_location;
    private  String company_logo;
    private String company_banner;

}
