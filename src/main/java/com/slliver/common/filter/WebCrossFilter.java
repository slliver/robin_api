package com.slliver.common.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Description: 用一句话具体描述类的功能
 * @author: slliver
 * @date: 2018/5/2 11:32
 * @version: 1.0
 */
public class WebCrossFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
        String origin = servletRequest.getRemoteHost() + ":" + servletRequest.getRemotePort();
        httpResponse.setHeader("Access-Control-Allow-Origin", "*");
        httpResponse.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        httpResponse.setHeader("Access-Control-Max-Age", "3600");
        httpResponse.setHeader("Access-Control-Allow-Headers", "x-requested-with,Authorization,request_token");
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
        chain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
