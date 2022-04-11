package com.cicosy.tenant_management.service.leaseManagement;

import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.model.leaseManagement.LeaseHistory;
import com.cicosy.tenant_management.repository.leaseManagement.LeaseHistoryRepository;
import com.cicosy.tenant_management.repository.leaseManagement.LeaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class LeaseService {
    private final LeaseRepository leaseRepository;
    private final LeaseHistoryRepository leaseHistoryRepository;


    @Autowired
    public LeaseService(LeaseRepository leaseRepository, LeaseHistoryRepository leaseHistoryRepository) {
        this.leaseRepository = leaseRepository;


        this.leaseHistoryRepository = leaseHistoryRepository;
    }

    public List<Lease> getLeases() {
        List<Lease> list = leaseRepository.findAll();

        for (int i = 0; i < leaseRepository.findAll().size(); i++) {
            Long leaseID = list.get(i).getId();
            Lease lease = leaseRepository.findById(leaseID)
                    .orElseThrow(() -> new IllegalStateException(
                            "Record With ID " + leaseID + " Does Not Exist"
                    ));

            if ((lease.getEndDate().isBefore(LocalDate.now())) &&
                    (!(Objects.equals(lease.getStatus(), "Terminated")))) {
                lease.setStatus("Expired");
                lease.setTimeLeft(0);
            } else if ((lease.getEndDate().isAfter(LocalDate.now())) &&
                    (!(Objects.equals(lease.getStatus(), "Terminated")))) {
                lease.setStatus("Active");

                int Months = Period.between(LocalDate.now(), lease.getEndDate()).getMonths();
                if (Months < 0) {
                    Months = Months * -1;
                }
                int Days = Period.between(LocalDate.now(), lease.getEndDate()).getDays();
                if (Days < 0) {
                    Days = Days * -1;
                }
                int Years = Period.between(LocalDate.now(), lease.getEndDate()).getYears();
                if (Years < 0) {
                    Years = Years * -1;
                }
                int tleft = Math.addExact(Days, Math.addExact((Months * 30), (Years * 12 * 30)));
                lease.setTimeLeft(tleft);
            }
            /*else if (Objects.equals(lease.getStatus(), "Active")) {
                int Months = Period.between(LocalDate.now(), lease.getEndDate()).getMonths();
                if (Months < 0) {
                    Months = Months * -1;
                }
                int Days = Period.between(LocalDate.now(), lease.getEndDate()).getDays();
                if (Days < 0) {
                    Days = Days * -1;
                }
                int Years = Period.between(LocalDate.now(), lease.getEndDate()).getYears();
                if (Years < 0) {
                    Years = Years * -1;
                }
                int tleft = Math.addExact(Days, Math.addExact((Months * 30), (Years * 12 * 30)));
                lease.setTimeLeft(tleft);


            }*/


        }


        return leaseRepository.findAll();
    }

    public List<LeaseHistory> getLeaseHistory() {

        return leaseHistoryRepository.findAll();
    }


    public void addNewLease(Lease lease, LeaseHistory lease_history) {
        Optional<Lease> name = leaseRepository.findLeaseByTenantID(lease.getTenant_id());


        if (name.isPresent()) {
            throw new IllegalStateException("Record with provided Business Name already Exists");

        }
        if ((lease.getBuildingName().isEmpty())) {
            lease.setBuildingName("Unspecified");
        }
        if ((lease.getTerms().isEmpty())) {
            lease.setTerms("Unspecified");
        }


        lease.setEndDate(lease.getStartDate().plusMonths(lease.getDuration()));
//
//        if ((lease.getBuildingLocation().isEmpty())) {
//            throw new IllegalStateException("Building Location Is Required");
//        }
//
//        if ((lease.getName().isEmpty())) {
//            throw new IllegalStateException("Tenant Name Is Required");
//        }
//        if ((lease.getStartDate().toString().isEmpty())) {
//            lease.setStartDate(LocalDate.now());
//        }

//        if (!(lease.getStartDate().toString().isEmpty()) &&
//                !(lease.getEndDate().toString().isEmpty())) ;
//        {
//            if (lease.getStartDate().isAfter(lease.getEndDate())) {
//                throw new IllegalStateException("Start Date Can not be Greater than End Date");
//            }
//        }

//        String s = String.valueOf(lease.getRentalFee());
//        if ((s.isEmpty())) {
//            throw new IllegalStateException("Rent Amount Is Required");
//        }
//        if ((lease.getEndDate().toString().isEmpty())) {
//            throw new IllegalStateException("End Date Is Required");
//        }

        if (((lease.getStartDate().plusMonths(lease.getDuration())).isAfter(LocalDate.now()))) {
            lease.setStatus("Active");

            int Months = Period.between(LocalDate.now(), lease.getEndDate()).getMonths();
            if (Months < 0) {
                Months = Months * -1;
            }
            int Days = Period.between(LocalDate.now(), lease.getEndDate()).getDays();
            if (Days < 0) {
                Days = Days * -1;
            }
            int Years = Period.between(LocalDate.now(), lease.getEndDate()).getYears();
            if (Years < 0) {
                Years = Years * -1;
            }
            int tleft = Math.addExact(Days, Math.addExact((Months * 30), (Years * 12 * 30)));
            lease.setTimeLeft(tleft);


        } else {
            lease.setTimeLeft(0);
            lease.setStatus("Expired");
        }

//        lease.setTimeLeft(Period.between(LocalDate.now(),lease.getEndDate()).getMonths());

        leaseRepository.save(lease);

        Integer id =lease.getId().intValue();
        lease_history.setLease_id(id);
        lease_history.setTenant_id(lease.getTenant_id());
        lease_history.setBuildingLocation(lease.getBuildingLocation());
        lease_history.setBuildingName(lease.getBuildingName());
        lease_history.setDuration(lease.getDuration());
        lease_history.setEndDate(lease.getEndDate());
        lease_history.setStartDate(lease.getStartDate());
        lease_history.setTerms(lease.getTerms());
        lease_history.setActionDate(LocalDateTime.now());
        lease_history.setAction("Added");
        leaseHistoryRepository.save(lease_history);


    }

//    public void deleteLease(Long leaseId) {
//        boolean exists = leaseRepository.existsById(leaseId);
//        if (!exists) {
//            throw new IllegalStateException(
//                    "Record with id " + leaseId + " Does not exists"
//            );
//        }
//        leaseRepository.deleteById(leaseId);
//
//
//    }

//    public void SaveDelete(Long leaseId, LeaseHistory lease_history) {
//
//        Lease lease = leaseRepository.findById(leaseId)
//                .orElseThrow(() -> new IllegalStateException(
//                        "Record With ID " + leaseId + " Does Not Exist"
//                ));
//
//        lease_history.setTenant_id(lease.getId().intValue());
//        lease_history.setAgreementDate(lease.getAgreementDate());
//        lease_history.setBuildingLocation(lease.getBuildingLocation());
//        lease_history.setBuildingName(lease.getBuildingName());
//        lease_history.setDuration(lease.getDuration());
//        lease_history.setEndDate(lease.getEndDate());
//        lease_history.setStartDate(lease.getStartDate());
//        lease_history.setFloorNumber(lease.getFloorNumber());
//        lease_history.setName(lease.getName());
//        lease_history.setRentalFee(lease.getRentalFee());
//        lease_history.setTerms(lease.getTerms());
//        lease_history.setActionDate(LocalDateTime.now());
//        lease_history.setAction("Deleted");
//
//        leaseHistoryRepository.save(lease_history);
//
//    }

    @Transactional
    public void terminatelease(Long leaseId,
                               Lease update
    ) {
        Lease lease = leaseRepository.findById(leaseId)
                .orElseThrow(() -> new IllegalStateException(
                        "Record With ID " + leaseId + " Does Not Exist"
                ));
        System.out.println(lease.getStatus());

        if ((lease.getStatus().toString().equals("Terminated"))) {
            throw new IllegalStateException("That Record Is already Terminated");
        } else {
            if (update.getStatus().trim().isEmpty()) {
                throw new IllegalStateException("Action Is Required");
            }
            if (!Objects.equals(update.getStatus().toString().trim(), (null)) &&
                    update.getStatus().trim().length() > 0) {
                lease.setStatus("Terminated");
                lease.setTimeLeft(0);
            }
        }


    }


    @Transactional
    public void updateLease(Long leaseId,
                            Lease update
    ) {
        Lease lease = leaseRepository.findById(leaseId)
                .orElseThrow(() -> new IllegalStateException(
                        "Record With ID " + leaseId + " Does Not Exist"
                ));
        if ((Objects.equals(lease.getStatus().toString(), "Terminated"))) {
            throw new IllegalStateException("Sorry You cant Edit a Terminated Lease");
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

        if (update.getTerms() != null &&
                update.getTerms().length() > 0 &&
                !Objects.equals(lease.getTerms(), update.getTerms())) {
            lease.setTerms(update.getTerms());
        }
        int Months = Period.between(LocalDate.now(), lease.getEndDate()).getMonths();
        if (Months < 0) {
            Months = Months * -1;
        }
        int Days = Period.between(LocalDate.now(), lease.getEndDate()).getDays();
        if (Days < 0) {
            Days = Days * -1;
        }
        int Years = Period.between(LocalDate.now(), lease.getEndDate()).getYears();
        if (Years < 0) {
            Years = Years * -1;
        }
        int tleft = Math.addExact(Days, Math.addExact((Months * 30), (Years * 12 * 30)));
        lease.setTimeLeft(tleft);

    }


    public void SaveToHistory(Long leaseId, LeaseHistory lease_history, String status) {


        Lease lease = leaseRepository.findById(leaseId)
                .orElseThrow(() -> new IllegalStateException(
                        "Record With ID " + leaseId + " Does Not Exist"
                ));


        Integer id =leaseId.intValue();
        lease_history.setTenant_id(lease.getTenant_id());
        lease_history.setLease_id(id);
        lease_history.setBuildingLocation(lease.getBuildingLocation());
        lease_history.setBuildingName(lease.getBuildingName());
        lease_history.setDuration(lease.getDuration());
        lease_history.setEndDate(lease.getEndDate());
        lease_history.setStartDate(lease.getStartDate());
        lease_history.setTerms(lease.getTerms());
        lease_history.setActionDate(LocalDateTime.now());
        lease_history.setAction(status);

        leaseHistoryRepository.save(lease_history);

    }

    @Transactional
    public List<Lease> getAboutToExpire(int time) {


        List<Lease> list = leaseRepository.findAll();

        for (int i = 0; i < leaseRepository.findAll().size(); i++) {
            Long leaseID = list.get(i).getId();
            Lease lease = leaseRepository.findById(leaseID)
                    .orElseThrow(() -> new IllegalStateException(
                            "Record With ID " + leaseID + " Does Not Exist"
                    ));
            lease.setEndDate(lease.getStartDate().plusMonths(lease.getDuration()));


            if ((lease.getEndDate().isBefore(LocalDate.now()))
            &&
                    (!(Objects.equals(lease.getStatus(), "Terminated")))) {
                lease.setStatus("Expired");
                lease.setTimeLeft(0);
            } else if ((lease.getEndDate().isAfter(LocalDate.now())) &&
                    (!(Objects.equals(lease.getStatus(), "Terminated")))) {
                lease.setStatus("Active");
                int Months = Period.between(LocalDate.now(), lease.getEndDate()).getMonths();
                if (Months < 0) {
                    Months = Months * -1;
                }
                int Days = Period.between(LocalDate.now(), lease.getEndDate()).getDays();
                if (Days < 0) {
                    Days = Days * -1;
                }
                int Years = Period.between(LocalDate.now(), lease.getEndDate()).getYears();
                if (Years < 0) {
                    Years = Years * -1;
                }
                int tleft = Math.addExact(Days, Math.addExact((Months * 30), (Years * 12 * 30)));
                lease.setTimeLeft(tleft);
            }
            if (Objects.equals(lease.getStatus(), "Expired")) {
                lease.setTimeLeft(0);
            }

            if (Objects.equals(lease.getStatus(), "Active")) {
                int Months = Period.between(LocalDate.now(), lease.getEndDate()).getMonths();
                if (Months < 0) {
                    Months = Months * -1;
                }
                int Days = Period.between(LocalDate.now(), lease.getEndDate()).getDays();
                if (Days < 0) {
                    Days = Days * -1;
                }
                int Years = Period.between(LocalDate.now(), lease.getEndDate()).getYears();
                if (Years < 0) {
                    Years = Years * -1;
                }
                int tleft = Math.addExact(Days, Math.addExact((Months * 30), (Years * 12 * 30)));
                lease.setTimeLeft(tleft);
            }


        }

        return leaseRepository.findbyExpirery(time);

    }

   @Transactional
   public List<LeaseHistory> getRenewed(){
        return leaseHistoryRepository.getRenewed();
   }

    @Transactional
    public List<Lease> getExpiredLeases(String status) {

        List<Lease> list = leaseRepository.findAll();

        for (int i = 0; i < leaseRepository.findAll().size(); i++) {
            Long leaseID = list.get(i).getId();
            Lease lease = leaseRepository.findById(leaseID)
                    .orElseThrow(() -> new IllegalStateException(
                            "Record With ID " + leaseID + " Does Not Exist"
                    ));
            lease.setEndDate(lease.getStartDate().plusMonths(lease.getDuration()));

            if ((lease.getEndDate().isBefore(LocalDate.now())) &&
                    (!(Objects.equals(lease.getStatus(), "Expired"))) &&
                    (!(Objects.equals(lease.getStatus(), "Terminated")))) {
                lease.setStatus("Expired");
                lease.setTimeLeft(0);
            } else if ((lease.getEndDate().isAfter(LocalDate.now())) &&
                    (!(Objects.equals(lease.getStatus(), "Active"))) &&
                    (!(Objects.equals(lease.getStatus(), "Terminated")))) {
                lease.setStatus("Active");
                int Months = Period.between(LocalDate.now(), lease.getEndDate()).getMonths();
                if (Months < 0) {
                    Months = Months * -1;
                }
                int Days = Period.between(LocalDate.now(), lease.getEndDate()).getDays();
                if (Days < 0) {
                    Days = Days * -1;
                }
                int Years = Period.between(LocalDate.now(), lease.getEndDate()).getYears();
                if (Years < 0) {
                    Years = Years * -1;
                }
                int tleft = Math.addExact(Days, Math.addExact((Months * 30), (Years * 12 * 30)));
                lease.setTimeLeft(tleft);
            }


        }

        return leaseRepository.findLeaseByStatus(status);

    }

    @Transactional
    public void renewlease(Long leaseId,
                           Lease renewal) {
        Lease lease = leaseRepository.findById(leaseId)
                .orElseThrow(() -> new IllegalStateException(
                        "Record With ID " + leaseId + " Does Not Exist"
                ));


        String s = String.valueOf(renewal.getDuration());

        if (s.isEmpty()) {
            throw new IllegalStateException("New duration is Required");
        }

        if (renewal.getDuration() <= 0) {
            throw new IllegalStateException("Please Enter new Valid duration");
        }

        if (renewal.getStartDate() != null &&
                (renewal.getStartDate().isBefore(LocalDate.now()))) {
            throw new IllegalStateException("Entered Start Date is already Due,  please enter a new valid one");
        }

        if ((renewal.getStartDate() == null) &&
                !s.isEmpty()) {
            lease.setStartDate(LocalDate.now());
            lease.setDuration(renewal.getDuration());
            lease.setEndDate(LocalDate.now().plusMonths(renewal.getDuration()));
            //lease.setTimeLeft((Period.between(lease.getEndDate(),LocalDate.now()).getYears())*12 + Period.between(lease.getEndDate(),LocalDate.now()).getMonths());
            int Months = Period.between(LocalDate.now(), lease.getEndDate()).getMonths();
            if (Months < 0) {
                Months = Months * -1;
            }
            int Days = Period.between(LocalDate.now(), lease.getEndDate()).getDays();
            if (Days < 0) {
                Days = Days * -1;
            }
            int Years = Period.between(LocalDate.now(), lease.getEndDate()).getYears();
            if (Years < 0) {
                Years = Years * -1;
            }
            int tleft = Math.addExact(Days, Math.addExact((Months * 30), (Years * 12 * 30)));
            lease.setTimeLeft(tleft);
            lease.setStatus("Renewed");
        }
        if ((renewal.getStartDate() != null) &&
                !s.isEmpty()) {
            lease.setStartDate(renewal.getStartDate());
            lease.setDuration(renewal.getDuration());
            lease.setEndDate(renewal.getStartDate().plusMonths(renewal.getDuration()));

            int Months = Period.between(LocalDate.now(), lease.getEndDate()).getMonths();
            if (Months < 0) {
                Months = Months * -1;
            }
            int Days = Period.between(LocalDate.now(), lease.getEndDate()).getDays();
            if (Days < 0) {
                Days = Days * -1;
            }
            int Years = Period.between(LocalDate.now(), lease.getEndDate()).getYears();
            if (Years < 0) {
                Years = Years * -1;
            }
            int tleft = Math.addExact(Days, Math.addExact((Months * 30), (Years * 12 * 30)));
            lease.setTimeLeft(tleft);
            // lease.setTimeLeft((Period.between(lease.getEndDate(),LocalDate.now()).getYears())*12 + Period.between(lease.getEndDate(),LocalDate.now()).getMonths());
            lease.setStatus("Renewed");
        }


    }


    public Lease findLeaseById(Long leaseId) {
        return leaseRepository.findById(leaseId)
                .orElseThrow(() -> new IllegalStateException(
                        "Record With ID " + leaseId + " Does Not Exist"
                ));
    }

    public String findTenantEmail(String name, String surname) {

        return leaseRepository.findByEmail(name, surname);
    }
    public String getFormName( String ID) {
        return leaseRepository.findTenantForm(ID);
    }
    public Resource downloadFile(String fileName) {

        String DocumentPath=System.getProperty("user.dir")+File.separator+"uploads"+File.separator+"Leases";
//        File pathAsFile = new File(DocumentPath);



//        byte[]  data =file.getBytes();
//        Path path = Paths.get(DocumentPath+file.getOriginalFilename());


        Path path = Paths.get(DocumentPath).toAbsolutePath().resolve(fileName);

        Resource resource;
        try {
            resource = new UrlResource(path.toUri());

        } catch (MalformedURLException e) {
            throw new RuntimeException("Issue in reading the file", e);
        }

        if(resource.exists() && resource.isReadable()){
            return resource;
        }else{
            throw new RuntimeException("the file doesn't exist or not readable");
        }
    }

    public List<Lease> getLeaseBySearch(String record) {
        List<Lease> list = leaseRepository.findAll();

        for (int i = 0; i < leaseRepository.findAll().size(); i++) {
            Long leaseID = list.get(i).getId();
            Lease lease = leaseRepository.findById(leaseID)
                    .orElseThrow(() -> new IllegalStateException(
                            "Record With ID " + leaseID + " Does Not Exist"
                    ));
            lease.setEndDate(lease.getStartDate().plusMonths(lease.getDuration()));

            if ((lease.getEndDate().isBefore(LocalDate.now())) &&
                    (!(Objects.equals(lease.getStatus(), "Expired"))) &&
                    (!(Objects.equals(lease.getStatus(), "Terminated")))) {
                lease.setStatus("Expired");
                lease.setTimeLeft(0);
            } else if ((lease.getEndDate().isAfter(LocalDate.now())) &&
                    (!(Objects.equals(lease.getStatus(), "Active"))) &&
                    (!(Objects.equals(lease.getStatus(), "Terminated")))) {
                lease.setStatus("Active");
                int Months = Period.between(LocalDate.now(), lease.getEndDate()).getMonths();
                if (Months < 0) {
                    Months = Months * -1;
                }
                int Days = Period.between(LocalDate.now(), lease.getEndDate()).getDays();
                if (Days < 0) {
                    Days = Days * -1;
                }
                int Years = Period.between(LocalDate.now(), lease.getEndDate()).getYears();
                if (Years < 0) {
                    Years = Years * -1;
                }
                int tleft = Math.addExact(Days, Math.addExact((Months * 30), (Years * 12 * 30)));
                lease.setTimeLeft(tleft);
            }


        }

        return leaseRepository.findLeaseBySearch(record);
    }


    public List<Lease> getLeaseByT_ID(String id) {
        return leaseRepository.findTenant(id);
    }
}
