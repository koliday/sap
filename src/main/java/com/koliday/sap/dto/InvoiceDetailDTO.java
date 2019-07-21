package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InvoiceDetailDTO {
    private InvoiceDTO invoiceDTO;
    private List<SalesOrderItemDTO> salesOrderItemDTOList;
}
