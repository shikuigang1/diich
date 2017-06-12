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
        //根据参数不同使用不同的 方法
        int lsCount = contentFragmentMapper.queryForSearchCount(map);
        List<ContentFragment> ls = contentFragmentMapper.queryForSearchPage(map);

        for (int i=0;i<ls.size();i++){
            List<ContentFragment> sea = contentFragmentMapper.queryByTargetIDAndType(ls.get(i));
            SearchVO s = new SearchVO();
            s.setType(ls.get(i).getTargetType());
            s.setId(ls.get(i).getTargetId());
            //��װ��������
            for(int j = 0;j<sea.size();j++){
                ContentFragment cf = sea.get(j);

                if(ls.get(i).getTargetType()==0){//��װ��Ŀ����
                    //���������
                    if(cf.getAttributeId()==4){
                        s.setTitle(cf.getContent());
                    }

                    //��Ӽ��
                    if(cf.getAttributeId()==9){
                        if(cf.getContent().length()>100){
                            s.setContent(cf.getContent().substring(0,99)+"...");
                        }

                    }
                    //�����ͼ
                    if(cf.getAttributeId()==112){
                        Resource r = resourceMapper.selectByContentFramentID(cf.getId());
                        if(null != r){
                            s.setImg(r.getUri());
                        }
                    }

                    if(cf.getAttributeId()==2){
                       s.setDoi(cf.getContent());
                    }

                }else if(ls.get(i).getTargetType()==1){//��װ��ʦ����

                    //���������
                    if(cf.getAttributeId()==13){
                        s.setTitle(cf.getContent());
                    }
                    //��Ӽ��
                    if(cf.getAttributeId()==24){
                        if(cf.getContent().length()>100){
                            s.setContent(cf.getContent().substring(0,99)+"...");
                        }
                    }
                    //�����ͼ
                    if(cf.getAttributeId()==113){
                        Resource r = resourceMapper.selectByContentFramentID(cf.getId());
                        if(null != r){
                            s.setImg(r.getUri());
                        }
                    }
                    if(cf.getAttributeId()==11){
                        s.setDoi(cf.getContent());
                    }
                }
                if(ls.get(i).getTargetType()==2){//��װ��Ʒ����
                    //���������
                    if(cf.getAttributeId()==28){
                        s.setTitle(cf.getContent());
                    }
                    //��Ӽ��
                    if(cf.getAttributeId()==31){
                        if(cf.getContent().length()>100){
                            s.setContent(cf.getContent().substring(0,99)+"...");
                        }
                    }
                    //�����ͼ
                    if(cf.getAttributeId()==114){
                        Resource r = resourceMapper.selectByContentFramentID(cf.getId());
                        if(null != r){
                            s.setImg(r.getUri());
                        }
                    }

                    if(cf.getAttributeId()==26){
                        s.setDoi(cf.getContent());
                    }
                }
            }
            //��Ŀͳһ��ӷ���
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
            //
            if(ls.get(i).getTargetType()==1){
                IchMaster master = ichMasterMapper.selectByPrimaryKey(ls.get(i).getTargetId());

                if(master!=null && master.getIchProjectId() != null){
                    List<ContentFragment> ml = contentFragmentMapper.queryListByTargetId(master.getIchProjectId());

                    for(ContentFragment c:ml){
                        if(c.getAttributeId()==4){
                            s.setProjjectName(c.getContent());
                            break;
                        }
                    }

                    //ͨ����Ŀ���Ҵ�ʦ����
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

            if(ls.get(i).getTargetType()==2){

                Works works =worksMapper.selectByPrimaryKey(ls.get(i).getTargetId());

                List<ContentFragment> ml = contentFragmentMapper.queryListByTargetId(works.getIchProjectId());

                for(ContentFragment c:ml){
                    if(c.getAttributeId()==4){
                        s.setProjjectName(c.getContent());
                        break;
                    }
                }

                IchMaster master = ichMasterMapper.selectByPrimaryKey(works.getIchMasterId());
                if(master != null){
                    List<ContentFragment> mastercontentList = contentFragmentMapper.queryListByTargetId(master.getId());
                    Map<String,String> mastermap = new HashMap<String,String>();

                    mastermap.put("uri",master.getUri());

                    for(ContentFragment c:mastercontentList){
                        if(c.getAttributeId()==13){
                            mastermap.put("name",c.getContent());
                        }
                        if(c.getAttributeId()==113){
                            Resource r = resourceMapper.selectByContentFramentID(c.getId());
                            if(null != r){
                                mastermap.put("headimg",r.getUri());
                            }
                        }
                    }
                    s.setMasters(mastermap);
                }

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