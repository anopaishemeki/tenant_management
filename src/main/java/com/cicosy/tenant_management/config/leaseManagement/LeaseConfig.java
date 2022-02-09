package com.cicosy.tenant_management.config.leaseManagement;

import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.model.leaseManagement.Payments;
import com.cicosy.tenant_management.repository.leaseManagement.LeaseRepository;
import com.cicosy.tenant_management.repository.leaseManagement.PaymentsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

import static java.time.Month.DECEMBER;

@Configuration
public class LeaseConfig {
   @Bean
    CommandLineRunner commandLineRunner(
           LeaseRepository repository){
        return args->{
        //   Lease John =  new Lease(
//                    "john",
//                    LocalDate.of(2001, DECEMBER,12),
//                    LocalDate.of(2024, DECEMBER,10),
//                    "JoinaCity",
//                    "Harare",
//                    3,
//                    300,
//                    "No Lending"
//                   );

//            Payments paym2 =  new Payments(
//                    LocalDate.of(2001, DECEMBER,12),
//                    "JoinaCity",
//                    "Mbare town",
//                    40,
//                    "Swipe"
//            );
//            Payments paym1 =  new Payments(
//                    LocalDate.of(2001, DECEMBER,14),
//                    "JoinaCity",
//                    "Mbare town",
//                    30,
//                    "bank"
//            );

          // repository.save(John);

        };
    }
}
