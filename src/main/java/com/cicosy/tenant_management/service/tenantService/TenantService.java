package com.cicosy.tenant_management.service.tenantService;

import com.cicosy.tenant_management.model.leaseManagement.Lease;
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
        return tenantRepository.save(tenant);
    }

    public List<Tenant> addTenants(List<Tenant> tenants) {
        return tenantRepository.saveAll(tenants);
    }

    public String updateTenant(Long id, Tenant tenant) {
        Tenant existing_tenant = tenantRepository.getById(id);
        existing_tenant.setPhone(tenant.getPhone());
        existing_tenant.setName(tenant.getName());
        existing_tenant.setProperty(tenant.getProperty());
        existing_tenant.setId_passport(tenant.getId_passport());

        tenantRepository.save(existing_tenant);

        return "Tenant updated successfully";
    }


    public List<Tenant> getAll() {
        return tenantRepository.findAll();
    }
    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }
    

    public Tenant getTenantById(Tenant tenant, Long id) {
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
