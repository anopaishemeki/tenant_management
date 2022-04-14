package com.cicosy.tenant_management;




import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.File;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import com.cicosy.tenant_management.controler.document_management.*;

@SpringBootApplication

public class TenantManagementApplication   extends SpringBootServletInitializer{
	




	public static void main(String[] args) throws Exception{
		new File(LeaseDocumentContoller.uploadDirectory).mkdir();
		new File(NoticeDocController.uploadDirectory).mkdir();
		SpringApplication.run(TenantManagementApplication.class, args);
	}
		@Override

		protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
			return application.sources(TenantManagementApplication.class);
		}

	}


