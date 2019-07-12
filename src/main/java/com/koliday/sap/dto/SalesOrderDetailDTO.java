package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SalesOrderDetailDTO {
    private SalesOrderDTO salesOrderDTO;
    private List<SalesOrderItemDTO> salesOrderItemDTOList;
}
