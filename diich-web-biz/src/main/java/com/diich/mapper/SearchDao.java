package com.diich.mapper;

import com.diich.core.model.ContentFragment;
import com.diich.core.model.IchMaster;
import com.diich.core.model.IchObject;
import com.diich.core.model.IchProject;
import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/2.
 */
public class SearchDao {

    public int search (Map<String, Object> condition, List<IchObject> ichObjectList, SqlSessionFactory factory){
        final RowBounds rowBounds = new RowBounds((Integer) condition.get("offset"), (Integer) condition.get("limit"));
        Map<String, Object> params = new HashMap<>();

        if(condition.get("keyword") != null) {
            params.put("keyword", condition.get("keyword"));
        }
        if(condition.get("type") != null) {
            params.put("target_type", condition.get("type"));
        }
        if(condition.get("category") != null) {
            params.put("gb_category_code", condition.get("category"));
        }
        if(condition.get("area") != null) {
            params.put("area_code", condition.get("area"));
        }

        System.out.println(new Date().getTime());
        SqlSession sqlSession = factory.openSession();
        List<?> list = sqlSession.selectList("com.diich.mapper.IchObjectMapper.searchList",params, rowBounds);
        FillIchObjectList((List<IchObject>)list.get(0), sqlSession);
        sqlSession.close();
        System.out.println(new Date().getTime());
        ichObjectList.clear();
        ichObjectList.addAll((List<IchObject>)list.get(0));
        if(list.get(1) != null && ((List)list.get(1)).size() != 0) {
            return (int)((List)list.get(1)).get(0);
        }
        return -1;

    }

    public void FillIchObjectList(List<IchObject> ichObjects, SqlSession sqlSession) {
        String idList = "";
        for(int i = 0; i < ichObjects.size(); i++) {
            if(idList.equals("")) {
                idList += ichObjects.get(i).getId();
            } else {
                idList += "," + ichObjects.get(i).getId();
            }
        }
        List<HashMap> result = sqlSession.selectList("com.diich.mapper.IchObjectMapper.loadIchObjectList", idList);

        for(int i = 0; i < ichObjects.size(); i++) {
            IchObject ichObject = ichObjects.get(i);
            Long id = ichObject.getId();
            int type = ichObject.getType();
            if(ichObject.getType() == 0) {
                ichObject = new IchProject();
            } else if(ichObject.getType() == 1) {
                ichObject = new IchMaster();
            }
            ichObject.setId(id);
            ichObject.setType(type);
            ichObjects.set(i, ichObject);

            for (HashMap hashmap:result) {
                if (hashmap.get("targetId").equals(ichObject.getId())) {
                    ContentFragment contentFragment = new ContentFragment();
                    contentFragment.setAttributeId((Long) hashmap.get("attributeId"));
                    contentFragment.setContent((String) hashmap.get("content"));
                    ichObject.addContentFragment(contentFragment);
                    if(ichObject instanceof IchProject && hashmap.get("ichCategoryId") != null) {
                        ((IchProject) ichObject).setIchCategoryId((Long) hashmap.get("ichCategoryId"));
                    }
                    if(ichObject instanceof  IchMaster && hashmap.get("projectName") != null) {
                        ContentFragment content = new ContentFragment();
                        content.setAttributeId(4L);
                        content.setContent(hashmap.get("projectName").toString());
                        ((IchMaster) ichObject).setIchProjectId((Long) hashmap.get("projectId"));
                        ichObject.addContentFragment(content);
                    }
                }
            }
        }

    }
}
