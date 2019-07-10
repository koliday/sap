package com.koliday.sap.service.impl;

import com.koliday.sap.dto.InquiryDTO;
import com.koliday.sap.dto.InquiryDetailDTO;
import com.koliday.sap.dto.InquiryItemDTO;
import com.koliday.sap.dto.QuotationItemDTO;
import com.koliday.sap.entity.InquiryEntity;
import com.koliday.sap.entity.QuotationEntity;
import com.koliday.sap.mapper.OrderMapper;
import com.koliday.sap.service.intf.OrderService;
import com.koliday.sap.utils.IdConvertToNoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderMapper orderMapper;
    @Transactional
    @Override
    public synchronized Integer createInquiry(InquiryEntity inquiry, List<InquiryItemDTO> inquiryItemDTOList) {
        //首先生成inno
        Integer inquiryCount=orderMapper.selectInquiryCount();
        String inno= IdConvertToNoUtil.convertInquiry(inquiryCount+1);
        inquiry.setInno(inno);
        Integer inquiryResult=createInquiry(inquiry);
        if(inquiryResult<1)
            return 0;
        Integer inid=inquiry.getInid();
        //插入item
        Integer itemcount=orderMapper.selectItemCount();
        for(InquiryItemDTO inquiryItemDTO:inquiryItemDTOList){
            itemcount++;
            inquiryItemDTO.setInid(inid);
            inquiryItemDTO.setItemno(IdConvertToNoUtil.converItem(itemcount));
            System.out.println(inquiryItemDTO.toString());
        }
        Integer inquiryItemResult=createInquiryItem(inquiryItemDTOList);
        if(inquiryItemResult<1)
            return 0;
        return inid;
    }

    private Integer createInquiry(InquiryEntity inquiry){
        return orderMapper.createInquiry(inquiry);
    }

    private Integer createInquiryItem(List<InquiryItemDTO> inquiryItemDTOList){
        return orderMapper.createInquiryItem(inquiryItemDTOList);
    }

    @Override
    public List<InquiryDTO> getAllInquiry(Integer uid) {
        return orderMapper.getAllInquiry(uid);
    }

    @Transactional
    @Override
    public InquiryDetailDTO getInquiryDetail(Integer inid) {
        InquiryDTO inquiryDTO=orderMapper.getInquiry(inid);
        List<InquiryItemDTO> inquiryItemDTOList=orderMapper.getInquiryItem(inid);
        InquiryDetailDTO inquiryDetailDTO=new InquiryDetailDTO();
        inquiryDetailDTO.setInquiryDTO(inquiryDTO);
        inquiryDetailDTO.setInquiryItemDTOList(inquiryItemDTOList);
        return inquiryDetailDTO;
    }


    @Override
    public List<InquiryDTO> getQuotationRefInquiry(Integer uid) {
        return orderMapper.getQuotationRefInquiry(uid);
    }


    @Transactional
    @Override
    public synchronized Integer createQuotation(QuotationEntity quotation, List<QuotationItemDTO> quotationItemDTOList) {
        //首先生成quno
        Integer quotationCount=orderMapper.selectQuotationCount();
        String quno= IdConvertToNoUtil.convertQuotation(quotationCount+1);
        quotation.setQuno(quno);
        Integer quotationResult=createQuotation(quotation);
        if(quotationResult<1)
            return 0;
        Integer quid=quotation.getQuid();

        for(QuotationItemDTO quotationItemDTO:quotationItemDTOList){
            quotationItemDTO.setQuid(quid);
        }
        Integer inquiryItemResult=createQuotationItem(quotationItemDTOList);
        if(inquiryItemResult<1)
            return 0;
        Integer updateinquirystatus=updateInquiryStatus(quotation);
        if(updateinquirystatus<1)
            return 0;
        return quid;
    }

    private Integer updateInquiryStatus(QuotationEntity quotationEntity){
        return orderMapper.updateInquiryStatus(quotationEntity);
    }

    private Integer createQuotation(QuotationEntity quotationEntity){
        return orderMapper.createQuotation(quotationEntity);
    }

    private Integer createQuotationItem(List<QuotationItemDTO> quotationItemDTOList){
        Integer result=0;
        for(QuotationItemDTO quotationItemDTO:quotationItemDTOList){
            result+=orderMapper.createQuotationItem(quotationItemDTO);
        }
        return result;
    }
}
