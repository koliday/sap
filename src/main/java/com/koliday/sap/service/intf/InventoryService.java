package com.koliday.sap.service.intf;

import com.koliday.sap.dto.PlantDTO;
import com.koliday.sap.dto.WarehouseDTO;

import java.util.List;

public interface InventoryService {
    List<PlantDTO> getAllPlant();

    List<WarehouseDTO> getPlant(Integer plid);

}
