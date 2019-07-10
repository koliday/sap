package com.koliday.sap.mapper;

import com.koliday.sap.dto.InquiryDTO;
import com.koliday.sap.dto.InquiryDetailDTO;
import com.koliday.sap.dto.InquiryItemDTO;
import com.koliday.sap.dto.QuotationItemDTO;
import com.koliday.sap.entity.InquiryEntity;
import com.koliday.sap.entity.QuotationEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderMapper {
    //inquiry
    Integer selectInquiryCount();

    Integer selectItemCount();

    Integer createInquiry(@Param("inquiry") InquiryEntity inquiry);

    Integer createInquiryItem(@Param("itemlist") List<InquiryItemDTO> inquiryItemDTOList);

    List<InquiryDTO> getAllInquiry(@Param("uid")Integer uid);

    InquiryDTO getInquiry(@Param("inid")Integer inid);

    List<InquiryItemDTO> getInquiryItem(@Param("inid")Integer inid);

    //quotation
    List<InquiryDTO> getQuotationRefInquiry(@Param("uid")Integer uid);

    Integer selectQuotationCount();

    Integer createQuotation(@Param("quotation") QuotationEntity inquiry);

    Integer createQuotationItem(@Param("item") QuotationItemDTO quotationItemDTO);

    Integer updateInquiryStatus(@Param("quotation") QuotationEntity quotationEntity)

}
