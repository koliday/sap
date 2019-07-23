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

    Integer getQuantity(@Param("whid")Integer whid,@Param("pid")Integer pid);

    Integer convertQuantity(@Param("itemid")Integer itemid,@Param("whid")Integer whid,@Param("quantity")Integer quantity);

    Integer postQuantity(@Param("itemid")Integer itemid,@Param("whid")Integer whid,@Param("quantity")Integer quantity);

    List<WarehouseProductDTO> getInventoryByProduct(@Param("pid") Integer pid,@Param("plid")Integer plid);

    List<InventoryByProductDTO> getPlantByProduct(@Param("pid") Integer pid);
}
