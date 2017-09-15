package com.diich.core.model;

import com.diich.core.base.BaseModel;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/7/23.
 */
public class IchObject extends BaseModel{

    private Long id;
    private int type;
    protected List<ContentFragment> contentFragmentList;

    public List<ContentFragment> getContentFragmentList() {
        return contentFragmentList;
    }

    public void setContentFragmentList(List<ContentFragment> contentFragmentList) {
        this.contentFragmentList = contentFragmentList;
    }

    public void addContentFragment(ContentFragment contentFragment) {
        if(contentFragmentList == null ) {
            contentFragmentList = new ArrayList<>();
        }

        Long attributeId = contentFragment.getAttributeId();
        for (int i = 0; contentFragmentList.size() > 0 ; i++) {
            ContentFragment contentFragment2 = contentFragmentList.get(i);
            if(attributeId != null && attributeId.equals(contentFragment2.getAttributeId())) {
                contentFragmentList.remove(contentFragment2);
                i--;
            }
        }

        contentFragmentList.add(contentFragment);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

}
