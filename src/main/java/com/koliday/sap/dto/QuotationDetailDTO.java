package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuotationDetailDTO {
    private QuotationDTO quotationDTO;
    private List<QuotationItemDTO> quotationItemDTOList;
}
