package com.koliday.sap.service.impl;

import com.koliday.sap.dto.*;
import com.koliday.sap.mapper.InventoryMapper;
import com.koliday.sap.service.intf.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService {
    @Autowired
    private InventoryMapper inventoryMapper;
    @Override
    public List<PlantDTO> getAllPlant() {
        return inventoryMapper.getAllPlant();
    }

    @Override
    public List<WarehouseDTO> getPlant(Integer plid) {
        List<WarehouseDTO> warehouseDTOList=inventoryMapper.getWarehouse(plid);
        for(WarehouseDTO warehouseDTO:warehouseDTOList){
            List<InventoryDTO> inventory = inventoryMapper.getInventory(warehouseDTO.getWhid());
            warehouseDTO.setInventoryDTOList(inventory);
        }
        return warehouseDTOList;
    }

    @Override
    public Integer getQuantity(Integer whid, Integer pid) {
        return inventoryMapper.getQuantity(whid,pid);
    }

    @Override
    public List<InventoryByProductDTO> getInventoryByProduct(Integer pid) {
        List<InventoryByProductDTO> inventoryByProductDTOList=inventoryMapper.getPlantByProduct(pid);
        for(InventoryByProductDTO inventoryByProductDTO:inventoryByProductDTOList){
            Integer plid=inventoryByProductDTO.getPlid();
            inventoryByProductDTO.setWarehouseProductDTOList(inventoryMapper.getInventoryByProduct(pid,plid));
        }
        return inventoryByProductDTOList;
    }
}
