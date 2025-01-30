// 定义用户数据模型
Ext.define('Demo.model.User', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'department', type: 'string' },
        { name: 'joinDate', type: 'date', dateFormat: 'Y-m-d' }
    ]
});

// 创建演示组件
Ext.define('Demo.DataDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Data 数据组件演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    initComponent: function () {
        var me = this;

        // 创建本地数据
        var localData = {
            success: true,
            total: 5,
            data: [{
                id: 1,
                name: '张三',
                email: 'zhangsan@example.com',
                phone: '13800000001',
                department: '技术部',
                joinDate: '2020-01-01'
            }, {
                id: 2,
                name: '李四',
                email: 'lisi@example.com',
                phone: '13800000002',
                department: '市场部',
                joinDate: '2020-02-01'
            }, {
                id: 3,
                name: '王五',
                email: 'wangwu@example.com',
                phone: '13800000003',
                department: '技术部',
                joinDate: '2020-03-01'
            }, {
                id: 4,
                name: '赵六',
                email: 'zhaoliu@example.com',
                phone: '13800000004',
                department: '销售部',
                joinDate: '2020-04-01'
            }, {
                id: 5,
                name: '钱七',
                email: 'qianqi@example.com',
                phone: '13800000005',
                department: '技术部',
                joinDate: '2020-05-01'
            }]
        };

        // 创建Store
        var store = Ext.create('Ext.data.Store', {
            model: 'Demo.model.User',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                },
                data: localData
            },
            autoLoad: true,
            sorters: [{
                property: 'name',
                direction: 'ASC'
            }],
            groupField: 'department'
        });

        // 扩展配置
        Ext.apply(me, {
            items: [{
                xtype: 'grid',
                title: '用户数据表格',
                store: store,
                margin: '0 0 10 0',
                height: 300,
                features: [{
                    ftype: 'grouping',
                    groupHeaderTpl: '{name} ({rows.length} 人)',
                    collapsible: true
                }],
                columns: [{
                    text: 'ID',
                    dataIndex: 'id',
                    width: 50
                }, {
                    text: '姓名',
                    dataIndex: 'name',
                    flex: 1
                }, {
                    text: '邮箱',
                    dataIndex: 'email',
                    flex: 2
                }, {
                    text: '电话',
                    dataIndex: 'phone',
                    flex: 1
                }, {
                    text: '部门',
                    dataIndex: 'department',
                    flex: 1
                }, {
                    text: '入职日期',
                    dataIndex: 'joinDate',
                    flex: 1,
                    xtype: 'datecolumn',
                    format: 'Y-m-d'
                }],
                tbar: [{
                    text: '添加',
                    iconCls: 'x-fa fa-plus',
                    handler: function () {
                        store.add({
                            id: store.getCount() + 1,
                            name: '新员工',
                            email: 'new@example.com',
                            phone: '13800000000',
                            department: '技术部',
                            joinDate: new Date()
                        });
                    }
                }, {
                    text: '删除选中',
                    iconCls: 'x-fa fa-minus',
                    handler: function () {
                        var selection = this.up('grid').getSelection();
                        if (selection.length > 0) {
                            store.remove(selection);
                        }
                    }
                }, '->', {
                    xtype: 'textfield',
                    fieldLabel: '搜索',
                    labelWidth: 40,
                    width: 200,
                    listeners: {
                        change: function (field, newValue) {
                            var grid = field.up('grid');
                            var store = grid.getStore();

                            if (newValue) {
                                store.clearFilter();
                                store.filterBy(function (record) {
                                    var name = record.get('name');
                                    var email = record.get('email');
                                    var department = record.get('department');
                                    var searchValue = newValue.toLowerCase();

                                    return name.toLowerCase().indexOf(searchValue) > -1 ||
                                        email.toLowerCase().indexOf(searchValue) > -1 ||
                                        department.toLowerCase().indexOf(searchValue) > -1;
                                });
                            } else {
                                store.clearFilter();
                            }
                        }
                    }
                }]
            }, {
                xtype: 'panel',
                title: '数据操作演示',
                bodyPadding: 10,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                defaults: {
                    xtype: 'panel',
                    flex: 1,
                    margin: '0 5',
                    bodyPadding: 10
                },
                items: [{
                    title: '排序',
                    items: [{
                        xtype: 'button',
                        text: '按姓名升序',
                        margin: '0 0 5 0',
                        handler: function () {
                            store.sort('name', 'ASC');
                        }
                    }, {
                        xtype: 'button',
                        text: '按姓名降序',
                        margin: '0 0 5 0',
                        handler: function () {
                            store.sort('name', 'DESC');
                        }
                    }, {
                        xtype: 'button',
                        text: '按入职日期排序',
                        handler: function () {
                            store.sort('joinDate', 'ASC');
                        }
                    }]
                }, {
                    title: '过滤',
                    items: [{
                        xtype: 'button',
                        text: '显示技术部',
                        margin: '0 0 5 0',
                        handler: function () {
                            store.clearFilter();
                            store.filter('department', '技术部');
                        }
                    }, {
                        xtype: 'button',
                        text: '显示2020年3月后入职',
                        margin: '0 0 5 0',
                        handler: function () {
                            store.clearFilter();
                            store.filterBy(function (record) {
                                return record.get('joinDate') >= new Date('2020-03-01');
                            });
                        }
                    }, {
                        xtype: 'button',
                        text: '清除过滤',
                        handler: function () {
                            store.clearFilter();
                        }
                    }]
                }]
            }]
        });

        me.callParent();
    },

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Data</strong>组件是ExtJS数据处理的核心:</p>' +
                '<ul>' +
                '<li><strong>Model</strong>: 定义数据结构和验证规则</li>' +
                '<li><strong>Store</strong>: 管理数据集合,提供排序、过滤、分组等功能</li>' +
                '<li><strong>Proxy</strong>: 处理数据的加载和保存</li>' +
                '<li><strong>Reader</strong>: 解析数据格式</li>' +
                '</ul>' +
                '<p>这些组件通常与Grid等视图组件配合使用,实现数据的展示和操作。</p>' +
                '</div>'
        }]
    }
}); 