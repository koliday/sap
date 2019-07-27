package com.koliday.sap.service.impl;

import com.koliday.sap.dto.CityDTO;
import com.koliday.sap.dto.ClientDTO;
import com.koliday.sap.dto.UserDTO;
import com.koliday.sap.entity.ClientEntity;
import com.koliday.sap.entity.ContactPersonEntity;
import com.koliday.sap.entity.EmployeeEntity;
import com.koliday.sap.entity.UserEntity;
import com.koliday.sap.mapper.ClientMapper;
import com.koliday.sap.mapper.UserMapper;
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

    @Autowired
    private UserMapper userMapper;
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
    public List<ClientDTO> getAllClientsByUid(Integer uid) {
        List<ClientDTO> result=new ArrayList<>();
        List<ClientEntity> clientEntityList = clientMapper.getAllClientsByUid(uid);
        for(ClientEntity clientEntity:clientEntityList){
            Integer creator=clientEntity.getCreator();
            UserEntity userEntity = userMapper.getUserByUid(creator);
            ClientDTO clientDTO=new ClientDTO(clientEntity,userEntity.getUsername());
            result.add(clientDTO);
        }
        return result;
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

    @Override
    public List<CityDTO> selectCity() {
        return clientMapper.selectCity();
    }
}
