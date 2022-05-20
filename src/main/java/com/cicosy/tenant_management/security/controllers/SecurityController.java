package com.cicosy.tenant_management.security.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SecurityController {

    @RequestMapping("/token")
    public String tokenPage(){
        return "company/productkey";
    }

    @GetMapping("/company")
    public String company(){
        return "/company/companyPage";
    }


    @RequestMapping("/login")
    public String loginPage() {
        return "security/login";
    }




    @GetMapping("/register")
    public String register() {
        return "security/register2";
    }

    @RequestMapping("/index")
    public String homePage() {
        return "index";
    }


  /*  @GetMapping("/editProfile")
    public String editProfile() {
        return "security/userEdit";
    }*/

    @GetMapping("/accessDenied")
    public String accessDenied() {
        return "accessDenied";
    }

    @GetMapping("/Invoicing")
    public String invoicing(){
        return "/accounting/invoicing";
    }

    @GetMapping("/Payments")
    public String payments(){
        return "/accounting/payments";
    }


    @GetMapping("/key")
    public String key(){
        return "/company/genKey";
    }



    //Service Navigation

    @GetMapping("/AddService")
    public String addService(){
        return "/services/addService";
    }

    @GetMapping("/ServiceList")
    public String ServiceList(){
        return "/services/serviceList";
    }


    //Tenant Documents Navigation
    @GetMapping("/addTenantDocuments")
    public String addtenantDocuments(){
        return "/documentsManagement/add_tenantdocuments";
    }

    @GetMapping("/LeaseForm")
    public String getLeaseForm(){
        return "/documentsManagement/DeaseForm";
    }

    @GetMapping("/expireddocuments")
    public String getExpiredDocuments(){
        return "/documentsManagement/expiredleasedocuments";
    }

    @GetMapping("/leasedocuments")
    public String leaseDocuments(){
        return "/documentsManagement/lease_documents";
    }

    @GetMapping("/noticedocuments")
    public String noticeDocuments(){
        return "/documentsManagement/notice_documents";
    }

    @GetMapping("/replydocuments")
    public String replyDocuments(){
        return "/documentsManagement/replydocuments";
    }

    @GetMapping("/tenantDocuments")
    public String tenantDocuments(){
        return "/documentsManagement/tenant_documents";
    }

    @GetMapping("/viewTenantDocuments")
    public String viewTenantDocuments(){
        return "/documentsManagement/view_tenantDocuments";
    }

    @GetMapping("/viewFile")
    public String viewFile(){
        return "/documentsManagement/viewFile";
    }

    @GetMapping("/otherForm")
    public String OtherFile(){
        return "/documentsManagement/OtherForm";
    }



    //Lease Page Navigations
    @GetMapping("/AddLease")
    public String addLease() {
        return "/LeaseManagement/AddLease";
    }
    @GetMapping("/Edit-Lease")
    public String editlease() {
        return "/LeaseManagement/Edit-Lease";
    }
    @GetMapping("/Lease-Notices")
    public String LeaseNotices() {
        return "/LeaseManagement/Lease-Notices";
    }
    @GetMapping("/Lease-Form")
    public String leaseform() {
        return "/LeaseManagement/LeaseForm";
    }
    @GetMapping("/Terminate-Lease")
    public String terminateLease() {
        return "/LeaseManagement/Terminate-Lease";
    }
    @GetMapping("/View-Lease")
    public String viewLease() {
        return "/LeaseManagement/View-Lease";
    }
    @GetMapping("/View-Renewed")
    public String viewRenewedLease() {
        return "/LeaseManagement/View-Renewed-Lease";
    }
    @GetMapping("/Lease-Detail")
    public String LeaseDetail() {
        return "/LeaseManagement/LeaseDetail";
    }


    //Maintanance Navigations
    @GetMapping("/requestForm")
    public String LodgeRequest() {
        return"/mantainanceManagement/requestForm";
    }

    @GetMapping("/request")
    public String Request() {
        return"/mantainanceManagement/request";
    }

    @GetMapping("/schedule")
    public String Schedule() {
        return"/mantainanceManagement/schedule";
    }


    @GetMapping("/overdueRequest")
    public String OverdueRequest() {
        return"/mantainanceManagement/overdueRequest";
    }

    @GetMapping("/pending")
    public String Pending() {
        return"/mantainanceManagement/pendingRequest";
    }
    @GetMapping("/attended")
    public String Attended() {
        return"/mantainanceManagement/attendedRequest";
    }

    //Property Navigations

    @GetMapping("/addProperty")
    public String addProperty(){
        return "/propertyManagement/add_property";
    }

    @GetMapping("/addCompartment")
    public String addCompartment(){
        return "/propertyManagement/add_compartment";
    }

    @GetMapping("/editProperty")
    public String editProperty(){
        return "/propertyManagement/edit_property";
    }

    @GetMapping("/propertyList")
    public String propertyList(){
        return "/propertyManagement/property-list";
    }
    @GetMapping("/viewCompartment")
    public String viewCompartment(){
        return "/propertyManagement/view-compartment";
    }

    @GetMapping("/viewProperty")
    public String viewProperty(){
        return "/propertyManagement/view-property";
    }

    //Tenant Navigations


    @GetMapping("/tenantList")
    public String tenantList() {
        return "/tenantManagement/tenant_list";
    }
    @GetMapping("/tenantDetail")
    public String tenantDetails() {
        return "/tenantManagement/tenant_detail";
    }
    @GetMapping("/addTenant")
    public String addTenant() {
        return "/tenantManagement/add_tenant";
    }
    @GetMapping("/assignProperty")
    public String AssignProperty() {
        return "/tenantManagement/assign_property";
    }





    @GetMapping("/linechart")
    public String getNabar() {
        return "linechart";
    }
}
