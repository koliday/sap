package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InventoryByProductDTO {
    private Integer plid;
    private String plno;
    private String plname;
    private String pladdress;
    private List<WarehouseProductDTO> warehouseProductDTOList;
}
