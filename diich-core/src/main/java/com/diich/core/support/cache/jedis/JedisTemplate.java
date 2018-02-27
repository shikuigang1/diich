package com.diich.core.support.cache.jedis;

import java.util.List;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import com.diich.core.util.InstanceUtil;
import com.diich.core.util.PropertiesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.stereotype.Component;

import redis.clients.jedis.*;
import redis.clients.jedis.JedisShardInfo;

/**
 */
@Component
public class JedisTemplate {
    private static final Logger logger = LogManager.getLogger();

    private static ShardedJedisPool shardedJedisPool = null;

    private static Integer EXPIRE = PropertiesUtil.getInt("redis.expiration");
    @Autowired
    private JedisConnectionFactory jedisConnectionFactory;

    @Autowired
    private JedisPool jedisPool;

    // 获取线程
    private ShardedJedis getJedis() {
        if (shardedJedisPool == null) {
            synchronized (EXPIRE) {
                if (shardedJedisPool == null) {
                    JedisPoolConfig poolConfig = jedisConnectionFactory.getPoolConfig();
                    JedisShardInfo shardInfo = jedisConnectionFactory.getShardInfo();
                    List<JedisShardInfo> list = InstanceUtil.newArrayList(shardInfo);
                    shardedJedisPool = new ShardedJedisPool(poolConfig, list);
                }
            }
        }
        return shardedJedisPool.getResource();
    }

    @Bean
    public JedisPool redisPoolFactory() {
        /*LOG.info("JedisPool注入成功！！");
        LOG.info("redis地址：" + host + ":" + port);*/
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxIdle(PropertiesUtil.getInt("redis.maxIdle"));
        jedisPoolConfig.setMaxWaitMillis(PropertiesUtil.getInt("redis.maxWaitMillis"));
        ;
        JedisPool jedisPool = new JedisPool(jedisPoolConfig, PropertiesUtil.getString("redis.host"),
                PropertiesUtil.getInt("redis.port"),3000,PropertiesUtil.getString("redis.password"));

        return jedisPool;
    }


    public Set<String> getAllByPattern(String pattern){

        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            return jedis.keys(pattern);
        }catch (Exception e){
            logger.error("Jedis lpush 异常 ：" + e.getMessage());
            return null;
        }finally {
            if (jedis != null){
                try {
                    jedis.close();
                }catch (Exception e){
                    logger.error(e.getMessage());
                }
            }
        }

    }


    public void  setCrud(String key, String value) {
        ShardedJedis jedis = getJedis();
        if (jedis == null) {
            return ;
        }

        try {
            //if (!jedis.exists(key)) {
                 jedis.set(key,value);
            //}
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        } finally {
            if (jedis != null) {
                jedis.close();
            }
        }

    }

/*

    public void  getKeys(String key) {
        ShardedJedis jedis = getJedis();
        if (jedis == null) {
            return ;
        }

        try {

            jedis.keys()

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        } finally {
            if (jedis != null) {
                jedis.close();
            }
        }

    }
*/



    public String  getCrud(String key) {
        ShardedJedis jedis = getJedis();
        if (jedis == null) {
            return "";
        }
        try {
                return jedis.get(key);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return "";
        } finally {
            if (jedis != null) {
                jedis.close();
            }
        }

    }


    public <K> K run(String key, Executor<K> executor, Integer... expire) {
        ShardedJedis jedis = getJedis();
        if (jedis == null) {
            return null;
        }
        try {
            K result = executor.execute(jedis);
            if (jedis.exists(key)) {
                if (expire == null || expire.length == 0) {
                    jedis.expire(key, EXPIRE);
                } else if (expire.length == 1) {
                    jedis.expire(key, expire[0]);
                }
            }
            return result;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        } finally {
            if (jedis != null) {
                jedis.close();
            }
        }
        return null;
    }

    public <K> K run(byte[] key, Executor<K> executor, Integer... expire) {
        ShardedJedis jedis = getJedis();
        if (jedis == null) {
            return null;
        }
        try {
            K result = executor.execute(jedis);
            if (jedis.exists(key)) {
                if (expire == null || expire.length == 0) {
                    jedis.expire(key, EXPIRE);
                } else if (expire.length == 1) {
                    jedis.expire(key, expire[0]);
                }
            }
            return result;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        } finally {
            if (jedis != null) {
                jedis.close();
            }
        }
        return null;
    }
}
