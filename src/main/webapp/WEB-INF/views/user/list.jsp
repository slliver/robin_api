<%@ page language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp" %>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- CSRF攻击防护 -->
    <c:import url="/WEB-INF/views/include/header.jsp">
        <c:param name="title">首页</c:param>
    </c:import>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport"/>
    <link rel="shortcut icon" type="image/x-icon" href="${ctx}/static/images/favicon.ico" media="screen">

    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" href="${ctx}/assets/plugins/bootstrap/dist/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="${ctx}/assets/plugins/font-awesome/css/font-awesome.min.css">
    <!-- 自己实现的css -->
    <link rel="stylesheet" href="${ctx}/static/common/css/base.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script type="text/javascript" src="${ctx}/static/common/libs/html5shiv/html5shiv.min.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/libs/respond/respond.min.js"></script>
    <![endif]-->

    <!-- table and edit -->
    <link rel="stylesheet" href="${ctx}/assets/plugins/datatables/dataTables.bootstrap.css">
    <link rel="stylesheet" href="${ctx}/assets/plugins/datatables/select.bootstrap.min.css">
    <!-- bootstrap 自己的验证方式，暂时未启用 -->
    <%--<link rel="stylesheet" href="${ctx}/assets/plugins/bootstrap-validator/dist/css/bootstrap-validator.css"/>--%>
    <link rel="stylesheet" href="${ctx}/static/plugins/iCheck/all.css">

    <!-- daterangepicker -->
    <!--<link rel="stylesheet" href="${ctx}/resources/adminlte/plugins/daterangepicker/daterangepicker.css">-->
    <link rel="stylesheet" href="${ctx}/assets/plugins/datepicker/datepicker3.css">
    <link rel="stylesheet" href="${ctx}/assets/plugins/select2/select2.min.css">
    <!-- treeview -->
    <link rel="stylesheet" href="${ctx}/assets/plugins/bootstrap-treeview/bootstrap-treeview.min.css"/>
    <!-- Theme style -->
    <link rel="stylesheet" href="${ctx}/static/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="${ctx}/static/css/skins/_all-skins.min.css">


</head>
<body class="hold-transition skin-blue sidebar-mini fixed">
<a name="main"></a>
<div class="wrapper">
    <!-- Main Header -->
    <!-- Main Header -->
    <c:import url="/WEB-INF/views/include/header_navbar.jsp"/>
    <!-- Left side column. contains the logo and sidebar -->
    <c:import url="/WEB-INF/views/include/left_navbar.jsp"/>
    <!-- Content Wrapper. Contains page content 内容区域 -->
    <!-- Main content -->
    <div class="content-wrapper" id="mainDiv">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                用户管理
                <small>列表</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="${ctx}"><i class="fa fa-dashboard"></i> 首页</a></li>
                <li class="active">用户管理</li>
            </ol>
        </section>

        <!-- Main content -->
        <form id="queryForm" method="POST" action="${ctx}/user/list">
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
            <section class="content">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="box">
                            <!-- /.box-header -->
                            <div class="dataTables_filter" id="searchDiv"
                                 style="margin-top: 10px !important; position: relative !important; padding-right: 10px;">
                                <input placeholder="请输入姓名" name="name" class="form-control" type="text"
                                       likeOption="true" value="${condition.name}" maxlength="10"/>
                                <input placeholder="请输入手机号码" name="phone" class="form-control" type="text"
                                       likeOption="true" value="${condition.phone}" maxlength="10"/>
                                <!--
                                <div class="has-feedback form-group">
                                    <input type="search" placeholder="开始生日" title="生日" name="g.birthday"
                                           data-flag="datepicker" class="form-control" data-format="yyyy-mm-dd">
                                    <span class="fa fa-calendar form-control-feedback"></span>
                                </div>
                                <div class="has-feedback form-group">
                                    <input type="search" placeholder="结束生日" title="生日" name="g.birthday"
                                           data-flag="datepicker" class="form-control" data-format="yyyy-mm-dd">
                                    <span class="fa fa-calendar form-control-feedback"></span>
                                </div>
                                -->

                                <div class="btn-group">
                                    <button type="submit" class="btn btn-primary" data-btn-type="search">查询</button>
                                    <button type="button" class="btn btn-default" data-btn-type="reset">重置</button>
                                </div>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default " data-btn-type="add">新增</button>
                                    <button type="button" class="btn btn-default" data-btn-type="edit">编辑</button>
                                    <button type="button" class="btn btn-danger" data-btn-type="delete">删除</button>
                                </div>
                            </div>
                            <div class="box-body">
                                <table id="user_table" class="table table-border table-hover">
                                    <thead>
                                    <tr>
                                        <th>用户名</th>
                                        <th>姓名</th>
                                        <th>昵称</th>
                                        <th>性别</th>
                                        <th>手机号码</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <c:choose>
                                        <c:when test="${not empty dataList && fn:length(dataList) >0}">
                                            <c:forEach items="${dataList}" var="item" varStatus="status">
                                                <c:choose>
                                                    <c:when test="${status.index%2 == 0}"><tr class="odd"></c:when>
                                                    <c:otherwise><tr class="even"></c:otherwise>
                                                </c:choose>
                                                <td>${item.userName}</td>
                                                <td>${item.name}</td>
                                                <td>${item.nickName}</td>
                                                <td>
                                                    <c:choose>
                                                        <c:when test="${item.sex == '1'}">男</c:when>
                                                        <c:otherwise>女</c:otherwise>
                                                    </c:choose>
                                                </td>
                                                <td>${item.phone}</td>
                                                </tr>
                                            </c:forEach>
                                        </c:when>
                                        <c:otherwise>
                                            <tr>
                                                <td colspan='9' align='center'> 暂无数据~</td>
                                            </tr>
                                        </c:otherwise>
                                    </c:choose>
                                    </tbody>
                                </table>
                            </div>
                            <!-- 分页 -->
                            <div class="box-footer clearfix text-right">
                                <c:if test="${not empty dataList && fn:length(dataList) >0}">
                                    ${pagnation}
                                </c:if>
                            </div>
                            <!-- /.box-body -->
                        </div>
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </section>
        </form>
    </div>
    <!-- footer -->
    <footer class="main-footer text-center">
        <strong>Copyright &copy; 2018 <a href="http://www.slliver.com">slliver</a>.</strong> All rights reserved. <b>Email</b>：slliver@163.com
        <b>QQ</b>：35369468
        &nbsp;&nbsp;&nbsp;
        <a href="http://www.miitbeian.gov.cn/" target="_blank">京ICP备16062522号</a>
    </footer>
    <!-- Add the sidebar's background. This div must be placed immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
</div>


<script type="text/javascript">
    var ctx = "${ctx}";//给外部js文件传递路径参数
    var _toPage = function (pageNum) {
        var _f = $('#queryForm')[0] ? $('#queryForm')[0] : $('form')[0];
        if (_f == undefined) alert('页面不存在form！');
        else $(_f).append('<input type="hidden" id="pageNum" name="pageNum" value="' + pageNum + '" />').submit();
    }
</script>
<!-- jQuery 2.2.3 -->
<script type="text/javascript" src="${ctx}/assets/scripts/jquery-2.2.3.min.js"></script>
<!-- JSON2 -->
<script src="${ctx}/static/common/json/json2.js"></script>
<!-- Bootstrap 3.3.7 -->
<script type="text/javascript" src="${ctx}/assets/plugins/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- FastClick -->
<script src="${ctx}/assets/plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<%--<script src="${ctx}/static/adminlte/dist/js/app.min.js"></script>--%>
<!-- dataTable -->
<script type="text/javascript" src="${ctx}/assets/plugins/datatables.net/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${ctx}/assets/plugins/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
<!-- 自己实现的 datatables -->
<script src="${ctx}/static/common/js/dataTables.js"></script>
<!-- form 验证，暂时去掉，需要的时候在放开 -->
<%--<script src="${ctx}/static/adminlte/plugins/bootstrap-validator/dist/js/bootstrap-validator.js"></script>--%>
<script src="${ctx}/static/plugins/iCheck/icheck.min.js"></script>
<!-- daterangepicker -->
<!-- bootstrap-datepicker 的内容等同于datepicker -->
<script src="${ctx}/assets/plugins/datepicker/bootstrap-datepicker.js"></script>
<script src="${ctx}/assets/plugins/datepicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<!-- treeview -->
<script src="${ctx}/assets/plugins/bootstrap-treeview/bootstrap-treeview.min.js"></script>
<!-- AdminLTE for demo purposes -->
<%--<script src="${ctx}/static/js/demo.js"></script>--%>
<!--select2-->
<script src="${ctx}/assets/plugins/select2/select2.full.min.js"></script>

<script type="text/javascript" src="${ctx}/static/common/js/base.js"></script>
<script type="text/javascript" src="${ctx}/static/common/js/base-modal.js"></script>
<script type="text/javascript" src="${ctx}/static/common/js/base-form.js"></script>
<script type="text/javascript" src="${ctx}/static/common/js/base-datasource.js"></script>
<script type="text/javascript" src="${ctx}/static/common/js/base-org.js"></script>

</body>
</html>