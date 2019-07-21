package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WarehouseDTO {
    private Integer whid;
    private String whno;
    private Integer plid;
    private String whname;
    private String whaddress;
    private List<InventoryDTO> inventoryDTOList;
}
