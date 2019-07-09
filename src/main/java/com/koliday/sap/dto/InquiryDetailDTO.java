package com.koliday.sap.dto;

import com.koliday.sap.entity.InquiryEntity;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InquiryDetailDTO {
    private InquiryDTO inquiryDTO;
    private List<InquiryItemDTO> inquiryItemDTOList;
}
