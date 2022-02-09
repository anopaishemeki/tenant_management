package com.cicosy.tenant_management.service.leaseManagement;

import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.repository.leaseManagement.LeaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class LeaseService {
    private final LeaseRepository leaseRepository;


    @Autowired
    public LeaseService(LeaseRepository leaseRepository) {
        this.leaseRepository = leaseRepository;


    }

    public List<Lease> getLeases() {

        return leaseRepository.findAll();
    }


    public void addNewLease(Lease lease) {
        Optional<Lease> name = leaseRepository.findLeaseByName(lease.getName());


        if (name.isPresent()) {
            throw new IllegalStateException("Record with provided name already Exists");
        }


        if ((lease.getBuildingLocation().isEmpty())) {
            throw new IllegalStateException("Building Location Is Required");
        }

        if ((lease.getName().isEmpty())) {
            throw new IllegalStateException("Tenant Name Is Required");
        }
        if ((lease.getStartDate().toString().isEmpty())) {
            throw new IllegalStateException("Start Date Is Required");
        }

        if (!(lease.getStartDate().toString().isEmpty()) &&
                !(lease.getEndDate().toString().isEmpty())) ;
        {
            if (lease.getStartDate().isAfter(lease.getEndDate())) {
                throw new IllegalStateException("Start Date Can not be Greater than End Date");
            }
        }

        String s = String.valueOf(lease.getRentalFee());
        if ((s.isEmpty())) {
            throw new IllegalStateException("Rent Amount Is Required");
        }
        if ((lease.getEndDate().toString().isEmpty())) {
            throw new IllegalStateException("End Date Is Required");
        }

        if ((lease.getEndDate().isAfter(LocalDate.now()))) {
            lease.setStatus("Active");
        } else {
            lease.setStatus("Expired");
        }

        leaseRepository.save(lease);


    }

    public void deleteLease(Long leaseId) {
        boolean exists = leaseRepository.existsById(leaseId);
        if (!exists) {
            throw new IllegalStateException(
                    "Record with id " + leaseId + " Does not exists"
            );
        }
        leaseRepository.deleteById(leaseId);
    }

    @Transactional
    public void updateLease(Long leaseId,
                            Lease update) {
        Lease lease = leaseRepository.findById(leaseId)
                .orElseThrow(() -> new IllegalStateException(
                        "Record With ID " + leaseId + " Does Not Exist"
                ));

        if (update.getName() != null &&
                update.getName().length() > 0 &&
                !Objects.equals(lease.getName(), update.getName())) {
            lease.setName(update.getName());
        }

        if (update.getBuildingName() != null &&
                update.getBuildingName().length() > 0 &&
                !Objects.equals(lease.getBuildingName(), update.getBuildingName())) {
            Optional<Lease> leaseOptional = leaseRepository
                    .findLeaseByName(lease.getBuildingName());
            if (leaseOptional.isPresent()) {
                throw new IllegalStateException("That building is already allocated to Someone");
            }
            lease.setBuildingName(update.getBuildingName());
        }


        if (update.getRentalFee() > 0 &&
                !Objects.equals(lease.getRentalFee(), update.getRentalFee())) {
            lease.setRentalFee(update.getRentalFee());
        }
        if (update.getFloorNumber() > 0 &&
                !Objects.equals(lease.getFloorNumber(), update.getFloorNumber())) {
            lease.setFloorNumber(update.getFloorNumber());
        }
//        if (update.getStatus()!=null &&
//                update.getStatus().length()> 0 &&
//                !Objects.equals(lease.getStatus(),update.getStatus())){
//            lease.setStatus(update.getStatus());
//        }


        if (update.getTerms() != null &&
                update.getTerms().length() > 0 &&
                !Objects.equals(lease.getTerms(), update.getTerms())) {
            lease.setTerms(update.getTerms());
        }
    }


    public List<Lease> getExpiredLeases(String status) {
        return leaseRepository.findLeaseByStatus(status);
    }

    @Transactional
    public void renewlease(Long leaseId,
                           Lease renewal) {
        Lease lease = leaseRepository.findById(leaseId)
                .orElseThrow(() -> new IllegalStateException(
                        "Record With ID " + leaseId + " Does Not Exist"
                ));

        if (renewal.getStartDate() != null &&
                renewal.getEndDate() != null &&
                (renewal.getStartDate().isAfter(renewal.getEndDate()))) {
            throw new IllegalStateException("Renewal Failed , Start Date Cannot be greater than End Date");
        } else {
            if (renewal.getEndDate() != null &&
                    renewal.getEndDate().isBefore(LocalDate.now())) {
                throw new IllegalStateException("Failed To Renew, End Date is Already Due");
            }

            if ((renewal.getStartDate() == null &&
                    renewal.getEndDate() == null)) {
                throw new IllegalStateException("At least End Date is Required Contract renewal");
            }
            if (renewal.getStartDate() == null &&
                    renewal.getEndDate() != null &&
                    renewal.getEndDate().isAfter(LocalDate.now())) {
                lease.setStartDate(LocalDate.now());
                lease.setEndDate(renewal.getEndDate());
                lease.setStatus("Renewed");

            }
            if (renewal.getStartDate() != null &&
                    renewal.getEndDate() != null &&
                    (renewal.getEndDate().isAfter(renewal.getStartDate())) &&
                    (renewal.getEndDate().isAfter(LocalDate.now()))) {
                lease.setStartDate(renewal.getStartDate());
                lease.setEndDate(renewal.getEndDate());
                lease.setStatus("Renewed");
            }

            if (renewal.getEndDate() == null) {
                throw new IllegalStateException("End Date is Required");
            }

        }

    }
}
