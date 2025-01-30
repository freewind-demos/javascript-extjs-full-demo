// 定义用户模型
if (!Ext.ClassManager.get('Demo.model.User')) {
    Ext.define('Demo.model.User', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'phone', type: 'string' },
            { name: 'department', type: 'string' }
        ]
    });
}

Ext.define('Demo.ProxyDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Proxy 数据代理演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    initComponent: function () {
        this.callParent();
    },

    items: [{
        xtype: 'panel',
        title: '1. Memory Proxy',
        margin: '0 0 10 0',
        items: [{
            xtype: 'grid',
            height: 200,
            store: {
                model: 'Demo.model.User',
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json'
                    },
                    data: [{
                        id: 1,
                        name: '张三',
                        email: 'zhangsan@example.com',
                        phone: '13800138000',
                        department: '技术部'
                    }, {
                        id: 2,
                        name: '李四',
                        email: 'lisi@example.com',
                        phone: '13800138001',
                        department: '市场部'
                    }]
                },
                autoLoad: true
            },
            columns: [
                { text: 'ID', dataIndex: 'id', width: 50 },
                { text: '姓名', dataIndex: 'name', flex: 1 },
                { text: '邮箱', dataIndex: 'email', flex: 1 },
                { text: '电话', dataIndex: 'phone', flex: 1 },
                { text: '部门', dataIndex: 'department', flex: 1 }
            ],
            tbar: [{
                text: '添加数据',
                handler: function (btn) {
                    var grid = btn.up('grid');
                    var store = grid.getStore();
                    store.add({
                        id: store.getCount() + 1,
                        name: '新员工',
                        email: 'new@example.com',
                        phone: '13800138002',
                        department: '人事部'
                    });
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '2. Ajax Proxy',
        margin: '0 0 10 0',
        items: [{
            xtype: 'grid',
            height: 200,
            store: {
                model: 'Demo.model.User',
                proxy: {
                    type: 'ajax',
                    url: 'data/users.json', // 模拟的URL
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                },
                autoLoad: false
            },
            columns: [
                { text: 'ID', dataIndex: 'id', width: 50 },
                { text: '姓名', dataIndex: 'name', flex: 1 },
                { text: '邮箱', dataIndex: 'email', flex: 1 },
                { text: '电话', dataIndex: 'phone', flex: 1 },
                { text: '部门', dataIndex: 'department', flex: 1 }
            ],
            tbar: [{
                text: '加载数据',
                handler: function (btn) {
                    var grid = btn.up('grid');
                    // 模拟Ajax响应
                    setTimeout(function () {
                        var mockData = {
                            success: true,
                            data: [{
                                id: 1,
                                name: '王五',
                                email: 'wangwu@example.com',
                                phone: '13800138003',
                                department: '销售部'
                            }, {
                                id: 2,
                                name: '赵六',
                                email: 'zhaoliu@example.com',
                                phone: '13800138004',
                                department: '财务部'
                            }]
                        };
                        grid.getStore().loadRawData(mockData);
                    }, 500);
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '3. REST Proxy',
        margin: '0 0 10 0',
        items: [{
            xtype: 'form',
            padding: 10,
            items: [{
                xtype: 'textfield',
                fieldLabel: '用户ID',
                name: 'userId',
                value: '1'
            }],
            buttons: [{
                text: 'GET',
                handler: function (btn) {
                    var form = btn.up('form');
                    var userId = form.getForm().findField('userId').getValue();
                    // 模拟REST GET请求
                    Ext.Msg.alert('GET请求', 'GET /users/' + userId);
                }
            }, {
                text: 'POST',
                handler: function (btn) {
                    // 模拟REST POST请求
                    Ext.Msg.alert('POST请求', 'POST /users');
                }
            }, {
                text: 'PUT',
                handler: function (btn) {
                    var form = btn.up('form');
                    var userId = form.getForm().findField('userId').getValue();
                    // 模拟REST PUT请求
                    Ext.Msg.alert('PUT请求', 'PUT /users/' + userId);
                }
            }, {
                text: 'DELETE',
                handler: function (btn) {
                    var form = btn.up('form');
                    var userId = form.getForm().findField('userId').getValue();
                    // 模拟REST DELETE请求
                    Ext.Msg.alert('DELETE请求', 'DELETE /users/' + userId);
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '4. LocalStorage Proxy',
        margin: '0 0 10 0',
        items: [{
            xtype: 'grid',
            height: 200,
            store: {
                model: 'Demo.model.User',
                proxy: {
                    type: 'localstorage',
                    id: 'demo-users'
                },
                autoLoad: true
            },
            columns: [
                { text: 'ID', dataIndex: 'id', width: 50 },
                { text: '姓名', dataIndex: 'name', flex: 1 },
                { text: '邮箱', dataIndex: 'email', flex: 1 },
                { text: '电话', dataIndex: 'phone', flex: 1 },
                { text: '部门', dataIndex: 'department', flex: 1 }
            ],
            tbar: [{
                text: '保存数据',
                handler: function (btn) {
                    var grid = btn.up('grid');
                    var store = grid.getStore();
                    store.add({
                        id: store.getCount() + 1,
                        name: '本地存储用户',
                        email: 'local@example.com',
                        phone: '13800138005',
                        department: '研发部'
                    });
                    store.sync();
                    Ext.Msg.alert('提示', '数据已保存到LocalStorage');
                }
            }, {
                text: '清除数据',
                handler: function (btn) {
                    var grid = btn.up('grid');
                    var store = grid.getStore();
                    store.removeAll();
                    store.sync();
                    Ext.Msg.alert('提示', 'LocalStorage数据已清除');
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
                '<p><strong>Proxy</strong>是ExtJS数据访问层的核心组件,提供了多种数据代理方式:</p>' +
                '<ul>' +
                '<li>Memory Proxy: 内存数据代理,用于客户端数据</li>' +
                '<li>Ajax Proxy: Ajax数据代理,用于服务器端数据</li>' +
                '<li>REST Proxy: RESTful风格的数据代理</li>' +
                '<li>LocalStorage Proxy: 本地存储数据代理</li>' +
                '</ul>' +
                '<p>每种代理都支持相应的Reader和Writer来处理数据的读写。</p>' +
                '</div>'
        }]
    }
}); 