package com.cicosy.tenant_management.repository.ProductToken;


import com.cicosy.tenant_management.model.ProductToken.ProductToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTokenRepo extends JpaRepository<ProductToken,Long> {
    @Query(value="SELECT token FROM product_token WHERE id = ?1",nativeQuery = true)
    String get_token(Long id);
}
