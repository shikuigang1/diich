package com.diich.core.model;

import com.diich.core.base.BaseModel;

/**
 * Created by Administrator on 2017/7/26.
 */
public class Search extends BaseModel{
    private long targetId;
    private int targetType;

    public long getTargetId() {
        return targetId;
    }

    public void setTargetId(long targetId) {
        this.targetId = targetId;
    }

    public int getTargetType() {
        return targetType;
    }

    public void setTargetType(int targetType) {
        this.targetType = targetType;
    }

    public static class Condition extends BaseModel{
        private String keyword;
        private String category;
        private String area;
        private Integer type;
        private Integer offset = 0;//分页中的位移量
        private Integer limit = 6;

        public String getKeyword() {
            return keyword;
        }

        public void setKeyword(String keyword) {
            this.keyword = keyword;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public String getArea() {
            return area;
        }

        public void setArea(String area) {
            this.area = area;
        }

        public Integer getType() {
            return type;
        }

        public void setType(Integer type) {
            this.type = type;
        }

        public Integer getOffset() {
            return offset;
        }

        public void setOffset(Integer offset) {
            this.offset = offset;
        }

        public Integer getLimit() {
            return limit;
        }

        public void setLimit(Integer limit) {
            this.limit = limit;
        }

        public String toString() {
            String condtion = "";
            if(keyword != null) {
                condtion += keyword;
            }
            if(category != null) {
                condtion += category;
            }
            if(area != null) {
                condtion += area;
            }
            if(type != null) {
                condtion += type;
            }
            if(offset != null) {
                condtion += offset;
            }
            if(limit != null) {
                condtion += limit;
            }
            return condtion;
        }
    }
}
