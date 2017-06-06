package com.diich.service.impl;

import com.alibaba.dubbo.common.json.JSON;
import com.diich.core.model.*;
import com.diich.core.model.vo.SearchVO;
import com.diich.core.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.diich.mapper.ContentFragmentMapper;
import com.diich.mapper.ResourceMapper;
import com.diich.mapper.IchCategoryMapper;
import com.diich.mapper.IchProjectMapper;
import com.diich.mapper.IchMasterMapper;
import com.diich.mapper.WorksMapper;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/8 0008.
 */

@Service("searchService")
public class SearchServiceImpl implements SearchService {


    @Autowired
    private ContentFragmentMapper contentFragmentMapper;

    @Autowired
    private ResourceMapper resourceMapper;

    @Autowired
    private IchCategoryMapper ichCategoryMapper;

    @Autowired
    private IchProjectMapper ichProjectMapper;

    @Autowired
    private IchMasterMapper ichMasterMapper;

    @Autowired
    private WorksMapper worksMapper;


    public List<String> searchText(String keyword, int size) {
        return null;
    }

    public Map searchText(Map<String, Object> map)
    {

        List<SearchVO> resultList = new ArrayList<SearchVO>();
        try {
            System.out.println(JSON.json(map));
        } catch (IOException e) {
            e.printStackTrace();
        }
        int lsCount = contentFragmentMapper.queryForSearchCount(map);


        List<ContentFragment> ls = contentFragmentMapper.queryForSearchPage(map);

        if(lsCount>1){
            return null;
        }


        for (int i=0;i<ls.size();i++){
            List<ContentFragment> sea = contentFragmentMapper.queryByTargetIDAndType(ls.get(i));
            SearchVO s = new SearchVO();
            s.setType(ls.get(i).getTargetType());
            s.setId(ls.get(i).getTargetId());
            //封装搜索对象
            for(int j = 0;j<sea.size();j++){
                ContentFragment cf = sea.get(j);

                if(ls.get(i).getTargetType()==0){//封装项目对象
                    //添加中文名
                    if(cf.getAttributeId()==4){
                        s.setTitle(cf.getContent());
                    }

                    //添加简介
                    if(cf.getAttributeId()==9){
                        if(cf.getContent().length()>100){
                            s.setContent(cf.getContent().substring(0,99)+"...");
                        }

                    }
                    //添加题图
                    if(cf.getAttributeId()==1){
                        Resource r = resourceMapper.selectByContentFramentID(cf.getId());
                        if(null != r){
                            s.setImg(r.getUri());
                        }
                    }
                }else if(ls.get(i).getTargetType()==1){//封装大师对象

                    //添加中文名
                    if(cf.getAttributeId()==13){
                        s.setTitle(cf.getContent());
                    }
                    //添加简介
                    if(cf.getAttributeId()==24){
                        if(cf.getContent().length()>100){
                            s.setContent(cf.getContent().substring(0,99)+"...");
                        }
                    }
                    //添加题图
                    if(cf.getAttributeId()==10){
                        Resource r = resourceMapper.selectByContentFramentID(cf.getId());
                        if(null != r){
                            s.setImg(r.getUri());
                        }
                    }
                }
                if(ls.get(i).getTargetType()==2){//封装作品对象
                    //添加中文名
                    if(cf.getAttributeId()==28){
                        s.setTitle(cf.getContent());
                    }
                    //添加简介
                    if(cf.getAttributeId()==31){
                        if(cf.getContent().length()>100){
                            s.setContent(cf.getContent().substring(0,99)+"...");
                        }
                    }
                    //添加题图
                    if(cf.getAttributeId()==25){
                        Resource r = resourceMapper.selectByContentFramentID(cf.getId());
                        if(null != r){
                            s.setImg(r.getUri());
                        }
                    }
                }
            }
            //项目统一添加分类
            if(ls.get(i).getTargetType()==0){

                IchProject ichProject = ichProjectMapper.selectByPrimaryKey(ls.get(i).getTargetId());
                IchCategory ichCategory = ichCategoryMapper.selectByPrimaryKey(ichProject.getIchCategoryId());

                if(ichCategory == null){
                    s.setCategory("");
                    //continue;
                }else{
                    String category=ichCategory.getName();
                    if(ichCategory.getParentId()>0){
                        ichCategory = ichCategoryMapper.selectByPrimaryKey(ichCategory.getParentId());
                        category = ichCategory.getName()+"-"+category;
                    }
                    if(ichCategory.getParentId()>0){
                        ichCategory = ichCategoryMapper.selectByPrimaryKey(ichCategory.getParentId());
                        category = ichCategory.getName()+"-"+category;
                    }
                    s.setCategory(category);
                }

            }
            //大师添加项目 名称
            if(ls.get(i).getTargetType()==1){
                IchMaster master = ichMasterMapper.selectByPrimaryKey(ls.get(i).getTargetId());

                if(master.getIchProjectId() != null){
                    List<ContentFragment> ml = contentFragmentMapper.queryListByTargetId(master.getIchProjectId());

                    for(ContentFragment c:ml){
                        if(c.getAttributeId()==4){
                            s.setProjjectName(c.getContent());
                            break;
                        }
                    }

                    //通过项目查找大师分类
                    IchProject ichProject = ichProjectMapper.selectByPrimaryKey(master.getIchProjectId());
                    IchCategory ichCategory=null;

                    if(ichProject != null){
                         ichCategory = ichCategoryMapper.selectByPrimaryKey(ichProject.getIchCategoryId());
                    }

                    if(ichCategory != null){
                        String category=ichCategory.getName();
                        s.setCategory(category);
                    }else{
                        s.setCategory("");
                    }
                }

            }
            //作品添加 大师
            if(ls.get(i).getTargetType()==2){

                Works works =worksMapper.selectByPrimaryKey(ls.get(i).getTargetId());

                //添加项目名
                List<ContentFragment> ml = contentFragmentMapper.queryListByTargetId(works.getIchProjectId());

                for(ContentFragment c:ml){
                    if(c.getAttributeId()==4){
                        s.setProjjectName(c.getContent());
                        break;
                    }
                }
                //添加大师
                IchMaster master = ichMasterMapper.selectByPrimaryKey(works.getIchMasterId());
                List<ContentFragment> mastercontentList = contentFragmentMapper.queryListByTargetId(master.getId());
                Map<String,String> mastermap = new HashMap<String,String>();

                mastermap.put("uri",master.getUri());

                for(ContentFragment c:mastercontentList){
                    if(c.getAttributeId()==13){
                        mastermap.put("name",c.getContent());
                    }
                    if(c.getAttributeId()==112){
                        Resource r = resourceMapper.selectByContentFramentID(c.getId());
                        if(null != r){
                            mastermap.put("headimg",r.getUri());
                        }
                    }
                }
                s.setMasters(mastermap);
                //添加作品所在分类
                //通过项目查找作品分类
                IchProject ichProject = ichProjectMapper.selectByPrimaryKey(works.getIchProjectId());
                IchCategory ichCategory = ichCategoryMapper.selectByPrimaryKey(ichProject.getIchCategoryId());

                if(ichCategory != null){
                    String category=ichCategory.getName();
                    s.setCategory(category);
                }else{
                    s.setCategory("");
                }
            }

            resultList.add(s);
        }

        map.put("res",resultList);
        map.put("totalCount",lsCount);
        return map;
    }

    @Override
    public Map searchTextByProcedure(Map<String, Object> map) {

        contentFragmentMapper.queryForSearch(map);
        return null;
    }
}