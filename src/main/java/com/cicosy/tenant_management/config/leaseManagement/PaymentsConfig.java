package com.cicosy.tenant_management.config.leaseManagement;

import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.model.leaseManagement.Payments;
import com.cicosy.tenant_management.repository.leaseManagement.PaymentsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

import static java.time.Month.DECEMBER;

@Configuration
public class PaymentsConfig {
   @Bean
    CommandLineRunner run(
            PaymentsRepository repository){
        return args->{
//           Payments paym1 =  new Payments(
//                    LocalDate.of(2001, DECEMBER,12),
//                    "JoinaCity",
//                    "Mbare",
//                    40,
//                   "Swipe"
//                   );
//           Lease john=new Lease(
//                   "john",
//                   LocalDate.of(2001, DECEMBER,12),
//                   LocalDate.of(2024, DECEMBER,10),
//                   "JoinaCity",
//                   "Harare",
//                   3,
//                   500,
//                   "No Lending"
//           );
//
//
//            Payments paym2 =  new Payments(
//                    LocalDate.of(2001, DECEMBER,12),
//                    "JoinaCity",
//                    "Mbare town",
//                    30,
//                    "Swipe"
//            );
//
//            paym1.setLease(john);
//            paym2.setLease(john);
//            repository.save(paym1);
//            repository.save(paym2);

        };
    }
}
