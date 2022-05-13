package com.cicosy.tenant_management.repository.companyProfile;


import com.cicosy.tenant_management.model.company_details.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyProfileRepo extends JpaRepository<Company,Long> {


}
