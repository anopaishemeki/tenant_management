package com.cicosy.tenant_management.model.ProductToken;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name="product_token")
public class ProductToken {

    @Id
    @SequenceGenerator(name = "token_sequency", sequenceName = "token_sequency",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "token_sequency")
    private Long id;
    private int num_users;
    private int period;
    private String token;

    public String getTk(String token){
        return token;
    }

    public ProductToken(String token) {
        this.token = token;
    }

}
