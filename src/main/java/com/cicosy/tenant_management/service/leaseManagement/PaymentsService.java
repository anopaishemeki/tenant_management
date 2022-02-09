package com.cicosy.tenant_management.service.leaseManagement;

import com.cicosy.tenant_management.model.leaseManagement.Payments;
import com.cicosy.tenant_management.repository.leaseManagement.PaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PaymentsService {
    private final PaymentsRepository paymentsRepository;

    @Autowired
    public PaymentsService(PaymentsRepository paymentsRepository) {
        this.paymentsRepository = paymentsRepository;
    }

    public List<Payments> getPayments(){
            return paymentsRepository.findAll();
    }

    public void addNewPayment(Payments payments) {

        paymentsRepository.save(payments);


    }

    public void deletePayment(Long payment_id) {
             boolean exists= paymentsRepository.existsById(payment_id);
             if(!exists){
                 throw new IllegalStateException(
                         "Record with id " + payment_id +" Does not exists"
                 );
             }
             paymentsRepository.deleteById(payment_id);
    }
    @Transactional
    public void updatePayment(Long payment_id,
                            Payments updatePayments) {
        Payments payments=paymentsRepository.findById(payment_id)
                .orElseThrow(() -> new IllegalStateException(
                    "Record With ID "+payment_id +" Does Not Exist"
                ));

        if (updatePayments.getBuildingLocation()!=null &&
                updatePayments.getBuildingLocation().length()> 0 &&
        !Objects.equals(payments.getBuildingLocation(), updatePayments.getBuildingLocation())){
            payments.setBuildingLocation( updatePayments.getBuildingLocation());
        }

//        if (updatePayments.getBuildingName()!=null &&
//                updatePayments.getBuildingName().length()> 0 &&
//                !Objects.equals(payments.getBuildingName(),updatePayments.getBuildingName())){
//            Optional<payment> paymentOptional=paymentsRepository
//                    .findLeaseByName(lease.getBuildingName());
//            if (leaseOptional.isPresent()){
//                throw  new IllegalStateException("That building is already allocated to Someone");
//            }
//            lease.setBuildingName(update.getBuildingName());
//        }
//       if (update.getStartDate() != null &&
//               update.getEndDate() != null &&
//               (update.getStartDate().isAfter(update.getEndDate())))
//       {
//            throw  new IllegalStateException("Start Date Cannot be greater than End Date");
//         }else{
//            if (update.getStartDate() != null &&
//                    !Objects.equals(lease.getStartDate(), update.getStartDate())) {
//                lease.setStartDate(update.getStartDate());
//            }
//            if (update.getEndDate() != null &&
//                    Period.between(update.getEndDate(), LocalDate.now()).getYears() != 0 &&
//                    !Objects.equals(lease.getEndDate(), update.getEndDate())) {
//                lease.setEndDate(update.getEndDate());
//            }
//        }
//
//        if (update.getRentalFee() > 0 &&
//                !Objects.equals(lease.getRentalFee(),update.getRentalFee())){
//            lease.setRentalFee(update.getRentalFee());
//        }
//        if (update.getFloorNumber() > 0 &&
//                !Objects.equals(lease.getFloorNumber(),update.getFloorNumber())){
//            lease.setFloorNumber(update.getFloorNumber());
//        }
//        if (update.getTerms()!=null &&
//                update.getTerms().length()> 0 &&
//                !Objects.equals(lease.getTerms(),update.getTerms())){
//            lease.setTerms(update.getTerms());
//        }
    }
}
