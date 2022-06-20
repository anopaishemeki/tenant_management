package com.cicosy.tenant_management.service.tenantService;

import com.cicosy.tenant_management.model.tenantManagement.Tenant;
import com.cicosy.tenant_management.repository.leaseManagement.LeaseRepository;
import com.cicosy.tenant_management.repository.tenantManagement.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TenantService {


    private TenantRepository tenantRepository;
    private  LeaseRepository leaseRepository;

    @Autowired
    public TenantService(TenantRepository tenantRepository, LeaseRepository leaseRepository) {
        this.tenantRepository = tenantRepository;
        this.leaseRepository = leaseRepository;
    }

    public Tenant addTenant(Tenant tenant) {
        tenant.setStatus("0");
        return tenantRepository.save(tenant);
    }

    public List<Tenant> addTenants(List<Tenant> tenants) {
        return tenantRepository.saveAll(tenants);
    }

    public String updateTenant(Long id, Tenant tenant) {

        Tenant existing_tenant=  tenantRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "Record With ID " + id + " Does Not Exist"
                ));


        existing_tenant.setCity(tenant.getCity());
        existing_tenant.setCountry(tenant.getCountry());
        existing_tenant.setEmail(tenant.getEmail());
        existing_tenant.setWebsite(tenant.getWebsite());
        existing_tenant.setAddress(tenant.getAddress());
        existing_tenant.setB_email(tenant.getB_email());
        existing_tenant.setB_phone(tenant.getB_phone());
        existing_tenant.setB_tel(tenant.getB_tel());
        existing_tenant.setId_passport(tenant.getId_passport());
        existing_tenant.setName(tenant.getName());
        existing_tenant.setPhone(tenant.getPhone());
        existing_tenant.setSurname(tenant.getSurname());
        existing_tenant.setBusiness_name(tenant.getBusiness_name());
        existing_tenant.setBusiness_type(tenant.getBusiness_type());
        existing_tenant.setServices(tenant.getServices());

        tenantRepository.save(existing_tenant);

        return "Tenant updated successfully";
    }


    public List<Tenant> getAll() {
        return tenantRepository.findAll();
    }
    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }
    

    public Tenant getTenantById(Long id) {
        Tenant existing_tenant = tenantRepository.getById(id);
        return existing_tenant;
    }


    public Tenant getTenantByID( Long id) {
        return tenantRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "Tenant With ID " + id + " Does Not Exist"
                ));

    }
    public Tenant getTenantByName(Tenant tenant, String name) {
        Tenant existing_tenant = tenantRepository.getByName(name);
        return existing_tenant;
    }

    public Tenant getTenant(Long id) {
        return tenantRepository.findById(id).orElseThrow(() -> new IllegalStateException("Tenant with id" + id + " does not exist"));
    }

   /* public List<Lease> findLeasesByTenant_id(int id) {

        List <Lease> leases = leaseRepository.findByTenant_id(id);

        for (int i = 0 ; i < leases.size(); i++){
            Long ID =Long.parseLong( String.valueOf(leases.get(i).getTenant_id()));
            leases.get(i).setTenant(getTenant(ID));
        }
        return leases;
    }*/
}
