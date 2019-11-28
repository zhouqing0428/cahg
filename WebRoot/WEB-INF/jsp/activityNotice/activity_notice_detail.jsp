<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<base href="<%=basePath%>">
<title>${info.title}</title>
</head>
<body>
<script type="text/javascript" src="js/dropdown.class.demo_3.js"></script>
<link rel="stylesheet" type="text/css" href="static/css/menu_3.css">
<link href="static/css/index_6.css" rel="stylesheet" type="text/css" />
<div id="main">
<iframe style="margin-top:-4px;"  class="top" frameborder="0" scrolling="no" src="index/head.do" widht="100%" height="180px;"></iframe>
<div style="background-color: #fff"> 
    <div class="cen-div color mar-t">
      <div class="con_title_left_c fl_left"> 
      	<div class="fl">
      		<div class="font2 dgrey">
	      		<img src="static/picture/wz.png" class="padd-r"/>您现在的位置 :  
				<a href='index/page.do' target="_parent">首页</a>&nbsp;>&nbsp;
				<a href='cahgActivityNotice/activityNoticeListPage.do' target="_parent">活动通知列表</a>&nbsp;>&nbsp;<a href='' target="_parent">活动通知</a>
			</div>
		</div>
      </div>
      <div class="con_title mar-t2 text">
        <h4 style="margin:20px;" align="center">${info.title }</h4>
      </div>
      <div class="line mar-t2 hov">
        <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="padding-left:10px; padding-right:10px;color:#666666;">
          <tr>
            <td align="center" width="100%"><b>作者：${info.userName}&nbsp;&nbsp;&nbsp;创建时间：${info.create_date }&nbsp;&nbsp;&nbsp;</b></td>
          </tr>
          <c:if test="${info.file_name ne null and info.file_name ne ''}">          <tr>
          	<td align="center" width="100%"><b><a style="color:blue;" href="http://10.56.65.100/file/upImg/specialtopic/${info.file_name }">【${info.file_old_name}】下载</a></b></td>
          </tr>
         </c:if>
		<tr style="height:50px;">
		     <td><hr/></td>
		</tr>
        </table>
      </div>
      <div id="content" style="margin-top:10px;background-color:white;color:black;padding-right:50px;padding-left:50px;">
         	${info.content }
      </div>
      
    </div>
  </div>
    <iframe class="bot"  frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" src="index/bottom.do" widht="100%" ></iframe>
</div>

</body>
</html>