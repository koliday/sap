package com.koliday.sap.service.intf;

import com.koliday.sap.dto.InventoryByProductDTO;
import com.koliday.sap.dto.PlantDTO;
import com.koliday.sap.dto.ProductDTO;
import com.koliday.sap.dto.WarehouseDTO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface InventoryService {
    List<PlantDTO> getAllPlant();

    List<WarehouseDTO> getPlant(Integer plid);

    Integer getQuantity(Integer whid, Integer pid);

    List<InventoryByProductDTO> getInventoryByProduct(Integer pid);
}
