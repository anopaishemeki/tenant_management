package com.cicosy.tenant_management.controler.ProductToken;


import com.cicosy.tenant_management.model.ProductToken.ProductToken;
import com.cicosy.tenant_management.service.ProductToken.Decrypt;
import com.cicosy.tenant_management.service.ProductToken.EncryptToken;
import com.cicosy.tenant_management.service.ProductToken.ProductTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("api/v1")
public class ProductTokenControler {

    @Autowired
    private ProductTokenService productTokenService;


    @PostMapping("/savedetails")
    public ProductToken SaveDetails(@RequestBody ProductToken productToken) {
        return productTokenService.store(productToken);
    }


    @GetMapping("/get_product/{id}")
    public String encry(@PathVariable Long id) throws Exception {
        String encryptedMessage = "op";
        EncryptToken encryptToken = new EncryptToken();
        String encrypted = productTokenService.getProductToken(id);
        try {
            encryptToken.initFromStrings("CHuO1Fjd8YgJqTyapibFBQ==", "e3IYYJC2hxe24/EO");
            encryptedMessage = encryptToken.encrypt(encrypted);
            System.out.println("Encrypted Message : " + encryptedMessage);
        } catch (Exception ignored) {

        }
        System.out.println(encryptedMessage);
        return encryptedMessage;
    }

    @GetMapping("decrypt/{id}")
    public String decry(@PathVariable Long id) {
        Decrypt decrypt = new Decrypt();
        String decryptedMessage = "";
        String token = productTokenService.getProductToken(id);
        try {
            decrypt.initFromStrings("CHuO1Fjd8YgJqTyapibFBQ==", "e3IYYJC2hxe24/EO");
            decryptedMessage = decrypt.decrypt(encry(id));
            System.err.println("Decrypted Message : " + decryptedMessage);
        } catch (Exception ignored) {
        }

        return decryptedMessage;
    }


    @PutMapping("Updatetoken/{id}")
    public ProductToken updateToken(@PathVariable Long id) throws Exception {
        return productTokenService.Update(id);
    }
}