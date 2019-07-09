package com.koliday.sap.service.intf;

import com.koliday.sap.dto.InquiryDTO;
import com.koliday.sap.dto.InquiryDetailDTO;
import com.koliday.sap.dto.InquiryItemDTO;
import com.koliday.sap.entity.InquiryEntity;

import java.util.List;

public interface OrderService {
    //询价单
    Integer createInquiry(InquiryEntity inquiry, List<InquiryItemDTO> inquiryItemDTOList);

    List<InquiryDTO> getAllInquiry(Integer creator);

    InquiryDetailDTO getInquiryDetail(Integer inid);
}
