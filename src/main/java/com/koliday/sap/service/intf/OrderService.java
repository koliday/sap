package com.koliday.sap.service.intf;

import com.koliday.sap.dto.InquiryDTO;
import com.koliday.sap.dto.InquiryDetailDTO;
import com.koliday.sap.dto.InquiryItemDTO;
import com.koliday.sap.dto.QuotationItemDTO;
import com.koliday.sap.entity.InquiryEntity;
import com.koliday.sap.entity.QuotationEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderService {
    //inquiry
    Integer createInquiry(InquiryEntity inquiry, List<InquiryItemDTO> inquiryItemDTOList);

    List<InquiryDTO> getAllInquiry(Integer creator);

    InquiryDetailDTO getInquiryDetail(Integer inid);

    //quotation
    List<InquiryDTO> getQuotationRefInquiry(Integer uid);

    Integer createQuotation(QuotationEntity quotationEntity, List<QuotationItemDTO> quotationItemDTOList);
}
