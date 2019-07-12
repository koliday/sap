package com.koliday.sap.mapper;

import com.koliday.sap.dto.*;
import com.koliday.sap.entity.InquiryEntity;
import com.koliday.sap.entity.QuotationEntity;
import com.koliday.sap.entity.SalesOrderEntity;
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

    Integer updateInquiryStatus(@Param("quotation") QuotationEntity quotationEntity);

    List<QuotationDTO> getAllQuotation(@Param("uid")Integer uid);

    QuotationDTO getQuotation(@Param("quid")Integer quid);

    List<QuotationItemDTO> getQuotationItem(@Param("quid")Integer quid);

    //salesorder
    List<QuotationDTO> getSalesOrderRefQuotation(@Param("uid") Integer uid);

    Integer selectSalesOrderCount();

    Integer createSalesOrder(@Param("order")SalesOrderEntity salesOrderEntity);

    Integer createSalesOrderItem(@Param("quid") Integer quid,@Param("orid") Integer orid);

    Integer updateQuotationStatus(@Param("quid") Integer quid);

    List<SalesOrderDTO> getAllSalesOrder(@Param("uid") Integer creator);

    SalesOrderDTO getSalesOrder(@Param("orid")Integer orid);

    List<SalesOrderItemDTO> getSalesOrderItem(@Param("orid")Integer orid);
}
