var iJqGrid = null;
$(function () {
    iJqGrid = buildJqGridGenerator();
    initValidate();
});

function initValidate() {
    $("#edit-form").validate({
        errorPlacement: (error, element) => {
            element.after(error);
        },
        rules: {
            name : {
                required : true
            }
        },
        messages : {
            name : {
                required : "必填"
            }
        },
        submitHandler : form => {
            $(form).ajaxSubmit({
                success : result => {
                    if(200 == result.code) {
                        $(iJqGrid).trigger("reloadGrid");
                        $("#edit-modal-form").modal("hide");
                    } else {
                        alert(result.message);
                    }
                }
            });
        }
    });
}


function buildJqGridGenerator() {
    return jqGridFactory.generate({
        tableSelector : "#data-table-1",
        pager : "pager-table-1",
        url : "/system/permission/list.json",
        caption:"菜单管理",
        colNames : ["名称", "权限", "图标", "URL", "权重", "是否显示","类型", "描述", "创建人","创建时间" ],
        colModel : [
            {
                name : "name",
                index : "name"
            },
            {
                name : "permission",
                index : "permission"
            },
            {
                name : "icon",
                index : "icon",
            },
            {
                name : "url",
                index : "url"
            },
            {
                name : "weight",
                index : "weight"
            },
            {
                name : "isShow",
                index : "isShow",
                formatter : (cellValue, options, row) => {
                    return cellValue ? "是" : "否";
                }
            },
            {
                name : "type",
                index : "type",
                formatter : (cellValue, options, row) => {

                }
            },
            {
                name : "description",
                index : "description"
            },
            {
                name : "creatorUserId",
                index : "creatorUserId"
            },
            {
                name : "createTime",
                index : "createTime",
                formatter : (cellValue, options, row) => {
                    return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
                }
            }
        ]
    });
}

/**
 * 添加模板，模态框
 */
function addFuncDiaglog(id) {
    $("#parentId").val(id);
    $("#id").val();
}

/**
 * 编辑模板，模态框
 *
 * @param id 数据ID
 */
function editFuncDiaglog(entity) {
    console.log(JSON.stringify(entity));
}

/**
 * 删除模板，模态框
 *
 * @param id 数据ID
 */
function delFuncDiaglog(id) {
}
