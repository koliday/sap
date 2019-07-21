package com.koliday.sap.mapper;

import com.koliday.sap.dto.*;
import com.koliday.sap.entity.InvoiceEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Repository
public interface InventoryMapper {
    List<PlantDTO> getAllPlant();

    List<WarehouseDTO> getWarehouse(@Param("plid") Integer plid);

    List<InventoryDTO> getInventory(@Param("whid") Integer whid);
}
