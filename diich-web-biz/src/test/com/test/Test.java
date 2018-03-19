package com.test;

import com.diich.core.model.Role;
import com.diich.core.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2018/1/16.
 */
public class Test {

    @Autowired
    private RoleService roleService;

    @org.junit.Test
    public void test() {
        Role role = null;
        try {
            //role = roleService.getRoleById(1L);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
