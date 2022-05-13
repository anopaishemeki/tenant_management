package com.cicosy.tenant_management.controler.companyProfile;


import com.cicosy.tenant_management.model.company_details.Company;
import com.cicosy.tenant_management.model.document_management.TenantDocuments;
import com.cicosy.tenant_management.repository.companyProfile.CompanyProfileRepo;
import com.cicosy.tenant_management.service.companyProfile.CompanyProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(path="/api/v1")
public class CompanyControler {

    @Autowired
    private CompanyProfileService companyProfileService;

    @Autowired
    private CompanyProfileRepo companyProfileRepo;



    @PostMapping("/savecompany")
    public String saveCompany(
        @RequestParam("banner") MultipartFile file1,
        @RequestParam("logo") MultipartFile file2,
        @RequestParam("company_name") String company_name,
        @RequestParam("company_location") String company_location,
        Long id) throws IOException {


            String logo = StringUtils.cleanPath(file2.getOriginalFilename());
            String banner = StringUtils.cleanPath(file1.getOriginalFilename());


        if(banner.contains(" "))
            {
                banner= banner.replace(" ","_");
            }

            if(logo.contains(" "))
            {
                logo= logo.replace(" ","_");
            }



            Company comp= new Company();


            comp.setCompany_banner(banner);
            comp.setCompany_logo(logo);
            comp.setCompany_name(company_name);
            comp.setCompany_location(company_location);
            Company docs = companyProfileRepo.save(comp);
            String uploadDir = System.getProperty("user.dir") + "assets/uploads/companydocs" + docs.getId();

            companyProfileService.store(id,uploadDir, banner, file1,company_name,company_location);
            companyProfileService.store(id,uploadDir, logo, file2,company_name,company_location);


            return "success";



        }

}
