package com.cicosy.tenant_management;




import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.File;

import com.cicosy.tenant_management.controler.document_management.*;
@SpringBootApplication

public class TenantManagementApplication {
	




	public static void main(String[] args) throws Exception{
		new File(LeaseDocumentContoller.uploadDirectory).mkdir();
		new File(NoticeDocController.uploadDirectory).mkdir();
		SpringApplication.run(TenantManagementApplication.class, args);
	}

}
