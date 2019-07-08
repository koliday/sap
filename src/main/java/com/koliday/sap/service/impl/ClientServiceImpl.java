package com.koliday.sap.service.impl;

import com.koliday.sap.entity.ClientEntity;
import com.koliday.sap.entity.ContactPersonEntity;
import com.koliday.sap.mapper.ClientMapper;
import com.koliday.sap.service.intf.ClientService;
import com.koliday.sap.utils.IdConvertToNoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {
    @Autowired
    private ClientMapper clientMapper;

    @Transactional
    @Override
    public Integer addClientAndContactPerson(ClientEntity client, ContactPersonEntity contactPerson) {
        //首先生成clno
        Integer clientCount=clientMapper.selectClientCount();
        String clno=IdConvertToNoUtil.convertClient(clientCount+1);
        client.setClno(clno);

        Integer addClientResult=addClient(client);
        if(addClientResult<1)
            return 0;
        Integer clid=client.getClid();

        if(clid<1)
            return 0;
        contactPerson.setClid(clid);
        Integer addResult=addContactPersonToClient(contactPerson);
        if(addResult == 1)
            return clid;
        else
            return 0;
    }


    @Override
    public Integer addClient(ClientEntity client) {
        return clientMapper.addClient(client);
    }

    @Override
    public Integer addContactPersonToClient(ContactPersonEntity contactPerson) {
        return clientMapper.addContactPerson(contactPerson);
    }

    @Override
    public List<ClientEntity> getAllClientsByUid(Integer uid) {
        return clientMapper.getAllClientsByUid(uid);
    }

    @Override
    public Integer updateClient(ClientEntity client) {
        return clientMapper.updateClientByClid(client);
    }

    @Override
    public ClientEntity getClientByClid(Integer clid) {
        return clientMapper.getClientByClid(clid);
    }

    @Override
    public List<ContactPersonEntity> getContactPersonListByClid(Integer clid) {
        return clientMapper.getContactPersonListByClid(clid);
    }

    @Override
    public Integer updateContactPerson(ContactPersonEntity contactPerson) {
        return clientMapper.updateContactPerson(contactPerson);
    }
}
