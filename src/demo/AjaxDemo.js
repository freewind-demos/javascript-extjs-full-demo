Ext.define('Demo.AjaxDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Ajax 请求演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'panel',
        title: '1. 基本请求',
        margin: '0 0 10 0',
        items: [{
            xtype: 'form',
            bodyPadding: 10,
            defaults: {
                xtype: 'textfield',
                labelWidth: 100,
                margin: '0 0 10 0'
            },
            items: [{
                fieldLabel: '用户ID',
                name: 'userId',
                value: '1'
            }],
            buttons: [{
                text: 'GET请求',
                handler: function (btn) {
                    var form = btn.up('form');
                    var userId = form.getForm().findField('userId').getValue();

                    // 模拟GET请求
                    Ext.Ajax.request({
                        url: '/api/users/' + userId,
                        method: 'GET',
                        success: function (response) {
                            // 模拟响应数据
                            var data = {
                                id: userId,
                                name: '张三',
                                email: 'zhangsan@example.com'
                            };
                            Ext.Msg.alert('成功', '获取到用户数据: ' + Ext.JSON.encode(data));
                        },
                        failure: function (response) {
                            Ext.Msg.alert('错误', '请求失败: ' + response.status);
                        }
                    });
                }
            }, {
                text: 'POST请求',
                handler: function (btn) {
                    var form = btn.up('form');
                    var userId = form.getForm().findField('userId').getValue();

                    // 模拟POST请求
                    Ext.Ajax.request({
                        url: '/api/users',
                        method: 'POST',
                        jsonData: {
                            name: '新用户',
                            email: 'new@example.com'
                        },
                        success: function (response) {
                            // 模拟响应数据
                            var data = {
                                id: 100,
                                name: '新用户',
                                email: 'new@example.com'
                            };
                            Ext.Msg.alert('成功', '创建用户成功: ' + Ext.JSON.encode(data));
                        },
                        failure: function (response) {
                            Ext.Msg.alert('错误', '请求失败: ' + response.status);
                        }
                    });
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '2. 请求参数处理',
        margin: '0 0 10 0',
        items: [{
            xtype: 'form',
            bodyPadding: 10,
            defaults: {
                xtype: 'textfield',
                labelWidth: 100,
                margin: '0 0 10 0'
            },
            items: [{
                fieldLabel: '搜索关键字',
                name: 'keyword'
            }, {
                fieldLabel: '页码',
                name: 'page',
                value: '1'
            }, {
                fieldLabel: '每页条数',
                name: 'pageSize',
                value: '10'
            }],
            buttons: [{
                text: '查询',
                handler: function (btn) {
                    var form = btn.up('form');
                    var values = form.getForm().getValues();

                    // 模拟带参数的GET请求
                    Ext.Ajax.request({
                        url: '/api/users',
                        method: 'GET',
                        params: values,
                        success: function (response) {
                            // 模拟响应数据
                            var data = {
                                total: 100,
                                page: values.page,
                                pageSize: values.pageSize,
                                keyword: values.keyword,
                                items: [{
                                    id: 1,
                                    name: '张三'
                                }, {
                                    id: 2,
                                    name: '李四'
                                }]
                            };
                            Ext.Msg.alert('成功', '查询结果: ' + Ext.JSON.encode(data));
                        },
                        failure: function (response) {
                            Ext.Msg.alert('错误', '请求失败: ' + response.status);
                        }
                    });
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '3. 响应数据处理',
        margin: '0 0 10 0',
        items: [{
            xtype: 'grid',
            height: 200,
            store: {
                fields: ['id', 'name', 'email'],
                proxy: {
                    type: 'ajax',
                    url: '/api/users',
                    reader: {
                        type: 'json',
                        rootProperty: 'items',
                        totalProperty: 'total'
                    }
                }
            },
            columns: [
                { text: 'ID', dataIndex: 'id', width: 50 },
                { text: '姓名', dataIndex: 'name', flex: 1 },
                { text: '邮箱', dataIndex: 'email', flex: 1 }
            ],
            tbar: [{
                text: '加载数据',
                handler: function (btn) {
                    var grid = btn.up('grid');
                    // 模拟数据加载
                    setTimeout(function () {
                        var data = {
                            total: 2,
                            items: [{
                                id: 1,
                                name: '张三',
                                email: 'zhangsan@example.com'
                            }, {
                                id: 2,
                                name: '李四',
                                email: 'lisi@example.com'
                            }]
                        };
                        grid.getStore().loadRawData(data);
                    }, 500);
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '4. 错误处理',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 0 0'
            },
            items: [{
                xtype: 'button',
                text: '404错误',
                handler: function () {
                    Ext.Ajax.request({
                        url: '/api/not-exist',
                        success: function (response) {
                            Ext.Msg.alert('成功', '请求成功');
                        },
                        failure: function (response) {
                            Ext.Msg.alert('错误', '404 - 资源不存在');
                        }
                    });
                }
            }, {
                xtype: 'button',
                text: '500错误',
                handler: function () {
                    Ext.Ajax.request({
                        url: '/api/error',
                        success: function (response) {
                            Ext.Msg.alert('成功', '请求成功');
                        },
                        failure: function (response) {
                            Ext.Msg.alert('错误', '500 - 服务器内部错误');
                        }
                    });
                }
            }, {
                xtype: 'button',
                text: '网络错误',
                handler: function () {
                    Ext.Ajax.request({
                        url: 'http://invalid-domain',
                        success: function (response) {
                            Ext.Msg.alert('成功', '请求成功');
                        },
                        failure: function (response) {
                            Ext.Msg.alert('错误', '网络错误');
                        }
                    });
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '5. 进度显示',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            items: [{
                xtype: 'button',
                text: '下载文件',
                handler: function (btn) {
                    var progressBar = null;
                    var count = 0;

                    var updateProgress = function () {
                        count++;
                        var value = count / 10;
                        progressBar.updateProgress(value, Math.round(value * 100) + '%');

                        if (count < 10) {
                            setTimeout(updateProgress, 500);
                        } else {
                            setTimeout(function () {
                                progressBar.hide();
                                Ext.Msg.alert('成功', '文件下载完成!');
                            }, 500);
                        }
                    };

                    progressBar = Ext.Msg.show({
                        title: '下载进度',
                        message: '正在下载文件...',
                        width: 300,
                        progress: true,
                        buttons: false
                    });

                    updateProgress();
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '6. 请求超时处理',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            items: [{
                xtype: 'button',
                text: '发送请求(3秒超时)',
                handler: function () {
                    Ext.Ajax.request({
                        url: '/api/slow',
                        timeout: 3000, // 3秒超时
                        success: function (response) {
                            Ext.Msg.alert('成功', '请求成功');
                        },
                        failure: function (response) {
                            if (response.timedout) {
                                Ext.Msg.alert('错误', '请求超时');
                            } else {
                                Ext.Msg.alert('错误', '请求失败');
                            }
                        }
                    });

                    // 模拟超时
                    setTimeout(function () {
                        Ext.Msg.alert('错误', '请求超时');
                    }, 3500);
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '7. 跨域请求',
        margin: '0 0 10 0',
        items: [{
            xtype: 'form',
            bodyPadding: 10,
            items: [{
                xtype: 'textfield',
                fieldLabel: 'API地址',
                name: 'apiUrl',
                value: 'https://api.example.com/data',
                labelWidth: 100,
                width: 400
            }],
            buttons: [{
                text: '发送CORS请求',
                handler: function (btn) {
                    var form = btn.up('form');
                    var apiUrl = form.getForm().findField('apiUrl').getValue();

                    Ext.Ajax.request({
                        url: apiUrl,
                        cors: true,
                        success: function (response) {
                            Ext.Msg.alert('成功', '跨域请求成功');
                        },
                        failure: function (response) {
                            Ext.Msg.alert('错误', '跨域请求失败');
                        }
                    });

                    // 模拟响应
                    setTimeout(function () {
                        Ext.Msg.alert('提示', '这是一个模拟的跨域请求演示');
                    }, 500);
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '8. 文件上传',
        margin: '0 0 10 0',
        items: [{
            xtype: 'form',
            bodyPadding: 10,
            items: [{
                xtype: 'filefield',
                name: 'file',
                fieldLabel: '选择文件',
                labelWidth: 100,
                width: 400,
                buttonText: '浏览...'
            }],
            buttons: [{
                text: '上传',
                handler: function (btn) {
                    var form = btn.up('form');
                    var file = form.getForm().findField('file').getValue();

                    if (file) {
                        var progressBar = null;
                        var count = 0;

                        var updateProgress = function () {
                            count++;
                            var value = count / 10;
                            progressBar.updateProgress(value, Math.round(value * 100) + '%');

                            if (count < 10) {
                                setTimeout(updateProgress, 300);
                            } else {
                                setTimeout(function () {
                                    progressBar.hide();
                                    Ext.Msg.alert('成功', '文件上传完成!');
                                }, 500);
                            }
                        };

                        progressBar = Ext.Msg.show({
                            title: '上传进度',
                            message: '正在上传文件...',
                            width: 300,
                            progress: true,
                            buttons: false
                        });

                        updateProgress();
                    } else {
                        Ext.Msg.alert('错误', '请选择要上传的文件');
                    }
                }
            }]
        }]
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Ajax</strong>组件提供了丰富的网络请求功能:</p>' +
                '<ul>' +
                '<li>基本请求: GET、POST等请求方法</li>' +
                '<li>参数处理: URL参数、请求体等</li>' +
                '<li>响应处理: JSON解析、数据加载等</li>' +
                '<li>错误处理: HTTP错误、网络错误等</li>' +
                '<li>进度显示: 上传下载进度</li>' +
                '<li>超时处理: 请求超时控制</li>' +
                '<li>跨域请求: CORS支持</li>' +
                '<li>文件上传: 文件上传处理</li>' +
                '</ul>' +
                '<p>Ajax组件是实现前后端交互的重要工具。</p>' +
                '</div>'
        }]
    }
}); 