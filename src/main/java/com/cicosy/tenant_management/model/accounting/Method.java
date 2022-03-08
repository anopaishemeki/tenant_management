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
public class Method {
    @Id
    @SequenceGenerator(
            name = "method_sequence",
            sequenceName = "method_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "method_sequence"
    )
    private Long id;
    private String method;
}
