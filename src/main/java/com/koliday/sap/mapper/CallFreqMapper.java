package com.koliday.sap.mapper;

import com.koliday.sap.entity.CallFreqEntity;
import com.koliday.sap.entity.VipEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CallFreqMapper {

    List<CallFreqEntity> getCallFreqList();

}
