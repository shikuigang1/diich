package com.diich.web.controller;

import com.diich.core.base.BaseController;
import com.diich.core.model.IchCategory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

/**
 * Created by Administrator on 2017/5/21.
 */
@Controller
@RequestMapping("ichCategory")
public class IchCategoryController extends BaseController<IchCategory> {


    public Map<String, Object> getIchCategoryList() {

        return null;
    }
}
