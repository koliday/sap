package com.koliday.sap.mapper;

import com.koliday.sap.entity.ProductEntity;
import com.koliday.sap.entity.VipEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductMapper {

    BigDecimal getPriceByPid(@Param("pid")Integer pid);

    List<ProductEntity> getAllProduct();

}
