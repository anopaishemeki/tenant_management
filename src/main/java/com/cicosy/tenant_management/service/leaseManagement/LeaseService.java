package com.cicosy.tenant_management.service.leaseManagement;

import com.cicosy.tenant_management.controler.propertyManagement.CompartmentController2;
import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.model.leaseManagement.LeaseHistory;
import com.cicosy.tenant_management.model.propertyManagement.Compartment;
import com.cicosy.tenant_management.model.tenantManagement.Tenant;
import com.cicosy.tenant_management.repository.leaseManagement.LeaseHistoryRepository;
import com.cicosy.tenant_management.repository.leaseManagement.LeaseRepository;
import com.cicosy.tenant_management.repository.propertyManagement.CompartmentRepository;
import com.cicosy.tenant_management.repository.tenantManagement.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class LeaseService {
     LeaseRepository leaseRepository;
     LeaseHistoryRepository leaseHistoryRepository;
     CompartmentController2 compartmentController;
     TenantRepository tenantRepository;
     CompartmentRepository compartmentRepository;


    @Autowired
    public LeaseService(LeaseRepository leaseRepository,TenantRepository tenantRepository, LeaseHistoryRepository leaseHistoryRepository, CompartmentController2 compartmentController ,CompartmentRepository compartmentRepository) {
        this.leaseRepository = leaseRepository;
        this.tenantRepository=tenantRepository;
        this.leaseHistoryRepository = leaseHistoryRepository;
        this.compartmentController = compartmentController;
        this.compartmentRepository=compartmentRepository;
    }

    public List<Lease> getLeases() {
        List<Lease> list = leaseRepository.findAll();

        for (int i = 0; i < leaseRepository.findAll().size(); i++) {
            Long leaseID = list.get(i).getId();
            Lease lease = leaseRepository.findById(leaseID)
                    .orElseThrow(() -> new IllegalStateException(
                            "Record With ID " + leaseID + " Does Not Exist"
                    ));

            lease.setTenant(compartmentController.getTenantForSpecificLease(lease.getTenant_id()));

            if ((lease.getEndDate().isBefore(LocalDate.now())) &&
                    (!(Objects.equals(lease.getStatus(), "Terminated")))) {
                lease.setStatus("Expired");
                lease.setTimeLeft(0);
            } else if ((lease.getEndDate().isAfter(LocalDate.now())) &&
                    (!(Objects.equals(lease.getStatus(), "Terminated")))) {
                lease.setStatus("Active");


               int tleft= Integer.parseInt(String.valueOf(Duration.between(LocalDate.now().atStartOfDay(),lease.getEndDate().atStartOfDay()).toDays()));
               if(tleft<0){
                tleft=tleft * -1;  
               }
                lease.setTimeLeft(tleft);
            }

            int duration= Integer.parseInt(String.valueOf(Duration.between(lease.getStartDate().atStartOfDay(),lease.getEndDate().atStartOfDay()).toDays()));


            if(duration<0){
                duration=duration * -1;
            }
            System.out.println("Duration ="+duration);
            lease.setDuration(duration);

        }


        return leaseRepository.findAll();
    }

    public List<LeaseHistory> getLeaseHistory() {

        return leaseHistoryRepository.findAll();
    }


    public void addNewLease(Lease lease, LeaseHistory lease_history) {

        Optional<Lease> ID = leaseRepository.findTenantid(lease.getTenant_id());


            if (ID.isPresent()) {
                throw new IllegalStateException("That Tenant Already Exists");

            }
            if ((lease.getTerms().isEmpty())) {
                lease.setTerms("Unspecified");
            }


            int duration= Integer.parseInt(String.valueOf(Duration.between(lease.getStartDate().atStartOfDay(),lease.getEndDate().atStartOfDay()).toDays()));


            if(duration<0){
                duration=duration * -1;
            }
            System.out.println("Duration ="+duration);
            lease.setDuration(duration);



            
           if ((lease.getEndDate().isAfter(LocalDate.now()))) {
            lease.setStatus("Active");

           int tleft =Integer.parseInt(String.valueOf(Duration.between(lease.getEndDate().atStartOfDay(),LocalDate.now().atStartOfDay()).toDays()));
             if(tleft<0){
                tleft=tleft * -1;
            }
            lease.setTimeLeft(tleft);


        } else {
            lease.setTimeLeft(0);
            lease.setStatus("Expired");
        }


        leaseRepository.save(lease);

        Integer id =lease.getId().intValue();
        lease_history.setLease_id(id);
        lease_history.setTenant_id(lease.getTenant_id());

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

        if ((lease.getStatus().equals("Terminated"))) {
            throw new IllegalStateException("That Record Is already Terminated");
        } else {
            if (update.getStatus().trim().isEmpty()) {
                throw new IllegalStateException("Action Is Required");
            }
            if (!Objects.equals(update.getStatus().trim(), (null)) &&
                    update.getStatus().trim().length() > 0) {
                lease.setStatus("Terminated");
                lease.setTimeLeft(0);


                Long id=Long.parseLong(String.valueOf(lease.getTenant_id()));
                List<Compartment> compartment = compartmentRepository.findByTenant(id);
                for (int i = 0; i<compartment.size();i++){
                    compartment.get(i).setTenant(null);
                    compartment.get(i).setStatus("0");

                }
                Tenant tenant=tenantRepository.findById(id)
                        .orElseThrow(
                                () -> new IllegalStateException(
                                        "Record With ID " + id + " Does Not Exist"
                                )
                );
                tenant.setStatus("1");
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
        if ((Objects.equals(lease.getStatus(), "Terminated"))) {
            throw new IllegalStateException("Sorry You cant Edit a Terminated Lease");
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
            lease.setTenant(compartmentController.getTenantForSpecificLease(lease.getTenant_id()));

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

        List<LeaseHistory> renewedLeases= leaseHistoryRepository.getRenewed();
            for (int i =0;i<renewedLeases.size() ; i++ ) {
               renewedLeases.get(i).setTenant(compartmentController.getTenantForSpecificLease(renewedLeases.get(i).getTenant_id()));
            }

        return renewedLeases;
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

        if (renewal.getStartDate() != null && renewal.getEndDate() != null && renewal.getEndDate().isAfter(renewal.getStartDate())) {
            lease.setStartDate(renewal.getStartDate());
            lease.setEndDate(renewal.getEndDate());
            
             int duration= Integer.parseInt(String.valueOf(Duration.between(lease.getStartDate().atStartOfDay(),lease.getEndDate().atStartOfDay()).toDays()));

                if(duration<0){
                    duration=duration * -1;
                }
                System.out.println("Duration ="+duration);
                lease.setDuration(duration);

            lease.setStatus("Renewed");
        }else if(renewal.getStartDate() == null){
            throw new IllegalStateException("Start Date is Required");
        }else if(renewal.getEndDate() == null){
            throw new IllegalStateException("End Date is Required");
        } else if (renewal.getEndDate().isBefore(renewal.getStartDate())) {
            throw new IllegalStateException("Start Date cannot be after End Date");
        }

       


    }


    public Lease findLeaseById(Long leaseId) {
      Lease lease=  leaseRepository.findById(leaseId)
                .orElseThrow(() -> new IllegalStateException(
                        "Record With ID " + leaseId + " Does Not Exist"
                ));
         if ((lease.getEndDate().isBefore(LocalDate.now()))  &&
            (!(Objects.equals(lease.getStatus(), "Terminated")))) {
        lease.setStatus("Expired");
        lease.setTimeLeft(0);
    } else if ((lease.getEndDate().isAfter(LocalDate.now()))  &&
            (!(Objects.equals(lease.getStatus(), "Terminated")))) {
        lease.setStatus("Active");
        
        int tleft =Integer.parseInt(String.valueOf(Duration.between(lease.getEndDate().atStartOfDay(),LocalDate.now().atStartOfDay()).toDays()));
             if(tleft<0){
                tleft=tleft * -1;
            }
         
        lease.setTimeLeft(tleft);
    }

    

 return lease;
    }

    public String findTenantEmail(String name) {

        return leaseRepository.findByEmail(name);
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
